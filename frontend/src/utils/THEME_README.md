# Purple Theme System

This document explains how to use the centralized purple theme system for the TimeToWish application.

## Files

1. **`index.css`** - Contains CSS variables for purple theme colors
2. **`themeColors.js`** - JavaScript/React theme constants and helper functions

## Usage

### Option 1: Using CSS Variables (Recommended for CSS/SCSS)

All purple colors are available as CSS variables in `index.css`:

```css
/* Base Colors */
var(--color-primary)           /* purple-600 */
var(--color-primary-50)         /* purple-50 */
var(--color-primary-100)         /* purple-100 */
var(--color-primary-200)        /* purple-200 */
var(--color-primary-300)        /* purple-300 */
var(--color-primary-400)        /* purple-400 */
var(--color-primary-500)        /* purple-500 */
var(--color-primary-600)        /* purple-600 */
var(--color-primary-700)        /* purple-700 */
var(--color-primary-800)        /* purple-800 */
var(--color-primary-900)        /* purple-900 */
var(--color-primary-950)        /* purple-950 */

/* Gradients */
var(--gradient-primary-start)           /* purple-600 */
var(--gradient-primary-end)             /* purple-700 */
var(--gradient-primary-dark-start)      /* purple-700 */
var(--gradient-primary-dark-end)        /* purple-800 */

/* Hover States */
var(--color-primary-hover)               /* purple-700 */
var(--color-primary-hover-dark)          /* purple-800 */

/* Focus Rings */
var(--color-primary-focus)                /* purple-600 */
var(--color-primary-focus-ring)          /* purple-400 */
```

### Option 2: Using JavaScript Theme Constants

Import the theme colors in your React components:

```javascript
import { purpleTheme, primaryColor, gradients, tailwindClasses } from '../utils/themeColors';

// Use color values directly
const buttonStyle = {
  backgroundColor: primaryColor,
  color: 'white',
};

// Use gradient helper
const { getGradientClasses } = require('../utils/themeColors');
const gradientClasses = getGradientClasses(darkMode);
```

### Option 3: Using Tailwind Classes (Current Implementation)

The current implementation uses Tailwind classes which reference the purple colors:

```jsx
// Buttons
<button className="bg-purple-600 hover:bg-purple-700 text-white">
  Click Me
</button>

// Gradients
<div className={`bg-gradient-to-r ${
  darkMode 
    ? "from-purple-700 to-purple-800" 
    : "from-purple-600 to-purple-700"
}`}>
  Content
</div>

// Focus States
<input className="focus:ring-2 focus:ring-purple-500" />
```

## Helper Functions

### `getGradientClasses(darkMode)`

Returns gradient classes based on dark mode:

```javascript
import { getGradientClasses } from '../utils/themeColors';

const { base, hover } = getGradientClasses(darkMode);
// Returns: { base: 'from-purple-700 to-purple-800', hover: 'hover:from-purple-800 hover:to-purple-900' }
```

### `getButtonClasses(variant, darkMode)`

Returns button classes based on variant and dark mode:

```javascript
import { getButtonClasses } from '../utils/themeColors';

const buttonClass = getButtonClasses('primary', darkMode);
// Returns: 'px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg bg-purple-600 hover:bg-purple-700 text-white'
```

## Tailwind Class Helpers

Pre-defined Tailwind class combinations:

```javascript
import { tailwindClasses } from '../utils/themeColors';

// Buttons
tailwindClasses.button.primary        // 'bg-purple-600 hover:bg-purple-700 text-white'
tailwindClasses.button.primaryDark    // 'bg-purple-700 hover:bg-purple-800 text-white'
tailwindClasses.button.outline        // 'border-2 border-purple-600 text-purple-600 hover:bg-purple-100'

// Gradients
tailwindClasses.gradient.light        // 'from-purple-600 to-purple-700'
tailwindClasses.gradient.dark         // 'from-purple-700 to-purple-800'
tailwindClasses.gradient.hoverLight   // 'hover:from-purple-700 hover:to-purple-800'
tailwindClasses.gradient.hoverDark    // 'hover:from-purple-800 hover:to-purple-900'

// Focus States
tailwindClasses.focus.ring            // 'focus:ring-2 focus:ring-purple-500'
tailwindClasses.focus.border          // 'focus:border-purple-500'

// Backgrounds
tailwindClasses.bg.light              // 'bg-purple-100'
tailwindClasses.bg.medium             // 'bg-purple-200'
tailwindClasses.bg.dark               // 'bg-purple-600'
tailwindClasses.bg.darkHover          // 'hover:bg-purple-700'

// Text
tailwindClasses.text.light            // 'text-purple-600'
tailwindClasses.text.medium           // 'text-purple-700'
tailwindClasses.text.dark             // 'text-purple-800'
tailwindClasses.text.onLight          // 'text-purple-900'

// Borders
tailwindClasses.border.light          // 'border-purple-300'
tailwindClasses.border.medium         // 'border-purple-500'
tailwindClasses.border.dark           // 'border-purple-600'
```

## Example Usage

### Example 1: Button Component

```jsx
import { tailwindClasses } from '../utils/themeColors';

const Button = ({ children, variant = 'primary', darkMode }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-300';
  const variantClasses = tailwindClasses.button[variant === 'primary' ? 'primary' : 'outline'];
  
  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      {children}
    </button>
  );
};
```

### Example 2: Gradient Background

```jsx
import { getGradientClasses } from '../utils/themeColors';
import { useTheme } from '../context/ThemeContext';

const GradientBox = ({ children }) => {
  const { darkMode } = useTheme();
  const { base, hover } = getGradientClasses(darkMode);
  
  return (
    <div className={`bg-gradient-to-r ${base} ${hover} p-6 rounded-xl`}>
      {children}
    </div>
  );
};
```

### Example 3: Using CSS Variables

```jsx
const StyledButton = () => {
  return (
    <button 
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
      }}
      className="px-4 py-2 rounded-lg hover:bg-[var(--color-primary-hover)]"
    >
      Click Me
    </button>
  );
};
```

## Color Palette Reference

| Shade | Hex Code | Usage |
|-------|----------|-------|
| 50    | #faf5ff  | Very light backgrounds |
| 100   | #f3e8ff  | Light backgrounds |
| 200   | #e9d5ff  | Subtle backgrounds |
| 300   | #d8b4fe  | Borders, dividers |
| 400   | #c084fc  | Focus rings, accents |
| 500   | #a855f7  | Medium emphasis |
| 600   | #9333ea  | **Primary color** |
| 700   | #7e22ce  | Hover states, dark mode |
| 800   | #6b21a8  | Dark mode emphasis |
| 900   | #581c87  | Dark mode backgrounds |
| 950   | #3b0764  | Darkest backgrounds |

## Updating Colors

To change the purple theme colors:

1. **CSS Variables**: Update values in `index.css` under `@theme`
2. **JavaScript Constants**: Update values in `utils/themeColors.js`
3. **Tailwind Classes**: The Tailwind classes will automatically use the updated values

## Best Practices

1. **Use Tailwind classes** for most cases (current implementation)
2. **Use CSS variables** when you need dynamic styling or inline styles
3. **Use JavaScript constants** when you need color values in logic or calculations
4. **Use helper functions** for consistent gradient and button styling
5. **Always consider dark mode** when applying colors

## Notes

- All purple colors are centralized in these two files
- Changing colors in `index.css` or `themeColors.js` will update the entire app
- The theme system is designed to work seamlessly with Tailwind CSS
- Dark mode support is built into all helper functions

