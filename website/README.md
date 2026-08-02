# Beleef de Recreatiebranche — Prototype

Deze map bevat een statische prototype-website gebouwd voor de HISWA-RECRON hackathon.

Quick start (lokal):

1. Open een eenvoudige HTTP-server in de map `website` (voorbeeld met Python):

```bash
# Python 3
python -m http.server 8000

# bezoek: http://localhost:8000/
```

Ontwerp highlights:
- Kiosk-mode: korte ronde (~45s), reset instant, geen login
- Shareable link: dezelfde URL werkt voor scholen
- Offline-first: service worker cache
- Privacy: geen persoonlijke data, alleen anonieme tellers

Aanpassen inhoud:
- Pas rollen aan in `app.js` variabele `roles`.
- Vervang `vacancyLink` in `app.js` met het echte HISWA-RECRON vacaturesysteem.

Deployment:
- Deze prototype map kan gedeployed worden op Netlify, GitHub Pages, of een eenvoudige static host.
