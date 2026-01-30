'use client';

import { useState } from 'react';
import { Search, Filter, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [context, setContext] = useState({
    age: '',
    territory: 'community' as 'community' | 'nosocomial',
    immunocompromised: false,
    comorbidities: [] as string[],
  });

  const commonSymptoms = [
    'Fièvre',
    'Toux',
    'Dyspnée',
    'Douleur thoracique',
    'Douleur abdominale',
    'Diarrhée',
    'Brûlures mictionnelles',
    'Céphalées',
    'Raideur nucale',
    'Éruption cutanée',
    'Arthralgies',
  ];

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Recherche Diagnostique</h1>
                <p className="text-xs text-muted-foreground">Multi-critères</p>
              </div>
            </Link>
            
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
            >
              Retour
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Search className="w-4 h-4" />
              Algorithme diagnostique assisté
            </div>
            
            <h1 className="text-4xl font-bold text-balance">
              Recherche Diagnostique
              <span className="block text-primary mt-2">Par Symptômes et Contexte</span>
            </h1>
            
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Saisissez les symptômes et le contexte clinique pour obtenir des hypothèses diagnostiques hiérarchisées selon les probabilités
            </p>
          </div>

          {/* Symptom Input */}
          <div className="bg-white rounded-xl border border-border shadow-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Symptômes présentés
                <span className="text-muted-foreground ml-2">({symptoms.length} symptômes)</span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ajouter un symptôme..."
                  value={currentSymptom}
                  onChange={(e) => setCurrentSymptom(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSymptom(currentSymptom);
                    }
                  }}
                  className="w-full h-12 px-4 pr-24 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button
                  onClick={() => addSymptom(currentSymptom)}
                  disabled={!currentSymptom}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Ajouter
                </button>
              </div>
            </div>

            {/* Selected Symptoms */}
            {symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{symptom}</span>
                    <button
                      onClick={() => removeSymptom(symptom)}
                      className="ml-1 hover:bg-primary/20 rounded p-0.5 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Add Symptoms */}
            <div className="pt-4 border-t border-border">
              <label className="block text-sm font-medium mb-3">Symptômes fréquents</label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => addSymptom(symptom)}
                    disabled={symptoms.includes(symptom)}
                    className="px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Context */}
          <div className="bg-white rounded-xl border border-border shadow-lg p-6 space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Contexte clinique
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Âge du patient</label>
                <input
                  type="number"
                  placeholder="Âge en années"
                  value={context.age}
                  onChange={(e) => setContext({ ...context, age: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Territory */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Lieu d&apos;acquisition</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setContext({ ...context, territory: 'community' })}
                    className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                      context.territory === 'community'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white border-border hover:bg-secondary'
                    }`}
                  >
                    Communautaire
                  </button>
                  <button
                    onClick={() => setContext({ ...context, territory: 'nosocomial' })}
                    className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                      context.territory === 'nosocomial'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white border-border hover:bg-secondary'
                    }`}
                  >
                    Nosocomiale
                  </button>
                </div>
              </div>
            </div>

            {/* Immunocompromised */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="immunocompromised"
                checked={context.immunocompromised}
                onChange={(e) => setContext({ ...context, immunocompromised: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
              />
              <label htmlFor="immunocompromised" className="text-sm font-medium cursor-pointer">
                Patient immunodéprimé
              </label>
            </div>
          </div>

          {/* Search Button */}
          <button
            disabled={symptoms.length === 0}
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Search className="w-6 h-6" />
            Lancer la recherche diagnostique
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Info */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Aide à la décision clinique</p>
              <p className="text-blue-700">
                Les résultats sont des hypothèses diagnostiques basées sur les recommandations actuelles. 
                Ils ne remplacent pas l&apos;évaluation clinique complète et le jugement médical.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
