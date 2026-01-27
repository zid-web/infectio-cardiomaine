import React from 'react';
import type { Infection } from '../../types/infections';
import './InfectionCard.css';
import { AlertCircle, ChevronRight, Activity, Bug } from 'lucide-react';

interface InfectionCardProps {
    infection: Infection;
    onClick?: () => void;
}

const typeIcons = {
    bacterial: Activity,
    viral: Activity,
    parasitic: Bug
};

const typeLabels = {
    bacterial: 'Bactérienne',
    viral: 'Virale',
    parasitic: 'Parasitaire'
};

const severityLabels = {
    mild: 'Légère',
    moderate: 'Modérée',
    severe: 'Sévère',
    'life-threatening': 'Critique'
};

export const InfectionCard: React.FC<InfectionCardProps> = ({ infection, onClick }) => {
    const TypeIcon = typeIcons[infection.type];

    return (
        <div className={`infection-card card-interactive ${infection.type}`} onClick={onClick}>
            <div className="infection-card-header">
                <div className="infection-type-badge">
                    <TypeIcon size={16} />
                    <span>{typeLabels[infection.type]}</span>
                </div>
                <div className={`infection-severity badge badge-severity-${infection.severity}`}>
                    <AlertCircle size={14} />
                    <span>{severityLabels[infection.severity]}</span>
                </div>
            </div>

            <div className="infection-card-body">
                <h3 className="infection-name">{infection.name}</h3>
                <p className="infection-common-name">{infection.commonName}</p>

                <div className="infection-metadata">
                    {infection.icdCode && (
                        <span className="metadata-item">CIM-10: {infection.icdCode}</span>
                    )}
                    <span className="metadata-item">
                        Mis à jour: {new Date(infection.lastUpdated).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                    </span>
                </div>

                <div className="infection-phases">
                    <span className="phases-label">Parcours de soins:</span>
                    <div className="phases-count">{infection.carePathway.length} étapes</div>
                </div>
            </div>

            <div className="infection-card-footer">
                <span className="spilf-label">🏥 {infection.spilfGuidelines.split('-')[0].trim()}</span>
                <ChevronRight size={20} className="card-arrow" />
            </div>
        </div>
    );
};
