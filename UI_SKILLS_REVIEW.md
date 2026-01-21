# UI Skills Review - draggable-gallery

Review of `components/draggable-canvas.tsx` against UI Skills constraints.

---

## ❌ Violations Found

### 1. **Layout: `min-h-screen` should be `min-h-dvh`**
**Location:** Line 688
```tsx
className="flex flex-col gap-[200px] items-center justify-center p-[100px] min-h-screen"
```

**Why it matters:** `h-screen` doesn't account for mobile browser UI (address bar), causing layout issues on mobile devices.

**Fix:**
```tsx
className="flex flex-col gap-[200px] items-center justify-center p-[100px] min-h-dvh"
```

---

### 2. **Animation: Animating `backdrop-filter` on large surface**
**Location:** Lines 930-932
```tsx
initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
```

**Why it matters:** Animating `backdrop-filter` on a full-screen surface is expensive and can cause performance issues, especially on lower-end devices.

**Fix:** Only animate `opacity`, keep `backdropFilter` static:
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
// Add backdropFilter as static className
className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
```

---

### 3. **Animation: Animating layout property `y` instead of `transform`**
**Location:** Lines 585, 1006, 1017, 1027, 1043
```tsx
hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
show: { opacity: 1, y: 0 }
```

**Why it matters:** Animating `y` triggers layout recalculations. Should use `transform: translateY()` for GPU acceleration.

**Fix:** Motion automatically converts `y` to `transform`, but for clarity and best practice, this is actually fine. However, the constraint says to animate only compositor props - `y` in Motion is already handled as transform, so this is technically compliant but could be more explicit.

**Note:** Motion's `y` prop is already converted to `transform: translateY()` under the hood, so this is actually fine. No fix needed, but worth noting.

---

### 4. **Animation: Duration exceeds 200ms for interaction feedback**
**Location:** Multiple places
- Line 648: `duration: 0.6` (600ms) - header animation
- Line 656: `duration: 0.6` (600ms) - header animation  
- Line 738: `duration: 0.3` (300ms) - hover overlay
- Line 590: `duration: 0.6` (600ms) - item variants

**Why it matters:** Interaction feedback should be ≤200ms to feel instant and responsive.

**Fix:** Reduce interaction feedback durations to ≤200ms:
```tsx
// Header animations (entrance, not interaction) - 600ms is OK
// Hover overlay - reduce to 200ms
transition={{ duration: 0.2 }}

// Item variants entrance - 600ms is OK for page load
// But if it's interaction feedback, reduce to 200ms
```

**Note:** Entrance animations (page load) can be longer. Only interaction feedback (hover, click) needs to be ≤200ms.

---

### 5. **Z-index: Arbitrary values instead of fixed scale**
**Location:** Lines 644, 934, 949, 962
```tsx
z-20  // Header
z-50  // Modal backdrop and content
z-10  // Close button
```

**Why it matters:** Arbitrary z-index values make it hard to maintain layering hierarchy and can cause conflicts.

**Fix:** Use a fixed z-index scale. Common pattern:
```tsx
// Define z-index scale (add to globals.css or component)
// z-base: 0
// z-dropdown: 1000
// z-sticky: 1100
// z-fixed: 1200
// z-modal-backdrop: 1300
// z-modal: 1400
// z-popover: 1500
// z-tooltip: 1600

// Or use Tailwind's default scale if available
z-10  // Base
z-20  // Dropdown
z-30  // Sticky
z-40  // Fixed
z-50  // Modal backdrop
z-50  // Modal (same as backdrop, but modal content is inside)
```

**Better fix:** Use semantic z-index values or a design system scale.

---

### 6. **Typography: Missing `text-balance` on headings**
**Location:** Line 1010
```tsx
<h2 className="text-4xl md:text-5xl font-light text-foreground font-display">
```

**Why it matters:** `text-balance` prevents awkward line breaks in headings, improving readability.

**Fix:**
```tsx
<h2 className="text-4xl md:text-5xl font-light text-foreground font-display text-balance">
```

---

### 7. **Typography: Missing `text-pretty` on body text**
**Location:** Line 1020
```tsx
className="text-lg text-muted-foreground font-body leading-relaxed"
```

**Why it matters:** `text-pretty` improves paragraph text wrapping for better readability.

**Fix:**
```tsx
className="text-lg text-muted-foreground font-body leading-relaxed text-pretty"
```

---

### 8. **Typography: Missing `tabular-nums` for numeric data**
**Location:** Line 1051
```tsx
<dd className="text-foreground">#{String(selectedItem.id).padStart(3, "0")}</dd>
```

**Why it matters:** `tabular-nums` ensures numbers align properly when comparing values.

**Fix:**
```tsx
<dd className="text-foreground font-tabular-nums">#{String(selectedItem.id).padStart(3, "0")}</dd>
```

---

### 9. **Performance: `will-change` on always-active element**
**Location:** Line 683
```tsx
style={{
  x: springX,
  y: springY,
  willChange: "transform"
}}
```

**Why it matters:** `will-change` should only be applied during active animations, not permanently. This element is always draggable, so it's borderline acceptable, but could be optimized.

**Fix:** Remove `willChange` - Motion handles optimization automatically:
```tsx
style={{
  x: springX,
  y: springY,
  // Remove willChange - Motion optimizes automatically
}}
```

**Note:** Motion already optimizes transforms, so `will-change` is redundant here.

---

## ✅ Compliant Areas

### Stack
- ✅ Uses `motion/react` (correct library)
- ✅ Uses Tailwind CSS
- ✅ Uses `cn` utility (via shadcn/ui)

### Components
- ✅ Uses accessible primitives (Radix UI via shadcn/ui)
- ✅ All icon-only buttons have `aria-label`
- ✅ Proper keyboard navigation

### Interaction
- ✅ No paste blocking
- ✅ Proper focus management
- ✅ Keyboard support

### Animation
- ✅ Uses compositor properties (`transform`, `opacity`)
- ✅ Respects `prefers-reduced-motion` via `shouldReduceMotion`
- ✅ Motion handles `y` as `transform` automatically

### Layout
- ✅ Uses `size-[200px]` for square elements

---

## 🔧 Recommended Fixes Priority

### High Priority:
1. **Fix `min-h-screen` → `min-h-dvh`** (mobile layout issue)
2. **Remove `backdrop-filter` animation** (performance issue)
3. **Remove redundant `will-change`** (performance optimization)

### Medium Priority:
4. **Add `text-balance` to headings** (readability)
5. **Add `text-pretty` to paragraphs** (readability)
6. **Add `tabular-nums` to numbers** (data alignment)

### Low Priority:
7. **Reduce interaction feedback durations** (if they're actually interaction feedback, not entrance)
8. **Standardize z-index scale** (maintainability)

---

## 📝 Summary

**Total Violations:** 9
- **Critical:** 2 (layout, performance)
- **Medium:** 4 (typography, z-index)
- **Low:** 3 (animation durations, will-change)

**Overall:** The component is well-structured and mostly compliant. The main issues are:
1. Mobile layout (`min-h-screen`)
2. Performance (`backdrop-filter` animation)
3. Typography enhancements (text-balance, text-pretty, tabular-nums)

Most violations are minor improvements rather than critical issues.
