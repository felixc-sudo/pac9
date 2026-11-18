# CARBONCUT — Carbon Footprint Tracking & Purposeful UI Animations

Static web application demonstrating purposeful **CSS Animations** (`@keyframes`), JavaScript animation lifecycle events (`animationstart`, `animationiteration`, `animationend`), reduced-motion accessibility (`@media (prefers-reduced-motion: reduce)`), an interactive Carbon Footprint Estimator, and a live **CRUD** task checklist.

## Files Included
- `index.html` — Root HTML entry point for GitHub Pages and Vercel.
- `carboncut_kinetic_motion.css` — Keyframe animations, tactile hover transitions, and reduced-motion rules.
- `carboncut_animation_crud.js` — Animation event telemetry logger, carbon calculator, and CRUD task array (`addTask()`).
- `vercel.json` — Zero-config Vercel static deployment configuration.

## GitHub & Vercel Deployment Steps
1. Extract `carboncut_motion_telemetry.zip` and open a terminal inside `carboncut_motion_telemetry`.
2. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Add CARBONCUT purposeful UI animation website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/carboncut-motion-telemetry.git
   git push -u origin main
   ```
3. Open [vercel.com](https://vercel.com), click **Add New → Project**, import `carboncut-motion-telemetry`, keep Framework Preset as **Other**, and click **Deploy**.
