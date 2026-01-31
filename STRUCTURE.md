# Structure du Projet - Infectio Cardiomaine

## Architecture

Ce projet est une application **Next.js 16** avec **PWA** pour le diagnostic et la prise en charge des infections.

## Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **PWA**: @ducanh2912/next-pwa
- **Search**: Fuse.js (recherche floue)
- **Icons**: Lucide React

## Structure des Dossiers

```
/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Page d'accueil (recherche POPI)
│   ├── layout.tsx                # Layout principal
│   ├── globals.css               # Styles globaux + Tailwind
│   ├── antibiotherapy/           # Page antibiothérapie
│   ├── disease/[id]/             # Pages détail pathologies
│   └── guidelines/               # Page recommandations
│
├── lib/                          # Logique métier
│   ├── data/
│   │   └── sample-diseases.ts    # Base de données pathologies (33+)
│   ├── services/
│   │   └── diagnostic-search.ts  # Moteur de recherche
│   └── types/
│       └── infections.ts         # Types TypeScript
│
├── components/                   # Composants réutilisables
│   └── install-guide.tsx        # Guide installation PWA
│
├── public/                       # Assets statiques
│   ├── manifest.json            # Manifest PWA
│   └── icons/                   # Icônes application
│
└── Configuration
    ├── next.config.mjs          # Config Next.js + PWA
    ├── tailwind.config.ts       # Config Tailwind
    ├── tsconfig.json            # Config TypeScript
    └── postcss.config.mjs       # Config PostCSS
```

## Base de Données

33+ pathologies infectieuses documentées:
- **Infections bactériennes**: Pneumonie, cystite, méningite, pyélonéphrite, érysipèle, endocardite, angine, sinusite, otite, impétigo, IST
- **Infections virales**: Grippe, COVID-19, bronchite, zona, mononucléose, hépatite A
- **Infections parasitaires**: Paludisme, toxoplasmose, giardiase
- **Infections digestives**: Gastro-entérite
- **Sepsis et états critiques**

Chaque pathologie contient:
- Critères diagnostiques complets
- Antibiothérapie probabiliste et documentée
- Posologies précises avec adaptations
- Données de résistance (FRAR)
- Recommandations SPILF/SFAR/SRLF/HAS

## Installation

```bash
npm install
npm run dev
```

## Commandes

- `npm run dev` - Serveur de développement
- `npm run build` - Build production
- `npm run start` - Serveur production
- `npm run lint` - Lint ESLint

## PWA

L'application est installable sur:
- iOS (Safari)
- Android (Chrome)
- Desktop (Chrome, Edge)

Le bouton "Installer" apparaît automatiquement dans le header.

## Notes Techniques

- **Pas de localStorage**: Toutes les données sont en mémoire (pas de persistence côté client)
- **Moteur de recherche**: Fuse.js avec scoring de pertinence
- **Responsive**: Mobile-first design
- **Mode POPI**: Interface épurée centrée sur la recherche
