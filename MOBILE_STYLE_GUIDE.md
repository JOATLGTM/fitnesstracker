# 📱 Mobile-First Style Guide - Fitness Tracker

## 🎯 Design Philosophy

This fitness tracker is built with a **mobile-first, app-forward** approach, designed to feel like a native mobile application while running in the browser.

---

## 🎨 Color System

### Background Colors
- `--background: #000000` - Pure black for OLED optimization
- `--background-secondary: #0f0f0f` - Subtle elevation
- `--background-tertiary: #1a1a1a` - Higher elevation
- `--background-elevated: #1f1f1f` - Card backgrounds

### Surface Colors
- `--surface: #151515` - Default surface
- `--surface-hover: #1e1e1e` - Hover states
- `--surface-active: #262626` - Active/pressed states

### Text Colors
- `--foreground: #ffffff` - Primary text (maximum contrast)
- `--foreground-secondary: #a3a3a3` - Secondary text
- `--foreground-tertiary: #737373` - Tertiary/muted text
- `--foreground-disabled: #525252` - Disabled states

### Brand Colors
- `--primary: #ef4444` - Primary red (motivational, energetic)
- `--primary-hover: #dc2626` - Hover state
- `--primary-active: #b91c1c` - Active/pressed state
- `--primary-light: #fca5a5` - Light variant

### Semantic Colors
- `--success: #10b981` - Success states (workouts saved)
- `--error: #ef4444` - Error/delete actions
- `--warning: #f59e0b` - Warning states
- `--info: #3b82f6` - Informational states

---

## 📐 Spacing & Layout

### Touch Targets
- **Minimum:** 44px × 44px (Apple HIG standard)
- **Comfortable:** 48px × 48px (recommended for primary actions)

### Border Radius
- Small: `8px` - Badges, small buttons
- Medium: `14px` - Inputs, cards
- Large: `18px` - Large cards
- XL: `24px` - Modals, prominent elements
- 2XL: `32px` - Hero sections

### Spacing Scale
- xs: `4px`
- sm: `8px`
- md: `16px`
- lg: `24px`
- xl: `32px`
- 2xl: `48px`

### Safe Areas
The app respects device safe areas:
- Notches (iPhone X+)
- Home indicators
- Rounded corners
- Status bars

---

## 🎭 Typography

### Font Stack
Primary: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto'`

### Font Sizes (Mobile-Optimized)
- **Headline:** 32px (2rem) - Page titles
- **Title:** 24px (1.5rem) - Section headers
- **Subtitle:** 20px (1.25rem) - Card titles
- **Body:** 16px (1rem) - Regular text
- **Caption:** 14px (0.875rem) - Secondary text
- **Small:** 12px (0.75rem) - Tertiary text

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## 🎬 Animations & Transitions

### Timing Functions
- **Fast:** 150ms - Micro-interactions
- **Base:** 250ms - Standard transitions
- **Slow:** 350ms - Page transitions, slides
- **Bounce:** 400ms - Playful feedback

### Easing Curves
- Standard: `cubic-bezier(0.4, 0, 0.2, 1)`
- Bounce: `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Key Animations
- `fade-in` - Entry animations
- `slide-up` - Bottom sheet entrances
- `slide-down` - Top bar entrances
- `scale-in` - Modal appearances
- `bounce-subtle` - Button feedback

---

## 🖱️ Interaction Patterns

### Touch Feedback
All interactive elements include:
- **Visual feedback** on tap (scale, color change)
- **Touch ripple effect** (subtle)
- **Active states** (pressed appearance)

### Gestures
- **Tap:** Primary actions
- **Long press:** Secondary/contextual actions
- **Swipe:** Horizontal navigation (workout tabs)
- **Drag:** Reordering exercises
- **Pull-to-refresh:** Data sync (future)

---

## 🧩 Component Guidelines

### Buttons

#### Primary Button
```jsx
<button className="w-full py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden">
  Action
</button>
```

#### Secondary Button
```jsx
<button className="py-4 text-foreground font-bold bg-surface border-2 border-border rounded-xl hover:bg-surface-hover active:bg-surface-active transition-all duration-fast min-h-touch-comfortable">
  Action
