import { Link } from 'react-router-dom';
import { ShieldAlert, BookOpen, Activity, Lock, Cpu, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #f3e8ff 100%)',
        padding: '6rem 0 8rem',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#dbeafe',
              color: '#1e40af',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              <ShieldAlert size={16} />
              Cybersecurity Assignment - Smart Contract Analysis
            </div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '2rem',
              lineHeight: 1.2
            }}>
              Reentrancy Attack
              <span style={{
                display: 'block',
                marginTop: '0.5rem',
                background: 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Analysis & Demonstration
              </span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.75
            }}>
              A comprehensive analysis of reentrancy vulnerabilities in smart contracts, including historical context, 
              live demonstrations, defense mechanisms, and research directions.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/history" style={{
                background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 10px 15px -3px rgba(59,130,246,0.3)',
                transition: 'all 0.3s'
              }}>
                View Analysis →
              </Link>
              <Link to="/museum" style={{
                background: 'white',
                color: '#111827',
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                border: '2px solid #e5e7eb',
                transition: 'all 0.3s'
              }}>
                Live Demonstration
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem'
          }}>
            <HomeCard 
              to="/history"
              icon={<BookOpen style={{ color: '#3b82f6' }} size={32} />}
              title="Historical Analysis"
              description="Explore the 2016 DAO hack that split the Ethereum network"
              color="blue"
            />
            <HomeCard 
              to="/museum"
              icon={<Activity style={{ color: '#8b5cf6' }} size={32} />}
              title="Live Execution"
              description="Connect MetaMask and execute a simulated reentrancy exploit on a local EVM"
              color="purple"
            />
            <HomeCard 
              to="/defense"
              icon={<Lock style={{ color: '#16a34a' }} size={32} />}
              title="Defense Patterns"
              description="Analyze industry-standard mitigations like CEI and Mutex locks"
              color="green"
            />
            <HomeCard 
              to="/research"
              icon={<Cpu style={{ color: '#f97316' }} size={32} />}
              title="Future Research"
              description="Discover how AI and Off-Chain Firewalls are shaping Web3 security"
              color="orange"
            />
          </div>

          {/* Key Insights */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            padding: '3rem',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>Why This Matters</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <LearningPoint 
                title="$3.8 Billion Lost"
                description="Reentrancy attacks have drained billions from DeFi protocols since 2016, making it the most expensive vulnerability class in Web3"
              />
              <LearningPoint 
                title="Still Active Today"
                description="Despite known mitigations, reentrancy variants continue to exploit modern protocols through cross-chain bridges and complex composability"
              />
              <LearningPoint 
                title="Future-Proof Security"
                description="Understanding reentrancy is essential for building secure smart contracts and auditing DeFi protocols in the evolving Web3 ecosystem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeCard({ to, icon, title, description, color }) {
  const iconBgColors = {
    blue: '#dbeafe',
    purple: '#ede9fe',
    green: '#dcfce7',
    orange: '#ffedd5'
  };

  return (
    <Link 
      to={to}
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        border: '2px solid #e5e7eb',
        textDecoration: 'none',
        transition: 'all 0.3s',
        display: 'block'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        display: 'inline-flex',
        padding: '1rem',
        borderRadius: '0.75rem',
        marginBottom: '1.5rem',
        background: iconBgColors[color]
      }}>{icon}</div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#111827',
        marginBottom: '0.75rem'
      }}>{title}</h3>
      <p style={{
        color: '#6b7280',
        lineHeight: 1.6
      }}>{description}</p>
    </Link>
  );
}

function LearningPoint({ title, description }) {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #f9fafb 0%, #eff6ff 100%)',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{
          background: '#dcfce7',
          padding: '0.5rem',
          borderRadius: '0.5rem'
        }}>
          <CheckCircle style={{ color: '#16a34a' }} size={24} />
        </div>
      </div>
      <div>
        <h4 style={{
          fontWeight: 700,
          color: '#111827',
          marginBottom: '0.5rem',
          fontSize: '1.125rem'
        }}>{title}</h4>
        <p style={{
          color: '#6b7280',
          lineHeight: 1.6
        }}>{description}</p>
      </div>
    </div>
  );
}
