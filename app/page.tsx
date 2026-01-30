'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Activity, BookOpen, Pill, AlertCircle, Download } from 'lucide-react';
import Link from 'next/link';
import { DiagnosticSearchEngine } from '@/lib/services/diagnostic-search';
import { sampleDiseases } from '@/lib/data/sample-diseases';
import type { SearchFilters, InfectionType, InfectionSeverity } from '@/lib/types/infections';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchEngine] = useState(() => new DiagnosticSearchEngine(sampleDiseases));
  const [results, setResults] = useState(searchEngine.getAllDiseases());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const stats = useMemo(() => searchEngine.getStats(), [searchEngine]);

  // PWA Install prompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Infectio Cardiomaine</h1>
                <p className="text-sm text-muted-foreground">Guide Diagnostique Infectieux</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Installer l&apos;app
                </button>
              )}
              
              <Link
                href="/antibiotherapy"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                <Pill className="w-4 h-4" />
                Antibiothérapie
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Activity className="w-4 h-4" />
            Recommandations SPILF • FRAR • SRLF 2024-2026
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Moteur de Recherche
            <span className="block text-primary mt-2">Diagnostique Infectieux</span>
          </h2>
          
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Accès rapide aux recommandations actualisées sur le diagnostic et la prise en charge des infections selon les sociétés savantes françaises
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Pathologies</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{Object.keys(stats.byOrgan).length}</div>
              <div className="text-sm text-muted-foreground">Organes</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2026</div>
              <div className="text-sm text-muted-foreground">À jour</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par pathologie, symptôme, pathogène, organe..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full h-14 pl-12 pr-32 rounded-xl border-2 border-border bg-white shadow-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Filter className="w-4 h-4" />
                {activeFilterCount > 0 && (
                  <span className="text-sm font-medium">{activeFilterCount}</span>
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
                  className="block p-6 rounded-xl border border-border bg-white hover:border-primary hover:shadow-lg transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{result.disease.name}</h4>
                        {result.disease.commonNames[0] && (
                          <p className="text-sm text-muted-foreground">
                            {result.disease.commonNames[0]}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {result.relevance === 'high' && (
                          <div className="w-2 h-2 rounded-full bg-medical-green" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        result.disease.type === 'bacterial'
                          ? 'bg-blue-100 text-blue-700'
                          : result.disease.type === 'viral'
                          ? 'bg-purple-100 text-purple-700'
                          : result.disease.type === 'fungal'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {result.disease.type === 'bacterial' && 'Bactérienne'}
                        {result.disease.type === 'viral' && 'Virale'}
                        {result.disease.type === 'fungal' && 'Fongique'}
                        {result.disease.type === 'parasitic' && 'Parasitaire'}
                      </span>
                      
                      <span className="px-2 py-1 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                        {result.disease.organ}
                      </span>
                      
                      {result.disease.severity === 'life-threatening' && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Grave
                        </span>
                      )}
                    </div>

                    {result.matchedTerms.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Correspondance: {result.matchedTerms.slice(0, 3).join(', ')}
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
                <p>Basée sur les recommandations SPILF • FRAR • SRLF</p>
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
    </div>
  );
}
