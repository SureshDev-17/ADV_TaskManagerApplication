# Tailwind CSS Class Reference Guide

## Color Classes

### Background Colors
```css
bg-black              /* Pure black background */
bg-dark-card          /* Dark card background (#111111) */
bg-dark-hover         /* Dark hover state (#1a1a1a) */
bg-white              /* White elements */
```

### Border Colors
```css
border-dark-border    /* Dark border color (#2a2a2a) */
border-white          /* White borders */
border-gray-700       /* Gray borders for inputs */
```

### Text Colors
```css
text-white            /* Main text */
text-gray-300         /* Secondary text */
text-gray-400         /* Muted text */
text-black            /* Text on white backgrounds */
```

## Component Classes

### Cards & Containers
```css
bg-dark-card border border-dark-border rounded-2xl p-6 shadow-dark
/* Creates a standard card with shadow */

bg-dark-card border border-dark-border rounded-3xl p-8 shadow-dark
/* Creates a larger card/container */
```

### Inputs & Forms
```css
bg-black border border-dark-border rounded-xl p-3 md:p-4 text-white 
outline-none focus:border-white transition duration-300
/* Responsive input field with focus state */
```

### Tables
```css
bg-dark-card border border-dark-border rounded-2xl shadow-dark
/* Table container */

bg-black border-b border-dark-border sticky top-0
/* Table header */

hover:bg-dark-hover transition-colors duration-300
/* Table row hover state */
```

### Buttons
```css
bg-white text-black px-6 md:px-8 py-3 rounded-xl font-bold 
hover:bg-gray-300 transition-all duration-300
/* Primary white button */

bg-red-500 hover:bg-red-600 transition-all duration-300
/* Danger button */
```

## Responsive Classes

### Common Patterns
```css
text-2xl md:text-3xl           /* 2xl on mobile, 3xl on desktop */
px-4 md:px-6                   /* Small padding mobile, larger on desktop */
gap-4 md:gap-6                 /* Smaller gaps on mobile */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
/* 1 column mobile, 2 on tablet, 4 on desktop */
hidden md:flex                 /* Hidden on mobile, visible on md+ */
w-64 h-screen fixed hidden md:flex
/* Sidebar: hidden on mobile, fixed on desktop */
```

## Shadow Classes
```css
shadow-dark    /* Dark shadow: 0 10px 15px -3px rgba(0,0,0,0.4) */
shadow-lg      /* Large shadow */
hover:shadow-lg /* Shadow on hover */
```

## Spacing Guide

### Padding
```css
p-3 md:p-4           /* 12px mobile, 16px desktop */
p-4 md:p-6           /* 16px mobile, 24px desktop */
p-6 md:p-8           /* 24px mobile, 32px desktop */
```

### Margin & Gaps
```css
gap-4 md:gap-6       /* 16px mobile, 24px desktop */
mb-4 md:mb-6         /* 16px bottom mobile, 24px desktop */
mt-2                 /* 8px top margin */
```

## Transitions
```css
transition duration-300     /* Smooth 300ms transition */
transition-all duration-300 /* All properties transition */
transition-colors duration-300 /* Only color changes */
```

## Layout Classes

### Flexbox
```css
flex items-center justify-between    /* Horizontal, space between */
flex flex-col md:flex-row            /* Column on mobile, row on desktop */
flex items-center gap-3              /* Center with gap */
```

### Grid
```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6
/* Responsive grid layout */
```

## Useful Combinations

### Standard Card Button
```jsx
className="bg-white text-black px-5 py-2 rounded-xl font-semibold 
hover:bg-gray-300 transition-all duration-300"
```

### Responsive Container
```jsx
className="bg-dark-card border border-dark-border rounded-2xl 
p-4 md:p-6 shadow-dark"
```

### Responsive Text
```jsx
className="text-xl md:text-2xl font-bold text-white"
```

### Mobile-Friendly Form Input
```jsx
className="w-full bg-black border border-dark-border rounded-xl 
p-3 md:p-4 text-white outline-none focus:border-white 
transition duration-300 text-sm"
```

### Responsive Grid
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
```

## Tips & Tricks

1. **Always use `dark-border` and `dark-card`** instead of hardcoding colors
2. **Use responsive prefixes** - `md:` and `lg:` for different screen sizes
3. **Combine hover states** - `hover:bg-dark-hover transition duration-300`
4. **Use `md:p-4` pattern** for responsive padding
5. **Tables need sticky headers** - `sticky top-0`
6. **Cards always use** `shadow-dark` for consistency
7. **Buttons prefer** `transition-all duration-300` for smooth animations
