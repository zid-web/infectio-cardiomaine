// Moteur de recherche diagnostique basé sur Fuse.js
// Inspiré de l'approche POPI avec recherche multi-critères

import Fuse from 'fuse.js';
import type { 
  InfectiousDisease, 
  SearchResult, 
  SearchFilters 
} from '../types/infections';

export class DiagnosticSearchEngine {
  private fuse: Fuse<InfectiousDisease>;
  private diseases: InfectiousDisease[];

  constructor(diseases: InfectiousDisease[]) {
    this.diseases = diseases;
    
    // Configuration Fuse.js pour recherche médicale
    const fuseOptions: Fuse.IFuseOptions<InfectiousDisease> = {
      keys: [
        // Noms et identifiants (poids élevé)
        { name: 'name', weight: 3 },
        { name: 'commonNames', weight: 2.5 },
        { name: 'searchTerms.primary', weight: 3 },
        { name: 'searchTerms.synonyms', weight: 2 },
        { name: 'searchTerms.icd10', weight: 1.5 },
        
        // Signes cliniques (poids moyen-élevé)
        { name: 'searchTerms.clinicalSigns', weight: 2 },
        { name: 'diagnostic.clinical.major', weight: 1.8 },
        { name: 'diagnostic.clinical.minor', weight: 1.5 },
        
        // Mots-clés et contexte (poids moyen)
        { name: 'searchTerms.keywords', weight: 1.2 },
        { name: 'organ', weight: 1.5 },
        { name: 'specialty', weight: 1 },
        
        // Microbiologie (poids faible-moyen)
        { name: 'pathogens.name', weight: 1 },
        { name: 'diagnostic.microbiological.expectedPathogens', weight: 0.8 },
      ],
      threshold: 0.4, // Plus strict pour résultats pertinents
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      useExtendedSearch: true,
    };

    this.fuse = new Fuse(this.diseases, fuseOptions);
  }

  /**
   * Recherche principale avec multi-critères
   */
  search(
    query: string,
    filters?: SearchFilters,
    limit: number = 20
  ): SearchResult[] {
    if (!query || query.trim().length < 2) {
      return this.getAllDiseases(filters, limit);
    }

    // Recherche Fuse
    const fuseResults = this.fuse.search(query, { limit: limit * 2 });

    // Conversion en SearchResult
    let results: SearchResult[] = fuseResults.map((result) => ({
      disease: result.item,
      score: 1 - (result.score || 0), // Inverser pour avoir score élevé = meilleur
      matchedTerms: this.extractMatchedTerms(result.matches || []),
      relevance: this.calculateRelevance(result.score || 0),
    }));

    // Appliquer les filtres
    if (filters) {
      results = this.applyFilters(results, filters);
    }

    // Trier et limiter
    results = results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return results;
  }

  /**
   * Recherche par symptômes multiples
   */
  searchBySymptoms(symptoms: string[]): SearchResult[] {
    const query = symptoms.join(' ');
    return this.search(query);
  }

  /**
   * Recherche par pathogène
   */
  searchByPathogen(pathogen: string): SearchResult[] {
    const results = this.diseases
      .filter((disease) =>
        disease.pathogens.some((p) =>
          p.name.toLowerCase().includes(pathogen.toLowerCase())
        )
      )
      .map((disease) => ({
        disease,
        score: 1.0,
        matchedTerms: [pathogen],
        relevance: 'high' as const,
      }));

    return results;
  }

  /**
   * Recherche par organe/site
   */
  searchByOrgan(organ: string, filters?: SearchFilters): SearchResult[] {
    const results = this.diseases
      .filter((disease) =>
        disease.organ.toLowerCase().includes(organ.toLowerCase())
      )
      .map((disease) => ({
        disease,
        score: 1.0,
        matchedTerms: [organ],
        relevance: 'high' as const,
      }));

    return filters ? this.applyFilters(results, filters) : results;
  }

