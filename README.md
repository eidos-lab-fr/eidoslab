# eidoslab.fr

Site d'Eidos Lab : un seul `index.html`, sans framework ni étape de build.

- `assets/js/data.js` : le catalogue des projets (une entrée par projet, descriptions fr / en / es). Ajouter un projet = ajouter une entrée.
- `assets/js/i18n.js` : tous les textes d'interface, dans les trois langues.
- `assets/js/art.js` : les illustrations vectorielles des cartes sans capture d'écran.
- `assets/js/robot.js` : E1D0, le robot (déplacements, scan des cartes, réactions).
- `assets/js/shell.js` : le terminal intégré (touche `/`).
- `assets/js/main.js` : rendu, filtres, thème, journal GitHub en direct.
- `vercel.json` : en-têtes de sécurité (CSP stricte, aucun script inline).

## Lancer en local

```bash
python3 -m http.server 4173
```

## Déploiement

Hébergé sur Vercel (`vercel deploy --prod`), domaine `eidoslab.fr`.
