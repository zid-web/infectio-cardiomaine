import React from 'react';
import type { CarePathway as CarePathwayType } from '../../types/infections';
import './PathwayTimeline.css';
import {
    Activity,
    Search,
    Microscope,
    Stethoscope,
    Pill,
    Shield
} from 'lucide-react';

interface PathwayTimelineProps {
    pathway: CarePathwayType[];
    activePhase?: number;
    onPhaseClick?: (index: number) => void;
}

const phaseIcons = {
    symptoms: Activity,
    screening: Search,
    microbiology: Microscope,
    diagnosis: Stethoscope,
    treatment: Pill,
    prevention: Shield
};

const phaseColors = {
    symptoms: 'var(--color-symptoms)',
    screening: 'var(--color-screening)',
    microbiology: 'var(--color-microbiology)',
    diagnosis: 'var(--color-diagnosis)',
    treatment: 'var(--color-treatment)',
    prevention: 'var(--color-prevention)'
};

export const PathwayTimeline: React.FC<PathwayTimelineProps> = ({
    pathway,
    activePhase = 0,
    onPhaseClick
}) => {
    return (
        <div className="pathway-timeline">
            <div className="timeline-container">
                {pathway.map((phase, index) => {
                    const Icon = phaseIcons[phase.phase];
                    const isActive = index === activePhase;
                    const isCompleted = index < activePhase;

                    return (
                        <div
                            key={phase.phase}
                            className={`timeline-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                            onClick={() => onPhaseClick?.(index)}
                            style={{ '--phase-color': phaseColors[phase.phase] } as React.CSSProperties}
                        >
                            <div className="timeline-marker">
                                <div className="timeline-icon">
                                    <Icon size={24} />
                                </div>
                                {index < pathway.length - 1 && (
                                    <div className="timeline-connector" />
                                )}
                            </div>

                            <div className="timeline-content">
                                <h3 className="timeline-title">{phase.title}</h3>
                                <p className="timeline-description">{phase.content}</p>
                                {phase.duration && (
                                    <span className="timeline-duration">⏱️ {phase.duration}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
