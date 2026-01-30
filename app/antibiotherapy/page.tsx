'use client';

import { useState } from 'react';
import { Pill, Search, Filter, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import Link from 'next/link';

type AntibioticClass = 'beta-lactams' | 'fluoroquinolones' | 'macrolides' | 'aminoglycosides' | 'glycopeptides' | 'other';

interface Antibiotic {
  name: string;
  class: AntibioticClass;
  spectrum: string[];
  indications: string[];
  dosage: string;
  route: string[];
  renalAdjustment: boolean;
  hepaticAdjustment: boolean;
  monitoring: string[];
  sideEffects: string[];
  frarStatus: 'preferred' | 'alternative' | 'restricted';
  cost: 'low' | 'moderate' | 'high';
}

const antibiotics: Antibiotic[] = [
  {
    name: 'Amoxicilline',
    class: 'beta-lactams',
    spectrum: ['Pneumocoque', 'Streptocoques', 'Entérocoques', 'Listeria'],
    indications: ['Pneumonie communautaire', 'Cystite', 'Otite', 'Angine'],
    dosage: '1g x3/jour',
    route: ['PO', 'IV'],
    renalAdjustment: true,
    hepaticAdjustment: false,
    monitoring: ['Signes d\'allergie', 'Tolérance digestive'],
    sideEffects: ['Diarrhée', 'Allergie', 'Candidose'],
    frarStatus: 'preferred',
    cost: 'low',
  },
  {
    name: 'Ceftriaxone',
    class: 'beta-lactams',
    spectrum: ['Pneumocoque', 'Entérobactéries', 'Haemophilus', 'Neisseria'],
    indications: ['Pneumonie sévère', 'Méningite', 'Pyélonéphrite', 'Infections ostéo-articulaires'],
    dosage: '1-2g x1/jour',
    route: ['IV', 'IM'],
    renalAdjustment: false,
    hepaticAdjustment: true,
    monitoring: ['Fonction hépatique', 'NFS'],
    sideEffects: ['Diarrhée', 'Lithiase biliaire', 'Allergie'],
    frarStatus: 'preferred',
    cost: 'moderate',
  },
  {
    name: 'Lévofloxacine',
    class: 'fluoroquinolones',
    spectrum: ['Large spectre Gram+ et Gram-', 'Atypiques', 'Legionella'],
    indications: ['Legionellose', 'Pneumonie avec CI bêta-lactamines', 'Pyélonéphrite compliquée'],
    dosage: '500mg x1-2/jour',
    route: ['PO', 'IV'],
    renalAdjustment: true,
    hepaticAdjustment: false,
    monitoring: ['ECG (QT)', 'Glycémie', 'Tendons'],
    sideEffects: ['Tendinopathie', 'Allongement QT', 'Photosensibilisation', 'Troubles neuropsychiatriques'],
    frarStatus: 'restricted',
    cost: 'moderate',
  },
  {
    name: 'Fosfomycine-trométamol',
    class: 'other',
    spectrum: ['E. coli', 'Entérobactéries'],
    indications: ['Cystite simple'],
    dosage: '3g dose unique',
    route: ['PO'],
    renalAdjustment: true,
    hepaticAdjustment: false,
    monitoring: ['Évolution clinique'],
    sideEffects: ['Diarrhée', 'Nausées'],
    frarStatus: 'preferred',
    cost: 'low',
  },
];

export default function AntibiotherapyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<AntibioticClass | 'all'>('all');
  const [selectedFrarStatus, setSelectedFrarStatus] = useState<'all' | 'preferred' | 'alternative' | 'restricted'>('all');

  const filteredAntibiotics = antibiotics.filter((ab) => {
    const matchesSearch =
      ab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ab.indications.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ab.spectrum.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesClass = selectedClass === 'all' || ab.class === selectedClass;
    const matchesFrar = selectedFrarStatus === 'all' || ab.frarStatus === selectedFrarStatus;

    return matchesSearch && matchesClass && matchesFrar;
  });

  const classLabels: Record<AntibioticClass | 'all', string> = {
    all: 'Toutes classes',
    'beta-lactams': 'Bêta-lactamines',
    fluoroquinolones: 'Fluoroquinolones',
    macrolides: 'Macrolides',
    aminoglycosides: 'Aminosides',
    glycopeptides: 'Glycopeptides',
    other: 'Autres',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Antibiothérapie</h1>
                <p className="text-xs text-muted-foreground">Recommandations SPILF • FRAR</p>
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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Pill className="w-4 h-4" />
              Guide antibiothérapie 2024-2026
            </div>
            
            <h1 className="text-4xl font-bold text-balance">
              Antibiothérapie
              <span className="block text-primary mt-2">Adaptée et Raisonnée</span>
            </h1>
            
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Protocoles antibiotiques selon les recommandations SPILF et FRAR avec adaptation posologique et stratégies d&apos;épargne
            </p>
          </div>

          {/* FRAR Alert */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-900">
              <p className="font-medium mb-1">Épargne antibiotique - FRAR 2025</p>
              <p className="text-orange-700">
                Privilégiez les antibiotiques de 1ère intention. Évitez les fluoroquinolones et les céphalosporines de 3G sauf indication spécifique.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par antibiotique, indication, pathogène..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-border bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2 flex-1 min-w-[200px]">
                <label className="block text-sm font-medium">Classe antibiotique</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as AntibioticClass | 'all')}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  {Object.entries(classLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 flex-1 min-w-[200px]">
                <label className="block text-sm font-medium">Statut FRAR</label>
                <select
                  value={selectedFrarStatus}
                  onChange={(e) => setSelectedFrarStatus(e.target.value as typeof selectedFrarStatus)}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="all">Tous statuts</option>
                  <option value="preferred">Préféré</option>
                  <option value="alternative">Alternative</option>
                  <option value="restricted">Restreint</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-muted-foreground">
              {filteredAntibiotics.length} antibiotique{filteredAntibiotics.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Antibiotics Grid */}
          <div className="grid gap-6">
            {filteredAntibiotics.map((antibiotic, index) => (
              <div
                key={antibiotic.name}
                className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all p-6 space-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{antibiotic.name}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          antibiotic.frarStatus === 'preferred'
                            ? 'bg-green-100 text-green-700'
                            : antibiotic.frarStatus === 'alternative'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {antibiotic.frarStatus === 'preferred' && 'Préféré'}
                        {antibiotic.frarStatus === 'alternative' && 'Alternative'}
                        {antibiotic.frarStatus === 'restricted' && 'Restreint'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {classLabels[antibiotic.class]}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Coût: {antibiotic.cost === 'low' ? '€' : antibiotic.cost === 'moderate' ? '€€' : '€€€'}
                    </span>
                  </div>
                </div>

                {/* Dosage */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Pill className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Posologie</span>
                  </div>
                  <p className="text-base font-mono font-semibold text-primary">
                    {antibiotic.dosage}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Voies: {antibiotic.route.join(', ')}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Spectrum */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Spectre
                    </h4>
                    <ul className="space-y-1">
                      {antibiotic.spectrum.map((spec) => (
                        <li key={spec} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Indications */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Indications principales
                    </h4>
                    <ul className="space-y-1">
                      {antibiotic.indications.map((ind) => (
                        <li key={ind} className="text-sm text-muted-foreground">
                          • {ind}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Monitoring */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Surveillance
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {antibiotic.monitoring.map((mon) => (
                      <span
                        key={mon}
                        className="px-2 py-1 rounded text-xs bg-orange-50 text-orange-700 border border-orange-200"
                      >
                        {mon}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Adjustments */}
                <div className="flex flex-wrap gap-3 pt-3 border-t border-border">
                  {antibiotic.renalAdjustment && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>Adaptation rénale</span>
                    </div>
                  )}
                  {antibiotic.hepaticAdjustment && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>Adaptation hépatique</span>
                    </div>
                  )}
                </div>

                {/* Side Effects */}
                {antibiotic.sideEffects.length > 0 && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-medium">
                      Effets indésirables ({antibiotic.sideEffects.length})
                    </summary>
                    <ul className="mt-2 space-y-1 pl-4">
                      {antibiotic.sideEffects.map((effect) => (
                        <li key={effect} className="text-xs text-muted-foreground">
                          • {effect}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredAntibiotics.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun résultat</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
