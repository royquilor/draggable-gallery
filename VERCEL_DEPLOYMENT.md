# 🚀 Vercel Deployment Guide

Complete guide for deploying the gallery to Vercel using the free domain.

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [x] `npm run build` succeeds locally
- [x] No TypeScript errors
- [x] All features tested locally
- [x] Git repository initialized and pushed to GitHub/GitLab/Bitbucket

---

## 🚀 Quick Deploy (5 minutes)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Gallery ready for deployment"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Get Your Free Domain**
   - After deployment, Vercel provides a free domain like: `your-project.vercel.app`
   - You can customize it in Project Settings → Domains

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

---

## ⚙️ Environment Variables

### Automatic (No Setup Needed)

Vercel automatically provides:
- `VERCEL_URL` - Your deployment URL (e.g., `your-project.vercel.app`)

The code automatically uses this if `NEXT_PUBLIC_BASE_URL` is not set.

### Optional: Set Custom Base URL

If you want to use a custom domain later:

1. Go to **Project Settings → Environment Variables**
2. Add:
   ```
   NEXT_PUBLIC_BASE_URL=https://your-custom-domain.com
   ```
3. Redeploy

**Note:** For the free Vercel domain, you don't need to set this - it works automatically!

---

## 🔍 Verify Deployment

After deployment, check:

### 1. **Sitemap**
```
https://your-project.vercel.app/sitemap.xml
```
Should show your pages with correct URLs.

### 2. **Robots.txt**
```
https://your-project.vercel.app/robots.txt
```
Should show crawler rules and sitemap reference.

### 3. **Gallery Page**
```
https://your-project.vercel.app/gallery
```
Should load and work correctly.

### 4. **Structured Data**
- Open browser DevTools
- Check `<script type="application/ld+json">` in page source
- Should contain ImageGallery schema

---

## 🎯 Post-Deployment

### 1. **Test All Features**
- [ ] Gallery loads correctly
- [ ] Drag/swipe works
- [ ] Modal opens/closes
- [ ] Keyboard navigation works
- [ ] Dark mode works
- [ ] Images load properly

### 2. **SEO Verification**
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Meta tags in page source
- [ ] Structured data present

### 3. **Performance Check**
- [ ] Fast initial load
- [ ] Smooth animations
- [ ] Images optimized
- [ ] No console errors

---

## 🔧 Custom Domain (Optional)

If you want to use your own domain later:

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Update Environment Variable**
   - Set `NEXT_PUBLIC_BASE_URL` to your custom domain
   - Redeploy

3. **SSL Certificate**
   - Vercel automatically provides SSL for all domains
   - No additional setup needed

---

## 📊 Vercel Features Used

### Automatic Features:
- ✅ **Next.js Optimization** - Automatic
- ✅ **Image Optimization** - Automatic
- ✅ **Edge Network** - Global CDN
- ✅ **SSL Certificate** - Automatic HTTPS
- ✅ **Preview Deployments** - For every Git push
- ✅ **Analytics** - Available in Vercel dashboard

### Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Custom domain support

---

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Make sure all dependencies are in package.json
npm install
npm run build
```

**Error: TypeScript errors**
```bash
# Fix TypeScript errors locally first
npx tsc --noEmit
```

### Images Not Loading

**Check:**
- `next.config.ts` has correct `remotePatterns`
- Image URLs are valid
- Network tab shows 200 status codes

### Sitemap/Robots Not Working

**Check:**
- Files are in `app/` directory (not `src/app/`)
- Files are named correctly (`sitemap.ts`, `robots.ts`)
- No build errors related to these files

### Environment Variables Not Working

**Check:**
- Variable name is correct (`NEXT_PUBLIC_BASE_URL`)
- Variable is set in Vercel dashboard
- Project has been redeployed after adding variable

---

## 📝 Deployment Checklist

Before deploying:
- [ ] Code pushed to Git repository
- [ ] `npm run build` succeeds locally
- [ ] No TypeScript errors
- [ ] All features tested
- [ ] Environment variables configured (if needed)

After deployment:
- [ ] Site loads correctly
- [ ] Gallery works
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] No console errors
- [ ] Performance is good

---

## 🎉 You're Live!

Once deployed, your gallery will be available at:
```
https://your-project.vercel.app/gallery
```

**Share it with the world!** 🌍

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains on Vercel](https://vercel.com/docs/custom-domains)

---

## 💡 Pro Tips

1. **Preview Deployments**: Every Git push creates a preview URL - great for testing!
2. **Analytics**: Enable Vercel Analytics in project settings for insights
3. **Speed Insights**: Enable Speed Insights to monitor Core Web Vitals
4. **Automatic Deployments**: Connect GitHub for automatic deployments on push
5. **Environment Variables**: Use different values for Preview vs Production

---

**Happy Deploying! 🚀**
