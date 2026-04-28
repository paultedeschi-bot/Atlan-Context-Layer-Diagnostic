# Atlan Context Layer Diagnostic

An interactive AI readiness diagnostic tool built for Atlan Customer Success conversations.

## What it does

- Score a customer across 5 AI readiness dimensions live in a meeting
- See results as a radar chart with prioritised recommendations
- Visualise gaps across Atlan's 4 Context Layer graphs (Data Graph, Knowledge Graph, Active Ontology, Governance Graph)
- Team-aware insights that adapt to Finance, Marketing, Engineering, Sales, Operations, or Enterprise-wide

## Deploy to Vercel via GitHub

### Step 1 — Install dependencies locally (optional, for local preview)

```bash
npm install
npm run dev
```

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/atlan-diagnostic.git
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New → Project**
3. Import your GitHub repo (`atlan-diagnostic`)
4. Vercel auto-detects Vite — click **Deploy**
5. Your app is live at `https://atlan-diagnostic.vercel.app` (or similar)

That's it. Every time you push to `main`, Vercel redeploys automatically.

## Tech stack

- React 18 + Vite
- Chart.js + react-chartjs-2 (radar chart)
- Pure CSS (no UI framework)
