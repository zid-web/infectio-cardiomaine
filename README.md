# Infectio Cardiomaine

## Moteur de Recherche Diagnostique Infectieux

Application PWA professionnelle pour le diagnostic et la prise en charge des infections bactériennes, virales, parasitaires et fongiques selon les recommandations des sociétés savantes françaises.

### Fonctionnalités principales

- **Moteur de recherche intelligent** : Recherche multi-critères par pathologie, symptômes, pathogènes, organes
- **Base de données enrichie** : Infections bactériennes, virales, parasitaires et fongiques
- **Recommandations actualisées** : SPILF, SFAR, SRLF, FRAR 2024-2026
- **Antibiothérapie adaptée** : Protocoles détaillés avec posologies et adaptations
- **PWA installable** : Disponible sur iOS, Android et Desktop avec guide d'installation interactif
- **Interface moderne** : Design professionnel optimisé pour usage médical
- **Filtres rapides** : Accès rapide aux pathologies fréquentes
- **Algorithmes décisionnels** : Arbres de décision clinique intégrés

### Technologies

- **Next.js 16** : Framework React avec App Router et support PWA
- **TypeScript** : Typage fort pour la sécurité des données médicales
- **Tailwind CSS v4** : Styling moderne et responsive
- **Fuse.js** : Recherche floue intelligente multi-critères
- **PWA** : Application installable multi-plateforme

### Installation et Développement

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

L'application sera disponible sur `http://localhost:3000`

### Structure des données

Chaque pathologie comprend :
- **Critères diagnostiques** : Cliniques, biologiques, imagerie, microbiologie
- **Scores de sévérité** : CRB-65, SOFA, etc.
- **Antibiothérapie** : Probabiliste et documentée avec posologies
- **Adaptations** : Rénales, hépatiques, pédiatriques
- **Données de résistance** : FRAR actualisées
- **Guidelines** : Références SPILF, SFAR, SRLF, HAS
- **Algorithmes décisionnels** : Arbres de décision clinique

### Pathologies disponibles

#### Infections Bactériennes
- Pneumonie communautaire
- Cystite aiguë simple
- Et plus...

#### Infections Virales
- Grippe saisonnière
- COVID-19
- Et plus...

#### Infections Parasitaires
- Paludisme d'importation
- Et plus...

### Recommandations sources

- **SPILF** : Société de Pathologie Infectieuse de Langue Française
- **SFAR** : Société Française d'Anesthésie et de Réanimation
- **SRLF** : Société de Réanimation de Langue Française
- **FRAR** : France Résistance Antibiotique et Réanimation
- **HAS** : Haute Autorité de Santé

### Installation PWA

L'application propose un guide d'installation interactif adapté à chaque plateforme:
- **iOS/Safari** : Instructions step-by-step pour iPhone/iPad
- **Android/Chrome** : Installation depuis Chrome mobile
- **Desktop/Chrome** : Installation en tant qu'application de bureau

### Avertissement

Cette application est un outil d'aide à la décision médicale et ne remplace en aucun cas le jugement clinique du professionnel de santé.

### Mise à jour continue

Les recommandations sont régulièrement actualisées selon les nouvelles guidelines des sociétés savantes.

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
