# Deployment Guide

## 🚀 Deploying Tanveer Portfolio OS

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/tanveer-portfolio-os.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Environment Variables**
   Add these in Vercel dashboard:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

4. **Deploy**
   Click "Deploy" and your portfolio will be live!

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=dist`

### Option 3: Static Hosting (Any CDN)

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder**
   - Upload to your preferred hosting provider
   - Ensure `index.html` is at the root

## 🔧 Post-Deployment Setup

### 1. Update Site URL
Update the `APP_URL` environment variable with your deployed URL.

### 2. Configure Analytics (Optional)
Add your analytics keys:
- Google Analytics
- PostHog
- Plausible

### 3. Set Up Contact Form (Optional)
Configure SMTP settings for email notifications:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Configure Cloudinary (Optional)
For image uploads:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🔄 Continuous Deployment

### GitHub Actions (Vercel)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🛠️ Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 Errors on Refresh
Ensure your hosting provider is configured for SPA routing:
- **Vercel**: Automatic
- **Netlify**: Add `_redirects` file with `/* /index.html 200`
- **Apache**: Add `.htaccess` with rewrite rules

### Admin Panel Not Loading
Check that `admin.html` is in the `dist` folder after build.

## 📊 Monitoring

### Uptime Monitoring
Recommended services:
- UptimeRobot (free tier)
- Pingdom
- StatusCake

### Error Tracking
- Sentry (recommended)
- LogRocket
- Bugsnag

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Add security headers
- [ ] Enable DDoS protection (Cloudflare recommended)

## 💡 Pro Tips

1. **Use a CDN** for faster global loading
2. **Enable gzip compression** on your server
3. **Set up caching** for static assets
4. **Monitor Core Web Vitals** in Google Search Console
5. **Regular backups** of your database

---

Need help? Open an issue on GitHub!