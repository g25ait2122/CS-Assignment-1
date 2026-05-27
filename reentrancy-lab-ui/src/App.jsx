import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import MuseumPage from './pages/MuseumPage';
import DefensePage from './pages/DefensePage';
import ResearchPage from './pages/ResearchPage';

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Navigation />
        <main style={{ paddingTop: '5rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/museum" element={<MuseumPage />} />
            <Route path="/defense" element={<DefensePage />} />
            <Route path="/research" element={<ResearchPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
