import { Shield, Code, Lock } from 'lucide-react';

export default function DefensePage() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>The Evolution of Smart Contract Defense</h2>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>How the industry engineered solutions to the EVM's most notorious flaw</p>
      </div>

      {/* Generation 1: CEI Pattern */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #86efac',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Shield style={{ color: '#16a34a' }} size={32} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Generation 1: Checks-Effects-Interactions (CEI)</h3>
          </div>
          <p style={{ color: '#4b5563', lineHeight: 1.7, marginBottom: '1rem' }}>
            The foundational design pattern of smart contract security. It dictates that all external calls must happen at the absolute end of a function.
          </p>
          <ul style={{ color: '#4b5563', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li><strong>Checks:</strong> Validate inputs and conditions (e.g., <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>require(balance &gt; 0)</code>)</li>
            <li><strong>Effects:</strong> Update the contract's internal state (e.g., <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>balance = 0</code>)</li>
            <li><strong>Interactions:</strong> Finally, interact with external contracts or send ETH</li>
          </ul>
        </div>
      </div>

      {/* Generation 2: Mutex Lock */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #93c5fd',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Lock style={{ color: '#3b82f6' }} size={32} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Generation 2: The Mutex Lock (ReentrancyGuard)</h3>
          </div>
          <p style={{ color: '#4b5563', lineHeight: 1.7 }}>
            When CEI isn't enough (especially for complex multi-contract architectures), developers use a <strong>Mutex (Mutual Exclusion)</strong> lock. 
            OpenZeppelin's <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>nonReentrant</code> modifier creates a boolean flag that locks the contract during execution.
          </p>
        </div>
      </div>

      {/* Side-by-Side Code Comparison */}
      <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', marginBottom: '2rem' }}>Vulnerable vs Secure Architecture</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Vulnerable Code */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          border: '2px solid #fca5a5',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              background: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 700
            }}>
              ❌ VULNERABLE
            </div>
          </div>
          
          <div style={{
            background: '#1f2937',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            overflowX: 'auto',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6
          }}>
            <pre style={{ margin: 0, color: '#e5e7eb' }}>
              <span style={{ color: '#c084fc' }}>function</span> <span style={{ color: '#60a5fa' }}>withdraw</span>() <span style={{ color: '#c084fc' }}>external</span> {'{'}{'\n'}
              {'    '}<span style={{ color: '#c084fc' }}>uint</span> bal = balances[msg.sender];{'\n'}
              {'    '}<span style={{ color: '#c084fc' }}>require</span>(bal &gt; <span style={{ color: '#fbbf24' }}>0</span>, <span style={{ color: '#a78bfa' }}>"No balance"</span>);{'\n'}
              {'    '}{'\n'}
              {'    '}<span style={{ color: '#9ca3af' }}>// ❌ INTERACTION FIRST</span>{'\n'}
              {'    '}(<span style={{ color: '#c084fc' }}>bool</span> success, ) = msg.sender.<span style={{ color: '#60a5fa' }}>call</span>{'{'}value: bal{'}'}(<span style={{ color: '#a78bfa' }}>""</span>);{'\n'}
              {'    '}{'\n'}
              {'    '}<span style={{ color: '#9ca3af' }}>// ❌ EFFECT LAST (Too late)</span>{'\n'}
              {'    '}balances[msg.sender] = <span style={{ color: '#fbbf24' }}>0</span>;{'\n'}
              {'}'}
            </pre>
          </div>
        </div>

        {/* Secure Code */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          border: '2px solid #86efac',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              background: '#16a34a',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 700
            }}>
              ✅ SECURE (CEI + Mutex)
            </div>
          </div>
          
          <div style={{
            background: '#1f2937',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            overflowX: 'auto',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6
          }}>
            <pre style={{ margin: 0, color: '#e5e7eb' }}>
              <span style={{ color: '#c084fc' }}>function</span> <span style={{ color: '#60a5fa' }}>withdraw</span>() <span style={{ color: '#c084fc' }}>external</span> <span style={{ color: '#10b981' }}>nonReentrant</span> {'{'}{'\n'}
              {'    '}<span style={{ color: '#c084fc' }}>uint</span> bal = balances[msg.sender];{'\n'}
              {'    '}<span style={{ color: '#c084fc' }}>require</span>(bal &gt; <span style={{ color: '#fbbf24' }}>0</span>, <span style={{ color: '#a78bfa' }}>"No balance"</span>);{'\n'}
              {'    '}{'\n'}
              {'    '}<span style={{ color: '#9ca3af' }}>// ✅ EFFECT FIRST</span>{'\n'}
              {'    '}balances[msg.sender] = <span style={{ color: '#fbbf24' }}>0</span>;{'\n'}
              {'    '}{'\n'}
              {'    '}<span style={{ color: '#9ca3af' }}>// ✅ INTERACTION LAST</span>{'\n'}
              {'    '}(<span style={{ color: '#c084fc' }}>bool</span> success, ) = msg.sender.<span style={{ color: '#60a5fa' }}>call</span>{'{'}value: bal{'}'}(<span style={{ color: '#a78bfa' }}>""</span>);{'\n'}
              {'}'}
            </pre>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid #fbbf24'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>🔑 Key Takeaways</h3>
        <ul style={{ color: '#4b5563', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li><strong>Always update state before external calls</strong> (CEI pattern)</li>
          <li><strong>Use ReentrancyGuard</strong> for complex multi-function contracts</li>
          <li><strong>Prefer pull over push</strong> for payment patterns</li>
          <li><strong>Test with fuzzing tools</strong> like Echidna and Foundry invariants</li>
        </ul>
      </div>
    </div>
  );
}
