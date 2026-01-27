import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bacterialInfections } from '../data/bacterial-infections';
import { PathwayTimeline } from '../components/CarePathway/PathwayTimeline';
import './InfectionDetail.css';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

export const InfectionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const infection = bacterialInfections.find(inf => inf.id === id);
    const [activePhaseIndex, setActivePhaseIndex] = useState(0);

    if (!infection) {
        return (
            <div className=" container">
                <h1>Infection non trouvée</h1>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    const activePhase = infection.carePathway[activePhaseIndex];

    return (
        <div className="infection-detail">
            <div className="detail-header">
                <div className="container">
                    <button className="btn btn-secondary back-btn" onClick={() => navigate('/')}>
                        <ArrowLeft size={20} />
                        Retour
                    </button>

                    <div className="header-content">
                        <div className="header-left">
                            <h1 className="infection-title">{infection.name}</h1>
                            <p className="infection-subtitle">{infection.commonName}</p>

                            <div className="header-meta">
                                <span className={`badge badge-${infection.type}`}>{infection.type}</span>
                                <span className={`badge badge-severity-${infection.severity}`}>{infection.severity}</span>
                                {infection.icdCode && <span className="badge">CIM-10: {infection.icdCode}</span>}
                            </div>

                            <p className="spilf-reference">
                                📋 <strong>{infection.spilfGuidelines}</strong>
                            </p>
                        </div>

                        <div className="header-actions">
                            <button className="btn btn-secondary">
                                <Download size={18} />
                                Télécharger PDF
                            </button>
                            <button className="btn btn-secondary">
                                <Share2 size={18} />
                                Partager
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="detail-body">
                    <div className="detail-sidebar">
                        <h3 className="sidebar-title">Parcours de Soins</h3>
                        <PathwayTimeline
                            pathway={infection.carePathway}
                            activePhase={activePhaseIndex}
                            onPhaseClick={setActivePhaseIndex}
                        />
                    </div>

                    <div className="detail-content">
                        <div className="phase-details">
                            <h2 className="phase-title">{activePhase.title}</h2>
                            <p className="phase-description">{activePhase.content}</p>

                            {/* Render phase-specific content */}
                            {activePhase.phase === 'symptoms' && activePhase.details?.symptoms && (
                                <div className="symptoms-section">
                                    <h3>Symptômes Principaux</h3>
                                    <div className="symptom-list">
                                        {activePhase.details.symptoms.map((symptom: any, index: number) => (
                                            <div key={index} className={`symptom-item severity-${symptom.severity}`}>
                                                <span className="symptom-name">{symptom.name}</span>
                                                <span className={`symptom-badge badge-severity-${symptom.severity}`}>
                                                    {symptom.severity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {activePhase.details.signesGravite && (
                                        <div className="warning-box">
                                            <h4>⚠️ Signes de Gravité</h4>
                                            <ul>
                                                {activePhase.details.signesGravite.map((signe: string, index: number) => (
                                                    <li key={index}>{signe}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePhase.phase === 'screening' && activePhase.details && (
                                <div className="screening-section">
                                    {activePhase.details.clinicalSigns && (
                                        <div className="info-box">
                                            <h4>Signes Cliniques</h4>
                                            <ul>
                                                {activePhase.details.clinicalSigns.map((sign: string, index: number) => (
                                                    <li key={index}>{sign}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activePhase.details.biologicalMarkers && (
                                        <div className="info-box">
                                            <h4>Marqueurs Biologiques</h4>
                                            <ul>
                                                {activePhase.details.biologicalMarkers.map((marker: string, index: number) => (
                                                    <li key={index}>{marker}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activePhase.details.imagingRequired && (
                                        <div className="info-box">
                                            <h4>Imagerie Requise</h4>
                                            <ul>
                                                {activePhase.details.imagingRequired.map((img: string, index: number) => (
                                                    <li key={index}>{img}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePhase.phase === 'microbiology' && activePhase.details?.tests && (
                                <div className="microbiology-section">
                                    <h3>Examens Microbiologiques</h3>
                                    {activePhase.details.tests.map((test: any, index: number) => (
                                        <div key={index} className="test-card card">
                                            <h4>{test.testName}</h4>
                                            <div className="test-details">
                                                <p><strong>Type de prélèvement:</strong> {test.sampleType}</p>
                                                <p><strong>Délai:</strong> {test.turnaroundTime}</p>
                                                <p><strong>Résultats attendus:</strong></p>
                                                <ul>
                                                    {test.expectedResults.map((result: string, i: number) => (
                                                        <li key={i}>{result}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activePhase.phase === 'treatment' && activePhase.details && (
                                <div className="treatment-section">
                                    <div className="protocol-header">
                                        <h3>Protocole Antibiotique SPILF</h3>
                                        <p className="spilf-recommendation">{activePhase.details.spilfRecommendation}</p>
                                    </div>

                                    {activePhase.details.firstLine && (
                                        <div className="treatment-group">
                                            <h4 className="treatment-group-title">🥇 Traitement de Première Intention</h4>
                                            {activePhase.details.firstLine.map((treatment: any, index: number) => (
                                                <div key={index} className="treatment-card card">
                                                    {treatment.indication && <p className="treatment-indication"><strong>{treatment.indication}</strong></p>}
                                                    <div className="treatment-details">
                                                        <div className="detail-row">
                                                            <span className="detail-label">Molécule:</span>
                                                            <span className="detail-value molecule">{treatment.molecule}</span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-label">Posologie:</span>
                                                            <span className="detail-value">{treatment.dosage}</span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-label">Voie:</span>
                                                            <span className="detail-value badge">{treatment.route}</span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-label">Durée:</span>
                                                            <span className="detail-value">{treatment.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activePhase.details.alternatives && (
                                        <div className="treatment-group">
                                            <h4 className="treatment-group-title">🔄 Alternatives Thérapeutiques</h4>
                                            {activePhase.details.alternatives.map((treatment: any, index: number) => (
                                                <div key={index} className="treatment-card card alternative">
                                                    <p className="treatment-indication"><strong>{treatment.indication}</strong></p>
                                                    <div className="treatment-details">
                                                        <div className="detail-row">
                                                            <span className="detail-label">Molécule:</span>
                                                            <span className="detail-value molecule">{treatment.molecule}</span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-label">Posologie:</span>
                                                            <span className="detail-value">{treatment.dosage}</span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-label">Voie:</span>
                                                            <span className="detail-value badge">{treatment.route}</span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-label">Durée:</span>
                                                            <span className="detail-value">{treatment.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activePhase.details.renalAdjustment && (
                                        <div className="info-box warning-box">
                                            <h4>⚠️ Ajustements Posologiques (Insuffisance Rénale)</h4>
                                            {activePhase.details.renalAdjustment.map((adjustment: any, index: number) => (
                                                <p key={index}>
                                                    <strong>{adjustment.creatinineClearance}:</strong> {adjustment.adjustment}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {activePhase.details.monitoring && (
                                        <div className="info-box">
                                            <h4>🔍 Surveillance</h4>
                                            <ul>
                                                {activePhase.details.monitoring.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activePhase.phase === 'prevention' && activePhase.details && (
                                <div className="prevention-section">
                                    {activePhase.details.primary && (
                                        <div className="prevention-box">
                                            <h4>🛡️ Prévention Primaire</h4>
                                            <ul>
                                                {activePhase.details.primary.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activePhase.details.secondary && (
                                        <div className="prevention-box">
                                            <h4>🔄 Prévention Secondaire</h4>
                                            <ul>
                                                {activePhase.details.secondary.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activePhase.details.vaccination && (
                                        <div className="vaccination-box card">
                                            <h4>💉 Vaccination</h4>
                                            {activePhase.details.vaccination.map((vacc: any, index: number) => (
                                                <div key={index} className="vaccination-item">
                                                    <p><strong>{vacc.name}</strong></p>
                                                    <p>Schéma: {vacc.schedule}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="phase-navigation">
                            {activePhaseIndex > 0 && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setActivePhaseIndex(activePhaseIndex - 1)}
                                >
                                    ← Phase Précédente
                                </button>
                            )}
                            {activePhaseIndex < infection.carePathway.length - 1 && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setActivePhaseIndex(activePhaseIndex + 1)}
                                >
                                    Phase Suivante →
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="references-section">
                    <h3>📚 Références</h3>
                    <ul className="references-list">
                        {infection.references.map((ref, index) => (
                            <li key={index}>{ref}</li>
                        ))}
                    </ul>
                    <p className="update-info">
                        Dernière mise à jour: {new Date(infection.lastUpdated).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long'
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};
