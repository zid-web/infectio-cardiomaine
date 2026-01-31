// Types enrichis pour moteur de recherche diagnostique infectieux
// Basés sur recommandations SPILF, FRAR, SRLF 2024-2026

export type InfectionType = 'bacterial' | 'viral' | 'fungal' | 'parasitic';
export type InfectionSeverity = 'mild' | 'moderate' | 'severe' | 'life-threatening';
export type AntibioticRoute = 'PO' | 'IV' | 'IM' | 'SC';
export type TerritoryType = 'community' | 'nosocomial' | 'both';

// Organismes de recommandations
export type GuidelineSource = 'SPILF' | 'FRAR' | 'SRLF' | 'HAS' | 'ANSM' | 'ESCMID' | 'IDSA';

export interface GuidelineReference {
  source: GuidelineSource;
  year: number;
  title: string;
  url?: string;
  version?: string;
  lastUpdated: string;
}

// Critères diagnostiques structurés
export interface DiagnosticCriteria {
  clinical: {
    major: string[];
    minor: string[];
    exclusion?: string[];
  };
  biological: {
    mandatory?: string[];
    supportive: string[];
    threshold?: Record<string, string>;
  };
  imaging?: {
    firstLine: string[];
    secondLine?: string[];
    findings: string[];
  };
  microbiological: {
    samples: string[];
    tests: string[];
    expectedPathogens: string[];
  };
}

// Score de sévérité
export interface SeverityScore {
  name: string;
  acronym: string;
  criteria: Array<{
    item: string;
    points: number;
    description?: string;
  }>;
  interpretation: Array<{
    score: string;
    risk: 'low' | 'moderate' | 'high' | 'very-high';
    recommendation: string;
  }>;
  reference?: string;
}

// Antibiothérapie détaillée
export interface AntibioticRegimen {
  name: string;
  indication: string;
  context: TerritoryType;
  line: 'first' | 'second' | 'third' | 'alternative';
  molecules: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    route: AntibioticRoute;
    notes?: string;
  }>;
  contraindications?: string[];
  precautions?: string[];
  monitoring: string[];
  adjustment: {
    renal?: Array<{
      creatinineClearance: string;
      adjustment: string;
    }>;
    hepatic?: Array<{
      severity: string;
      adjustment: string;
    }>;
    weight?: string;
    age?: string;
  };
  deescalation?: {
    criteria: string[];
    to: string;
    timing: string;
  };
  costCategory?: 'low' | 'moderate' | 'high' | 'very-high';
  availability?: 'widely-available' | 'limited' | 'restricted';
}

// Résistance antibiotique (FRAR)
export interface ResistanceData {
  pathogen: string;
  mechanism: string[];
  prevalence: {
    france: number; // Pourcentage
    region?: Record<string, number>;
    trend: 'increasing' | 'stable' | 'decreasing';
  };
  affectedAntibiotics: string[];
  alternativeOptions: string[];
  frarRecommendation: string;
  lastUpdate: string;
}

// Recherche diagnostique
export interface DiagnosticSearchTerms {
  primary: string[]; // Noms principaux
  synonyms: string[]; // Synonymes
  icd10: string[];
  clinicalSigns: string[];
  keywords: string[];
}

// Pathologie infectieuse complète
export interface InfectiousDisease {
  // Identification
  id: string;
  name: string;
  commonNames: string[];
  searchTerms: DiagnosticSearchTerms;
  
  // Classification
  type: InfectionType;
  severity: InfectionSeverity;
  territory: TerritoryType;
  organ: string;
  specialty: string[];
  
  // Épidémiologie
  epidemiology: {
    incidence?: string;
    prevalence?: string;
    seasonality?: string;
    riskFactors: string[];
    ageGroups?: string[];
  };
  
  // Diagnostic
  diagnostic: DiagnosticCriteria;
  severityScores?: SeverityScore[];
  differentialDiagnosis: string[];
  
  // Microbiologie
  pathogens: Array<{
    name: string;
    frequency: string; // Pourcentage ou descriptif
    notes?: string;
  }>;
  resistanceData?: ResistanceData[];
  
  // Traitement
  antibiotherapy: {
    probabilistic: AntibioticRegimen[];
    documented: AntibioticRegimen[];
    duration: {
      standard: string;
      severe: string;
      notes?: string;
    };
  };
  
  supportiveCare?: string[];
  complications?: string[];
  
  // Prévention
  prevention?: {
    primary: string[];
    secondary: string[];
    vaccination?: Array<{
      name: string;
      schedule: string;
      indication: string;
    }>;
    isolation?: {
      type: string;
      duration: string;
      measures: string[];
    };
  };
  
  // Références et mises à jour
  guidelines: GuidelineReference[];
  lastUpdated: string;
  updatedBy?: string;
  version: string;
  
  // Algorithme décisionnel
  decisionTree?: {
    nodes: DecisionNode[];
    startNodeId: string;
  };
}

// Noeud d'arbre décisionnel
export interface DecisionNode {
  id: string;
  type: 'question' | 'action' | 'outcome' | 'warning';
  label: string;
  description?: string;
  criteria?: string[];
  options?: Array<{
    label: string;
    nextNodeId: string;
    condition?: string;
  }>;
  recommendation?: string;
  urgency?: 'routine' | 'urgent' | 'emergency';
}

// Résultat de recherche
export interface SearchResult {
  disease: InfectiousDisease;
  score: number;
  matchedTerms: string[];
  relevance: 'high' | 'medium' | 'low';
}

// Filtre de recherche
export interface SearchFilters {
  type?: InfectionType[];
  severity?: InfectionSeverity[];
  territory?: TerritoryType[];
  organ?: string[];
  specialty?: string[];
}

// Mise à jour continue
export interface UpdateRecord {
  id: string;
  diseaseId: string;
  type: 'new' | 'modification' | 'deletion';
  field: string;
  oldValue?: string;
  newValue: string;
  reason: string;
  guidelineSource: GuidelineSource;
  updatedBy: string;
  updatedAt: string;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}
