import { Brain, Shield, Network } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Beyond On-Chain Mitigation</h2>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>The next frontier of smart contract security relies on AI, off-chain computation, and cross-chain oracles</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Card 1: AI-Assisted Semantic Auditing */}
        <ResearchCard
          icon={<Brain style={{ color: '#8b5cf6' }} size={40} />}
          title="AI-Assisted Semantic Auditing"
          problem="Traditional static analysis tools (like Slither) rely on hardcoded rules and AST (Abstract Syntax Tree) parsing. They easily miss complex, multi-contract Read-Only reentrancy."
          future="LLMs trained on EVM byte-code and Solidity semantics can detect logical inconsistencies rather than just syntax errors, identifying composability flaws before deployment."
          color="purple"
        />

        {/* Card 2: Off-Chain Transaction Firewalls */}
        <ResearchCard
          icon={<Shield style={{ color: '#3b82f6' }} size={40} />}
          title="Off-Chain Transaction Firewalls (Pre-Flight Screening)"
          problem="Wallets and RPC providers routing transactions through a 'Simulation Engine' before broadcasting them to the mempool."
          future="If the simulation detects a recursive call depth exceeding normal bounds, or an unexpected state deviation, the firewall intercepts the transaction and alerts the user, effectively neutralizing the attack before it hits the chain."
          color="blue"
        />

        {/* Card 3: Cross-Chain Security Oracles */}
        <ResearchCard
          icon={<Network style={{ color: '#16a34a' }} size={40} />}
          title="Cross-Chain Security Oracles"
          problem="As DeFi moves multi-chain, reentrancy attacks will span across bridges."
          future="Delayed Settlement Architectures. Sensitive cross-chain withdrawals are placed in a verification layer. A decentralized network of security nodes analyzes the origin chain's call graph. If anomalous recursive behavior is detected, a 'freeze signal' is broadcasted, stopping the bridged assets from being released."
          color="green"
        />
      </div>

      {/* Future Vision */}
      <div style={{
        background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
        padding: '3rem',
        borderRadius: '1rem',
        border: '1px solid #c084fc',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>The Future is Multi-Layered</h3>
        <p style={{ color: '#4b5563', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>
          The next generation of Web3 security won't rely on a single defense mechanism. Instead, it will combine <strong>on-chain guards</strong>, 
          <strong> AI-powered analysis</strong>, <strong>off-chain simulation</strong>, and <strong>cross-chain verification</strong> to create a 
          comprehensive security ecosystem that makes reentrancy attacks economically infeasible.
        </p>
      </div>
    </div>
  );
}

function ResearchCard({ icon, title, problem, future, color }) {
  const colorSchemes = {
    purple: {
      bg: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      border: '#c084fc',
      badge: '#8b5cf6'
    },
    blue: {
      bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      border: '#93c5fd',
      badge: '#3b82f6'
    },
    green: {
      bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      border: '#86efac',
      badge: '#16a34a'
    }
  };

  const scheme = colorSchemes[color];

  return (
    <div style={{
      background: scheme.bg,
      padding: '2rem',
      borderRadius: '1rem',
      border: `2px solid ${scheme.border}`,
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
        {/* Icon */}
        <div style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '1rem',
          flexShrink: 0,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>{title}</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'inline-block',
              background: '#dc2626',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              THE PROBLEM
            </div>
            <p style={{ color: '#4b5563', lineHeight: 1.7 }}>{problem}</p>
          </div>

          <div>
            <div style={{
              display: 'inline-block',
              background: scheme.badge,
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              THE FUTURE
            </div>
            <p style={{ color: '#4b5563', lineHeight: 1.7 }}>{future}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
