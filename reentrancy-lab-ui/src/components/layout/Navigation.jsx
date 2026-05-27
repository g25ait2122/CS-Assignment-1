import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, BookOpen, Activity, Lock, Cpu, Home } from 'lucide-react';

export default function Navigation() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              padding: '0.75rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
              borderRadius: '1rem',
              boxShadow: '0 10px 15px -3px rgba(59,130,246,0.3)'
            }}>
              <ShieldAlert style={{ color: 'white' }} size={28} />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>ReentrancyLab</h1>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>Smart Contract Security Assignment</p>
            </div>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <NavLink to="/" icon={<Home size={18}/>} text="Home" />
            <NavLink to="/history" icon={<BookOpen size={18}/>} text="The Birth" />
            <NavLink to="/museum" icon={<Activity size={18}/>} text="Attack Museum" />
            <NavLink to="/defense" icon={<Lock size={18}/>} text="Defenses" />
            <NavLink to="/research" icon={<Cpu size={18}/>} text="Research" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1.25rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s'
  };
  
  const activeStyle = {
    ...baseStyle,
    background: 'linear-gradient(to right, #3b82f6, #6366f1)',
    color: 'white',
    boxShadow: '0 10px 15px -3px rgba(59,130,246,0.3)'
  };
  
  const inactiveStyle = {
    ...baseStyle,
    color: '#374151'
  };
  
  return (
    <Link to={to} style={isActive ? activeStyle : inactiveStyle}>
      {icon}
      <span style={{ display: window.innerWidth >= 1024 ? 'inline' : 'none' }}>{text}</span>
    </Link>
  );
}
