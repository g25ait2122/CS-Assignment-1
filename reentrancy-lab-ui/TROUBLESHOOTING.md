# Troubleshooting Guide

## Issue: Tailwind Styles Not Loading

### Symptoms:
- Page looks unstyled
- Only basic HTML rendering
- No colors, spacing, or layout

### Solution Steps:

1. **Hard Refresh Browser**
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

2. **Clear Browser Cache**
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

3. **Verify Dev Server**
   ```bash
   # Kill existing server
   pkill -f "vite"
   
   # Clear Vite cache
   rm -rf node_modules/.vite
   
   # Restart
   npm run dev
   ```

4. **Check Console for Errors**
   - Open Browser DevTools (F12)
   - Go to Console tab
   - Look for CSS loading errors

5. **Verify Files**
   - ✅ `postcss.config.js` exists
   - ✅ `tailwind.config.js` exists
   - ✅ `src/index.css` has @tailwind directives
   - ✅ `src/main.jsx` imports './index.css'

## Issue: ReactFlow Not Rendering

### Symptoms:
- Call Graph Visualizer shows only text
- No visual diagram

### Solution:
1. **Check Package Installation**
   ```bash
   npm list @xyflow/react
   ```

2. **Verify Import**
   - Should use `@xyflow/react` not `reactflow`
   - CSS should be imported: `@xyflow/react/dist/style.css`

3. **Check Browser Console**
   - Look for ReactFlow errors
   - Verify no module loading issues

## Quick Fix Commands

```bash
# Full reset
cd reentrancy-lab-ui
pkill -f "vite"
rm -rf node_modules/.vite
npm run dev

# Then in browser:
# 1. Open http://localhost:5173
# 2. Press Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
# 3. Check DevTools Console for errors
```

## Expected Behavior

When working correctly, you should see:
- ✅ White background
- ✅ Gradient navigation bar
- ✅ Colored buttons and cards
- ✅ Professional typography
- ✅ Interactive call graph with colored nodes
- ✅ Smooth animations

## Still Not Working?

Check these files match:

### postcss.config.js
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### src/index.css (first few lines)
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/main.jsx
```javascript
import './index.css'  // ← This line must be present
```

## Browser Compatibility

Tested and working on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

## Contact

If issues persist, check:
1. Node version: `node --version` (should be 18+)
2. npm version: `npm --version` (should be 9+)
3. Package installations: `npm list`
