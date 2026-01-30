'use client';

import { useState, useMemo } from 'react';
import { Search, Pill, AlertCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { DiagnosticSearchEngine } from '@/lib/services/diagnostic-search';
import { sampleDiseases } from '@/lib/data/sample-diseases';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchEngine = useMemo(() => new DiagnosticSearchEngine(sampleDiseases), []);
  
  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchEngine.getAllDiseases({}, 50);
    }
    return searchEngine.search(searchQuery, {});
  }, [searchQuery, searchEngine]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header POPI Style */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Infectio</h1>
            <Link
              href="/antibiotherapy"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ATB
            </Link>
          </div>
        </div>
      </header>

      {/* Search Bar - Style POPI */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une infection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base"
            />
          </div>
        </div>
      </div>

      {/* Results - Liste POPI Style */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-2">
          {results.length > 0 ? (
            results.map((result) => (
              <Link
                key={result.disease.id}
                href={`/disease/${result.disease.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-white group"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {result.disease.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className={`px-2 py-0.5 rounded ${
                          result.disease.type === 'bacterial' ? 'bg-blue-50 text-blue-700' :
                          result.disease.type === 'viral' ? 'bg-purple-50 text-purple-700' :
                          result.disease.type === 'parasitic' ? 'bg-green-50 text-green-700' :
                          'bg-orange-50 text-orange-700'
                        }`}>
                          {result.disease.type === 'bacterial' && 'Bactérie'}
                          {result.disease.type === 'viral' && 'Virus'}
                          {result.disease.type === 'parasitic' && 'Parasite'}
                          {result.disease.type === 'fungal' && 'Fongique'}
                        </span>
                        <span>•</span>
                        <span>{result.disease.organ}</span>
                        {result.disease.severity === 'life-threatening' && (
                          <>
                            <span>•</span>
                            <span className="text-red-600 font-medium flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Grave
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  {/* Conduite à tenir */}
                  {result.disease.antibiotherapy.probabilistic.length > 0 && (
                    <div className="p-3 bg-blue-50 rounded border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Pill className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-blue-900 mb-1">
                            {result.disease.antibiotherapy.probabilistic[0].name}
                          </p>
                          {result.disease.antibiotherapy.probabilistic[0].molecules[0] && (
                            <p className="text-xs text-blue-700">
                              <span className="font-semibold">
                                {result.disease.antibiotherapy.probabilistic[0].molecules[0].name}
                              </span>
                              {' '}
                              {result.disease.antibiotherapy.probabilistic[0].molecules[0].dosage}
                              {' '}
                              {result.disease.antibiotherapy.probabilistic[0].molecules[0].frequency}
                              {' • '}
                              {result.disease.antibiotherapy.probabilistic[0].molecules[0].duration}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Critères diagnostiques */}
                  {result.disease.diagnostic.clinical.major.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Critères: </span>
                      {result.disease.diagnostic.clinical.major.slice(0, 2).join(' • ')}
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun résultat trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer minimaliste */}
      <footer className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-gray-500">
            SPILF • SFAR • SRLF • FRAR 2024-2026
          </p>
        </div>
      </footer>
    </div>
  );
}
