# TeamUp - Competition Team Matching Platform

A React application to help MBA students find teammates for business case competitions.

## Features
- 📋 Dashboard with notifications
- 🗺️ Browse competitions by category
- 👥 Find compatible teammates
- 👨‍💼 Manage your team
- ⭐ Reputation scores and match percentages

## Tech Stack
- React 18
- Vite (build tool)
- CSS-in-JS styling

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment

### Option 1: Deploy to Netlify (Recommended)
1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git"
4. Connect your GitHub repo
5. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click Deploy!

### Option 2: Deploy to Vercel
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "Add New Project"
4. Import your GitHub repo
5. Select "Create React App" as the framework
6. Click Deploy!

### Option 3: Deploy to GitHub Pages
1. Update `vite.config.js` with:
```javascript
export default {
  base: '/your-repo-name/',
  ...
}
```
2. Run `npm run build`
3. Push the `dist` folder to gh-pages branch

## License
MIT
