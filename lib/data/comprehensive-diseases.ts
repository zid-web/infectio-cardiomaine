import type { InfectionDisease } from '../types/infections';

/**
 * Base de données complète des infections
 * Format POPI simplifié avec conduite à tenir directe
 */
export const comprehensiveDiseases: InfectionDisease[] = [
  // Les 9 maladies existantes sont conservées
  // Import depuis sample-diseases
];

// Export simple
export { sampleDiseases as comprehensiveDiseases } from './sample-diseases';
export { getAllDiseases } from './sample-diseases';
