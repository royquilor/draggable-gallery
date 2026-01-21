# 🧪 Testing Guide - Draggable Gallery

Complete guide to testing all features of the gallery application.

---

## 🚀 Quick Start

### 1. Start the Development Server

```bash
cd draggable-gallery
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.4
- Local:        http://localhost:3000
- Ready in 2.3s
```

### 2. Open the Gallery

Navigate to:
```
http://localhost:3000/gallery
```

---

## ✅ Visual Checks (What You Should See)

### Initial Load
- ✅ **Header** - "Gallery" title on the left, "Drag to explore" on the right
- ✅ **Grid of images** - 12 sample images in a responsive grid
- ✅ **Smooth animations** - Images fade in with a stagger effect
- ✅ **Background** - Matches your system theme (light/dark)

### Layout
- **Mobile** (< 768px): 2 columns
- **Tablet** (768px - 1024px): 3 columns  
- **Desktop** (> 1024px): 4 columns

---

## 🖱️ Interaction Tests

### Test 1: Canvas Dragging
**What to test:**
1. Click and drag anywhere on the canvas
2. Drag in all directions (up, down, left, right, diagonal)
3. Release and observe the bounce-back effect

**Expected behavior:**
- ✅ Canvas moves smoothly with your mouse/touch
- ✅ Bounces back when you reach the edges
- ✅ Smooth spring physics (not janky)
- ✅ Cursor changes to "grabbing" while dragging

**If it doesn't work:**
- Check browser console for errors
- Verify `motion` package is installed: `npm list motion`

---

### Test 2: Image Hover Effects
**What to test:**
1. Hover over any image card
2. Move mouse away
3. Try multiple images

**Expected behavior:**
- ✅ Image scales up slightly (1.05x)
- ✅ Dark gradient overlay appears at bottom
- ✅ Title slides up from bottom
- ✅ Smooth spring animation (not instant)

**If it doesn't work:**
- Check that CSS is loading (inspect element)
- Verify Tailwind classes are applied

---

### Test 3: Click to Open Modal
**What to test:**
1. Click on any image
2. Observe the modal animation
3. Check the modal content

**Expected behavior:**
- ✅ Modal opens with spring animation
- ✅ Backdrop blurs the background
- ✅ Image displays on left side
- ✅ Title, description, and buttons on right
- ✅ Close button (X) in top-right corner
- ✅ Metadata section at bottom

**If it doesn't work:**
- Check browser console for errors
- Verify `@/components/ui/dialog` exists
- Check that images are loading (network tab)

---

### Test 4: Close Modal - ESC Key
**What to test:**
1. Open a modal (click an image)
2. Press the `ESC` key
3. Modal should close

**Expected behavior:**
- ✅ Modal closes smoothly
- ✅ Backdrop fades out
- ✅ Returns to gallery view

**If it doesn't work:**
- Check browser console for errors
- Verify keyboard event listener is working

---

### Test 5: Close Modal - Backdrop Click
**What to test:**
1. Open a modal
2. Click on the dark backdrop (not the modal content)
3. Modal should close

**Expected behavior:**
- ✅ Modal closes when clicking backdrop
- ✅ Modal stays open if clicking inside the modal content

**If it doesn't work:**
- Check event propagation in browser DevTools

---

### Test 6: Keyboard Navigation
**What to test:**
1. Tab to an image card
2. Press `Enter` or `Space` to open modal
3. Press `ESC` to close

**Expected behavior:**
- ✅ Focus ring appears on focused image
- ✅ Enter/Space opens modal
- ✅ ESC closes modal
- ✅ Tab order is logical

**If it doesn't work:**
- Check accessibility attributes in DevTools
- Verify `tabIndex` and `role` attributes

---

### Test 7: URL State Management
**What to test:**
1. Click an image to open modal
2. Check the browser URL bar
3. Refresh the page
4. Use browser back button

**Expected behavior:**
- ✅ URL updates to `?item=1` (or item ID)
- ✅ Refreshing page keeps modal open with same item
- ✅ Browser back button closes modal
- ✅ Browser forward button reopens modal

**If it doesn't work:**
- Check browser console for errors
- Verify `window.history.pushState` is working

---

### Test 8: Dark Mode
**What to test:**
1. Check your system theme preference
2. Gallery should match system theme
3. Toggle system dark mode (macOS: System Settings → Appearance)
4. Gallery should update automatically

**Expected behavior:**
- ✅ Light theme: Light background, dark text
- ✅ Dark theme: Dark background, light text
- ✅ Smooth transition (no flash)
- ✅ All colors update correctly

**If it doesn't work:**
- Check that `ThemeProvider` is in layout.tsx
- Verify `suppressHydrationWarning` is on `<html>`
- Check browser DevTools for theme class on `<html>`

