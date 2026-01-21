# Gallery Changes Log (How We Achieved the Draggable Gallery Effect)

This file documents the key implementation changes we made to get the current **draggable “canvas” gallery** working and feeling close to the Figma inspiration.

It’s written as a practical “what changed + why” reference so you can keep iterating confidently.

---

## What we built (current behavior)

- **A fixed viewport** (`/gallery`) that acts like a window.
- A **large draggable canvas** (content bigger than the viewport) that you drag around to explore.
- **Small media tiles** (starting around **112px height**) arranged in **rows** with large spacing (Figma-like).
- **Hover** scale feedback and a **click-to-open modal** for detail viewing.
- **Motion** (not Framer Motion) providing smooth GPU-friendly transforms and spring physics.

---

## Files created

- `components/draggable-canvas.tsx`
  - The main draggable gallery component.
- `components/theme-provider.tsx`
  - Wraps `next-themes` for dark mode.
- `components/theme-toggle.tsx`
  - Optional theme toggle button (not required for the gallery to work).
- `app/gallery/page.tsx`
  - The `/gallery` page route that renders the gallery.
- `TESTING_GUIDE.md`
  - Manual test checklist + troubleshooting.

---

## Files modified

- `app/layout.tsx`
  - Wrapped the app with `ThemeProvider`.
  - Switched font to `Inter`.
  - Added `suppressHydrationWarning` to avoid theme hydration warnings.
- `next.config.ts`
  - Allowed loading external images from Unsplash via `images.remotePatterns`.

---

## Core implementation decisions (what matters)

### 1) Motion imports: `motion/react` (NOT `framer-motion`)

**Why:** the repo installs `motion` (the successor library).  
**Change:** all animation imports use:

- `import { motion, AnimatePresence, useReducedMotion } from "motion/react"`

This keeps bundle size smaller and matches the docs in `docs/MOTION_VS_FRAMER.md`.

---

### 2) Fixing Motion TypeScript easing errors

We hit a TS error where Motion’s types rejected cubic-bezier arrays like `[0.22, 1, 0.36, 1]`.

**Fix:** add `as const` so TS treats it as a tuple:

- `ease: [0.22, 1, 0.36, 1] as const`

---

### 3) Theme Provider typing fix (`next-themes`)

We hit a TS error importing `ThemeProviderProps` from `next-themes/dist/types` (that path doesn’t exist).

**Fix:** infer props from the component instead:

- `React.ComponentProps<typeof NextThemesProvider>`

This avoids depending on internal package paths.

---

## How the draggable canvas works (the “gallery effect”)

### 1) The viewport (“window”)

In `components/draggable-canvas.tsx`, the outer container is:

- `fixed inset-0 overflow-hidden`

So:
- The viewport never scrolls.
- You drag the content inside it instead.

---

### 2) The draggable content (“canvas”)

We use a single draggable wrapper:

- `drag` enables 2D dragging.
- `dragConstraints={constraintsRef}` constrains dragging relative to the viewport container.
- `dragElastic={0.1}` adds a subtle rubber-band feel.
- `dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}` controls the bounce physics.

---

### 3) Position state (Figma-style pattern)

To mirror the Figma code pattern, we track the drag offset in state:

- `const [position, setPosition] = useState({ x: 0, y: 0 })`
- `onDrag={(e, info) => setPosition({ x: info.offset.x, y: info.offset.y })}`
- Apply it via `style={{ x: position.x, y: position.y }}`

This makes the “camera” movement explicit and easy to tweak.

---

### 4) Layout style: rows (Figma-like), not CSS Grid

We moved away from a tight CSS grid because the inspiration shows “spaced islands” of content.

Current approach:
- A column of rows: `flex flex-col gap-[200px]`
- Each row: `flex gap-[200px] justify-center items-center`

This gives:
- A lot of whitespace
- Fewer visible items at once
- A strong “explore by dragging” feeling

---

### 5) More items for testing (24 items)

We expanded `SAMPLE_ITEMS` to **24** so you can test:
- Dragging right/left (more tiles in a row)
- Dragging up/down (more rows)

Current grouping:
- **7 items per row** for the first 3 rows (21 items)
- Last row contains the remaining 3 items, centered

---

### 6) Centered “camera” on initial load

Even if the rows are centered, the **dragged canvas** can still start at the “left edge” depending on the wrapper’s default transform.

We added an initial centering step:
- On mount, compute an `x` offset so the **middle item** in a 7-item row starts near the viewport center.
- Apply that via `setPosition({ x: -offsetX, y: 0 })`

This makes the first view feel “focused” and intentional.

---

## What to tweak next (common knobs)

- **Spacing**
  - `gap-[200px]` between tiles and rows
  - `p-[100px]` canvas padding
- **Visible density**
  - Smaller gaps → more visible items without dragging
  - Bigger gaps → more “exploration” feeling
- **Drag feel**
  - `dragElastic` (0.05–0.2)
  - `bounceStiffness` / `bounceDamping`
- **Starting camera**
  - Adjust the initial `offsetX` calculation

---

## Quick “where to look”

- **Main behavior**: `components/draggable-canvas.tsx`
- **Route**: `app/gallery/page.tsx`
- **Theme wrapper**: `components/theme-provider.tsx`
- **External image domains**: `next.config.ts`

