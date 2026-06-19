# Alex — Portfolio

A full-stack developer portfolio built with React + Vite, ready to deploy on Netlify.

## Getting started

```bash
npm install
npm run dev
```

## Deploying to Netlify

### Option 1 — Drag & drop (fastest)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
3. Drag the `dist/` folder onto the page

### Option 2 — Git integration (recommended)
1. Push this folder to a GitHub repo
2. In Netlify: "Add new site" → "Import an existing project" → connect your repo
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Click Deploy

Netlify auto-deploys every time you push to main. ✓

## Customising

### Your info
Edit `src/App.jsx`:
- Replace `Alex` with your name throughout
- Update `PROJECTS` array with your real projects
- Update `SKILLS` object with your actual stack
- Update social links (GitHub, LinkedIn, email)

### Contact form
The form uses Netlify Forms (free). It works automatically once deployed.
To get email notifications: Netlify Dashboard → Forms → your form → Notifications.

### Resume
Drop your `resume.pdf` into the `public/` folder — the "Download CV" button links to it.

### Colours
All colours are in `src/index.css` under `:root`. Change `--purple` to make it yours.