</button>
```

### Inputs
```jsx
<input className="w-full px-5 py-4 bg-surface text-foreground text-lg border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast placeholder:text-foreground-tertiary min-h-touch-comfortable" />
```

### Cards
```jsx
<div className="glass rounded-2xl border-2 border-border shadow-lg hover:shadow-xl transition-all duration-slow">
  {/* Content */}
</div>
```

### Modals
- Slide up from bottom on mobile
- Centered on tablets/desktop
- Glass morphism effect
- Backdrop blur
- Safe area padding

---

## 🔧 Mobile Optimizations

### Performance
- GPU acceleration for animations (`translateZ(0)`)
- CSS containment for complex components
- Debounced input handlers
- Optimistic UI updates

### iOS Specific
- `-webkit-tap-highlight-color: transparent` (no gray flash)
- `-webkit-overflow-scrolling: touch` (momentum scrolling)
- `overscroll-behavior: none` (prevent bounce on body)
- `touch-action: manipulation` (disable double-tap zoom)

### Android Specific
- Hardware-accelerated animations
- Proper viewport configuration
- Address bar hiding on scroll

---

## 📊 Accessibility

### WCAG 2.1 AA Compliance
- Minimum 4.5:1 contrast ratio for text
- Minimum 3:1 for UI components
- Touch targets ≥ 44px
- Focus indicators on all interactive elements

### Screen Readers
- Semantic HTML
- ARIA labels on icon buttons
- Descriptive button text
- Proper heading hierarchy

---

## 🎨 Design Patterns

### Glass Morphism
```css
.glass {
  background: rgba(21, 21, 21, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

### Gradient Borders
Used for draggable items and focus states

### Skeleton Loading
Used while data loads to prevent layout shift

### Empty States
- Large icon
- Clear message
- Call to action
- Helpful hint

---

## 📱 Responsive Breakpoints

While mobile-first, the app adapts to larger screens:
- Mobile: < 640px (primary target)
- Tablet: 640px - 1024px
- Desktop: > 1024px (enhanced experience)

---

## 🚀 Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Mobile Score: > 90
- Core Web Vitals: All green

---

## 🎯 User Experience Principles

1. **Speed First** - Every interaction feels instant
2. **Touch Optimized** - Everything is easy to tap
3. **Visual Feedback** - Clear response to every action
4. **Error Prevention** - Confirmation for destructive actions
5. **Progress Indication** - Users always know what's happening
6. **Data Persistence** - Auto-save, never lose work
7. **Offline Ready** - Core features work without connection (future)

---

## 🔥 Key Features

### Visual Design
- Pure black background (OLED optimization)
- Red accent color (motivational, energetic)
- Smooth animations (native-like feel)
- Glass morphism effects (modern aesthetic)
- Proper shadows and depth

### Interaction Design
- Large touch targets (≥ 44px)
- Touch feedback on all interactions
- Smooth transitions between states
- Momentum scrolling
- Pull-to-refresh capability

### Mobile Optimizations
- Safe area support (notch, home indicator)
- Prevents body scroll
- No double-tap zoom
- Proper keyboard handling
- Number pad for numeric inputs

---

## 📝 Best Practices

### DO ✅
- Use semantic HTML
- Add loading states
- Provide haptic-like feedback
- Respect safe areas
- Test on real devices
- Optimize images
- Use system fonts

### DON'T ❌
- Use hover-only interactions
- Create small touch targets
- Forget loading states
- Block the UI unnecessarily
- Use complex animations
- Ignore safe areas
- Forget accessibility

---

## 🎨 Component Library

All components are mobile-optimized and follow these principles:
- **TopBar** - Fixed header with glassmorphism
- **BottomBar** - Fixed footer with primary action
- **WorkoutPlanCard** - Draggable card with smooth animations
- **ExerciseCard** - Touch-optimized exercise management
- **SetTable** - Large input fields for easy data entry
- **AddExerciseModal** - Bottom sheet on mobile, centered on desktop
- **DeleteConfirmationModal** - Prominent warning with clear actions

---

## 🚀 Future Enhancements

- [ ] PWA offline support
- [ ] Push notifications
- [ ] Haptic feedback (Vibration API)
- [ ] Pull-to-refresh
- [ ] Swipe actions
- [ ] Dark/light mode toggle
- [ ] Custom themes
- [ ] Animation preferences

---

## 📚 Resources

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design for Mobile](https://material.io/design)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)

---

**Built with ❤️ for mobile-first fitness tracking**
