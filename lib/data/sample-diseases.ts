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
          'Splénomégalie',
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
];

// Fonction utilitaire pour getAllDiseases de manière synchrone
export function getAllDiseases() {
  return sampleDiseases;
}