  /**
   * Suggestions auto-complete
   */
  getSuggestions(partialQuery: string, limit: number = 5): string[] {
    if (partialQuery.length < 2) return [];

    const suggestions = new Set<string>();

    this.diseases.forEach((disease) => {
      // Noms principaux
      if (disease.name.toLowerCase().includes(partialQuery.toLowerCase())) {
        suggestions.add(disease.name);
      }

      // Noms communs
      disease.commonNames.forEach((name) => {
        if (name.toLowerCase().includes(partialQuery.toLowerCase())) {
          suggestions.add(name);
        }
      });

      // Signes cliniques
      disease.searchTerms.clinicalSigns.forEach((sign) => {
        if (sign.toLowerCase().includes(partialQuery.toLowerCase())) {
          suggestions.add(sign);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * Obtenir toutes les maladies avec filtres optionnels
   */
  getAllDiseases(
    filters?: SearchFilters,
    limit: number = 20
  ): SearchResult[] {
    let results: SearchResult[] = this.diseases.map((disease) => ({
      disease,
      score: 0.5,
      matchedTerms: [],
      relevance: 'medium' as const,
    }));

    if (filters) {
      results = this.applyFilters(results, filters);
    }

    // Trier par sévérité et nom
    results.sort((a, b) => {
      const severityOrder = {
        'life-threatening': 0,
        severe: 1,
        moderate: 2,
        mild: 3,
      };
      const severityDiff =
        severityOrder[a.disease.severity] - severityOrder[b.disease.severity];
      if (severityDiff !== 0) return severityDiff;
      return a.disease.name.localeCompare(b.disease.name);
    });

    return results.slice(0, limit);
  }

  /**
   * Appliquer les filtres
   */
  private applyFilters(
    results: SearchResult[],
    filters: SearchFilters
  ): SearchResult[] {
    return results.filter((result) => {
      const { disease } = result;

      if (filters.type && !filters.type.includes(disease.type)) {
        return false;
      }

      if (filters.severity && !filters.severity.includes(disease.severity)) {
        return false;
      }

      if (filters.territory && !filters.territory.includes(disease.territory)) {
        return false;
      }

      if (filters.organ && !filters.organ.includes(disease.organ)) {
        return false;
      }

      if (
        filters.specialty &&
        !disease.specialty.some((s) => filters.specialty!.includes(s))
      ) {
        return false;
      }

      return true;
    });
  }

  /**
   * Extraire les termes matchés
   */
  private extractMatchedTerms(matches: readonly Fuse.FuseResultMatch[]): string[] {
    const terms = new Set<string>();

    matches.forEach((match) => {
      if (match.value) {
        terms.add(match.value);
      }
    });

    return Array.from(terms);
  }

  /**
   * Calculer la pertinence
   */
  private calculateRelevance(score: number): 'high' | 'medium' | 'low' {
    if (score < 0.3) return 'high';
    if (score < 0.6) return 'medium';
    return 'low';
  }

  /**
   * Obtenir statistiques
   */
  getStats() {
    return {
      total: this.diseases.length,
      byType: this.groupBy('type'),
      bySeverity: this.groupBy('severity'),
      byTerritory: this.groupBy('territory'),
      byOrgan: this.groupBy('organ'),
    };
  }

  private groupBy(field: keyof InfectiousDisease): Record<string, number> {
    const grouped: Record<string, number> = {};
    this.diseases.forEach((disease) => {
      const value = String(disease[field]);
      grouped[value] = (grouped[value] || 0) + 1;
    });
    return grouped;
  }
}

// Export singleton instance (sera initialisé avec les données)
let searchEngineInstance: DiagnosticSearchEngine | null = null;

export function initializeSearchEngine(diseases: InfectiousDisease[]) {
  searchEngineInstance = new DiagnosticSearchEngine(diseases);
  return searchEngineInstance;
}

export function getSearchEngine(): DiagnosticSearchEngine {
  if (!searchEngineInstance) {
    throw new Error('Search engine not initialized. Call initializeSearchEngine first.');
  }
  return searchEngineInstance;
}
