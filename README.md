# Bharath Chandra Katam — Portfolio Website

Professional portfolio for Bharath Chandra Katam, QA Engineer & SDET.

---

## 📁 Folder Structure

```
bharath-portfolio/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   │   └── profile.jpg        ← Add headshot here (optional)
│   └── resume/
│       └── Bharath_Chandra_Katam_Resume.pdf  ← Add resume PDF here
└── README.md
```

---

## ✅ Things to complete before publishing

| Item | Action |
|---|---|
| Resume PDF | Place in `assets/resume/` named `Bharath_Chandra_Katam_Resume.pdf` |
| Profile photo | Place in `assets/images/` named `profile.jpg` (optional — initials placeholder shows if absent) |

All links (LinkedIn, GitHub, email, live app) are already filled in from the resume.

---

## 🚀 Deploy to GitHub Pages

**Step 1 — Create a GitHub repository**
1. Go to https://github.com/new
2. Name it `portfolio`
3. Set to **Public**, do NOT initialize with README
4. Click **Create repository**

**Step 2 — Push files**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
git push -u origin main
```

**Step 3 — Enable GitHub Pages**
1. Repo → **Settings** → **Pages**
2. Source: `main` branch, `/ (root)` folder → **Save**

**Step 4 — Live at:**
```
https://YOUR_GITHUB_USERNAME.github.io/portfolio/
```

**For future updates:**
```bash
git add .
git commit -m "update"
git push
```
