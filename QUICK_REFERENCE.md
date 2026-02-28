# 🎨 Quick Reference - Design Tokens

## Common Class Combinations

### Buttons

#### Primary Button (CTA)
```jsx
className="py-4 px-6 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden"
```

#### Secondary Button
```jsx
className="py-4 px-6 bg-surface text-foreground border-2 border-border rounded-xl font-bold hover:bg-surface-hover active:bg-surface-active transition-all duration-fast min-h-touch-comfortable"
```

#### Ghost Button
```jsx
className="py-3 px-4 text-foreground-secondary hover:text-foreground hover:bg-surface-hover rounded-lg transition-all duration-fast min-h-touch"
```

#### Icon Button
```jsx
className="p-2.5 text-foreground-tertiary hover:text-foreground hover:bg-surface-hover rounded-lg transition-all duration-fast min-h-touch min-w-touch flex items-center justify-center touch-feedback relative overflow-hidden"
```

#### Danger Button
```jsx
className="py-4 px-6 bg-error text-white rounded-xl font-bold hover:bg-error/90 active:bg-error/80 active:scale-[0.98] transition-all duration-fast shadow-lg min-h-touch-comfortable"
```

### Inputs

#### Text Input
```jsx
className="w-full px-5 py-4 bg-surface text-foreground text-lg border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast placeholder:text-foreground-tertiary min-h-touch-comfortable"
```

#### Number Input
```jsx
className="px-3 py-2.5 text-center text-base font-bold border-2 border-border rounded-lg bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast min-h-touch"
```

### Cards

#### Standard Card
```jsx
className="glass rounded-2xl border-2 border-border shadow-lg hover:shadow-xl transition-all duration-slow p-5"
```

#### Elevated Card
```jsx
className="bg-surface-hover rounded-xl border-2 border-border shadow-md hover:shadow-lg transition-all duration-slow p-4"
```

#### Interactive Card
```jsx
className="glass rounded-2xl border-2 border-border shadow-lg hover:shadow-xl hover:border-primary active:scale-[0.99] transition-all duration-slow p-5 cursor-pointer"
```

### Modals

#### Modal Overlay
```jsx
className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-modal px-0 sm:px-5 animate-fade-in"
```

#### Modal Content (Mobile Bottom Sheet)
```jsx
className="glass-strong rounded-t-3xl sm:rounded-2xl w-full max-w-md border-t-2 sm:border-2 border-border shadow-2xl animate-slide-up sm:animate-scale-in safe-bottom"
```

### Typography

#### Page Title
```jsx
className="text-4xl font-bold text-foreground tracking-tight"
```

#### Section Title
```jsx
className="text-2xl font-bold text-foreground"
```

#### Card Title
```jsx
className="text-xl font-bold text-foreground"
```

#### Body Text
```jsx
className="text-base text-foreground leading-relaxed"
```

#### Secondary Text
```jsx
className="text-sm text-foreground-secondary font-medium"
```

#### Tertiary Text
```jsx
className="text-xs text-foreground-tertiary"
```

### Badges

#### Count Badge
```jsx
className="px-2.5 py-1 bg-surface rounded-lg text-sm font-semibold text-foreground-tertiary"
```

#### Status Badge (Success)
```jsx
className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-success-bg text-success"
```

#### Status Badge (Error)
```jsx
className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-error-bg text-error"
```

### Empty States

#### Empty State Container
```jsx
className="text-center py-12 px-5"
```

#### Empty State Icon
```jsx
className="w-16 h-16 mx-auto mb-4 bg-surface rounded-2xl flex items-center justify-center"
```

#### Empty State Title
```jsx
className="text-foreground-secondary font-semibold text-lg mb-2"
```

#### Empty State Description
```jsx
className="text-foreground-tertiary text-sm"
```

### Loading States

#### Spinner Icon
```jsx
className="animate-spin h-5 w-5"
```

#### Skeleton
```jsx
className="skeleton h-20 rounded-lg"
```

### Layouts

#### Fixed Header
```jsx
className="glass-strong border-b border-border fixed top-0 left-0 right-0 z-fixed safe-top animate-slide-down"
```

#### Fixed Footer
```jsx
className="glass-strong border-t border-border fixed bottom-0 left-0 right-0 z-fixed safe-bottom animate-slide-up"
```

#### Main Content Area
```jsx
className="flex-1 px-5 py-5 overflow-y-auto momentum-scroll"
```

#### Horizontal Scroll Container
```jsx
className="overflow-x-auto momentum-scroll"
```

---

## Color Tokens

### Background
- `bg-background` - Pure black
- `bg-background-secondary` - Subtle elevation
- `bg-background-tertiary` - Higher elevation
- `bg-background-elevated` - Card backgrounds

### Surface
- `bg-surface` - Default surface
- `bg-surface-hover` - Hover state
- `bg-surface-active` - Active/pressed

### Text
- `text-foreground` - Primary text
- `text-foreground-secondary` - Secondary text
- `text-foreground-tertiary` - Tertiary text
- `text-foreground-disabled` - Disabled text

