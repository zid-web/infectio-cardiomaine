import type { Infection } from '../types/infections';

export const bacterialInfections: Infection[] = [
    {
        id: 'pneumonia-community',
        name: 'Pneumonie Communautaire',
        commonName: 'Pneumonie acquise en ville',
        type: 'bacterial',
        icdCode: 'J18.9',
        severity: 'moderate',
        spilfGuidelines: 'SPILF 2023 - Prise en charge des infections respiratoires basses',
        lastUpdated: '2023-12',

        carePathway: [
            {
                phase: 'symptoms',
                title: 'Apparition des Symptômes',
                content: 'Reconnaissance des signes cliniques évocateurs de pneumonie',
                duration: '1-3 jours',
                details: {
                    symptoms: [
                        { name: 'Fièvre > 38°C', severity: 'moderate' },
                        { name: 'Toux productive', severity: 'moderate' },
                        { name: 'Douleur thoracique', severity: 'moderate' },
                        { name: 'Dyspnée', severity: 'severe' },
                        { name: 'Expectorations purulentes', severity: 'mild' }
                    ],
                    signesGravite: [
                        'Fréquence respiratoire > 30/min',
                        'PAS < 90 mmHg ou PAD < 60 mmHg',
                        'Confusion ou altération de conscience',
                        'Température < 36°C ou > 40°C',
                        'Insuffisance rénale aiguë'
                    ]
                }
            },
            {
                phase: 'screening',
                title: 'Dépistage et Évaluation',
                content: 'Évaluation de la sévérité et stratification du risque',
                duration: '< 24h',
                details: {
                    clinicalSigns: [
                        'Auscultation pulmonaire : crépitants, souffle tubaire',
                        'Score CRB-65 ou CURB-65',
                        'Signes de détresse respiratoire',
                        'Fréquence cardiaque, SpO2'
                    ],
                    biologicalMarkers: [
                        'NFS : hyperleucocytose avec neutrophilie',
                        'CRP > 50 mg/L',
                        'Procalcitonine > 0.5 ng/mL',
                        'Gaz du sang si SpO2 < 90%'
                    ],
                    imagingRequired: [
                        'Radiographie thoracique (face + profil)',
                        'Scanner thoracique si doute diagnostique'
                    ],
                    scoreCRB65: {
                        description: 'Score de sévérité',
                        criteres: [
                            'Confusion',
                            'Fréquence Respiratoire ≥ 30/min',
                            'Pression artérielle (PAS < 90 ou PAD ≤ 60 mmHg)',
                            'Âge ≥ 65 ans'
                        ],
                        interpretation: [
                            '0 point : Traitement ambulatoire possible',
                            '1-2 points : Hospitalisation recommandée',
                            '≥ 3 points : Réanimation à discuter'
                        ]
                    }
                }
            },
            {
                phase: 'microbiology',
                title: 'Microbiologie',
                content: 'Identification de l\'agent pathogène responsable',
                duration: '24-72h',
                details: {
                    tests: [
                        {
                            testName: 'Hémocultures (x2)',
                            sampleType: 'Sang',
                            expectedResults: ['S. pneumoniae (30-50%)', 'H. influenzae', 'S. aureus'],
                            turnaroundTime: '48-72h'
                        },
                        {
                            testName: 'ECBC (si possible)',
                            sampleType: 'Expectorations',
                            expectedResults: ['Culture bactérienne', 'Antibiogramme'],
                            turnaroundTime: '48-72h'
                        },
                        {
                            testName: 'Antigénurie pneumocoque',
                            sampleType: 'Urines',
                            expectedResults: ['Positif/Négatif'],
                            turnaroundTime: '< 1h'
                        },
                        {
                            testName: 'Antigénurie Legionella',
                            sampleType: 'Urines',
                            expectedResults: ['Positif/Négatif'],
                            turnaroundTime: '< 1h'
                        },
                        {
                            testName: 'PCR multiplex respiratoire',
                            sampleType: 'Prélèvement nasal',
                            expectedResults: ['Identification virale/bactérienne'],
                            turnaroundTime: '2-4h'
                        }
                    ],
                    indications: [
                        'Hospitalisation en secteur conventionnel ou réanimation',
                        'Échec du traitement probabiliste initial',
                        'Pneumonie sévère',
                        'Comorbidités importantes'
                    ]
                }
            },
            {
                phase: 'diagnosis',
                title: 'Diagnostic',
                content: 'Confirmation diagnostique et évaluation de la sévérité',
                duration: '24-48h',
                details: {
                    majorCriteria: [
                        'Infiltrat pulmonaire récent à la radiographie thoracique',
                        'Au moins 2 signes cliniques : fièvre, toux, expectorations purulentes, douleur thoracique',
                        'Foyer de crépitants à l\'auscultation'
                    ],
                    differentialDiagnosis: [
                        'Décompensation cardiaque',
                        'Embolie pulmonaire',
                        'Tuberculose pulmonaire',
                        'Cancer bronchopulmonaire',
                        'Pneumopathie d\'inhalation',
                        'COVID-19'
                    ],
                    classification: [
                        'Pneumonie communautaire non sévère (ambulatoire)',
                        'Pneumonie communautaire hospitalisée',
                        'Pneumonie communautaire sévère (réanimation)'
                    ]
                }
            },
            {
                phase: 'treatment',
                title: 'Prise en Charge Antibiotique',
                content: 'Traitement antibiotique probabiliste puis adapté',
                duration: '7-14 jours',
                details: {
                    firstLine: [
                        {
                            indication: 'Ambulatoire - Pneumonie non sévère',
                            molecule: 'Amoxicilline',
                            dosage: '1g x 3/jour',
                            duration: '7 jours',
                            route: 'PO' as const
                        },
                        {
                            indication: 'Hospitalisée - Service conventionnel',
                            molecule: 'Amoxicilline + Acide clavulanique',
                            dosage: '1g x 3/jour',
                            duration: '7-10 jours',
                            route: 'IV' as const
                        },
                        {
                            indication: 'Réanimation - Pneumonie sévère',
                            molecule: 'Ceftriaxone + Spiramycine',
                            dosage: '1-2g x 1/jour + 3 MUI x 3/jour',
                            duration: '10-14 jours',
                            route: 'IV' as const
                        }
                    ],
                    alternatives: [
                        {
                            indication: 'Allergie pénicilline (non grave)',
                            molecule: 'Céphalosporine 3G (Ceftriaxone)',
                            dosage: '1g x 1/jour',
                            duration: '7-10 jours',
                            route: 'IV' as const
                        },
                        {
                            indication: 'Allergie pénicilline (grave)',
                            molecule: 'Fluoroquinolone (Lévofloxacine)',
                            dosage: '500 mg x 1-2/jour',
                            duration: '7-10 jours',
                            route: 'PO' as const
                        },
                        {
                            indication: 'Suspicion de Legionella',
                            molecule: 'Fluoroquinolone ou Macrolide',
                            dosage: 'Lévofloxacine 500mg x2/j',
                            duration: '10-14 jours',
                            route: 'IV' as const
                        }
                    ],
                    renalAdjustment: [
                        {
                            creatinineClearance: '< 30 mL/min',
                            adjustment: 'Réduire la dose d\'amoxicilline à 1g x2/jour'
                        },
                        {
                            creatinineClearance: '< 20 mL/min',
                            adjustment: 'Adapter les fluoroquinolones selon la clairance'
                        }
                    ],
                    monitoring: [
                        'Température, fréquence respiratoire',
                        'SpO2',
                        'Évolution clinique à 48-72h',
                        'Radiographie de contrôle si aggravation',
                        'Surveillance de la fonction rénale sous aminosides'
                    ],
                    spilfRecommendation: 'Traitement probabiliste à débuter dans les 4h pour les pneumonies sévères. Réévaluation systématique à 48-72h.'
                }
            },
            {
                phase: 'prevention',
                title: 'Prévention',
                content: 'Mesures préventives et vaccination',
                details: {
                    primary: [
                        'Vaccination antipneumococcique (> 65 ans, comorbidités)',
                        'Vaccination antigrippale annuelle',
                        'Sevrage tabagique',
                        'Bonne hygiène bucco-dentaire'
                    ],
                    secondary: [
                        'Prévention des récidives',
                        'Prise en charge des comorbidités',
                        'Suivi radiologique à 6 semaines (si > 50 ans)'
                    ],
                    vaccination: [
                        {
                            name: 'Prevenar 13® / Vaxneuvance®',
                            schedule: '1 dose puis Pneumovax 23® à 8 semaines'
                        },
                        {
                            name: 'Pneumovax 23®',
                            schedule: 'Rappel tous les 5 ans si immunodépression'
                        }
                    ]
                }
            }
        ],

        decisionTree: [
            {
                id: 'start',
                type: 'question',
                label: 'Patient avec fièvre + toux + dyspnée',
                description: 'Suspicion de pneumonie communautaire',
                options: [
                    { label: 'Réaliser examen clinique', nextNodeId: 'clinical' }
                ]
            },
            {
                id: 'clinical',
                type: 'question',
                label: 'Crépitants à l\'auscultation ?',
                options: [
                    { label: 'Oui', nextNodeId: 'rxr' },
                    { label: 'Non', nextNodeId: 'alternative' }
                ]
            },
            {
                id: 'rxr',
                type: 'action',
                label: 'Radiographie thoracique',
                description: 'Recherche d\'infiltrat parenchymateux',
                options: [
                    { label: 'Infiltrat confirmé', nextNodeId: 'severity' },
                    { label: 'Pas d\'infiltrat', nextNodeId: 'alternative' }
                ]
            },
            {
                id: 'severity',
                type: 'question',
                label: 'Évaluation de la sévérité (CRB-65)',
                options: [
                    { label: '0 point', nextNodeId: 'ambulatory' },
                    { label: '1-2 points', nextNodeId: 'hospitalization' },
                    { label: '≥ 3 points', nextNodeId: 'icu' }
                ]
            },
            {
                id: 'ambulatory',
                type: 'outcome',
                label: 'Traitement ambulatoire',
                description: 'Amoxicilline 1g x3/j PO pendant 7 jours'
            },
            {
                id: 'hospitalization',
                type: 'outcome',
                label: 'Hospitalisation',
                description: 'Amoxicilline-Ac. clavulanique 1g x3/j IV + bilan microbiologique'
            },
            {
                id: 'icu',
                type: 'outcome',
                label: 'Réanimation',
                description: 'Ceftriaxone + Spiramycine IV + bilan complet'
            },
            {
                id: 'alternative',
                type: 'outcome',
                label: 'Diagnostic différentiel',
                description: 'Explorer autres causes : ICC, EP, tuberculose...'
            }
        ],

        references: [
            'SPILF 2023 - Prise en charge des infections respiratoires basses de l\'adulte',
            'HAS 2022 - Antibiothérapie par voie générale dans les infections respiratoires',
            'ESCMID Guidelines on community-acquired pneumonia 2023'
        ]
    },

    {
        id: 'uti-cystitis',
        name: 'Cystite Aiguë Simple',
        commonName: 'Infection urinaire basse',
        type: 'bacterial',
        icdCode: 'N30.0',
        severity: 'mild',
        spilfGuidelines: 'SPILF 2023 - Infections urinaires',
        lastUpdated: '2023-10',

        carePathway: [
            {
                phase: 'symptoms',
                title: 'Symptômes',
                content: 'Signes fonctionnels urinaires typiques',
                duration: '1-2 jours',
                details: {
                    symptoms: [
                        { name: 'Brûlures mictionnelles', severity: 'moderate' },
                        { name: 'Pollakiurie', severity: 'moderate' },
                        { name: 'Urgences mictionnelles', severity: 'mild' },
                        { name: 'Pesanteur pelvienne', severity: 'mild' },
                        { name: 'Hématurie macroscopique possible', severity: 'mild' }
                    ],
                    exclusionCriteria: [
                        'Fièvre > 38°C (évoque pyélonéphrite)',
                        'Douleur lombaire',
                        'Homme (cystite = compliquée)',
                        'Grossesse',
                        'Immunodépression'
                    ]
                }
            },
            {
                phase: 'screening',
                title: 'Dépistage',
                content: 'Bandelette urinaire et examen clinique',
                duration: '< 1h',
                details: {
                    clinicalSigns: [
                        'Absence de fièvre',
                        'Signes fonctionnels urinaires isolés',
                        'Pas de douleur lombaire'
                    ],
                    biologicalMarkers: [
                        'Bandelette urinaire : leucocytes + nitrites positifs',
                        'BU : présence de sang possible'
                    ]
                }
            },
            {
                phase: 'microbiology',
                title: 'Microbiologie',
                content: 'ECBU non systématique pour cystite simple',
                duration: 'Non indiqué en 1ère intention',
                details: {
                    tests: [
                        {
                            testName: 'ECBU',
                            sampleType: 'Urine du milieu de jet',
                            expectedResults: ['E. coli (70-90%)', 'Autres entérobactéries', 'S. saprophyticus'],
                            turnaroundTime: '48h',
                            indications: [
                                'Échec du traitement probabiliste',
                                'Récidive précoce',
                                'Cystite compliquée',
                                'Symptômes atypiques'
                            ]
                        }
                    ]
                }
            },
            {
                phase: 'diagnosis',
                title: 'Diagnostic',
                content: 'Diagnostic clinique + BU positive',
                details: {
                    majorCriteria: [
                        'Femme non enceinte sans comorbidité',
                        'Signes fonctionnels urinaires bas',
                        'Bandelette urinaire positive (leucocytes ET/OU nitrites)'
                    ],
                    differentialDiagnosis: [
                        'Vaginite',
                        'Urétrite',
                        'Pyélonéphrite débutante',
                        'IST'
                    ]
                }
            },
            {
                phase: 'treatment',
                title: 'Traitement Antibiotique',
                content: 'Antibiothérapie probabiliste courte durée',
                duration: '1-5 jours selon molécule',
                details: {
                    firstLine: [
                        {
                            molecule: 'Fosfomycinetromé tamine',
                            dosage: '3g dose unique',
                            duration: '1 jour',
                            route: 'PO' as const,
                            indication: 'Traitement de 1ère intention'
                        },
                        {
                            molecule: 'Pivmecillinam',
                            dosage: '400mg x 2/jour',
                            duration: '5 jours',
                            route: 'PO' as const,
                            indication: 'Alternative de 1ère intention'
                        }
                    ],
                    alternatives: [
                        {
                            indication: 'Si allergie ou indisponibilité',
                            molecule: 'Nitrofurantoïne',
                            dosage: '100mg x 3/jour',
                            duration: '5 jours',
                            route: 'PO' as const
                        },
                        {
                            indication: 'Dernière ligne (écologie)',
                            molecule: 'Fluoroquinolone (Ciprofloxacine)',
                            dosage: '250mg x 2/jour',
                            duration: '3 jours',
                            route: 'PO' as const
                        }
                    ],
                    monitoring: [
                        'Réévaluation clinique si persistance des symptômes à 72h',
                        'ECBU si échec du traitement',
                        'Pas de contrôle systématique si guérison clinique'
                    ],
                    spilfRecommendation: 'Fosfomycine-trométamol dose unique en 1ère intention. Éviter les fluoroquinolones (épargne écologique).'
                }
            },
            {
                phase: 'prevention',
                title: 'Prévention des Récidives',
                content: 'Mesures hygiéno-diététiques',
                details: {
                    primary: [
                        'Hydratation abondante (1.5-2L/jour)',
                        'Mictions régulières, éviter la rétention',
                        'Miction post-coïtale',
                        'Essuyage d\'avant en arrière',
                        'Éviter les antiseptiques locaux',
                        'Traiter la constipation'
                    ],
                    secondary: [
                        'Si récidives fréquentes (≥4/an) : canneberge, D-mannose',
                        'Antibioprophylaxie post-coïtale si lien établi',
                        'Recherche de facteur favorisant (diabète, ménopause)'
                    ]
                }
            }
        ],

        decisionTree: [
            {
                id: 'start',
                type: 'question',
                label: 'Femme avec signes urinaires bas',
                options: [
                    { label: 'Évaluation clinique', nextNodeId: 'criteria' }
                ]
            },
            {
                id: 'criteria',
                type: 'question',
                label: 'Critères de cystite simple ?',
                description: 'Femme non enceinte, pas de fièvre, pas de comorbidité',
                options: [
                    { label: 'Oui', nextNodeId: 'bu' },
                    { label: 'Non', nextNodeId: 'complicated' }
                ]
            },
            {
                id: 'bu',
                type: 'action',
                label: 'Bandelette urinaire',
                options: [
                    { label: 'Leucocytes et/ou nitrites +', nextNodeId: 'treatment' },
                    { label: 'Négative', nextNodeId: 'alternative' }
                ]
            },
            {
                id: 'treatment',
                type: 'outcome',
                label: 'Traitement probabiliste',
                description: 'Fosfomycine 3g dose unique PO'
            },
            {
                id: 'complicated',
                type: 'outcome',
                label: 'Cystite compliquée',
                description: 'ECBU obligatoire + traitement adapté'
            },
            {
                id: 'alternative',
                type: 'outcome',
                label: 'Autre diagnostic',
                description: 'Vaginite, urétrite, IST...'
            }
        ],

        references: [
            'SPILF 2023 - Diagnostic et antibiothérapie des infections urinaires',
            'HAS 2021 - Cystite aiguë simple'
        ]
    }
];
