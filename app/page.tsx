'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Activity, BookOpen, Pill, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { DiagnosticSearchEngine } from '@/lib/services/diagnostic-search';
import { sampleDiseases } from '@/lib/data/sample-diseases';
import { InstallGuide } from '@/components/install-guide';
import type { SearchFilters, InfectionType, InfectionSeverity } from '@/lib/types/infections';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchEngine] = useState(() => new DiagnosticSearchEngine(sampleDiseases));
  const [results, setResults] = useState(searchEngine.getAllDiseases());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const stats = useMemo(() => searchEngine.getStats(), [searchEngine]);

  // Recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        const searchResults = searchEngine.search(searchQuery, filters);
        setResults(searchResults);
        
        // Suggestions
        const newSuggestions = searchEngine.getSuggestions(searchQuery);
        setSuggestions(newSuggestions);
      } else {
        setResults(searchEngine.getAllDiseases(filters));
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filters, searchEngine]);

  const toggleFilter = (filterType: keyof SearchFilters, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[filterType] as string[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues.length > 0 ? newValues : undefined,
      };
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Infectio Cardiomaine</h1>
                <p className="text-sm text-muted-foreground">Moteur de Recherche Diagnostique</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Link
                href="/antibiotherapy"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-border text-foreground hover:border-primary hover:shadow-lg transition-all text-sm font-medium"
              >
                <Pill className="w-4 h-4" />
                <span className="hidden sm:inline">Antibiothérapie</span>
              </Link>
              
              <Link
                href="/guidelines"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-sm font-semibold"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Guidelines</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-12">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200 text-blue-700 text-sm font-semibold shadow-sm">
            <Activity className="w-4 h-4" />
            Recommandations SPILF • SFAR • SRLF • FRAR 2024-2026
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold text-balance leading-tight">
            Moteur de Recherche
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mt-2">Diagnostique Infectieux</span>
          </h2>
          
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
            Accès rapide et intelligent aux recommandations actualisées pour le diagnostic et la prise en charge des infections bactériennes, virales, parasitaires et fongiques
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">{stats.total}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Pathologies</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-extrabold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stats.byType.bacterial || 0}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Bactériennes</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-extrabold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">{stats.byType.viral || 0}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Virales</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-extrabold bg-gradient-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent">{Object.keys(stats.byOrgan).length}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Territoires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Rechercher par pathologie, symptôme, pathogène, organe, contexte clinique..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full h-16 pl-14 pr-36 rounded-2xl border-2 border-border bg-white shadow-xl hover:shadow-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-base font-medium"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-semibold ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtres</span>
                {activeFilterCount > 0 && (
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>
                )}
              </button>
            </div>

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg border border-border shadow-lg z-10 animate-slide-down">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">Recherches rapides:</span>
            
            <button
              onClick={() => setSearchQuery('pneumonie')}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-colors border border-blue-200"
            >
              Pneumonie
            </button>
            
            <button
              onClick={() => setSearchQuery('infection urinaire')}
              className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium transition-colors border border-purple-200"
            >
              Infection urinaire
            </button>
            
            <button
              onClick={() => setSearchQuery('grippe')}
              className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-sm font-medium transition-colors border border-pink-200"
            >
              Grippe
            </button>
            
            <button
              onClick={() => setSearchQuery('covid')}
              className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium transition-colors border border-indigo-200"
            >
              COVID-19
            </button>
            
            <button
              onClick={() => setSearchQuery('paludisme')}
              className="px-4 py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium transition-colors border border-green-200"
            >
              Paludisme
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-6 rounded-xl border border-border bg-white shadow-lg space-y-6 animate-slide-down">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filtres avancés</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Type d&apos;infection</label>
                <div className="flex flex-wrap gap-2">
                  {(['bacterial', 'viral', 'fungal', 'parasitic'] as InfectionType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleFilter('type', type)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        filters.type?.includes(type)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-white border-border hover:bg-secondary'
                      }`}
                    >
                      {type === 'bacterial' && 'Bactérienne'}
                      {type === 'viral' && 'Virale'}
                      {type === 'fungal' && 'Fongique'}
                      {type === 'parasitic' && 'Parasitaire'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sévérité</label>
                <div className="flex flex-wrap gap-2">
                  {(['mild', 'moderate', 'severe', 'life-threatening'] as InfectionSeverity[]).map((severity) => (
                    <button
                      key={severity}
                      onClick={() => toggleFilter('severity', severity)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        filters.severity?.includes(severity)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-white border-border hover:bg-secondary'
                      }`}
                    >
                      {severity === 'mild' && 'Légère'}
                      {severity === 'moderate' && 'Modérée'}
                      {severity === 'severe' && 'Sévère'}
                      {severity === 'life-threatening' && 'Grave'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {results.length} résultat{results.length > 1 ? 's' : ''}
              {searchQuery && (
                <span className="text-muted-foreground font-normal"> pour &quot;{searchQuery}&quot;</span>
              )}
            </h3>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((result, index) => (
                <Link
                  key={result.disease.id}
                  href={`/disease/${result.disease.id}`}
                  className="block p-6 rounded-xl border border-border bg-white hover:border-primary hover:shadow-lg transition-all animate-slide-up group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{result.disease.name}</h4>
                        {result.disease.commonNames[0] && (
                          <p className="text-sm text-muted-foreground">
                            {result.disease.commonNames[0]}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {result.relevance === 'high' && (
                          <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            ✓ Pertinent
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        result.disease.type === 'bacterial'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : result.disease.type === 'viral'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : result.disease.type === 'fungal'
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        {result.disease.type === 'bacterial' && '🦠 Bactérienne'}
                        {result.disease.type === 'viral' && '🧬 Virale'}
                        {result.disease.type === 'fungal' && '🍄 Fongique'}
                        {result.disease.type === 'parasitic' && '🦟 Parasitaire'}
                      </span>
                      
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                        {result.disease.organ}
                      </span>
                      
                      {result.disease.severity === 'life-threatening' && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1 border border-red-200">
                          <AlertCircle className="w-3 h-3" />
                          Grave
                        </span>
                      )}
                    </div>

                    {/* Conduite à tenir - Aperçu */}
                    {result.disease.antibiotherapy.probabilistic.length > 0 && (
                      <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                        <div className="flex items-start gap-2 mb-2">
                          <Pill className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <h5 className="text-sm font-semibold text-blue-900 mb-1">Conduite à tenir</h5>
                            <p className="text-xs text-blue-700 font-medium">
                              {result.disease.antibiotherapy.probabilistic[0].name}
                            </p>
                          </div>
                        </div>
                        
                        {/* Premier antibiotique */}
                        {result.disease.antibiotherapy.probabilistic[0].molecules[0] && (
                          <div className="mt-2 pt-2 border-t border-blue-200">
                            <p className="text-xs text-blue-800">
                              <span className="font-semibold">{result.disease.antibiotherapy.probabilistic[0].molecules[0].name}</span>
                              {' '}
                              {result.disease.antibiotherapy.probabilistic[0].molecules[0].dosage}
                              {' '}
                              {result.disease.antibiotherapy.probabilistic[0].molecules[0].frequency}
                              {' • '}
                              {result.disease.antibiotherapy.probabilistic[0].molecules[0].duration}
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-blue-600 font-medium">
                            Cliquer pour protocole complet →
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Critères diagnostiques clés */}
                    {result.disease.diagnostic.clinical.major.length > 0 && (
                      <div className="pt-3 border-t border-border">
                        <h5 className="text-xs font-semibold text-foreground mb-2">Critères majeurs</h5>
                        <ul className="space-y-1">
                          {result.disease.diagnostic.clinical.major.slice(0, 3).map((criteria, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.matchedTerms.length > 0 && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Correspondance:</span> {result.matchedTerms.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Aucun résultat trouvé</h3>
                <p className="text-muted-foreground">
                  Essayez avec d&apos;autres termes de recherche ou modifiez vos filtres
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Access */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Accès rapide</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/search"
              className="p-6 rounded-xl border border-border bg-white hover:border-primary hover:shadow-lg transition-all group"
            >
              <Search className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-lg mb-2">Recherche avancée</h4>
              <p className="text-sm text-muted-foreground">
                Recherche multi-critères avec algorithmes décisionnels
              </p>
            </Link>

            <Link
              href="/antibiotherapy"
              className="p-6 rounded-xl border border-border bg-white hover:border-primary hover:shadow-lg transition-all group"
            >
              <Pill className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-lg mb-2">Antibiothérapie</h4>
              <p className="text-sm text-muted-foreground">
                Protocoles adaptés selon SPILF, FRAR, SRLF
              </p>
            </Link>

            <Link
              href="/guidelines"
              className="p-6 rounded-xl border border-border bg-white hover:border-primary hover:shadow-lg transition-all group"
            >
              <BookOpen className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-lg mb-2">Recommandations</h4>
              <p className="text-sm text-muted-foreground">
                Guidelines récentes et mises à jour continues
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground text-center md:text-left">
                <p className="font-medium mb-1">Application professionnelle de santé</p>
                <p>Basée sur les recommandations SPILF • SFAR • SRLF • FRAR</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Ne remplace pas le jugement clinique</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
              Dernière mise à jour: Janvier 2026 • Version 2.0.0
            </div>
          </div>
        </div>
      </footer>

      {/* Install Guide Component */}
      <InstallGuide />
    </div>
  );
}
