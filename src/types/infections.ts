// Types for SPILF infection management application

export type InfectionType = 'bacterial' | 'viral' | 'parasitic';

export type CarePhase = 'symptoms' | 'screening' | 'microbiology' | 'diagnosis' | 'treatment' | 'prevention';

export interface Symptom {
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration?: string;
}

export interface ScreeningCriteria {
    clinicalSigns: string[];
    biologicalMarkers: string[];
    imagingRequired?: string[];
}

export interface MicrobiologyTest {
    testName: string;
    sampleType: string;
    expectedResults: string[];
    turnaroundTime: string;
}

export interface DiagnosticCriteria {
    majorCriteria: string[];
    minorCriteria?: string[];
    differentialDiagnosis: string[];
}

export interface AntibioticProtocol {
    firstLine: {
        molecule: string;
        dosage: string;
        duration: string;
        route: 'PO' | 'IV' | 'IM';
    }[];
    alternatives: {
        indication: string;
        molecule: string;
        dosage: string;
        duration: string;
        route: 'PO' | 'IV' | 'IM';
    }[];
    renalAdjustment?: {
        creatinineClearance: string;
        adjustment: string;
    }[];
    monitoring: string[];
    spilfRecommendation: string;
}

export interface PreventionMeasures {
    primary: string[];
    secondary: string[];
    vaccination?: {
        name: string;
        schedule: string;
    }[];
}

export interface CarePathway {
    phase: CarePhase;
    title: string;
    content: string;
    details: any; // Phase-specific details
    duration?: string;
}

export interface DecisionNode {
    id: string;
    type: 'question' | 'action' | 'outcome';
    label: string;
    description?: string;
    options?: {
        label: string;
        nextNodeId: string;
    }[];
}

export interface Infection {
    id: string;
    name: string;
    type: InfectionType;
    commonName: string;
    icdCode?: string;
    severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';

    // Care pathway
    carePathway: CarePathway[];

    // Decision tree
    decisionTree: DecisionNode[];

    // Additional resources
    illustrations?: string[];
    references: string[];
    lastUpdated: string;
    spilfGuidelines: string;
}
