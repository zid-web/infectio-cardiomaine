import type { InfectiousDisease } from '../types/infections';

export const sampleDiseases: InfectiousDisease[] = [
  {
    id: 'pneumonia-community-acquired',
    name: 'Pneumonie Communautaire',
    commonNames: ['Pneumonie acquise en ville', 'PAC', 'CAP'],
    searchTerms: {
      primary: ['pneumonie', 'pneumopathie', 'infection pulmonaire'],
      synonyms: ['PAC', 'CAP', 'pneumonie communautaire'],
      icd10: ['J18.9', 'J18.1', 'J18.0'],
      clinicalSigns: [
        'toux productive',
        'fièvre',
        'dyspnée',
        'douleur thoracique',
        'expectorations purulentes',
        'crépitants',
      ],
      keywords: ['poumon', 'pneumocoque', 'streptococcus pneumoniae', 'respiratoire'],
    },
    type: 'bacterial',
    severity: 'moderate',
    territory: 'community',
    organ: 'Poumon',
    specialty: ['Pneumologie', 'Médecine interne', 'Réanimation'],
    epidemiology: {
      incidence: '400-600/100 000 habitants/an',
      prevalence: 'Variable selon l\'âge',
      seasonality: 'Pic hivernal (novembre à mars)',
      riskFactors: [
        'Âge > 65 ans',
        'Tabagisme',
        'BPCO',
        'Diabète',
        'Insuffisance cardiaque',
        'Immunodépression',
        'Alcoolisme chronique',
      ],
      ageGroups: ['Adultes > 18 ans', 'Personnes âgées > 65 ans'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Fièvre > 38°C',
          'Toux productive ou sèche',
          'Foyer de crépitants à l\'auscultation',
          'Infiltrat pulmonaire récent à la radiographie',
        ],
        minor: [
          'Douleur thoracique pleurétique',
          'Dyspnée',
          'Expectorations purulentes',
          'Confusion (personne âgée)',
        ],
        exclusion: [
          'Hospitalisation < 14 jours',
          'Vie en institution avec soins prolongés',
          'Dialyse chronique',
          'Chimiothérapie récente',
        ],
      },
      biological: {
        supportive: [
          'Hyperleucocytose > 10 000/mm³ ou leucopénie < 4 000/mm³',
          'CRP > 50 mg/L',
          'Procalcitonine > 0.5 ng/mL',
        ],
        threshold: {
          leucocytes: '> 10 000 ou < 4 000/mm³',
          CRP: '> 50 mg/L',
          PCT: '> 0.5 ng/mL',
        },
      },
      imaging: {
        firstLine: ['Radiographie thoracique (face + profil)'],
        secondLine: ['Scanner thoracique si doute diagnostique'],
        findings: [
          'Infiltrat alvéolaire',
          'Condensation parenchymateuse',
          'Bronchogramme aérien',
          'Épanchement pleural associé possible',
        ],
      },
      microbiological: {
        samples: [
          'Hémocultures x2 (si hospitalisation)',
          'ECBC (si expectoration possible)',
          'Antigénurie pneumocoque',
          'Antigénurie Legionella',
        ],
        tests: [
          'Culture bactérienne',
          'Antibiogramme',
          'PCR multiplex respiratoire',
        ],
        expectedPathogens: [
          'Streptococcus pneumoniae',
          'Haemophilus influenzae',
          'Legionella pneumophila',
          'Mycoplasma pneumoniae',
        ],
      },
    },
    severityScores: [
      {
        name: 'Score CRB-65',
        acronym: 'CRB-65',
        criteria: [
          {
            item: 'Confusion',
            points: 1,
            description: 'Désorientation temporo-spatiale',
          },
          {
            item: 'Respiratory rate ≥ 30/min',
            points: 1,
            description: 'Fréquence respiratoire ≥ 30/min',
          },
          {
            item: 'Blood pressure',
            points: 1,
            description: 'PAS < 90 ou PAD ≤ 60 mmHg',
          },
          {
            item: 'Age ≥ 65 ans',
            points: 1,
            description: 'Âge supérieur ou égal à 65 ans',
          },
        ],
        interpretation: [
          {
            score: '0',
            risk: 'low',
            recommendation: 'Traitement ambulatoire possible',
          },
          {
            score: '1-2',
            risk: 'moderate',
            recommendation: 'Hospitalisation recommandée',
          },
          {
            score: '3-4',
            risk: 'high',
            recommendation: 'Hospitalisation en réanimation à discuter',
          },
        ],
        reference: 'SPILF 2024',
      },
    ],
    differentialDiagnosis: [
      'Décompensation cardiaque (OAP)',
      'Embolie pulmonaire',
      'Tuberculose pulmonaire',
      'Cancer bronchopulmonaire',
      'Pneumopathie d\'inhalation',
      'COVID-19',
      'Pneumopathie interstitielle',
    ],
    pathogens: [
      {
        name: 'Streptococcus pneumoniae',
        frequency: '30-50%',
        notes: 'Pathogène le plus fréquent',
      },
      {
        name: 'Haemophilus influenzae',
        frequency: '10-20%',
        notes: 'Surtout chez BPCO',
      },
      {
        name: 'Legionella pneumophila',
        frequency: '2-8%',
        notes: 'Formes graves',
      },
      {
        name: 'Mycoplasma pneumoniae',
        frequency: '5-15%',
        notes: 'Sujet jeune',
      },
      {
        name: 'Staphylococcus aureus',
        frequency: '3-5%',
        notes: 'Post-grippale',
      },
    ],
    resistanceData: [
      {
        pathogen: 'Streptococcus pneumoniae',
        mechanism: ['PSDP (Pneumocoque de Sensibilité Diminuée aux Pénicillines)'],
        prevalence: {
          france: 25,
          trend: 'stable',
        },
        affectedAntibiotics: ['Pénicilline G', 'Amoxicilline (forte dose nécessaire)'],
        alternativeOptions: [
          'Amoxicilline haute dose (3g/jour)',
          'Ceftriaxone',
          'Lévofloxacine',
        ],
        frarRecommendation:
          'Amoxicilline 1g x3/j reste efficace. Éviter les fluoroquinolones en 1ère intention (écologie).',
        lastUpdate: '2025-12',
      },
    ],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Ambulatoire - Pneumonie non sévère',
          indication: 'CRB-65 = 0, pas de comorbidités',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline',
              dosage: '1g',
              frequency: '3x/jour',
              duration: '7 jours',
              route: 'PO',
              notes: 'Traitement de référence SPILF 2024',
            },
          ],
          contraindications: ['Allergie aux bêta-lactamines'],
          monitoring: ['Température', 'Signes cliniques', 'Réévaluation à 48-72h'],
          adjustment: {
            renal: [
              {
                creatinineClearance: '< 30 mL/min',
                adjustment: 'Amoxicilline 1g x2/jour',
              },
              {
                creatinineClearance: '< 10 mL/min',
                adjustment: 'Amoxicilline 1g x1/jour',
              },
            ],
          },
          costCategory: 'low',
          availability: 'widely-available',
        },
        {
          name: 'Ambulatoire - Alternative',
          indication: 'Allergie pénicilline non grave',
          context: 'community',
          line: 'alternative',
          molecules: [
            {
              name: 'Pristinamycine',
              dosage: '1g',
              frequency: '3x/jour',
              duration: '7 jours',
              route: 'PO',
            },
          ],
          monitoring: ['Tolérance digestive', 'Évolution clinique'],
          adjustment: {
            renal: [
              {
                creatinineClearance: '< 15 mL/min',
                adjustment: 'Prudence, adapter selon fonction rénale',
              },
            ],
          },
          costCategory: 'moderate',
          availability: 'widely-available',
        },
        {
          name: 'Hospitalisation - Service conventionnel',
          indication: 'CRB-65 = 1-2, pneumonie modérée',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline + Acide clavulanique',
              dosage: '1g',
              frequency: '3x/jour',
              duration: '7-10 jours',
              route: 'IV',
              notes: 'Relais PO dès amélioration clinique (48-72h)',
            },
          ],
          monitoring: [
            'Température',
            'SpO2',
            'Fréquence respiratoire',
            'Radiographie si aggravation',
            'Fonction hépatique (amoxicilline-clavulanate)',
          ],
          adjustment: {
            renal: [
              {
                creatinineClearance: '10-30 mL/min',
                adjustment: 'Amox-clav 1g x2/jour',
              },
              {
                creatinineClearance: '< 10 mL/min',
                adjustment: 'Amox-clav 1g x1/jour + hémodialyse',
              },
            ],
          },
          deescalation: {
            criteria: [
              'Apyrexie > 48h',
              'Amélioration clinique',
              'Tolérance orale',
            ],
            to: 'Amoxicilline PO 1g x3/jour',
            timing: '48-72h',
          },
          costCategory: 'low',
          availability: 'widely-available',
        },
        {
          name: 'Réanimation - Pneumonie sévère',
          indication: 'CRB-65 ≥ 3, signes de gravité',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Ceftriaxone',
              dosage: '1-2g',
              frequency: '1x/jour',
              duration: '10-14 jours',
              route: 'IV',
              notes: 'Large spectre incluant pneumocoque',
            },
            {
              name: 'Spiramycine',
              dosage: '3 MUI',
              frequency: '3x/jour',
              duration: '10-14 jours',
              route: 'IV',
              notes: 'Couverture atypiques (Legionella, Mycoplasma)',
            },
          ],
          monitoring: [
            'Paramètres hémodynamiques',
            'Gaz du sang',
            'Fonction rénale',
            'Bilan hépatique',
            'Adaptation selon antibiogramme',
          ],
          adjustment: {
            renal: [
              {
                creatinineClearance: '< 10 mL/min',
                adjustment: 'Ceftriaxone: max 2g/jour',
              },
            ],
          },
          deescalation: {
            criteria: [
              'Stabilité hémodynamique',
              'Amélioration respiratoire',
              'Documentation microbiologique',
            ],
            to: 'Selon antibiogramme',
            timing: '48-72h après documentation',
          },
          costCategory: 'moderate',
          availability: 'widely-available',
        },
        {
          name: 'Suspicion Legionella',
          indication: 'Facteurs de risque Legionella (eau, voyage)',
          context: 'community',
          line: 'alternative',
          molecules: [
            {
              name: 'Lévofloxacine',
              dosage: '500mg',
              frequency: '2x/jour (J1) puis 1x/jour',
              duration: '10-14 jours',
              route: 'IV',
              notes: 'Traitement de référence Legionella',
            },
          ],
          contraindications: [
            'Allergie quinolones',
            'Tendinopathie quinolones',
            'Épilepsie non contrôlée',
          ],
          precautions: [
            'Risque de tendinopathie',
            'Allongement QT',
            'Photosensibilisation',
          ],
          monitoring: [
            'ECG (QT)',
            'Fonction rénale',
            'Glycémie (diabétiques)',
            'Signes tendineux',
          ],
          adjustment: {
            renal: [
              {
                creatinineClearance: '20-50 mL/min',
                adjustment: '500mg J1, puis 250mg/jour',
              },
              {
                creatinineClearance: '< 20 mL/min',
                adjustment: '500mg J1, puis 250mg/48h',
              },
            ],
          },
          costCategory: 'moderate',
          availability: 'widely-available',
        },
      ],
      documented: [
        {
          name: 'Pneumocoque sensible',
          indication: 'S. pneumoniae sensible à pénicilline G',
          context: 'both',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline',
              dosage: '1g',
              frequency: '3x/jour',
              duration: '7-10 jours',
              route: 'PO',
            },
          ],
          monitoring: ['Évolution clinique'],
          adjustment: {
            renal: [
              {
                creatinineClearance: '< 30 mL/min',
                adjustment: 'Réduire à 1g x2/jour',
              },
            ],
          },
          costCategory: 'low',
          availability: 'widely-available',
        },
      ],
      duration: {
        standard: '7 jours (ambulatoire)',
        severe: '10-14 jours (hospitalisation, réanimation)',
        notes:
          'Durée minimale efficace selon SPILF 2024. Peut être prolongée selon évolution clinique et documentation microbiologique.',
      },
    },
    supportiveCare: [
      'Oxygénothérapie si SpO2 < 90%',
      'Hydratation',
      'Antalgiques/antipyrétiques',
      'Kinésithérapie respiratoire',
      'Prévention thromboembolique si hospitalisation',
    ],
    complications: [
      'Épanchement pleural parapneumonique',
      'Empyème pleural',
      'Abcès pulmonaire',
      'Bactériémie',
      'Choc septique',
      'SDRA',
      'Insuffisance respiratoire aiguë',
    ],
    prevention: {
      primary: [
        'Vaccination antipneumococcique (Prevenar 20® ou schéma séquentiel)',
        'Vaccination antigrippale annuelle',
        'Sevrage tabagique',
        'Hygiène bucco-dentaire',
      ],
      secondary: [
        'Suivi radiologique à 6 semaines (si > 50 ans ou facteurs de risque)',
        'Prise en charge des comorbidités',
        'Prévention des récidives',
      ],
      vaccination: [
        {
          name: 'Prevenar 20®',
          schedule: '1 dose unique',
          indication: '> 65 ans, comorbidités, immunodépression',
        },
        {
          name: 'Schéma séquentiel',
          schedule: 'Prevenar 13® puis Pneumovax 23® à 8 semaines',
          indication: 'Alternative au Prevenar 20®',
        },
      ],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2024,
        title:
          'Prise en charge des infections respiratoires basses de l\'adulte - Actualisation 2024',
        version: '2024.1',
        lastUpdated: '2024-11',
        url: 'https://www.infectiologie.com',
      },
      {
        source: 'SRLF',
        year: 2024,
        title: 'Pneumonies aiguës communautaires graves nécessitant une admission en réanimation',
        version: '2024',
        lastUpdated: '2024-09',
      },
      {
        source: 'HAS',
        year: 2023,
        title: 'Antibiothérapie par voie générale dans les infections respiratoires',
        lastUpdated: '2023-12',
      },
    ],
    lastUpdated: '2026-01-15',
    updatedBy: 'Dr. Infectio Team',
    version: '2.1.0',
    decisionTree: {
      startNodeId: 'initial-presentation',
      nodes: [
        {
          id: 'initial-presentation',
          type: 'question',
          label: 'Patient avec fièvre + toux + dyspnée',
          description: 'Suspicion de pneumonie communautaire',
          urgency: 'urgent',
          options: [
            {
              label: 'Examen clinique complet',
              nextNodeId: 'clinical-exam',
            },
          ],
        },
        {
          id: 'clinical-exam',
          type: 'question',
          label: 'Crépitants ou souffle tubaire à l\'auscultation?',
          options: [
            {
              label: 'Oui',
              nextNodeId: 'imaging',
            },
            {
              label: 'Non',
              nextNodeId: 'differential',
            },
          ],
        },
        {
          id: 'imaging',
          type: 'action',
          label: 'Radiographie thoracique',
          description: 'Recherche d\'infiltrat parenchymateux',
          options: [
            {
              label: 'Infiltrat confirmé',
              nextNodeId: 'severity-assessment',
            },
            {
              label: 'Pas d\'infiltrat',
              nextNodeId: 'differential',
            },
          ],
        },
        {
          id: 'severity-assessment',
          type: 'question',
          label: 'Calcul du score CRB-65',
          description: 'Évaluation de la sévérité',
          criteria: ['Confusion', 'FR ≥ 30/min', 'PA < 90/60', 'Âge ≥ 65 ans'],
          options: [
            {
              label: '0 point',
              nextNodeId: 'outpatient-treatment',
              condition: 'CRB-65 = 0',
            },
            {
              label: '1-2 points',
              nextNodeId: 'hospital-admission',
              condition: 'CRB-65 = 1-2',
            },
            {
              label: '≥ 3 points',
              nextNodeId: 'icu-admission',
              condition: 'CRB-65 ≥ 3',
            },
          ],
        },
        {
          id: 'outpatient-treatment',
          type: 'outcome',
          label: 'Traitement ambulatoire',
          description: 'Amoxicilline 1g x3/jour PO pendant 7 jours',
          recommendation:
            'Réévaluation clinique à 48-72h. Consultation si aggravation.',
          urgency: 'routine',
        },
        {
          id: 'hospital-admission',
          type: 'outcome',
          label: 'Hospitalisation en service conventionnel',
          description:
            'Amoxicilline-Ac. clavulanique 1g x3/jour IV + bilan microbiologique (hémocultures, antigénuries)',
          recommendation:
            'Surveillance clinique, relais PO dès amélioration (48-72h)',
          urgency: 'urgent',
        },
        {
          id: 'icu-admission',
          type: 'outcome',
          label: 'Admission en réanimation',
          description:
            'Ceftriaxone 2g/jour + Spiramycine 3MUI x3/jour IV + bilan complet (hémocultures, ECBC, antigénuries, PCR)',
          recommendation:
            'Prise en charge des défaillances d\'organes, désescalade à 48-72h selon documentation',
          urgency: 'emergency',
        },
        {
          id: 'differential',
          type: 'outcome',
          label: 'Envisager un diagnostic différentiel',
          description:
            'Explorer: OAP, EP, tuberculose, cancer, COVID-19, pneumopathie interstitielle',
          recommendation: 'Bilan complémentaire selon orientation clinique',
          urgency: 'urgent',
        },
      ],
    },
  },

  // Ajout d'autres pathologies...
  {
    id: 'uti-cystitis',
    name: 'Cystite Aiguë Simple',
    commonNames: ['Infection urinaire basse', 'Cystite non compliquée'],
    searchTerms: {
      primary: ['cystite', 'infection urinaire', 'IU'],
      synonyms: ['cystite aiguë', 'infection urinaire basse'],
      icd10: ['N30.0', 'N30.9'],
      clinicalSigns: [
        'brûlures mictionnelles',
        'pollakiurie',
        'urgences mictionnelles',
        'dysurie',
        'hématurie',
      ],
      keywords: ['vessie', 'urinaire', 'E. coli', 'miction'],
    },
    type: 'bacterial',
    severity: 'mild',
    territory: 'community',
    organ: 'Vessie',
    specialty: ['Médecine générale', 'Urologie', 'Gynécologie'],
    epidemiology: {
      incidence: '0.5-0.7 épisode/femme/an',
      prevalence: '50-60% des femmes dans leur vie',
      riskFactors: [
        'Sexe féminin',
        'Rapports sexuels',
        'Utilisation de spermicides',
        'Antécédent de cystite',
        'Ménopause',
      ],
      ageGroups: ['Femmes jeunes (18-40 ans)', 'Femmes ménopausées'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Brûlures mictionnelles',
          'Pollakiurie',
          'Urgences mictionnelles',
        ],
        minor: ['Pesanteur pelvienne', 'Hématurie macroscopique'],
        exclusion: [
          'Fièvre > 38°C',
          'Douleur lombaire',
          'Homme',
          'Grossesse',
          'Immunodépression',
        ],
      },
      biological: {
        supportive: [
          'Bandelette urinaire: leucocytes positifs',
          'Bandelette urinaire: nitrites positifs',
        ],
        threshold: {
          leucocytes: '≥ 10^4/mL',
          nitrites: 'Positif',
        },
      },
      microbiological: {
        samples: ['ECBU si échec ou récidive'],
        tests: ['Culture urinaire', 'Antibiogramme'],
        expectedPathogens: [
          'Escherichia coli',
          'Staphylococcus saprophyticus',
          'Proteus mirabilis',
        ],
      },
    },
    differentialDiagnosis: [
      'Vaginite',
      'Urétrite',
      'Pyélonéphrite débutante',
      'IST (chlamydia, gonorrhée)',
    ],
    pathogens: [
      {
        name: 'Escherichia coli',
        frequency: '70-90%',
        notes: 'Pathogène principal',
      },
      {
        name: 'Staphylococcus saprophyticus',
        frequency: '5-10%',
        notes: 'Surtout femmes jeunes',
      },
      {
        name: 'Proteus mirabilis',
        frequency: '2-5%',
      },
    ],
    resistanceData: [
      {
        pathogen: 'Escherichia coli',
        mechanism: ['BLSE (Bêta-lactamases à Spectre Étendu)', 'Résistance aux fluoroquinolones'],
        prevalence: {
          france: 10,
          trend: 'increasing',
        },
        affectedAntibiotics: [
          'Amoxicilline',
          'Amoxicilline-clavulanate',
          'Céphalosporines 1G et 2G',
          'Fluoroquinolones',
        ],
        alternativeOptions: [
          'Fosfomycine-trométamol',
          'Pivmecillinam',
          'Nitrofurantoïne',
        ],
        frarRecommendation:
          'Privilégier fosfomycine et pivmecillinam en 1ère intention. Épargner les fluoroquinolones.',
        lastUpdate: '2025-10',
      },
    ],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Cystite simple - 1ère intention',
          indication: 'Femme sans comorbidité',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Fosfomycine-trométamol',
              dosage: '3g',
              frequency: 'Dose unique',
              duration: '1 jour',
              route: 'PO',
              notes: 'À prendre le soir au coucher, vessie vide',
            },
          ],
          monitoring: [
            'Réévaluation si persistance symptômes > 72h',
            'Pas de contrôle systématique si guérison',
          ],
          adjustment: {
            renal: [
              {
                creatinineClearance: '< 10 mL/min',
                adjustment: 'Contre-indiqué',
              },
            ],
          },
          costCategory: 'low',
          availability: 'widely-available',
        },
        {
          name: 'Cystite simple - Alternative',
          indication: 'Si fosfomycine indisponible ou CI',
          context: 'community',
          line: 'alternative',
          molecules: [
            {
              name: 'Pivmecillinam',
              dosage: '400mg',
              frequency: '2x/jour',
              duration: '5 jours',
              route: 'PO',
            },
          ],
          monitoring: ['Tolérance digestive', 'Évolution symptômes'],
          adjustment: {
            renal: [
              {
                creatinineClearance: '< 30 mL/min',
                adjustment: 'Adaptation de dose nécessaire',
              },
            ],
          },
          costCategory: 'low',
          availability: 'widely-available',
        },
      ],
      documented: [],
      duration: {
        standard: '1 jour (fosfomycine) ou 5 jours (autres)',
        severe: 'N/A',
        notes: 'Traitement court efficace selon SPILF 2024',
      },
    },
    prevention: {
      primary: [
        'Hydratation abondante (1.5-2L/jour)',
        'Miction post-coïtale',
        'Éviter les spermicides',
        'Hygiène périnéale adaptée',
      ],
      secondary: [
        'Antibioprophylaxie si récidives fréquentes (≥ 4/an)',
        'Canneberge (cranberry) en prévention',
      ],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2024,
        title: 'Infections urinaires communautaires de l\'adulte - Actualisation 2024',
        version: '2024.1',
        lastUpdated: '2024-10',
      },
      {
        source: 'FRAR',
        year: 2025,
        title: 'Bon usage des antibiotiques dans les infections urinaires',
        lastUpdated: '2025-06',
      },
    ],
    lastUpdated: '2026-01-10',
    version: '2.0.5',
  },

  // ================ INFECTIONS VIRALES ================
  {
    id: 'influenza',
    name: 'Grippe Saisonnière',
    commonNames: ['Influenza', 'Syndrome grippal'],
    searchTerms: {
      primary: ['grippe', 'influenza', 'syndrome grippal'],
      synonyms: ['flu', 'état grippal'],
      icd10: ['J10.1', 'J11.1'],
      clinicalSigns: [
        'fièvre brutale',
        'myalgies',
        'arthralgies',
        'céphalées',
        'asthénie intense',
        'toux sèche',
      ],
      keywords: ['virus', 'influenza A', 'influenza B', 'respiratoire', 'épidémie hivernale'],
    },
    type: 'viral',
    severity: 'moderate',
    territory: 'community',
    organ: 'Poumon',
    specialty: ['Médecine générale', 'Infectiologie', 'Pneumologie'],
    epidemiology: {
      incidence: '2-8 millions de cas/an en France',
      prevalence: 'Épidémie annuelle',
      seasonality: 'Novembre à mars (pic décembre-janvier)',
      riskFactors: [
        'Âge > 65 ans',
        'Grossesse',
        'Obésité (IMC > 30)',
        'Cardiopathie chronique',
        'BPCO',
        'Diabète',
        'Immunodépression',
      ],
      ageGroups: ['Tous âges', 'Sujets âgés > 65 ans à risque'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Fièvre ≥ 39°C d\'apparition brutale',
          'Myalgies diffuses',
          'Signes respiratoires (toux, rhinorrhée)',
          'Asthénie majeure',
        ],
        minor: [
          'Céphalées frontales',
          'Arthralgies',
          'Odynophagie',
          'Signes digestifs (enfant)',
        ],
        exclusion: [],
      },
      biological: {
        supportive: [
          'Lymphopénie',
          'Thrombopénie modérée',
          'CPK élevées (si myalgies)',
        ],
        threshold: {
          leucocytes: 'Normal ou diminué',
          CRP: '< 50 mg/L (virémie)',
        },
      },
      imaging: {
        firstLine: ['Radiographie thoracique si signes de gravité'],
        secondLine: [],
        findings: [
          'Généralement normale',
          'Pneumopathie virale si complication',
        ],
      },
      microbiological: {
        samples: ['Test rapide antigénique (TROD)', 'PCR nasopharyngée (référence)'],
        tests: ['PCR multiplex respiratoire', 'Culture virale (recherche)'],
        expectedPathogens: ['Influenza A', 'Influenza B'],
      },
    },
    severityScores: [],
    differentialDiagnosis: [
      'COVID-19',
      'Pneumonie bactérienne',
      'VRS (nourrisson)',
      'Mononucléose infectieuse',
      'Dengue (contexte tropical)',
    ],
    pathogens: [
      {
        name: 'Influenza A',
        frequency: '70-80%',
        notes: 'Sous-types H1N1, H3N2',
      },
      {
        name: 'Influenza B',
        frequency: '20-30%',
        notes: 'Lignées Victoria et Yamagata',
      },
    ],
    resistanceData: [],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Traitement antiviral si formes sévères ou à risque',
          indication: 'Grippe confirmée, sujet à risque ou forme grave',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Oseltamivir (Tamiflu®)',
              dosage: '75mg',
              frequency: '2x/jour',
              duration: '5 jours',
              route: 'PO',
              notes: 'Débuter dans les 48h suivant le début des symptômes',
            },
          ],
          contraindications: ['Allergie oseltamivir'],
          monitoring: ['Évolution clinique', 'Signes de complication'],
          adjustment: {
            renal: [
              {
                creatinineClearance: '30-60 mL/min',
                adjustment: 'Oseltamivir 30mg x2/jour',
              },
              {
                creatinineClearance: '10-30 mL/min',
                adjustment: 'Oseltamivir 30mg x1/jour',
              },
            ],
          },
          costCategory: 'moderate',
          availability: 'widely-available',
        },
      ],
      documented: [],
      duration: {
        standard: '5 jours',
        severe: '5-10 jours selon évolution',
        notes: 'Antiviraux efficaces uniquement si début précoce (< 48h)',
      },
    },
    supportiveCare: [
      'Repos au lit',
      'Hydratation abondante',
      'Paracétamol pour fièvre et douleurs',
      'Éviter aspirine (enfant)',
      'Isolement respiratoire',
    ],
    complications: [
      'Pneumonie grippale primaire',
      'Surinfection bactérienne (S. aureus, pneumocoque)',
      'Myocardite',
      'Encéphalite',
      'Syndrome de Reye (enfant + aspirine)',
      'Décompensation de comorbidités',
    ],
    prevention: {
      primary: [
        'Vaccination antigrippale annuelle',
        'Mesures barrières (masque, lavage des mains)',
        'Aération des locaux',
        'Éviction collective si épidémie',
      ],
      secondary: [
        'Prophylaxie post-exposition par oseltamivir (sujets à risque)',
      ],
      vaccination: [
        {
          name: 'Vaccin grippal quadrivalent',
          schedule: 'Annuel (octobre-novembre)',
          indication: '> 65 ans, femmes enceintes, comorbidités, professionnels de santé',
        },
      ],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2024,
        title: 'Prise en charge de la grippe saisonnière',
        version: '2024.2',
        lastUpdated: '2024-10',
      },
      {
        source: 'HAS',
        year: 2024,
        title: 'Stratégie de vaccination contre la grippe',
        lastUpdated: '2024-08',
      },
    ],
    lastUpdated: '2026-01-20',
    version: '2.1.0',
  },

  {
    id: 'covid-19',
    name: 'COVID-19',
    commonNames: ['Coronavirus 2019', 'SARS-CoV-2', 'Infection à coronavirus'],
    searchTerms: {
      primary: ['covid', 'coronavirus', 'sars-cov-2'],
      synonyms: ['covid-19', 'infection covid', 'pneumonie covid'],
      icd10: ['U07.1', 'U07.2'],
      clinicalSigns: [
        'fièvre',
        'toux sèche',
        'dyspnée',
        'asthénie',
        'anosmie',
        'agueusie',
        'céphalées',
        'myalgies',
      ],
      keywords: ['virus', 'SARS-CoV-2', 'respiratoire', 'pandémie', 'variants'],
    },
    type: 'viral',
    severity: 'severe',
    territory: 'community',
    organ: 'Poumon',
    specialty: ['Infectiologie', 'Pneumologie', 'Réanimation'],
    epidemiology: {
      incidence: 'Variable selon vagues épidémiques',
      prevalence: 'Endémique depuis 2020',
      seasonality: 'Toute l\'année avec recrudescence automnale-hivernale',
      riskFactors: [
        'Âge > 65 ans',
        'Obésité',
        'Diabète',
        'HTA',
        'Cardiopathie',
        'Insuffisance respiratoire chronique',
        'Immunodépression',
        'Cancer actif',
      ],
      ageGroups: ['Tous âges'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Symptômes respiratoires (toux, dyspnée)',
          'Fièvre ou fébricule',
          'Anosmie/agueusie récente (très évocateur)',
        ],
        minor: [
          'Asthénie',
          'Myalgies',
          'Céphalées',
          'Troubles digestifs',
          'Éruption cutanée',
        ],
        exclusion: [],
      },
      biological: {
        supportive: [
          'Lymphopénie',
          'CRP élevée (forme modérée à sévère)',
          'D-dimères élevés',
          'LDH augmentées',
        ],
        threshold: {
          lymphocytes: '< 1000/mm³',
          CRP: 'Variable (10-200 mg/L)',
          'D-dimères': '> 500 ng/mL',
        },
      },
      imaging: {
        firstLine: ['Scanner thoracique sans injection'],
        secondLine: ['Radiographie thoracique'],
        findings: [
          'Opacités en verre dépoli périphériques',
          'Condensations parenchymateuses',
          'Distribution bilatérale',
          'Crazy paving (stade avancé)',
        ],
      },
      microbiological: {
        samples: ['RT-PCR nasopharyngée (gold standard)', 'Test antigénique rapide'],
        tests: ['RT-PCR SARS-CoV-2', 'Sérologie (diagnostic rétrospectif)'],
        expectedPathogens: ['SARS-CoV-2'],
      },
    },
    severityScores: [],
    differentialDiagnosis: [
      'Grippe',
      'Pneumonie bactérienne',
      'Embolie pulmonaire',
      'Pneumopathie interstitielle',
    ],
    pathogens: [
      {
        name: 'SARS-CoV-2',
        frequency: '100%',
        notes: 'Variants en évolution constante',
      },
    ],
    resistanceData: [],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Traitement antiviral précoce (formes légères à modérées à risque)',
          indication: 'COVID-19 confirmé, symptômes < 5 jours, facteurs de risque',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Paxlovid® (Nirmatrelvir/Ritonavir)',
              dosage: '300mg/100mg',
              frequency: '2x/jour',
              duration: '5 jours',
              route: 'PO',
              notes: 'Débuter dans les 5 jours suivant le début des symptômes',
            },
          ],
          contraindications: [
            'Insuffisance rénale sévère (ClCr < 30)',
            'Insuffisance hépatique sévère',
            'Interactions médicamenteuses nombreuses',
          ],
          monitoring: ['Interactions médicamenteuses', 'Fonction rénale'],
          adjustment: {
            renal: [
              {
                creatinineClearance: '30-60 mL/min',
                adjustment: 'Paxlovid 150mg/100mg x2/jour',
              },
            ],
          },
          costCategory: 'high',
          availability: 'limited',
        },
        {
          name: 'Traitement formes sévères hospitalisées',
          indication: 'COVID-19 sévère avec oxygénothérapie',
          context: 'hospital',
          line: 'first',
          molecules: [
            {
              name: 'Dexaméthasone',
              dosage: '6mg',
              frequency: '1x/jour',
              duration: '10 jours',
              route: 'IV ou PO',
              notes: 'Corticothérapie systémique de référence',
            },
            {
              name: 'Tocilizumab (si aggravation)',
              dosage: '8mg/kg',
              frequency: 'Dose unique',
              duration: '1 jour',
              route: 'IV',
              notes: 'Anti-IL6 si aggravation rapide',
            },
          ],
          monitoring: [
            'Paramètres respiratoires',
            'Glycémie (corticoïdes)',
            'Bilan inflammatoire',
          ],
          costCategory: 'high',
          availability: 'hospital-only',
        },
      ],
      documented: [],
      duration: {
        standard: '5 jours (antiviraux)',
        severe: '10 jours (corticoïdes)',
        notes: 'Durées selon protocoles HAS/SFAR 2024',
      },
    },
    supportiveCare: [
      'Oxygénothérapie si SpO2 < 94%',
      'Décubitus ventral (forme sévère)',
      'Anticoagulation préventive ou curative',
      'Nutrition et hydratation',
      'Kinésithérapie respiratoire',
    ],
    complications: [
      'SDRA',
      'Choc septique',
      'Thrombo-embolie',
      'Surinfection bactérienne',
      'COVID long (symptômes > 3 mois)',
      'Séquelles respiratoires',
    ],
    prevention: {
      primary: [
        'Vaccination à jour (rappels)',
        'Mesures barrières',
        'Aération des espaces clos',
        'Port du masque en période épidémique',
      ],
      secondary: [],
      vaccination: [
        {
          name: 'Vaccin ARNm (Pfizer, Moderna) ou protéique (Novavax)',
          schedule: 'Primo-vaccination + rappels annuels',
          indication: 'Toute la population > 6 mois',
        },
      ],
    },
    guidelines: [
      {
        source: 'HAS',
        year: 2024,
        title: 'Prise en charge du COVID-19',
        version: '2024.3',
        lastUpdated: '2024-11',
      },
      {
        source: 'SFAR',
        year: 2024,
        title: 'Réanimation des formes graves de COVID-19',
        lastUpdated: '2024-09',
      },
    ],
    lastUpdated: '2026-01-25',
    version: '2.3.0',
  },

  // ================ INFECTIONS PARASITAIRES ================
  {
    id: 'malaria',
    name: 'Paludisme',
    commonNames: ['Malaria', 'Fièvre palustre'],
    searchTerms: {
      primary: ['paludisme', 'malaria', 'palu'],
      synonyms: ['fièvre palustre', 'infection à plasmodium'],
      icd10: ['B50', 'B51', 'B52', 'B53'],
      clinicalSigns: [
        'fièvre',
        'frissons',
        'sueurs',
        'céphalées',
        'nausées',
        'vomissements',
        'splénomégalie',
        'anémie',
      ],
      keywords: ['parasite', 'plasmodium', 'moustique', 'anophèle', 'tropical', 'zone endémique'],
    },
    type: 'parasitic',
    severity: 'life-threatening',
    territory: 'tropical',
    organ: 'Sang',
    specialty: ['Infectiologie', 'Médecine tropicale', 'Réanimation'],
    epidemiology: {
      incidence: '5000-6000 cas importés/an en France',
      prevalence: '247 millions de cas/an dans le monde',
      seasonality: 'Toute l\'année en zone tropicale',
      riskFactors: [
        'Voyage en zone d\'endémie',
        'Absence de chimioprophylaxie',
        'Grossesse',
        'Jeune enfant',
        'Immunodépression',
        'Splénectomie',
      ],
      ageGroups: ['Tous âges', 'Enfants < 5 ans en zone d\'endémie'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Fièvre > 38°C',
          'Accès fébriles périodiques (tierces, quartes)',
          'Notion de voyage en zone d\'endémie < 3 mois',
        ],
        minor: [
          'Frissons intenses',
          'Sueurs profuses',
          'Céphalées',
          'Troubles digestifs',
          'Spl��nomégalie',
        ],
        exclusion: [],
      },
      biological: {
        supportive: [
          'Thrombopénie',
          'Anémie',
          'Hyperbilirubinémie',
          'LDH élevées',
          'Insuffisance rénale (forme grave)',
        ],
        threshold: {
          plaquettes: '< 150 000/mm³',
          hémoglobine: '< 10 g/dL',
          bilirubine: '> 30 µmol/L',
        },
      },
      imaging: {
        firstLine: [],
        secondLine: ['Échographie abdominale (splénomégalie)'],
        findings: ['Splénomégalie', 'Hépatomégalie possible'],
      },
      microbiological: {
        samples: [
          'Frottis sanguin + goutte épaisse (gold standard)',
          'Test de diagnostic rapide (TDR)',
          'PCR Plasmodium',
        ],
        tests: [
          'Frottis mince (identification espèce)',
          'Goutte épaisse (sensibilité)',
          'TDR HRP2/pLDH',
        ],
        expectedPathogens: [
          'Plasmodium falciparum',
          'P. vivax',
          'P. ovale',
          'P. malariae',
          'P. knowlesi',
        ],
      },
    },
    severityScores: [],
    differentialDiagnosis: [
      'Dengue',
      'Chikungunya',
      'Fièvre typhoïde',
      'Sepsis bactérien',
      'Arbovirose',
      'Leishmaniose viscérale',
    ],
    pathogens: [
      {
        name: 'Plasmodium falciparum',
        frequency: '85% (cas importés)',
        notes: 'Forme potentiellement grave',
      },
      {
        name: 'P. vivax',
        frequency: '10%',
        notes: 'Rechutes possibles (hypnozoïtes)',
      },
      {
        name: 'P. ovale',
        frequency: '3%',
        notes: 'Rechutes tardives',
      },
      {
        name: 'P. malariae',
        frequency: '2%',
        notes: 'Parasitémie chronique',
      },
    ],
    resistanceData: [
      {
        pathogen: 'Plasmodium falciparum',
        mechanism: ['Résistance chloroquine', 'Résistance artémisinine (Asie du Sud-Est)'],
        prevalence: {
          france: 0,
          trend: 'increasing',
        },
        affectedAntibiotics: ['Chloroquine (résistance généralisée en Afrique)'],
        alternativeOptions: [
          'Artéméther-Luméfantrine',
          'Atovaquone-Proguanil',
          'Quinine IV + doxycycline',
        ],
        frarRecommendation:
          'Ne plus utiliser chloroquine seule. Privilégier ACT (combinaisons à base d\'artémisinine).',
        lastUpdate: '2025-12',
      },
    ],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Paludisme non compliqué à P. falciparum',
          indication: 'Paludisme simple, parasitémie < 4%, pas de signes de gravité',
          context: 'hospital',
          line: 'first',
          molecules: [
            {
              name: 'Artéméther-Luméfantrine (Riamet®)',
              dosage: '4 cp',
              frequency: 'À H0, H8, H24, H36, H48, H60',
              duration: '3 jours',
              route: 'PO',
              notes: 'Traitement de référence, efficacité > 95%',
            },
          ],
          contraindications: ['Grossesse T1 (avec précaution)', 'Allergie artémisinine'],
          monitoring: ['Parasitémie à J3 et J7', 'NFS', 'Tolérance'],
          costCategory: 'moderate',
          availability: 'hospital-only',
        },
        {
          name: 'Alternative - Atovaquone-Proguanil',
          indication: 'Paludisme non compliqué',
          context: 'hospital',
          line: 'alternative',
          molecules: [
            {
              name: 'Atovaquone-Proguanil (Malarone®)',
              dosage: '4 cp',
              frequency: '1x/jour',
              duration: '3 jours',
              route: 'PO',
              notes: 'Prise avec aliment gras',
            },
          ],
          costCategory: 'high',
          availability: 'hospital-only',
        },
        {
          name: 'Paludisme grave',
          indication: 'Signes de gravité, parasitémie > 4%, défaillance d\'organe',
          context: 'icu',
          line: 'first',
          molecules: [
            {
              name: 'Artésunate IV',
              dosage: '2.4 mg/kg',
              frequency: 'À H0, H12, H24 puis 1x/jour',
              duration: 'Jusqu\'à relais PO possible',
              route: 'IV',
              notes: 'Traitement de référence du paludisme grave (OMS)',
            },
          ],
          monitoring: [
            'Parasitémie toutes les 12h',
            'Signes neurologiques',
            'Fonction rénale',
            'Glycémie',
            'Hémolyse post-artésunate (surveillance 4 semaines)',
          ],
          deescalation: {
            criteria: ['Parasitémie < 1%', 'Apyrexie', 'Amélioration clinique', 'Tolérance orale'],
            to: 'Artéméther-Luméfantrine PO (cure complète)',
            timing: 'Dès que possible',
          },
          costCategory: 'high',
          availability: 'hospital-only',
        },
      ],
      documented: [],
      duration: {
        standard: '3 jours (ACT)',
        severe: 'IV jusqu\'à amélioration + relais PO 3 jours',
        notes: 'P. vivax et ovale nécessitent traitement hypnozoïtes (primaquine 14j)',
      },
    },
    supportiveCare: [
      'Réhydratation',
      'Surveillance neurologique (neuropaludisme)',
      'Traitement symptomatique (fièvre, douleurs)',
      'Transfusion si anémie sévère',
      'Épuration extrarénale si insuffisance rénale',
    ],
    complications: [
      'Neuropaludisme (coma)',
      'Insuffisance rénale aiguë',
      'OAP/SDRA',
      'Anémie sévère',
      'Hypoglycémie',
      'Acidose métabolique',
      'Choc',
      'Splénomégalie rupture',
    ],
    prevention: {
      primary: [
        'Chimioprophylaxie selon zone (Malarone®, Doxycycline, Lariam®)',
        'Protection mécanique (moustiquaire imprégnée)',
        'Répulsifs cutanés',
        'Vêtements longs au crépuscule',
      ],
      secondary: [
        'Consultation si fièvre au retour de zone d\'endémie',
        'Surveillance prolongée (rechutes P. vivax/ovale)',
      ],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2024,
        title: 'Prise en charge et prévention du paludisme d\'importation',
        version: '2024.1',
        lastUpdated: '2024-06',
      },
      {
        source: 'HAS',
        year: 2023,
        title: 'Recommandations sanitaires pour les voyageurs',
        lastUpdated: '2023-05',
      },
    ],
    lastUpdated: '2026-01-28',
    version: '2.2.0',
  },

  // ================ INFECTIONS BACTÉRIENNES SUPPLÉMENTAIRES ================
  
  {
    id: 'meningitis-bacterial',
    name: 'Méningite Bactérienne',
    commonNames: ['Méningite purulente', 'Méningo-encéphalite'],
    searchTerms: {
      primary: ['méningite', 'méningite bactérienne', 'méningite purulente'],
      synonyms: ['inflammation méningée', 'infection méningée'],
      icd10: ['G00', 'G00.9'],
      clinicalSigns: [
        'céphalées intenses',
        'fièvre élevée',
        'raideur de nuque',
        'photophobie',
        'vomissements',
        'troubles de conscience',
        'purpura',
        'convulsions',
      ],
      keywords: ['méninges', 'LCR', 'ponction lombaire', 'purpura fulminans', 'urgence vitale'],
    },
    type: 'bacterial',
    severity: 'life-threatening',
    territory: 'hospital',
    organ: 'SNC',
    specialty: ['Infectiologie', 'Réanimation', 'Neurologie', 'Urgences'],
    epidemiology: {
      incidence: '1-5/100 000 habitants/an',
      prevalence: 'Sporadique',
      seasonality: 'Toute l\'année, pic hivernal',
      riskFactors: [
        'Âge < 5 ans ou > 60 ans',
        'Asplénie',
        'Déficit immunitaire',
        'Brèche ostéoméningée',
        'Vie en collectivité',
        'Non vaccination',
      ],
      ageGroups: ['Tous âges', 'Nourrissons et enfants à risque'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Syndrome méningé (céphalées + raideur nuque + fièvre)',
          'Troubles de conscience',
          'Purpura fulminans',
          'Signes de choc septique',
        ],
        minor: [
          'Photophobie',
          'Vomissements en jet',
          'Convulsions',
          'Signes de localisation neurologique',
        ],
        exclusion: [],
      },
      biological: {
        supportive: [
          'LCR trouble (> 1000 éléments/mm³, PNN > 50%)',
          'Protéinorachie élevée (> 1 g/L)',
          'Glycorachie effondrée (< 40% glycémie)',
          'CRP et PCT élevées',
        ],
        threshold: {
          'LCR cellularité': '> 1000/mm³',
          protéinorachie: '> 1 g/L',
          glycorachie: '< 0.4 x glycémie',
        },
      },
      imaging: {
        firstLine: ['Scanner cérébral avant PL si signes de focalisation'],
        secondLine: ['IRM cérébrale'],
        findings: [
          'Prise de contraste méningée',
          'Hydrocéphalie',
          'Œdème cérébral',
          'Empyème sous-dural',
        ],
      },
      microbiological: {
        samples: [
          'Ponction lombaire (LCR) URGENT',
          'Hémocultures x2 avant antibiothérapie',
          'PCR méningocoque/pneumocoque dans LCR',
        ],
        tests: ['Culture LCR', 'PCR multiplex méningite', 'Antigènes solubles'],
        expectedPathogens: [
          'Neisseria meningitidis',
          'Streptococcus pneumoniae',
          'Haemophilus influenzae',
          'Listeria monocytogenes (> 50 ans)',
        ],
      },
    },
    severityScores: [],
    differentialDiagnosis: [
      'Méningite virale',
      'Hémorragie méningée',
      'Encéphalite',
      'Tumeur cérébrale',
    ],
    pathogens: [
      {
        name: 'Neisseria meningitidis',
        frequency: '40-50%',
        notes: 'Sérogroupes B, C, W, Y',
      },
      {
        name: 'Streptococcus pneumoniae',
        frequency: '30-40%',
        notes: 'Mortalité élevée',
      },
      {
        name: 'Listeria monocytogenes',
        frequency: '5-10% (> 50 ans)',
        notes: 'Terrain immunodéprimé',
      },
    ],
    resistanceData: [],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Méningite bactérienne adulte',
          indication: 'Suspicion méningite bactérienne - URGENCE VITALE',
          context: 'hospital',
          line: 'first',
          molecules: [
            {
              name: 'Ceftriaxone (Rocéphine®)',
              dosage: '2g',
              frequency: '2x/jour',
              duration: '10-14 jours',
              route: 'IV',
              notes: 'Débuter immédiatement après PL ou même avant si retard PL',
            },
            {
              name: 'Dexaméthasone',
              dosage: '10mg',
              frequency: '4x/jour',
              duration: '4 jours',
              route: 'IV',
              notes: 'Avant ou avec première dose ATB (si pneumocoque suspecté)',
            },
          ],
          contraindications: [],
          monitoring: [
            'Conscience, signes neurologiques',
            'Signes de HTIC',
            'PL de contrôle à J48-72',
            'Audiogramme',
          ],
          costCategory: 'moderate',
          availability: 'hospital-only',
        },
        {
          name: 'Méningite si Listeria suspectée (> 50 ans, immunodépression)',
          indication: 'Âge > 50 ans ou immunodépression',
          context: 'hospital',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline',
              dosage: '2g',
              frequency: '6x/jour (toutes les 4h)',
              duration: '21 jours',
              route: 'IV',
              notes: 'Ajouter à la Ceftriaxone',
            },
            {
              name: 'Ceftriaxone',
              dosage: '2g',
              frequency: '2x/jour',
              duration: '10-14 jours',
              route: 'IV',
            },
          ],
          costCategory: 'moderate',
          availability: 'hospital-only',
        },
      ],
      documented: [],
      duration: {
        standard: '10-14 jours (méningocoque, pneumocoque)',
        severe: '21 jours (Listeria)',
        notes: 'Durées selon pathogène identifié et évolution clinique',
      },
    },
    supportiveCare: [
      'Réanimation si choc septique',
      'Prise en charge HTIC',
      'Anticonvulsivants si besoin',
      'Prévention complications (thrombose, escarres)',
    ],
    complications: [
      'Décès (10-30%)',
      'Séquelles neurologiques (30-40%)',
      'Surdité',
      'Déficit moteur',
      'Épilepsie',
      'Hydrocéphalie',
      'Abcès cérébral',
    ],
    prevention: {
      primary: [
        'Vaccination méningocoque ACWY + B',
        'Vaccination pneumocoque',
        'Vaccination Haemophilus influenzae b',
      ],
      secondary: [
        'Antibioprophylaxie sujets contacts (Rifampicine ou Ceftriaxone)',
        'Déclaration obligatoire',
      ],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2024,
        title: 'Prise en charge des méningites bactériennes',
        version: '2024.1',
        lastUpdated: '2024-05',
      },
    ],
    lastUpdated: '2026-01-29',
    version: '2.1.0',
  },

  {
    id: 'pyelonephritis',
    name: 'Pyélonéphrite Aiguë',
    commonNames: ['Infection rénale', 'PNA'],
    searchTerms: {
      primary: ['pyélonéphrite', 'infection rénale', 'PNA'],
      synonyms: ['infection urinaire haute', 'néphrite'],
      icd10: ['N10', 'N12'],
      clinicalSigns: [
        'fièvre',
        'douleur lombaire',
        'signes urinaires',
        'dysurie',
        'pollakiurie',
        'brûlures mictionnelles',
      ],
      keywords: ['rein', 'urine', 'E. coli', 'douleur fosse lombaire'],
    },
    type: 'bacterial',
    severity: 'moderate',
    territory: 'community',
    organ: 'Rein',
    specialty: ['Urologie', 'Infectiologie', 'Médecine générale'],
    epidemiology: {
      incidence: '15-20/10 000 femmes/an, 2-3/10 000 hommes/an',
      prevalence: 'Fréquent chez la femme jeune',
      seasonality: 'Toute l\'année',
      riskFactors: [
        'Sexe féminin',
        'Grossesse',
        'Uropathie obstructive',
        'Diabète',
        'Immunodépression',
        'Sondage urinaire',
      ],
      ageGroups: ['Femmes 18-40 ans', 'Tous âges si facteurs de risque'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Fièvre > 38.5°C',
          'Douleur fosse lombaire',
          'Signes urinaires irritatifs',
        ],
        minor: [
          'Nausées, vomissements',
          'Frissons',
          'Signes généraux (asthénie)',
        ],
        exclusion: [],
      },
      biological: {
        supportive: [
          'Leucocyturie > 10⁴/mL',
          'Bactériurie > 10³ UFC/mL',
          'CRP élevée',
          'Leucocytose',
        ],
        threshold: {
          leucocyturie: '> 10⁴/mL',
          bactériurie: '> 10³ UFC/mL',
          CRP: '> 50 mg/L',
        },
      },
      imaging: {
        firstLine: ['Échographie rénale'],
        secondLine: ['TDM abdominal si complication suspectée'],
        findings: [
          'Dilatation pyélocalicielle',
          'Abcès rénal',
          'Obstacle (lithiase)',
        ],
      },
      microbiological: {
        samples: ['ECBU avec antibiogramme', 'Hémocultures si signes de gravité'],
        tests: ['Culture urinaire', 'Antibiogramme'],
        expectedPathogens: [
          'E. coli',
          'Proteus mirabilis',
          'Klebsiella pneumoniae',
          'Enterococcus',
        ],
      },
    },
    severityScores: [],
    differentialDiagnosis: [
      'Colique néphrétique',
      'Appendicite',
      'Infection génitale haute',
      'Abcès rénal',
    ],
    pathogens: [
      {
        name: 'E. coli',
        frequency: '80-90%',
        notes: 'Principal pathogène',
      },
      {
        name: 'Proteus mirabilis',
        frequency: '5-10%',
        notes: 'Favorisé par lithiase',
      },
    ],
    resistanceData: [
      {
        pathogen: 'E. coli',
        mechanism: ['BLSE (bêta-lactamase à spectre étendu)'],
        prevalence: {
          france: 10,
          trend: 'increasing',
        },
        affectedAntibiotics: ['Amoxicilline', 'C3G orales'],
        alternativeOptions: ['Fluoroquinolones', 'Ceftriaxone IV', 'Amikacine'],
        frarRecommendation: 'Réévaluation à 48h selon antibiogramme',
        lastUpdate: '2025-11',
      },
    ],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Pyélonéphrite simple femme',
          indication: 'PNA non compliquée chez femme sans comorbidité',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Ciprofloxacine',
              dosage: '500mg',
              frequency: '2x/jour',
              duration: '7 jours',
              route: 'PO',
              notes: 'Si résistance locale < 10%',
            },
          ],
          contraindications: ['Grossesse', 'Résistance connue aux FQ'],
          monitoring: ['Évolution clinique à 48-72h', 'ECBU de contrôle'],
          deescalation: {
            criteria: ['Apyrexie à 72h', 'Antibiogramme disponible'],
            to: 'Adaptation selon antibiogramme',
            timing: 'À 48-72h',
          },
          costCategory: 'low',
          availability: 'widely-available',
        },
        {
          name: 'Alternative - Ceftriaxone',
          indication: 'PNA avec signes de gravité ou FQ CI',
          context: 'hospital',
          line: 'alternative',
          molecules: [
            {
              name: 'Ceftriaxone',
              dosage: '1-2g',
              frequency: '1x/jour',
              duration: 'Relais PO dès amélioration',
              route: 'IV puis PO',
              notes: 'Hospitalisation si signes de gravité',
            },
          ],
          costCategory: 'moderate',
          availability: 'hospital-only',
        },
      ],
      documented: [],
      duration: {
        standard: '7 jours (femme simple)',
        severe: '10-14 jours (homme, compliquée)',
        notes: 'Réévaluer selon antibiogramme',
      },
    },
    supportiveCare: [
      'Hydratation abondante',
      'Antalgiques/antipyrétiques',
      'Levée obstacle si présent',
    ],
    complications: [
      'Abcès rénal',
      'Choc septique',
      'Insuffisance rénale aiguë',
      'Récidive',
    ],
    prevention: {
      primary: [
        'Hydratation suffisante',
        'Miction post-coïtale',
        'Hygiène intime adaptée',
      ],
      secondary: [],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2023,
        title: 'Diagnostic et antibiothérapie des infections urinaires',
        version: '2023.2',
        lastUpdated: '2023-11',
      },
    ],
    lastUpdated: '2026-01-29',
    version: '2.0.8',
  },

  {
    id: 'cellulitis-erysipelas',
    name: 'Érysipèle',
    commonNames: ['Dermo-hypodermite bactérienne aiguë', 'DHBA'],
    searchTerms: {
      primary: ['érysipèle', 'dermo-hypodermite', 'DHBA'],
      synonyms: ['cellulite', 'infection cutanée'],
      icd10: ['A46', 'L03'],
      clinicalSigns: [
        'placard cutané rouge',
        'fièvre',
        'frissons',
        'douleur',
        'œdème',
        'bourrelet périphérique',
      ],
      keywords: ['peau', 'streptocoque', 'membre inférieur', 'dermato'],
    },
    type: 'bacterial',
    severity: 'moderate',
    territory: 'community',
    organ: 'Peau',
    specialty: ['Dermatologie', 'Infectiologie', 'Médecine générale'],
    epidemiology: {
      incidence: '10-100/100 000 habitants/an',
      prevalence: 'Fréquent',
      seasonality: 'Toute l\'année',
      riskFactors: [
        'Porte d\'entrée cutanée',
        'Lymphœdème',
        'Insuffisance veineuse',
        'Obésité',
        'Diabète',
        'Intertrigo',
      ],
      ageGroups: ['Adultes', 'Personnes âgées'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Placard inflammatoire rouge vif',
          'Fièvre',
          'Bourrelet périphérique',
          'Début brutal',
        ],
        minor: [
          'Frissons',
          'Douleur locale',
          'Œdème',
          'Adénopathie satellite',
        ],
        exclusion: [],
      },
      biological: {
        supportive: [
          'Hyperleucocytose',
          'CRP élevée',
        ],
        threshold: {
          leucocytes: '> 10 000/mm³',
          CRP: '> 50 mg/L',
        },
      },
      imaging: {
        firstLine: [],
        secondLine: ['Échographie si suspicion fasciite nécrosante'],
        findings: [],
      },
      microbiological: {
        samples: ['Hémocultures si signes généraux'],
        tests: [],
        expectedPathogens: [
          'Streptococcus pyogenes (groupe A)',
        ],
      },
    },
    severityScores: [],
    differentialDiagnosis: [
      'Fasciite nécrosante',
      'Eczéma aigu',
      'Thrombose veineuse',
      'Dermite de stase',
    ],
    pathogens: [
      {
        name: 'Streptococcus pyogenes',
        frequency: '95%',
        notes: 'Streptocoque β-hémolytique du groupe A',
      },
    ],
    resistanceData: [],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Érysipèle non compliqué',
          indication: 'Érysipèle sans signe de gravité',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline',
              dosage: '1g',
              frequency: '3x/jour',
              duration: '7 jours',
              route: 'PO',
              notes: 'Traitement ambulatoire',
            },
          ],
          contraindications: ['Allergie pénicilline'],
          monitoring: ['Évolution clinique à 48-72h', 'Tracer limites du placard'],
          costCategory: 'low',
          availability: 'widely-available',
        },
        {
          name: 'Alternative si allergie',
          indication: 'Allergie pénicilline',
          context: 'community',
          line: 'alternative',
          molecules: [
            {
              name: 'Pristinamycine',
              dosage: '1g',
              frequency: '2x/jour',
              duration: '7 jours',
              route: 'PO',
            },
          ],
          costCategory: 'moderate',
          availability: 'widely-available',
        },
      ],
      documented: [],
      duration: {
        standard: '7 jours',
        severe: '10-14 jours si extension',
        notes: 'Prolonger si évolution lente',
      },
    },
    supportiveCare: [
      'Repos avec surélévation membre',
      'Antalgiques',
      'Traitement porte d\'entrée',
      'Contention si lymphœdème',
    ],
    complications: [
      'Récidive (20-30%)',
      'Lymphœdème chronique',
      'Abcès',
      'Fasciite nécrosante',
      'Choc toxinique',
    ],
    prevention: {
      primary: [
        'Traitement porte d\'entrée (intertrigo)',
        'Soins podologiques',
        'Contention veineuse',
      ],
      secondary: [
        'Antibioprophylaxie si > 2 récidives/an (Pénicilline V ou Benzathine)',
      ],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2023,
        title: 'Prise en charge des infections cutanées bactériennes',
        lastUpdated: '2023-06',
      },
    ],
    lastUpdated: '2026-01-29',
    version: '2.0.5',
  },

  {
    id: 'endocarditis-infectious',
    name: 'Endocardite Infectieuse',
    commonNames: ['EI', 'Endocardite bactérienne'],
    searchTerms: {
      primary: ['endocardite', 'endocardite infectieuse', 'EI'],
      synonyms: ['infection valvulaire', 'endocardite bactérienne'],
      icd10: ['I33', 'I33.0'],
      clinicalSigns: [
        'fièvre prolongée',
        'souffle cardiaque',
        'signes emboliques',
        'purpura',
        'splénomégalie',
        'faux panaris d\'Osler',
      ],
      keywords: ['valve', 'végétations', 'hémocultures', 'streptocoque', 'staphylocoque'],
    },
    type: 'bacterial',
    severity: 'life-threatening',
    territory: 'hospital',
    organ: 'Cœur',
    specialty: ['Cardiologie', 'Infectiologie', 'Réanimation', 'Chirurgie cardiaque'],
    epidemiology: {
      incidence: '3-10/100 000 habitants/an',
      prevalence: 'Rare mais grave',
      seasonality: 'Toute l\'année',
      riskFactors: [
        'Valvulopathie préexistante',
        'Prothèse valvulaire',
        'Antécédent d\'endocardite',
        'Cardiopathie congénitale',
        'Toxicomanie IV',
        'Immunodépression',
        'Soins dentaires invasifs',
      ],
      ageGroups: ['Adultes > 50 ans', 'Tous âges si facteurs de risque'],
    },
    diagnostic: {
      clinical: {
        major: [
          'Fièvre > 38°C prolongée (> 1 semaine)',
          'Souffle cardiaque nouveau ou modifié',
          'Signes emboliques (AVC, infarctus splénique)',
          'Manifestations cutanées (purpura, faux panaris)',
        ],
        minor: [
          'Splénomégalie',
          'Hippocratisme digital',
          'Arthralgies',
          'Insuffisance cardiaque',
        ],
        exclusion: [],
      },
      biological: {
        supportive: [
          'Syndrome inflammatoire',
          'Anémie',
          'Hématurie microscopique',
        ],
        threshold: {
          CRP: '> 50 mg/L',
          VS: '> 50 mm',
        },
      },
      imaging: {
        firstLine: ['ETT (Échographie transthoracique)', 'ETO (Échographie transœsophagienne)'],
        secondLine: ['Scanner cardiaque', 'TEP-TDM'],
        findings: [
          'Végétations valvulaires',
          'Abcès périvalvulaire',
          'Fuite valvulaire nouvelle',
          'Désinsertion de prothèse',
        ],
      },
      microbiological: {
        samples: [
          'Hémocultures x3 sur 24h AVANT ATB',
          'Hémocultures répétées si négatives',
        ],
        tests: [
          'Culture bactérienne prolongée',
          'Sérologies (Coxiella, Bartonella)',
          'PCR 16S',
        ],
        expectedPathogens: [
          'Staphylococcus aureus',
          'Streptococcus oralis group',
          'Enterococcus',
          'Staphylococcus coagulase-négative',
        ],
      },
    },
    severityScores: [],
    differentialDiagnosis: [
      'Endocardite marastique (non infectieuse)',
      'Lymphome',
      'Connectivite',
      'Fièvre prolongée autre cause',
    ],
    pathogens: [
      {
        name: 'Staphylococcus aureus',
        frequency: '30-40%',
        notes: 'Forme aiguë, sur valve native',
      },
      {
        name: 'Streptococcus (groupe viridans)',
        frequency: '30-40%',
        notes: 'Forme subaiguë',
      },
      {
        name: 'Enterococcus',
        frequency: '10-15%',
        notes: 'Sujets âgés, porte d\'entrée digestive/urinaire',
      },
    ],
    resistanceData: [],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'EI sur valve native',
          indication: 'Endocardite sur valve native',
          context: 'icu',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline',
              dosage: '2g',
              frequency: '6x/jour (200 mg/kg/j)',
              duration: '4-6 semaines',
              route: 'IV',
              notes: 'Association synergique',
            },
            {
              name: 'Gentamicine',
              dosage: '3 mg/kg',
              frequency: '1x/jour',
              duration: '2 semaines',
              route: 'IV',
              notes: 'Surveillance dosage et fonction rénale',
            },
          ],
          contraindications: [],
          monitoring: [
            'Hémocultures de contrôle à J3-J7',
            'ETO hebdomadaire',
            'Dosage gentamicine (résiduel < 1 mg/L)',
            'Fonction rénale',
            'Discussion chirurgie',
          ],
          costCategory: 'moderate',
          availability: 'hospital-only',
        },
        {
          name: 'EI sur prothèse valvulaire',
          indication: 'Endocardite sur prothèse',
          context: 'icu',
          line: 'first',
          molecules: [
            {
              name: 'Vancomycine',
              dosage: '30-40 mg/kg/j',
              frequency: 'Perfusion continue',
              duration: '6 semaines',
              route: 'IV',
              notes: 'Cible vancocinémie 15-20 mg/L',
            },
            {
              name: 'Gentamicine',
              dosage: '3 mg/kg',
              frequency: '1x/jour',
              duration: '2 semaines',
              route: 'IV',
            },
            {
              name: 'Rifampicine',
              dosage: '900mg',
              frequency: '1x/jour',
              duration: '6 semaines',
              route: 'PO/IV',
              notes: 'Débuter après 3-5 jours',
            },
          ],
          costCategory: 'high',
          availability: 'hospital-only',
        },
      ],
      documented: [],
      duration: {
        standard: '4-6 semaines (valve native)',
        severe: '6-8 semaines (prothèse)',
        notes: 'Durées selon pathogène et évolution',
      },
    },
    supportiveCare: [
      'Surveillance hémodynamique',
      'Indication chirurgicale précoce si IC, abcès, échec ATB',
      'Prévention embolique',
    ],
    complications: [
      'Insuffisance cardiaque',
      'Embolies systémiques (AVC 30%)',
      'Abcès intracardiaque',
      'Choc septique',
      'Décès (15-30%)',
    ],
    prevention: {
      primary: [
        'Antibioprophylaxie si valvulopathie à haut risque + geste à risque',
        'Hygiène bucco-dentaire',
      ],
      secondary: [],
    },
    guidelines: [
      {
        source: 'SPILF',
        year: 2023,
        title: 'Recommandations sur la prise en charge de l\'endocardite infectieuse',
        version: '2023.1',
        lastUpdated: '2023-09',
      },
      {
        source: 'ESC',
        year: 2023,
        title: 'ESC Guidelines for the management of infective endocarditis',
        lastUpdated: '2023-08',
      },
    ],
    lastUpdated: '2026-01-29',
    version: '2.1.2',
  },

  // INFECTIONS DIGESTIVES
  {
    id: 'gastroenteritis',
    name: 'Gastro-entérite Aiguë',
    commonNames: ['GEA', 'Diarrhée aiguë'],
    searchTerms: {
      primary: ['gastro-entérite', 'GEA', 'diarrhée'],
      synonyms: ['gastro', 'turista'],
      icd10: ['A09'],
      clinicalSigns: ['diarrhée', 'nausées', 'vomissements', 'douleurs abdominales', 'fièvre'],
      keywords: ['digestif', 'E. coli', 'salmonelle', 'campylobacter', 'norovirus'],
    },
    type: 'bacterial',
    severity: 'mild',
    territory: 'community',
    organ: 'Tube digestif',
    specialty: ['Médecine générale', 'Gastro-entérologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'GEA bactérienne si nécessaire',
          indication: 'Diarrhée fébrile, syndrome dysentérique, terrain fragile',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Azithromycine',
              dosage: '500mg',
              frequency: '1x/jour',
              duration: '3 jours',
              route: 'PO',
              notes: 'Si suspicion campylobacter',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '3 jours', severe: '5-7 jours' },
    },
    diagnostic: {
      clinical: { major: ['Diarrhée > 3 selles/j', 'Début brutal'], minor: ['Fièvre', 'Douleurs abdominales'] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: ['Coproculture si dysentérie'], tests: [] },
    },
    epidemiology: { incidence: 'Très fréquent', prevalence: 'Communautaire' },
    pathogens: [{ name: 'E. coli', frequency: '30%' }, { name: 'Campylobacter', frequency: '20%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  // INFECTIONS ORL
  {
    id: 'angina',
    name: 'Angine Streptococcique',
    commonNames: ['Angine', 'Pharyngite'],
    searchTerms: {
      primary: ['angine', 'pharyngite', 'mal de gorge'],
      synonyms: ['amygdalite'],
      icd10: ['J02', 'J03'],
      clinicalSigns: ['odynophagie', 'fièvre', 'adénopathies cervicales'],
      keywords: ['gorge', 'streptocoque A', 'amygdales'],
    },
    type: 'bacterial',
    severity: 'mild',
    territory: 'community',
    organ: 'ORL',
    specialty: ['ORL', 'Médecine générale'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Angine à streptocoque A',
          indication: 'TDR positif',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline',
              dosage: '1g',
              frequency: '2x/jour',
              duration: '6 jours',
              route: 'PO',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '6 jours' },
    },
    diagnostic: {
      clinical: { major: ['Odynophagie', 'Fièvre', 'Erythème pharyngé'], minor: [] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: ['TDR streptocoque A'], tests: [] },
    },
    epidemiology: { incidence: 'Très fréquent', prevalence: 'Hiver' },
    pathogens: [{ name: 'Streptococcus pyogenes', frequency: '25-40%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  {
    id: 'sinusitis',
    name: 'Sinusite Aiguë Bactérienne',
    commonNames: ['Sinusite'],
    searchTerms: {
      primary: ['sinusite', 'rhino-sinusite'],
      synonyms: [],
      icd10: ['J01'],
      clinicalSigns: ['douleur faciale', 'obstruction nasale', 'rhinorrhée purulente'],
      keywords: ['sinus', 'maxillaire', 'pneumocoque'],
    },
    type: 'bacterial',
    severity: 'moderate',
    territory: 'community',
    organ: 'ORL',
    specialty: ['ORL', 'Médecine générale'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Sinusite maxillaire aiguë',
          indication: 'Critères de sinusite bactérienne présents',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline-acide clavulanique',
              dosage: '1g/125mg',
              frequency: '3x/jour',
              duration: '7 jours',
              route: 'PO',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '7 jours' },
    },
    diagnostic: {
      clinical: { major: ['Douleur unilatérale augmentée à la pression', 'Rhinorrhée purulente'], minor: [] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: ['Scanner si complications'] },
      microbiological: { samples: [], tests: [] },
    },
    epidemiology: { incidence: 'Fréquent', prevalence: 'Post-viral' },
    pathogens: [{ name: 'S. pneumoniae', frequency: '30%' }, { name: 'H. influenzae', frequency: '20%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  {
    id: 'otitis-media',
    name: 'Otite Moyenne Aiguë',
    commonNames: ['OMA'],
    searchTerms: {
      primary: ['otite', 'OMA', 'otite moyenne'],
      synonyms: [],
      icd10: ['H66'],
      clinicalSigns: ['otalgie', 'fièvre', 'tympan bombé'],
      keywords: ['oreille', 'enfant', 'pneumocoque'],
    },
    type: 'bacterial',
    severity: 'mild',
    territory: 'community',
    organ: 'ORL',
    specialty: ['ORL', 'Pédiatrie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'OMA purulente enfant',
          indication: 'OMA purulente < 2 ans ou forme sévère',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline forte dose',
              dosage: '80-90 mg/kg/j',
              frequency: '2-3x/jour',
              duration: '8-10 jours (< 2 ans)',
              route: 'PO',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '5 jours (> 2 ans)', severe: '8-10 jours (< 2 ans)' },
    },
    diagnostic: {
      clinical: { major: ['Otalgie', 'Tympan rouge bombé'], minor: ['Fièvre', 'Irritabilité'] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: [], tests: [] },
    },
    epidemiology: { incidence: 'Très fréquent enfant', prevalence: 'Hiver' },
    pathogens: [{ name: 'S. pneumoniae', frequency: '40%' }, { name: 'H. influenzae', frequency: '25%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  // INFECTIONS BRONCHOPULMONAIRES
  {
    id: 'bronchitis-acute',
    name: 'Bronchite Aiguë',
    commonNames: [],
    searchTerms: {
      primary: ['bronchite', 'bronchite aiguë'],
      synonyms: [],
      icd10: ['J20'],
      clinicalSigns: ['toux', 'expectoration', 'dyspnée'],
      keywords: ['bronches', 'viral'],
    },
    type: 'viral',
    severity: 'mild',
    territory: 'community',
    organ: 'Poumon',
    specialty: ['Pneumologie', 'Médecine générale'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Bronchite aiguë simple',
          indication: 'AUCUNE antibiothérapie indiquée (viral)',
          context: 'community',
          line: 'first',
          molecules: [],
        },
      ],
      documented: [],
      duration: { standard: 'Pas d\'ATB' },
    },
    diagnostic: {
      clinical: { major: ['Toux', 'Expectoration'], minor: ['Dyspnée modérée'] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: [], tests: [] },
    },
    epidemiology: { incidence: 'Très fréquent', prevalence: 'Hiver' },
    pathogens: [{ name: 'Virus respiratoires', frequency: '90%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  {
    id: 'copd-exacerbation',
    name: 'Exacerbation de BPCO',
    commonNames: ['Décompensation BPCO'],
    searchTerms: {
      primary: ['BPCO', 'exacerbation BPCO', 'décompensation BPCO'],
      synonyms: ['bronchite chronique'],
      icd10: ['J44'],
      clinicalSigns: ['dyspnée majorée', 'toux', 'expectoration purulente'],
      keywords: ['BPCO', 'tabac', 'emphysème'],
    },
    type: 'bacterial',
    severity: 'moderate',
    territory: 'community',
    organ: 'Poumon',
    specialty: ['Pneumologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Exacerbation BPCO avec critères d\'Anthonisen',
          indication: '2-3 critères d\'Anthonisen',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Amoxicilline-acide clavulanique',
              dosage: '1g/125mg',
              frequency: '3x/jour',
              duration: '5-7 jours',
              route: 'PO',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '5-7 jours' },
    },
    diagnostic: {
      clinical: { major: ['Dyspnée majorée', 'Expectoration purulente', 'Volume expectoration augmenté'], minor: [] },
      biological: { supportive: ['GDS si sévère'] },
      imaging: { firstLine: ['Rx thorax'], secondLine: [] },
      microbiological: { samples: [], tests: [] },
    },
    epidemiology: { incidence: 'Fréquent chez BPCO', prevalence: 'Hiver' },
    pathogens: [{ name: 'H. influenzae', frequency: '30%' }, { name: 'S. pneumoniae', frequency: '20%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  // INFECTIONS CUTANÉES
  {
    id: 'impetigo',
    name: 'Impétigo',
    commonNames: [],
    searchTerms: {
      primary: ['impétigo'],
      synonyms: [],
      icd10: ['L01'],
      clinicalSigns: ['croûtes mélicériques', 'vésicules', 'lésions cutanées'],
      keywords: ['peau', 'streptocoque', 'staphylocoque', 'enfant'],
    },
    type: 'bacterial',
    severity: 'mild',
    territory: 'community',
    organ: 'Peau',
    specialty: ['Dermatologie', 'Pédiatrie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Impétigo localisé',
          indication: 'Lésions limitées',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Acide fusidique (Fucidine®) topique',
              dosage: '2%',
              frequency: '3x/jour',
              duration: '7 jours',
              route: 'Local',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '7 jours' },
    },
    diagnostic: {
      clinical: { major: ['Croûtes mélicériques jaunâtres', 'Vésicules'], minor: [] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: [], tests: [] },
    },
    epidemiology: { incidence: 'Fréquent enfant', prevalence: 'Été' },
    pathogens: [{ name: 'S. aureus', frequency: '60%' }, { name: 'S. pyogenes', frequency: '30%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  {
    id: 'herpes-zoster',
    name: 'Zona',
    commonNames: ['Herpès zoster'],
    searchTerms: {
      primary: ['zona', 'herpès zoster'],
      synonyms: [],
      icd10: ['B02'],
      clinicalSigns: ['éruption vésiculeuse', 'douleur', 'distribution dermatome'],
      keywords: ['VZV', 'douleur neuropathique', 'vésicules'],
    },
    type: 'viral',
    severity: 'moderate',
    territory: 'community',
    organ: 'Peau',
    specialty: ['Dermatologie', 'Neurologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Zona traité précocement',
          indication: 'Début < 72h, sujet > 50 ans ou immunodéprimé',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Valaciclovir',
              dosage: '1g',
              frequency: '3x/jour',
              duration: '7 jours',
              route: 'PO',
              notes: 'Antiviral, pas antibiotique',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '7 jours' },
    },
    diagnostic: {
      clinical: { major: ['Éruption vésiculeuse unilatérale', 'Distribution métamérique', 'Douleur'], minor: [] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: [], tests: [] },
    },
    epidemiology: { incidence: '3-5/1000/an', prevalence: 'Augmente avec âge' },
    pathogens: [{ name: 'Virus varicelle-zona (VZV)', frequency: '100%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  // INFECTIONS GÉNITALES
  {
    id: 'ist-chlamydia',
    name: 'Infection à Chlamydia',
    commonNames: ['Chlamydiose'],
    searchTerms: {
      primary: ['chlamydia', 'IST', 'infection génitale'],
      synonyms: [],
      icd10: ['A56'],
      clinicalSigns: ['écoulement urétral', 'dysurie', 'leucorrhées'],
      keywords: ['IST', 'MST', 'Chlamydia trachomatis'],
    },
    type: 'bacterial',
    severity: 'moderate',
    territory: 'community',
    organ: 'Génital',
    specialty: ['Gynécologie', 'Urologie', 'Infectiologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Infection à Chlamydia non compliquée',
          indication: 'PCR positive ou suspicion clinique',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Doxycycline',
              dosage: '100mg',
              frequency: '2x/jour',
              duration: '7 jours',
              route: 'PO',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '7 jours' },
    },
    diagnostic: {
      clinical: { major: ['Écoulement', 'Dysurie'], minor: ['Asymptomatique fréquent'] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: ['PCR Chlamydia (prélèvement endo-urétral/vaginal)'], tests: [] },
    },
    epidemiology: { incidence: '50-100/100 000/an', prevalence: 'Jeunes adultes' },
    pathogens: [{ name: 'Chlamydia trachomatis', frequency: '100%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  {
    id: 'ist-gonorrhea',
    name: 'Gonorrhée (Gonococcie)',
    commonNames: ['Blennorragie', 'Chaude-pisse'],
    searchTerms: {
      primary: ['gonorrhée', 'gonocoque', 'blennorragie'],
      synonyms: ['IST', 'chaude-pisse'],
      icd10: ['A54'],
      clinicalSigns: ['écoulement purulent', 'dysurie sévère'],
      keywords: ['IST', 'Neisseria gonorrhoeae'],
    },
    type: 'bacterial',
    severity: 'moderate',
    territory: 'community',
    organ: 'Génital',
    specialty: ['Gynécologie', 'Urologie', 'Infectiologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Gonococcie non compliquée',
          indication: 'PCR positive ou suspicion clinique',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Ceftriaxone',
              dosage: '500mg',
              frequency: 'Dose unique',
              duration: '1 jour',
              route: 'IM',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: 'Dose unique' },
    },
    diagnostic: {
      clinical: { major: ['Écoulement purulent abondant', 'Dysurie intense'], minor: [] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: ['PCR gonocoque', 'Culture avec antibiogramme'], tests: [] },
    },
    epidemiology: { incidence: '15-20/100 000/an', prevalence: 'Jeunes adultes' },
    pathogens: [{ name: 'Neisseria gonorrhoeae', frequency: '100%' }],
    resistanceData: [
      {
        pathogen: 'N. gonorrhoeae',
        mechanism: ['Résistance fluoroquinolones', 'Résistance azithromycine'],
        prevalence: { france: 50, trend: 'increasing' },
        affectedAntibiotics: ['Ciprofloxacine', 'Azithromycine'],
        alternativeOptions: ['Ceftriaxone IM'],
        frarRecommendation: 'Ceftriaxone en première intention',
      },
    ],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  // INFECTIONS VIRALES
  {
    id: 'mononucleosis',
    name: 'Mononucléose Infectieuse',
    commonNames: ['MNI', 'Maladie du baiser'],
    searchTerms: {
      primary: ['mononucléose', 'MNI', 'EBV'],
      synonyms: ['maladie du baiser'],
      icd10: ['B27'],
      clinicalSigns: ['angine', 'asthénie', 'adénopathies', 'splénomégalie'],
      keywords: ['EBV', 'Epstein-Barr', 'adolescent'],
    },
    type: 'viral',
    severity: 'mild',
    territory: 'community',
    organ: 'Sang',
    specialty: ['Médecine générale', 'Infectiologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Mononucléose infectieuse',
          indication: 'AUCUNE antibiothérapie (viral)',
          context: 'community',
          line: 'first',
          molecules: [],
        },
      ],
      documented: [],
      duration: { standard: 'Pas d\'ATB - Contre-indication aminopénicillines' },
    },
    diagnostic: {
      clinical: { major: ['Angine', 'Adénopathies', 'Asthénie majeure', 'Splénomégalie'], minor: [] },
      biological: { supportive: ['Syndrome mononucléosique', 'MNI test positif', 'Sérologie EBV'] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: [], tests: ['MNI test', 'Sérologie EBV'] },
    },
    epidemiology: { incidence: 'Fréquent adolescent/adulte jeune', prevalence: 'Toute l\'année' },
    pathogens: [{ name: 'Virus Epstein-Barr (EBV)', frequency: '100%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  {
    id: 'hepatitis-a',
    name: 'Hépatite A',
    commonNames: ['VHA'],
    searchTerms: {
      primary: ['hépatite A', 'VHA'],
      synonyms: [],
      icd10: ['B15'],
      clinicalSigns: ['ictère', 'asthénie', 'nausées', 'urines foncées'],
      keywords: ['foie', 'ictère', 'voyage'],
    },
    type: 'viral',
    severity: 'moderate',
    territory: 'community',
    organ: 'Foie',
    specialty: ['Gastro-entérologie', 'Infectiologie'],
    antibiotherapy: {
      probabilistic: [],
      documented: [],
      duration: { standard: 'Pas de traitement spécifique' },
    },
    diagnostic: {
      clinical: { major: ['Ictère', 'Asthénie', 'Urines foncées'], minor: [] },
      biological: { supportive: ['Cytolyse hépatique', 'Sérologie VHA IgM+'] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: [], tests: ['Sérologie VHA IgM'] },
    },
    epidemiology: { incidence: 'Rare en France', prevalence: 'Retour de voyage' },
    pathogens: [{ name: 'Virus hépatite A', frequency: '100%' }],
    prevention: {
      primary: ['Vaccination', 'Hygiène mains'],
      vaccination: [{ name: 'Vaccin VHA', indication: 'Voyageurs zones endémiques' }],
    },
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  // INFECTIONS PARASITAIRES
  {
    id: 'toxoplasmosis',
    name: 'Toxoplasmose',
    commonNames: [],
    searchTerms: {
      primary: ['toxoplasmose'],
      synonyms: [],
      icd10: ['B58'],
      clinicalSigns: ['adénopathies', 'fébricule', 'asthénie'],
      keywords: ['parasite', 'chat', 'grossesse'],
    },
    type: 'parasitic',
    severity: 'mild',
    territory: 'community',
    organ: 'Sang',
    specialty: ['Infectiologie', 'Gynécologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Toxoplasmose acquise immunocompétent',
          indication: 'Généralement pas de traitement',
          context: 'community',
          line: 'first',
          molecules: [],
        },
      ],
      documented: [],
      duration: { standard: 'Surveillance si grossesse' },
    },
    diagnostic: {
      clinical: { major: ['Adénopathies'], minor: ['Fébricule', 'Asthénie'] },
      biological: { supportive: ['Sérologie toxoplasmose'] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: [], tests: ['Sérologie IgG/IgM'] },
    },
    epidemiology: { incidence: 'Fréquent', prevalence: '50% population séropositive' },
    pathogens: [{ name: 'Toxoplasma gondii', frequency: '100%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  {
    id: 'giardiasis',
    name: 'Giardiase',
    commonNames: ['Lambliase'],
    searchTerms: {
      primary: ['giardiase', 'giardia', 'lambliase'],
      synonyms: [],
      icd10: ['A07.1'],
      clinicalSigns: ['diarrhée chronique', 'ballonnements', 'douleurs abdominales'],
      keywords: ['parasite', 'diarrhée', 'eau'],
    },
    type: 'parasitic',
    severity: 'mild',
    territory: 'community',
    organ: 'Tube digestif',
    specialty: ['Gastro-entérologie', 'Infectiologie'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Giardiase',
          indication: 'Parasitologie positive',
          context: 'community',
          line: 'first',
          molecules: [
            {
              name: 'Métronidazole',
              dosage: '500mg',
              frequency: '3x/jour',
              duration: '7 jours',
              route: 'PO',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: '7 jours' },
    },
    diagnostic: {
      clinical: { major: ['Diarrhée chronique', 'Ballonnements'], minor: [] },
      biological: { supportive: [] },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: ['Examen parasitologique des selles x3'], tests: [] },
    },
    epidemiology: { incidence: 'Fréquent retour voyage', prevalence: 'Eau contaminée' },
    pathogens: [{ name: 'Giardia intestinalis', frequency: '100%' }],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },

  // SEPSIS
  {
    id: 'sepsis',
    name: 'Sepsis / Choc Septique',
    commonNames: ['Septicémie'],
    searchTerms: {
      primary: ['sepsis', 'choc septique', 'septicémie'],
      synonyms: ['état septique'],
      icd10: ['A41'],
      clinicalSigns: ['fièvre ou hypothermie', 'hypotension', 'tachycardie', 'défaillance organes'],
      keywords: ['urgence vitale', 'réanimation', 'hémocultures'],
    },
    type: 'bacterial',
    severity: 'life-threatening',
    territory: 'icu',
    organ: 'Sang',
    specialty: ['Réanimation', 'Infectiologie', 'Urgences'],
    antibiotherapy: {
      probabilistic: [
        {
          name: 'Choc septique sans porte d\'entrée évidente',
          indication: 'Sepsis sévère/choc septique',
          context: 'icu',
          line: 'first',
          molecules: [
            {
              name: 'Ceftriaxone',
              dosage: '2g',
              frequency: '1x/jour',
              duration: 'Réévaluation quotidienne',
              route: 'IV',
            },
            {
              name: 'Gentamicine',
              dosage: '5-7 mg/kg',
              frequency: '1x/jour',
              duration: '3 jours max',
              route: 'IV',
            },
          ],
        },
      ],
      documented: [],
      duration: { standard: 'Variable selon porte d\'entrée', severe: '7-14 jours' },
    },
    diagnostic: {
      clinical: {
        major: [
          'Fièvre > 38°C ou < 36°C',
          'FC > 90/min',
          'FR > 20/min',
          'PAS < 90 mmHg ou PAM < 65',
          'Défaillance organe',
        ],
        minor: [],
      },
      biological: {
        supportive: ['Leucocytose ou leucopénie', 'PCT > 2 ng/mL', 'Lactates > 2 mmol/L'],
      },
      imaging: { firstLine: [], secondLine: [] },
      microbiological: { samples: ['Hémocultures x2-3', 'Prélèvements porte d\'entrée'], tests: [] },
    },
    severityScores: [{ name: 'SOFA', range: '0-24', interpretation: 'Score ≥ 2 = sepsis' }],
    epidemiology: { incidence: '10-20/1000 hospitalisations', prevalence: 'Toute l\'année' },
    pathogens: [
      { name: 'E. coli', frequency: '25%' },
      { name: 'S. aureus', frequency: '20%' },
      { name: 'Pneumocoque', frequency: '10%' },
    ],
    lastUpdated: '2026-01-30',
    version: '1.0',
  },
];

// Fonction utilitaire pour getAllDiseases de manière synchrone
export function getAllDiseases() {
  return sampleDiseases;
}
