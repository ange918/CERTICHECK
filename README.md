# FuturCertify

Projet fullstack Express + React + Vite + Drizzle ORM

## Prérequis
- Node.js >= 18
- npm >= 9
- (Optionnel) PostgreSQL pour la production

## Installation

```bash
npm install
```

## Variables d'environnement

Créez un fichier `.env` à la racine du projet (voir `.env.example`).

- `PORT` : Port d'écoute du serveur (par défaut 5000)
- `DATABASE_URL` : URL de connexion à la base PostgreSQL (obligatoire en production)

## Développement

```bash
npm run dev
```

- Le serveur Express démarre sur le port défini par `PORT` (5000 par défaut).
- Le frontend React est servi via Vite.

## Build

```bash
npm run build
```

- Génère le build frontend et bundle le backend dans `dist/`.

## Lancement en production

```bash
npm start
```

- Démarre le serveur sur le port défini par `PORT`.

## Déploiement sur Vercel

1. Poussez le projet sur GitHub.
2. Connectez le repo à Vercel.
3. Ajoutez les variables d'environnement dans le dashboard Vercel (`DATABASE_URL`, `PORT` si besoin).
4. Vercel détectera automatiquement le projet (Node.js + Vite) et utilisera les scripts `build` et `start`.

## Scripts npm
- `dev` : Démarrage développement
- `build` : Build frontend + backend
- `start` : Lancement production
- `check` : Vérification TypeScript
- `db:push` : Migration Drizzle ORM

## Structure du projet
- `client/` : Frontend React
- `server/` : Backend Express
- `shared/` : Schémas partagés (Zod, types)

## Auteur
- [Votre nom] 