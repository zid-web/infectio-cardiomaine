'use client';

import { use } from 'react';
import { ArrowLeft, Activity, AlertCircle, Pill, Microscope, BookOpen, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { sampleDiseases } from '@/lib/data/sample-diseases';

export default function DiseasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const disease = sampleDiseases.find((d) => d.id === id);

  if (!disease) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Pathologie non trouvée</h1>
          <Link href="/" className="text-primary hover:underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour</span>
            </Link>
            
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">{disease.name}</h1>
              <p className="text-xs text-muted-foreground">
                {disease.commonNames[0]}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  disease.severity === 'life-threatening'
                    ? 'bg-red-100 text-red-700'
                    : disease.severity === 'severe'
                    ? 'bg-orange-100 text-orange-700'
                    : disease.severity === 'moderate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {disease.severity === 'life-threatening' && 'Grave'}
                {disease.severity === 'severe' && 'Sévère'}
                {disease.severity === 'moderate' && 'Modérée'}
                {disease.severity === 'mild' && 'Légère'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Quick Info */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-xl border border-border p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold">
                    {disease.type === 'bacterial' && 'Bactérienne'}
                    {disease.type === 'viral' && 'Virale'}
                    {disease.type === 'fungal' && 'Fongique'}
                    {disease.type === 'parasitic' && 'Parasitaire'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organe</p>
                  <p className="font-semibold">{disease.organ}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Territoire</p>
                  <p className="font-semibold">
                    {disease.territory === 'community' && 'Communautaire'}
                    {disease.territory === 'nosocomial' && 'Nosocomial'}
                    {disease.territory === 'both' && 'Les deux'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Epidemiology */}
          {disease.epidemiology && (
            <section className="bg-white rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Épidémiologie
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {disease.epidemiology.incidence && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Incidence</p>
                    <p className="text-base">{disease.epidemiology.incidence}</p>
                  </div>
                )}
                {disease.epidemiology.seasonality && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Saisonnalité</p>
                    <p className="text-base">{disease.epidemiology.seasonality}</p>
                  </div>
                )}
              </div>
              {disease.epidemiology.riskFactors.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Facteurs de risque</p>
                  <div className="flex flex-wrap gap-2">
                    {disease.epidemiology.riskFactors.map((factor) => (
                      <span
                        key={factor}
                        className="px-3 py-1 rounded-lg bg-orange-50 text-orange-700 text-sm border border-orange-200"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Diagnostic Criteria */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Microscope className="w-5 h-5 text-primary" />
              Critères Diagnostiques
            </h2>

            {/* Clinical */}
            <div>
              <h3 className="font-semibold mb-3">Critères cliniques</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">Critères majeurs</p>
                  <ul className="space-y-1.5">
                    {disease.diagnostic.clinical.major.map((criterion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0 mt-1.5" />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {disease.diagnostic.clinical.minor && disease.diagnostic.clinical.minor.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-2">Critères mineurs</p>
                    <ul className="space-y-1.5">
                      {disease.diagnostic.clinical.minor.map((criterion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Biological */}
            <div>
              <h3 className="font-semibold mb-3">Marqueurs biologiques</h3>
              <ul className="space-y-1.5">
                {disease.diagnostic.biological.supportive.map((marker, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span>{marker}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Imaging */}
            {disease.diagnostic.imaging && (
              <div>
                <h3 className="font-semibold mb-3">Imagerie</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1.5">Première intention</p>
                    <ul className="space-y-1">
                      {disease.diagnostic.imaging.firstLine.map((img, index) => (
                        <li key={index} className="text-sm">• {img}</li>
                      ))}
                    </ul>
                  </div>
                  {disease.diagnostic.imaging.findings && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1.5">Signes attendus</p>
                      <ul className="space-y-1">
                        {disease.diagnostic.imaging.findings.map((finding, index) => (
                          <li key={index} className="text-sm">• {finding}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Pathogens */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Microscope className="w-5 h-5 text-primary" />
              Agents Pathogènes
            </h2>
            <div className="space-y-3">
              {disease.pathogens.map((pathogen) => (
                <div
                  key={pathogen.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                >
                  <div>
                    <p className="font-semibold">{pathogen.name}</p>
                    {pathogen.notes && (
                      <p className="text-sm text-muted-foreground">{pathogen.notes}</p>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {pathogen.frequency}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Antibiotherapy */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              Antibiothérapie
            </h2>

            {/* Probabilistic */}
            <div>
              <h3 className="font-semibold mb-4">Traitement probabiliste</h3>
              <div className="space-y-4">
                {disease.antibiotherapy.probabilistic.map((regimen, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-semibold">{regimen.name}</h4>
                          <p className="text-sm text-muted-foreground">{regimen.indication}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            regimen.line === 'first'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {regimen.line === 'first' && '1ère ligne'}
                          {regimen.line === 'alternative' && 'Alternative'}
                        </span>
                      </div>
                    </div>

                    {regimen.molecules.map((molecule, mIndex) => (
                      <div key={mIndex} className="p-3 rounded bg-primary/5 border border-primary/10">
                        <p className="font-semibold text-primary mb-1">{molecule.name}</p>
                        <p className="text-sm font-mono">
                          {molecule.dosage} {molecule.frequency} - {molecule.duration} ({molecule.route})
                        </p>
                        {molecule.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{molecule.notes}</p>
                        )}
                      </div>
                    ))}

                    {regimen.monitoring.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Surveillance</p>
                        <div className="flex flex-wrap gap-2">
                          {regimen.monitoring.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 rounded text-xs bg-orange-50 text-orange-700 border border-orange-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Durée de traitement</p>
              <p className="text-sm text-blue-800">
                <strong>Standard:</strong> {disease.antibiotherapy.duration.standard}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Formes sévères:</strong> {disease.antibiotherapy.duration.severe}
              </p>
              {disease.antibiotherapy.duration.notes && (
                <p className="text-xs text-blue-700 mt-2">{disease.antibiotherapy.duration.notes}</p>
              )}
            </div>
          </section>

          {/* Guidelines */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Références et Recommandations
            </h2>
            <div className="space-y-3">
              {disease.guidelines.map((guideline, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                          {guideline.source}
                        </span>
                        <span className="text-sm text-muted-foreground">{guideline.year}</span>
                      </div>
                      <p className="font-medium">{guideline.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Mise à jour: {guideline.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Version Info */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary text-sm">
            <div>
              <p className="font-medium">Version: {disease.version}</p>
              <p className="text-muted-foreground text-xs">
                Dernière mise à jour: {disease.lastUpdated}
              </p>
            </div>
            {disease.updatedBy && (
              <p className="text-muted-foreground text-xs">Par: {disease.updatedBy}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