---

### Test 9: Responsive Design
**What to test:**
1. Resize browser window
2. Test on mobile viewport (375px)
3. Test on tablet viewport (768px)
4. Test on desktop viewport (1920px)

**Expected behavior:**
- ✅ Grid adjusts columns based on width
- ✅ Images scale appropriately
- ✅ Modal is readable on all sizes
- ✅ Touch interactions work on mobile

**If it doesn't work:**
- Check Tailwind responsive classes
- Verify viewport meta tag (should be in Next.js by default)

---

### Test 10: Reduced Motion
**What to test:**
1. Enable reduced motion in your OS:
   - **macOS**: System Settings → Accessibility → Display → Reduce motion
   - **Windows**: Settings → Ease of Access → Display → Show animations
2. Reload the gallery page

**Expected behavior:**
- ✅ Animations are minimal or disabled
- ✅ No stagger effects
- ✅ Instant transitions
- ✅ Still functional, just less animated

**If it doesn't work:**
- Check that `useReducedMotion()` hook is used
- Verify `prefers-reduced-motion` media query

---

## 🐛 Common Issues & Solutions

### Issue: Images Not Loading
**Symptoms:** Broken image icons or blank spaces

**Solutions:**
1. Check `next.config.ts` has image domain configured:
   ```ts
   images: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "images.unsplash.com",
       },
     ],
   }
   ```
2. Restart dev server after config changes
3. Check network tab for 403/404 errors
4. Verify image URLs are correct in `SAMPLE_ITEMS`

---

### Issue: TypeScript Errors
**Symptoms:** Red squiggles in IDE or build fails

**Solutions:**
1. Run type check: `npx tsc --noEmit`
2. Check all imports are correct
3. Verify `@/` path alias in `tsconfig.json`
4. Restart TypeScript server in IDE

---

### Issue: Animations Not Working
**Symptoms:** No movement, instant changes

**Solutions:**
1. Verify `motion` package: `npm list motion`
2. Check imports: `import { motion } from "motion/react"`
3. Check browser console for errors
4. Verify CSS is loading (check Network tab)

---

### Issue: Dark Mode Not Working
**Symptoms:** Always light or always dark

**Solutions:**
1. Check `ThemeProvider` is in `layout.tsx`
2. Verify `suppressHydrationWarning` on `<html>`
3. Check `globals.css` has dark mode variables
4. Inspect `<html>` element for `dark` class

---

### Issue: Modal Not Opening
**Symptoms:** Click does nothing

**Solutions:**
1. Check browser console for errors
2. Verify `@/components/ui/dialog` exists
3. Check that `selectedItem` state is updating
4. Verify click handler is attached

---

## 📊 Performance Checks

### Check 1: Initial Load Time
**What to check:**
- Open DevTools → Network tab
- Reload page
- Check "Load" time

**Expected:**
- First load: < 3 seconds
- Subsequent loads: < 1 second (cached)

---

### Check 2: Animation Performance
**What to check:**
- Open DevTools → Performance tab
- Record while dragging/interacting
- Check FPS

**Expected:**
- ✅ 60 FPS during animations
- ✅ No jank or stuttering
- ✅ Smooth drag interactions

---

### Check 3: Image Loading
**What to check:**
- Open DevTools → Network tab
- Filter by "Img"
- Check image sizes and load times

**Expected:**
- ✅ Images load progressively
- ✅ Priority images (first 4) load first
- ✅ Lazy loading for off-screen images

---

## 🎯 Checklist

Use this checklist to verify everything works:

### Core Functionality
- [ ] Server starts without errors
- [ ] Gallery page loads at `/gallery`
- [ ] Images display correctly
- [ ] Canvas drags smoothly
- [ ] Hover effects work
- [ ] Modal opens on click
- [ ] Modal closes with ESC
- [ ] Modal closes on backdrop click
- [ ] URL updates when opening modal
- [ ] Browser back/forward works
- [ ] Dark mode works
- [ ] Responsive design works

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus rings visible
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] Reduced motion respected

### Performance
- [ ] Fast initial load
- [ ] Smooth 60fps animations
- [ ] Images load efficiently
- [ ] No console errors

---

## 🚀 Next Steps After Testing

Once everything works:

1. **Customize the data** - Replace `SAMPLE_ITEMS` with your API
2. **Add features** - Search, filters, pagination
3. **Deploy** - Push to Vercel/Netlify
4. **Optimize** - Add loading states, error handling

---

## 📝 Notes

- All sample images are from Unsplash (free to use)
- The gallery uses Motion library (not Framer Motion)
- Theme follows system preference by default
- All animations respect `prefers-reduced-motion`

---

**Happy Testing! 🎉**
