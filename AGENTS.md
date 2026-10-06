# Bhess7 — Base44 Dev Environment

## Overview
Bhess7 is a pure static chess game (HTML/CSS/JS). No build step, no backend, no
external dependencies beyond a CDN-loaded `chess.js` library. Multiplayer is
stubbed (party codes are generated client-side; no server wiring yet).

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
Serves the static files via nginx on host port 3000. The source directory is
bind-mounted read-only, so editing `index.html`, `script.js`, or `style.css`
and refreshing the browser reflects changes immediately — no rebuild needed.

## Verification
- `curl http://localhost:3000/` returns the HTML page containing `Bhess7`.
- Clicking "Play vs Bot" → adjusting the Elo slider → "Start Game" renders a
  playable 8×8 chess board.

## Notes
- No secrets or external credentials required.
- `chess.js` is loaded from a CDN (`cdnjs.cloudflare.com`); the app needs
  outbound internet access to fully function.
