# Papa's Retirement Countdown

A simple, cute static site counting down to Papa's retirement with an outfit transition and fireworks on the big day.

## 📅 Retirement Date
By default, the target is set to **2026-02-28** (91 days from 2025-11-29). To change:
- Edit `assets/js/countdown.js`
- Update this line:

```js
const targetDate = new Date('2026-02-28T00:00:00');
```

## 🧱 Structure
- `index.html` — Main page
- `assets/css/reset.css` — Minimal CSS reset
- `assets/css/styles.css` — Layout, theme, and character styles
- `assets/js/countdown.js` — Countdown logic + events
- `assets/js/animation.js` — Dad outfit transition and bobbing
- `assets/js/fireworks.js` — Fireworks on retirement day
- `assets/images/` — (Placeholder folder if you add images)
- `pages/` — Extra pages if you want later

## 🚀 Quick Start
Just open `index.html` in your browser.

On macOS you can also run a simple server:

```zsh
python3 -m http.server --directory /Users/ridzie/countdown 8080
```
Then visit: http://localhost:8080/

## ✨ Customization Tips
- **Texts:** Update header/subtitle or `#statusText` in `index.html`.
- **Styles:** Tweak theme colors in `assets/css/styles.css`.
- **Animation:** Adjust thresholds in `assets/js/animation.js` and urgency states in CSS.

## 🧪 Testing the Celebration
To see fireworks immediately, temporarily set `targetDate` to today in `assets/js/countdown.js`, reload, and enjoy.

## 📦 No dependencies
This is a pure static site: no build step, no frameworks.
