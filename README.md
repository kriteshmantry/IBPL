# IBPL
Indian Basketball Pro League — the official league website.

A single-page site with a shot-clock loading screen, a playable hoop in the hero, and sections for
About, Teams, Fixtures, Statistics, Gallery, Registrations and Contact us.

## Run locally
No build step. Serve the folder with any static server, for example:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Files
- `index.html` — page structure and copy
- `styles.css` — theme, layout and animations
- `script.js` — loader, hero shot, team/fixture/stat data, gallery and form behaviour

League data (teams, fixtures, standings, leaders, gallery captions) lives at the top of `script.js`.
Forms currently validate and confirm in the browser only; connect them to a backend or form service to receive submissions.
