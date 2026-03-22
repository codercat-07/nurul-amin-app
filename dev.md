# 🚀 Dev Log & Deployment Guide — nurul-amin-app

> **Project:** `codercat-07/nurul-amin-app`
> **Vercel Project:** `nurul-amin-app-pvt` (private dashboard)
> **Stack:** Next.js 16.2.0 (Turbopack)

---

## 📦 Project Identity

| | Detail |
|---|---|
| **GitHub Repo** | `codercat-07/nurul-amin-app` — public, anyone can view source |
| **Vercel Project** | `nurul-amin-app-pvt` — private, only you can access dashboard/logs/settings |

---

## 🌐 Live URLs

| Type | URL | Notes |
|---|---|---|
| **Primary Domain** | `nurul-amin-app-pvt.vercel.app` | Permanent — share this one |
| **Deployment URL** | `nurul-amin-app-60h2...vercel.app` | Auto-generated per build, changes every deploy |

---

## ✅ Deployment Status

| Status | Meaning |
|---|---|
| `Ready` | Build succeeded, site is live |
| `Building` | Currently compiling your latest push |
| `Error` | Build failed — check the Vercel dashboard logs |

> **Commit SHA** — e.g. `e37aa24` — identifies exactly which version of your code is deployed. Every `git push` creates a new SHA and a new deployment.

---

## ⚙️ How a Deployment Works

```
You edit code  →  git push  →  Vercel builds  →  Site is live!
```

1. Make changes locally
2. Run `git push` to GitHub
3. Vercel detects the push and auto-triggers a new build
4. In ~30–60s your live site is updated

---

## 🔧 Local Development

```bash
# Start the dev server (use cmd on Windows if PowerShell blocks npm)
cmd /c "npm run dev"

# Available at:
# Local:   http://localhost:3000
# Network: http://192.168.1.103:3000
```

> **Note:** If PowerShell throws `UnauthorizedAccess` for `npm`, use `cmd /c "npm run dev"` instead.

---

## 📤 The 3 Git Commands You'll Always Use

```bash
# 1. Stage all changed files
git add .

# 2. Save a snapshot locally with a descriptive message
git commit -m "your message here"

# 3. Upload to GitHub → triggers Vercel redeploy automatically
git push
```

---

## 🔐 Environment Variables

Your `.env` file is listed in `.gitignore` — it is **never uploaded to GitHub**. This protects secrets like Clerk keys, Supabase URLs, etc.

Vercel still needs them to run your app. Add them manually:

**Vercel Dashboard → Project → Settings → Environment Variables**

Common secrets to add:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Any other keys from your `.env.local`

---

## 📋 Deployment Checklist

- [ ] All changes committed and pushed (`git add . && git commit -m "..." && git push`)
- [ ] Vercel dashboard shows `Ready` status
- [ ] Environment variables are set in Vercel settings
- [ ] Test the live URL: `nurul-amin-app-pvt.vercel.app`
- [ ] Double-check the deployment URL for the specific build if needed

---

## 🗂️ Dev Log

| Date | Commit | Notes |
|---|---|---|
| 2026-03-21 | `e37aa24` | Initial commit — first Vercel deployment |
| 2026-03-22 | — | Local dev server running on Next.js 16.2.0 Turbopack |
