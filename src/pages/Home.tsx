import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bacterialInfections } from '../data/bacterial-infections';
import { InfectionCard } from '../components/Cards/InfectionCard';
import './Home.css';
import { Search, Bug, Activity, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'bacterial' | 'viral' | 'parasitic'>('all');

    const filteredInfections = bacterialInfections.filter(infection => {
        const matchesSearch = infection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            infection.commonName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || infection.type === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content animate-fade-in">
                        <div className="hero-icon">
                            <Activity size={64} />
                        </div>
                        <h1 className="hero-title">
                            Guide SPILF
                            <span className="hero-subtitle">Infections Courantes</span>
                        </h1>
                        <p className="hero-description">
                            Recommandations actualisées sur la prise en charge des infections bactériennes,
                            virales et parasitaires pour les professionnels de santé
                        </p>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">{bacterialInfections.length}</div>
                                <div className="stat-label">Pathologies</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">6</div>
                                <div className="stat-label">Étapes de soins</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">2024</div>
                                <div className="stat-label">Recommandations</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search & Filters */}
            <section className="search-section">
                <div className="container">
                    <div className="search-wrapper">
                        <div className="search-box">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Rechercher une infection, un symptôme..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="filter-buttons">
                            <button
                                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                Toutes
                            </button>
                            <button
                                className={`filter-btn bacterial ${activeFilter === 'bacterial' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('bacterial')}
                            >
                                <Activity size={18} />
                                Bactériennes
                            </button>
                            <button
                                className={`filter-btn viral ${activeFilter === 'viral' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('viral')}
                            >
                                <Activity size={18} />
                                Virales
                            </button>
                            <button
                                className={`filter-btn parasitic ${activeFilter === 'parasitic' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('parasitic')}
                            >
                                <Bug size={18} />
                                Parasitaires
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infections Grid */}
            <section className="infections-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Parcours de Soins Détaillés</h2>
                        <p className="section-description">
                            Sélectionnez une pathologie pour accéder au parcours de soins complet
                        </p>
                    </div>

                    {filteredInfections.length > 0 ? (
                        <div className="infections-grid">
                            {filteredInfections.map((infection, index) => (
                                <div
                                    key={infection.id}
                                    className="animate-slide-in"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <InfectionCard
                                        infection={infection}
                                        onClick={() => navigate(`/infection/${infection.id}`)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>Aucune infection trouvée pour "{searchQuery}"</p>
                            <button className="btn btn-primary" onClick={() => setSearchQuery('')}>
                                Réinitialiser la recherche
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Parcours de Soins Complet</h2>

                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon symptoms">
                                <Activity size={32} />
                            </div>
                            <h3>Symptômes</h3>
                            <p>Reconnaissance des signes cliniques et critères de gravité</p>
                            <ArrowRight className="feature-arrow" />
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon screening">
                                <Search size={32} />
                            </div>
                            <h3>Dépistage</h3>
                            <p>Évaluation clinique et stratification du risque</p>
                            <ArrowRight className="feature-arrow" />
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon microbiology">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="6" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                            </div>
                            <h3>Microbiologie</h3>
                            <p>Examens diagnostiques et identification de l'agent pathogène</p>
                            <ArrowRight className="feature-arrow" />
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon diagnosis">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="9" y1="15" x2="15" y2="15" />
                                </svg>
                            </div>
                            <h3>Diagnostic</h3>
                            <p>Confirmation diagnostique et diagnostic différentiel</p>
                            <ArrowRight className="feature-arrow" />
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon treatment">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                            </div>
                            <h3>Traitement</h3>
                            <p>Protocoles antibiotiques SPILF et alternatives thérapeutiques</p>
                            <ArrowRight className="feature-arrow" />
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon prevention">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <h3>Prévention</h3>
                            <p>Mesures préventives et vaccination</p>
                            <ArrowRight className="feature-arrow" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>À Propos</h4>
                            <p>
                                Application basée sur les recommandations de la Société de Pathologie
                                Infectieuse de Langue Française (SPILF)
                            </p>
                        </div>

                        <div className="footer-section">
                            <h4>Ressources</h4>
                            <ul>
                                <li><a href="https://www.infectiologie.com/" target="_blank" rel="noopener noreferrer">SPILF.com</a></li>
                                <li><a href="#">HAS - Haute Autorité de Santé</a></li>
                                <li><a href="#">Santé Publique France</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Contact</h4>
                            <p>Application à usage professionnel uniquement</p>
                            <p className="footer-disclaimer">
                                ⚠️ Ces recommandations ne remplacent pas le jugement clinique
                            </p>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2024 Guide SPILF Infections. Dernière mise à jour: Décembre 2023</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
