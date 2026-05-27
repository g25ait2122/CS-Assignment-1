# 📁 Project Structure

## ✅ New Modular Architecture

The project has been restructured for better maintainability and scalability.

### Folder Structure

```
src/
├── App.jsx                      # Main app with routing (clean & simple!)
├── main.jsx                     # Entry point
├── index.css                    # Global styles
├── styles.css                   # Component styles
│
├── components/
│   ├── layout/
│   │   └── Navigation.jsx       # Navigation bar component
│   └── CallGraphVisualizer.jsx  # Attack visualization component
│
└── pages/
    ├── HomePage.jsx             # Landing page
    ├── HistoryPage.jsx          # The DAO hack history
    ├── MuseumPage.jsx           # Live attack demonstrations
    ├── DefensePage.jsx          # Defense mechanisms
    └── ResearchPage.jsx         # Future research
```

### Benefits of This Structure

✅ **Separation of Concerns**
- Each page is in its own file
- Components are organized by type
- Easy to find and edit specific features

✅ **Maintainability**
- Small, focused files instead of one 900+ line file
- Easy to add new pages or components
- Clear dependencies

✅ **Scalability**
- Easy to add new routes
- Simple to add more components
- Clean import structure

✅ **Team Collaboration**
- Multiple people can work on different pages
- Less merge conflicts
- Clear ownership of files

### File Descriptions

#### `src/App.jsx` (Main Router)
Clean routing configuration. Only 25 lines!
```javascript
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
// ... other imports

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        // ... other routes
      </Routes>
    </Router>
  );
}
```

#### `src/components/layout/Navigation.jsx`
Reusable navigation bar with:
- Logo with gradient
- Active route highlighting
- Responsive design
- Inline styles (no Tailwind dependency)

#### `src/pages/HomePage.jsx`
Landing page with:
- Hero section
- Feature cards
- Learning objectives
- All self-contained

#### `src/pages/HistoryPage.jsx`
The DAO hack timeline and history

#### `src/pages/MuseumPage.jsx`
Live Web3 attack demonstrations

#### `src/pages/DefensePage.jsx`
Security patterns and best practices

#### `src/pages/ResearchPage.jsx`
Future research and emerging technologies

### Adding New Pages

1. Create a new file in `src/pages/`:
```javascript
// src/pages/NewPage.jsx
export default function NewPage() {
  return <div>New Content</div>;
}
```

2. Import and add route in `App.jsx`:
```javascript
import NewPage from './pages/NewPage';

<Route path="/new" element={<NewPage />} />
```

3. Add navigation link in `Navigation.jsx`

### Adding New Components

1. Create in appropriate folder:
   - Layout components → `src/components/layout/`
   - Feature components → `src/components/`

2. Import where needed

### Styling Approach

**Pure CSS + Inline Styles**
- No Tailwind dependency
- Inline styles for component-specific styling
- Global styles in `index.css`
- Shared styles in `styles.css`

### Old Files (Backup)

- `src/App_old_monolith.jsx` - Original 900+ line file (backup)
- `src/App_tailwind_backup.jsx` - Tailwind version (backup)

### Development Workflow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Edit a page:**
   - Open the specific page file in `src/pages/`
   - Make changes
   - Hot reload updates automatically

3. **Add a component:**
   - Create in `src/components/`
   - Import in the page that needs it

4. **Update navigation:**
   - Edit `src/components/layout/Navigation.jsx`

### Best Practices

✅ **Keep pages focused** - One page = one route
✅ **Reuse components** - Extract common UI to components
✅ **Use inline styles** - No external CSS framework needed
✅ **Document changes** - Update this file when adding structure

### Next Steps

To add full content to placeholder pages:
1. Copy relevant sections from `App_old_monolith.jsx`
2. Paste into appropriate page file
3. Update any Tailwind classes to inline styles
4. Test and refine

---

**Current Status:** ✅ Clean modular structure with working navigation and home page
**Next:** Add full content to History, Museum, Defense, and Research pages