### Brand
- `bg-primary` / `text-primary` - Main brand color
- `bg-primary-hover` - Hover state
- `bg-primary-active` - Active state
- `text-primary-light` - Light variant

### Semantic
- `bg-success` / `text-success` - Success states
- `bg-success-bg` - Success background
- `bg-error` / `text-error` - Error states
- `bg-error-bg` - Error background
- `bg-warning` / `text-warning` - Warning states
- `bg-info` / `text-info` - Info states

### Borders
- `border-border` - Default border
- `border-border-hover` - Hover state
- `border-primary` - Focus/active state

---

## Spacing Tokens

### Touch Targets
- `min-h-touch` - 44px minimum (Apple HIG)
- `min-h-touch-comfortable` - 48px comfortable
- `min-w-touch` - 44px width
- `min-w-touch-comfortable` - 48px width

### Safe Areas
- `safe-top` - Top safe area padding
- `safe-bottom` - Bottom safe area padding
- `safe-left` - Left safe area padding
- `safe-right` - Right safe area padding

### Standard Spacing
- `px-5` - 20px horizontal (common)
- `py-4` - 16px vertical (common)
- `gap-3` - 12px gap (common)
- `space-y-4` - 16px vertical stack (common)

---

## Border Radius

- `rounded-lg` - 18px (cards)
- `rounded-xl` - 24px (buttons, inputs)
- `rounded-2xl` - 32px (large cards)
- `rounded-3xl` - 48px (modals)

---

## Shadows

- `shadow-md` - Standard shadow
- `shadow-lg` - Elevated shadow
- `shadow-xl` - High elevation
- `shadow-glow` - Glow effect
- `shadow-glow-lg` - Strong glow

---

## Transitions

- `duration-fast` - 150ms
- `duration-base` / `transition-all` - 250ms
- `duration-slow` - 350ms
- `duration-bounce` - 400ms

---

## Z-Index

- `z-base` - 1
- `z-sticky` - 1020
- `z-fixed` - 1030
- `z-modal-backdrop` - 1040
- `z-modal` - 1050
- `z-toast` - 1060

---

## Animations

### Entrance
- `animate-fade-in` - Fade in from bottom
- `animate-slide-up` - Slide up (mobile modals)
- `animate-slide-down` - Slide down (header)
- `animate-scale-in` - Scale in (desktop modals)

### Feedback
- `animate-bounce-subtle` - Subtle bounce
- `animate-pulse-glow` - Pulsing glow
- `animate-shimmer` - Skeleton loading

### Hover Effects
- `hover:scale-[1.02]` - Subtle grow
- `active:scale-[0.98]` - Button press
- `active:scale-[0.99]` - Card press

---

## Utilities

### Glass Morphism
- `glass` - Light blur (70% opacity)
- `glass-strong` - Strong blur (90% opacity)

### Scrolling
- `momentum-scroll` - iOS momentum scrolling
- `overflow-x-auto` - Horizontal scroll
- `overflow-y-auto` - Vertical scroll

### Touch Feedback
- `touch-feedback` - Ripple effect on tap
- `relative overflow-hidden` - Required for ripple

### Performance
- `will-change-transform` - Optimize animations
- `gpu-accelerated` - Hardware acceleration

---

## Common Patterns

### Full-Width CTA Button
```jsx
className="w-full py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover active:scale-[0.98] transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden"
```

### Icon Button (Header/Footer)
```jsx
className="p-2.5 text-foreground-secondary hover:text-foreground hover:bg-surface rounded-lg transition-all duration-fast min-h-touch min-w-touch flex items-center justify-center"
```

### Horizontal Tab
```jsx
className="px-5 py-3 rounded-xl text-base font-bold transition-all duration-fast whitespace-nowrap min-h-touch"
```

### Modal Header
```jsx
className="flex items-center justify-between px-6 py-5 border-b border-border"
```

### Modal Actions
```jsx
className="flex gap-3 px-6 pb-6"
```

---

## 📱 Mobile-First Tips

1. Always use `min-h-touch` or `min-h-touch-comfortable` for interactive elements
2. Add `safe-top` and `safe-bottom` to fixed positioned elements
3. Use `touch-feedback relative overflow-hidden` for tactile feedback
4. Apply `momentum-scroll` to scrollable containers
5. Set `inputMode` on number inputs (`decimal` or `numeric`)
6. Use `animate-slide-up` for mobile modals
7. Add `transition-all duration-fast` for smooth interactions
8. Apply `active:scale-[0.98]` for button press feedback

---

## 🎨 Design System Rules

1. **Never** use arbitrary values - use tokens
2. **Always** add transitions to interactive elements
3. **Minimum** 44px touch targets for all clickable items
4. **Use** semantic colors (success/error) for feedback
5. **Apply** glass morphism to fixed headers/footers
6. **Include** loading states for all async actions
7. **Add** empty states with helpful messages
8. **Ensure** proper contrast ratios (WCAG AA)

---

**Save this as a quick reference when building new features!** 🚀
