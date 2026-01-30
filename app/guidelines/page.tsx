'use client';

import { useState } from 'react';
import { BookOpen, Search, Calendar, ExternalLink, Download, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Guideline {
  id: string;
  source: 'SPILF' | 'FRAR' | 'SRLF' | 'HAS' | 'ANSM';
  title: string;
  year: number;
  category: string;
  lastUpdated: string;
  version: string;
  summary: string;
  keyPoints: string[];
  url?: string;
  status: 'active' | 'updated' | 'deprecated';
}

const guidelines: Guideline[] = [
  {
    id: 'spilf-pneumonia-2024',
    source: 'SPILF',
    title: 'Prise en charge des infections respiratoires basses de l\'adulte',
    year: 2024,
    category: 'Infections respiratoires',
    lastUpdated: '2024-11',
    version: '2024.1',
    summary: 'Actualisation des recommandations sur le diagnostic et le traitement des pneumonies communautaires et nosocomiales',
    keyPoints: [
      'Score CRB-65 pour stratification du risque',
      'Amoxicilline en 1ère intention ambulatoire',
      'Durée minimale efficace: 7 jours',
      'Désescalade à 48-72h selon documentation',
    ],
    status: 'active',
  },
  {
    id: 'spilf-uti-2024',
    source: 'SPILF',
    title: 'Infections urinaires communautaires de l\'adulte',
    year: 2024,
    category: 'Infections urinaires',
    lastUpdated: '2024-10',
    version: '2024.1',
    summary: 'Recommandations actualisées sur le diagnostic et le traitement des infections urinaires',
    keyPoints: [
      'Fosfomycine-trométamol en 1ère intention',
      'Pas d\'ECBU systématique pour cystite simple',
      'Épargne des fluoroquinolones',
      'Durée courte de traitement',
    ],
    status: 'active',
  },
  {
    id: 'frar-2025',
    source: 'FRAR',
    title: 'Programme national de lutte contre l\'antibiorésistance',
    year: 2025,
    category: 'Antibiorésistance',
    lastUpdated: '2025-06',
    version: '2025',
    summary: 'Stratégies d\'épargne antibiotique et surveillance de la résistance en France',
    keyPoints: [
      'Réduction de 25% de la consommation d\'antibiotiques',
      'Préservation des antibiotiques critiques',
      'Surveillance épidémiologique renforcée',
      'Formation des prescripteurs',
    ],
    status: 'active',
  },
  {
    id: 'srlf-sepsis-2024',
    source: 'SRLF',
    title: 'Prise en charge du sepsis et du choc septique',
    year: 2024,
    category: 'Réanimation',
    lastUpdated: '2024-09',
    version: '2024',
    summary: 'Recommandations de la Société de Réanimation de Langue Française sur la prise en charge du sepsis',
    keyPoints: [
      'Antibiothérapie dans l\'heure suivant le diagnostic',
      'Large spectre initial puis désescalade',
      'Prélèvements microbiologiques avant ATB',
      'Durée minimale selon foyer: 7-14 jours',
    ],
    status: 'active',
  },
  {
    id: 'has-antibio-2023',
    source: 'HAS',
    title: 'Antibiothérapie par voie générale dans les infections courantes',
    year: 2023,
    category: 'Bon usage',
    lastUpdated: '2023-12',
    version: '2023',
    summary: 'Recommandations de bon usage des antibiotiques en soins primaires',
    keyPoints: [
      'Prescription raisonnée',
      'Éviter les associations inutiles',
      'Privilégier les antibiotiques à spectre étroit',
      'Réévaluation systématique à 48-72h',
    ],
    status: 'active',
  },
];

export default function GuidelinesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<'all' | 'SPILF' | 'FRAR' | 'SRLF' | 'HAS' | 'ANSM'>('all');

  const filteredGuidelines = guidelines.filter((guideline) => {
    const matchesSearch =
      guideline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guideline.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guideline.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = selectedSource === 'all' || guideline.source === selectedSource;

    return matchesSearch && matchesSource;
  });

  const sourceColors = {
    SPILF: 'bg-blue-100 text-blue-700 border-blue-200',
    FRAR: 'bg-orange-100 text-orange-700 border-orange-200',
    SRLF: 'bg-purple-100 text-purple-700 border-purple-200',
    HAS: 'bg-green-100 text-green-700 border-green-200',
    ANSM: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Recommandations</h1>
                <p className="text-xs text-muted-foreground">Guidelines et références</p>
              </div>
            </Link>
            
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
            >
              Retour
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              Base documentaire actualisée
            </div>
            
            <h1 className="text-4xl font-bold text-balance">
              Recommandations
              <span className="block text-primary mt-2">Sociétés Savantes 2024-2026</span>
            </h1>
            
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Accès aux dernières recommandations des sociétés savantes françaises en infectiologie et réanimation
            </p>
          </div>

          {/* Alert */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Mise à jour continue</p>
              <p className="text-blue-700">
                Les recommandations sont régulièrement mises à jour selon les publications des sociétés savantes. Dernière synchronisation: Janvier 2026
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par titre, catégorie, contenu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-border bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {/* Source Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSource('all')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedSource === 'all'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white border-border hover:bg-secondary'
                }`}
              >
                Toutes sources
              </button>
              {(['SPILF', 'FRAR', 'SRLF', 'HAS'] as const).map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedSource === source
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-white border-border hover:bg-secondary'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-muted-foreground">
              {filteredGuidelines.length} recommandation{filteredGuidelines.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Guidelines Grid */}
          <div className="grid gap-6">
            {filteredGuidelines.map((guideline, index) => (
              <div
                key={guideline.id}
                className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all p-6 space-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${sourceColors[guideline.source]}`}>
                        {guideline.source}
                      </span>
                      <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium">
                        {guideline.year}
                      </span>
                      {guideline.status === 'active' && (
                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">
                          Actif
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{guideline.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {guideline.category} • Version {guideline.version}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-base">{guideline.summary}</p>

                {/* Key Points */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Points clés</h4>
                  <ul className="space-y-2">
                    {guideline.keyPoints.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Mise à jour: {guideline.lastUpdated}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                    {guideline.url && (
                      <a
                        href={guideline.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Accéder
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredGuidelines.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun résultat</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}

          {/* Sources Info */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Sources officielles</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="font-semibold text-sm">SPILF</p>
                <p className="text-xs text-muted-foreground">
                  Société de Pathologie Infectieuse de Langue Française
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sm">FRAR</p>
                <p className="text-xs text-muted-foreground">
                  Programme national de lutte contre l&apos;Antibiorésistance
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sm">SRLF</p>
                <p className="text-xs text-muted-foreground">
                  Société de Réanimation de Langue Française
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sm">HAS</p>
                <p className="text-xs text-muted-foreground">
                  Haute Autorité de Santé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
