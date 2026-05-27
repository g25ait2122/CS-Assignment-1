import { Clock, TrendingUp, AlertTriangle, Network, GitBranch, Code, Target, DollarSign } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>The $60 Million Loop That Forked Ethereum</h2>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>How a single programming pattern altered blockchain history</p>
      </div>

      {/* Two Column Layout: Narrative + Code */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Left: The Narrative */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>The Narrative</h3>
          <div style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              In June 2016, "The DAO" (Decentralized Autonomous Organization) was a revolutionary venture capital fund built on Ethereum. It was wildly successful, accumulating over <strong>$150 million USD</strong>—roughly 15% of all circulating ETH at the time.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              However, a fatal flaw lurked in its architecture. The contract's <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontFamily: 'Monaco, monospace' }}>splitDAO</code> function contained a recursive withdrawal vulnerability. Because the contract sent ETH to users <strong>before updating their internal balances</strong>, an attacker deployed a malicious fallback function to repeatedly call the withdrawal function, draining <strong>3.6 million ETH</strong>.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#dc2626' }}>The Consequence:</strong> The fallout was so catastrophic that it posed an existential threat to the Ethereum network. To recover the stolen funds, the community controversially voted to hard-fork the blockchain. This decision split the network forever into <strong>Ethereum (ETH)</strong> (where the hack was reversed) and <strong>Ethereum Classic (ETC)</strong> (where the hack remains in the ledger).
            </p>
          </div>
        </div>

        {/* Right: The Historic Vulnerability */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>The Historic Vulnerability</h3>
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
              <span style={{ color: '#9ca3af' }}>// The actual conceptual flaw from The DAO (2016)</span>{'\n'}
              <span style={{ color: '#c084fc' }}>function</span> <span style={{ color: '#60a5fa' }}>withdrawRewardFor</span>(<span style={{ color: '#c084fc' }}>address</span> _account) <span style={{ color: '#c084fc' }}>public</span> <span style={{ color: '#c084fc' }}>returns</span> (<span style={{ color: '#c084fc' }}>bool</span>) {'{'}{'\n'}
              {'    '}<span style={{ color: '#c084fc' }}>uint</span> reward = rewards[_account];{'\n'}
              {'    '}<span style={{ color: '#c084fc' }}>if</span> (reward &gt; <span style={{ color: '#fbbf24' }}>0</span>) {'{'}{'\n'}
              {'        '}<span style={{ color: '#9ca3af' }}>// 🚨 VULNERABILITY: External call executes BEFORE balance is zeroed</span>{'\n'}
              {'        '}<span style={{ color: '#c084fc' }}>bool</span> success = _account.<span style={{ color: '#60a5fa' }}>call</span>.<span style={{ color: '#60a5fa' }}>value</span>(reward)(<span style={{ color: '#a78bfa' }}>""</span>);{'\n'}
              {'        '}<span style={{ color: '#c084fc' }}>if</span> (!success) <span style={{ color: '#c084fc' }}>return</span> <span style={{ color: '#fbbf24' }}>false</span>;{'\n'}
              {'        '}{'\n'}
              {'        '}<span style={{ color: '#9ca3af' }}>// 🐌 State update is never reached if the caller re-enters!</span>{'\n'}
              {'        '}rewards[_account] = <span style={{ color: '#fbbf24' }}>0</span>;{'\n'}
              {'        '}<span style={{ color: '#c084fc' }}>return</span> <span style={{ color: '#fbbf24' }}>true</span>;{'\n'}
              {'    }'}{'\n'}
              {'    '}<span style={{ color: '#c084fc' }}>return</span> <span style={{ color: '#fbbf24' }}>false</span>;{'\n'}
              {'}'}
            </pre>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        background: 'linear-gradient(135deg, #f9fafb 0%, #eff6ff 100%)',
        padding: '3rem',
        borderRadius: '1rem',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Clock style={{ color: '#3b82f6' }} size={28} />
          Timeline: The DAO Incident
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <TimelineItem 
            date="April 30, 2016" 
            title="The DAO Launches"
            description="The Decentralized Autonomous Organization raises $150M in ETH (11.5M ETH), becoming the largest crowdfunding project in history."
            icon={<TrendingUp style={{ color: '#16a34a' }} />}
            color="green"
          />
          
          <TimelineItem 
            date="June 17, 2016" 
            title="The Attack Begins"
            description="An attacker exploits a reentrancy vulnerability in the splitDAO function, draining 3.6M ETH (~$70M at the time)."
            icon={<AlertTriangle style={{ color: '#dc2626' }} />}
            color="red"
          />
          
          <TimelineItem 
            date="June 17-20, 2016" 
            title="Community Response"
            description="Ethereum community debates solutions: do nothing, soft fork, or hard fork. The stolen funds are locked in a child DAO for 28 days."
            icon={<Network style={{ color: '#eab308' }} />}
            color="yellow"
          />
          
          <TimelineItem 
            date="July 20, 2016" 
            title="The Hard Fork"
            description="Ethereum executes a controversial hard fork at block 1,920,000, reversing the theft. This creates Ethereum (ETH) and Ethereum Classic (ETC)."
            icon={<GitBranch style={{ color: '#3b82f6' }} />}
            color="blue"
          />
        </div>
      </div>

      {/* The Vulnerability Explained */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Code style={{ color: '#dc2626' }} />
            The Vulnerable Pattern
          </h3>
          <div style={{
            background: '#f9fafb',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            fontFamily: 'Monaco, monospace',
            fontSize: '0.875rem',
            border: '1px solid #e5e7eb',
            overflowX: 'auto'
          }}>
            <pre style={{ color: '#1f2937', margin: 0 }}>
              <span style={{ color: '#8b5cf6', fontWeight: 600 }}>function</span> <span style={{ color: '#3b82f6' }}>withdraw</span>(uint amount) {'{'}{'\n'}
              {'  '}<span style={{ color: '#6b7280' }}>// 1. Check balance</span>{'\n'}
              {'  '}<span style={{ color: '#8b5cf6', fontWeight: 600 }}>require</span>(balances[msg.sender] &gt;= amount);{'\n'}
              {'\n'}
              {'  '}<span style={{ color: '#6b7280' }}>// 2. 🚨 Send ETH (external call)</span>{'\n'}
              {'  '}msg.sender.<span style={{ color: '#3b82f6' }}>call</span>{'{'}value: amount{'}'}("");{'\n'}
              {'\n'}
              {'  '}<span style={{ color: '#6b7280' }}>// 3. Update state (TOO LATE!)</span>{'\n'}
              {'  '}balances[msg.sender] -= amount;{'\n'}
              {'}'}
            </pre>
          </div>
          <p style={{ color: '#6b7280', marginTop: '1rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
            The attacker's contract receives ETH via the <code style={{ color: '#3b82f6', background: '#eff6ff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>receive()</code> function, which calls <code style={{ color: '#3b82f6', background: '#eff6ff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>withdraw()</code> again before the balance is updated.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Target style={{ color: '#16a34a' }} />
            The Attack Flow
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <AttackStep num="1" text="Attacker deposits 1 ETH into The DAO" />
            <AttackStep num="2" text="Calls withdraw(1 ETH)" />
            <AttackStep num="3" text="DAO sends 1 ETH → triggers attacker's receive()" />
            <AttackStep num="4" text="Attacker's receive() calls withdraw(1 ETH) again" />
            <AttackStep num="5" text="Balance still shows 1 ETH (not updated yet!)" />
            <AttackStep num="6" text="DAO sends another 1 ETH → recursive loop" />
            <AttackStep num="7" text="Repeats until DAO is drained" />
          </div>
        </div>
      </div>

      {/* Impact & Legacy */}
      <div style={{
        background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)',
        padding: '3rem',
        borderRadius: '1rem',
        border: '1px solid #fecaca'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <DollarSign style={{ color: '#dc2626' }} />
          Impact & Legacy
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <ImpactCard title="$70M" subtitle="Stolen in ETH" />
          <ImpactCard title="3.6M ETH" subtitle="Drained from DAO" />
          <ImpactCard title="2 Chains" subtitle="ETH & ETC created" />
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ date, title, description, icon, color }) {
  const borderColors = {
    green: '#86efac',
    red: '#fca5a5',
    yellow: '#fde047',
    blue: '#93c5fd'
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      padding: '1.5rem',
      background: 'white',
      borderRadius: '0.75rem',
      border: `2px solid ${borderColors[color] || '#e5e7eb'}`
    }}>
      <div style={{ flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.25rem' }}>{date}</div>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>{title}</h4>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>{description}</p>
      </div>
    </div>
  );
}

function AttackStep({ num, text }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <div style={{
        background: '#3b82f6',
        color: 'white',
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 700,
        flexShrink: 0
      }}>
        {num}
      </div>
      <div style={{ color: '#4b5563', lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function ImpactCard({ title, subtitle }) {
  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.5rem' }}>{title}</div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{subtitle}</div>
    </div>
  );
}
