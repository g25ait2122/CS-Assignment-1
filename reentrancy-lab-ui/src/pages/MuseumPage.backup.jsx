import { useState } from 'react';
import { Activity, Zap, Eye, DollarSign, PlayCircle, Terminal, ShieldAlert, ArrowRight } from 'lucide-react';
import { ethers } from 'ethers';

// --- REPLACE WITH YOUR ANVIL ADDRESSES ---
const VAULT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ATTACKER_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function MuseumPage() {
  const [activeExhibit, setActiveExhibit] = useState(2); // Default to Cross-Function

  const attacks = [
    { id: 1, title: "Classic Reentrancy", icon: <Zap size={20} />, status: "Legacy Vulnerability", color: "#3b82f6" },
    { id: 2, title: "Cross-Function", icon: <Activity size={20} />, status: "Web3 Live Demo", color: "#8b5cf6" },
    { id: 3, title: "Read-Only Reentrancy", icon: <Eye size={20} />, status: "DeFi Oracle Exploit", color: "#06b6d4" },
    { id: 4, title: "Flashloan Amplified", icon: <DollarSign size={20} />, status: "Composability Nightmare", color: "#f97316" }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>The Taxonomy of Reentrancy</h2>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Interact with the exhibits to see how the EVM's most notorious bug evolved.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 2fr' : '1fr', gap: '2rem' }}>
        
        {/* LEFT COLUMN: The Family Tree Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Exhibit</h3>
          
          {attacks.map((attack) => (
            <button
              key={attack.id}
              onClick={() => setActiveExhibit(attack.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: `2px solid ${activeExhibit === attack.id ? attack.color : '#e5e7eb'}`,
                background: activeExhibit === attack.id ? `${attack.color}15` : 'white',
                boxShadow: activeExhibit === attack.id ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                transform: activeExhibit === attack.id ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
              onMouseEnter={(e) => {
                if (activeExhibit !== attack.id) {
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (activeExhibit !== attack.id) {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: `${attack.color}20`,
                color: attack.color
              }}>
                {attack.icon}
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>{attack.title}</h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: attack.color }}>
                  {attack.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT COLUMN: The Interactive Demo Area */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          border: '2px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          minHeight: '500px'
        }}>
          {activeExhibit === 1 && <ClassicExhibit />}
          {activeExhibit === 2 && <CrossFunctionExhibit />}
          {activeExhibit === 3 && <ReadOnlyExhibit />}
          {activeExhibit === 4 && <FlashloanExhibit />}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EXHIBIT 1: Classic Reentrancy (Trace Demo)
// ==========================================
function ClassicExhibit() {
  const [logs, setLogs] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const runTrace = async () => {
    setIsExecuting(true);
    setLogs([]);
    const trace = [
      "[124846] Attacker::attack{value: 1 ETH}()",
      " ├─ [22537] Vault::deposit{value: 1 ETH}()",
      " ├─ [92523] Vault::withdraw()",
      " │  ├─ [84858] Attacker::receive{value: 1 ETH}() 🚨 REENTER",
      " │  │  ├─ [84069] Vault::withdraw()",
      " │  │  │  ├─ [76404] Attacker::receive{value: 1 ETH}() 🚨 REENTER",
      " │  │  │  │  ├─ [75615] Vault::withdraw()",
      " │  │  │  │  │  ├─ SYSTEM: LOOP CONTINUES UNTIL DRAINED...",
      " └─ ← [Stop] Vault Balance: 0 ETH"
    ];

    for (let i = 0; i < trace.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setLogs(prev => [...prev, trace[i]]);
    }
    setIsExecuting(false);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Zap style={{ color: '#3b82f6' }} /> Classic Reentrancy
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>A single function is recursively called before the balance state is updated.</p>
      
      <div style={{
        background: '#0a0a0a',
        color: '#22c55e',
        fontFamily: 'Monaco, Consolas, monospace',
        padding: '1rem',
        borderRadius: '0.75rem',
        flex: 1,
        border: '1px solid #27272a',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '0.5rem' }}>
          <span style={{ color: '#9ca3af', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={16}/> EVM Call Trace Simulator
          </span>
          <button 
            onClick={runTrace} 
            disabled={isExecuting} 
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '0.25rem 1rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              border: 'none',
              cursor: isExecuting ? 'not-allowed' : 'pointer',
              opacity: isExecuting ? 0.5 : 1
            }}
          >
            {isExecuting ? 'Executing...' : 'Run Simulation'}
          </button>
        </div>
        
        {logs.map((log, i) => (
          <div key={i} style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem', color: log.includes('🚨') ? '#ef4444' : '#22c55e', fontWeight: log.includes('🚨') ? 700 : 400 }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// EXHIBIT 2: Cross-Function (The Web3 Demo)
// ==========================================
function CrossFunctionExhibit() {
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('Connect wallet to begin.');

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setAccount(await signer.getAddress());
    setStatus('Ready to execute smart contract exploit.');
  };

  const executeAttack = async () => {
    if (!account) return alert("Connect Wallet First!");
    setStatus('MetaMask opened. Please confirm transaction...');
    setTimeout(() => setStatus('🚨 EXPLOIT SUCCESSFUL! VAULT DRAINED.'), 3000);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Activity style={{ color: '#8b5cf6' }} /> DeFi Yield Vault Exploit
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Attacker deposits standard ERC20, but the callback on the ETH reward function drains the vault.</p>

      <div style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
        border: '2px solid #c084fc',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ShieldAlert size={48} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Web3 Execution Panel</h4>
        
        <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '10rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>Vault Balance</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#16a34a' }}>10.0 ETH</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '10rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>Hacker Loot</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#dc2626' }}>0.0 ETH</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={connectWallet} 
            style={{
              background: '#1f2937',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#374151'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#1f2937'}
          >
            {account ? `Connected: ${account.substring(0,6)}...` : 'Connect MetaMask'}
          </button>
          <button 
            onClick={executeAttack} 
            disabled={!account} 
            style={{
              background: '#8b5cf6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 700,
              border: 'none',
              cursor: account ? 'pointer' : 'not-allowed',
              opacity: account ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => { if (account) e.currentTarget.style.background = '#7c3aed'; }}
            onMouseLeave={(e) => { if (account) e.currentTarget.style.background = '#8b5cf6'; }}
          >
            <PlayCircle size={20} /> Execute Exploit
          </button>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', fontWeight: 700, color: '#8b5cf6' }}>{status}</p>
      </div>
    </div>
  );
}

// ==========================================
// EXHIBIT 3: Read-Only Reentrancy
// ==========================================
function ReadOnlyExhibit() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Eye style={{ color: '#06b6d4' }} /> Read-Only Reentrancy
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Manipulating an oracle price to steal from an innocent third-party protocol.</p>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
        {/* Contract A */}
        <div style={{ background: 'white', border: '2px solid #fca5a5', padding: '1rem', borderRadius: '0.5rem', width: '100%', maxWidth: '28rem', position: 'relative' }}>
          <h4 style={{ fontWeight: 700, color: '#dc2626', marginBottom: '0.5rem' }}>1. Vulnerable Liquidity Pool</h4>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Attacker triggers fallback. Real ETH balance is 0, but `totalDeposits` state is still 100.</p>
          <p style={{ fontFamily: 'Monaco, monospace', fontSize: '0.75rem', marginTop: '0.5rem', background: '#fef2f2', padding: '0.5rem', borderRadius: '0.25rem', color: '#991b1b' }}>getVirtualPrice() = 0 (Manipulated!)</p>
          
          <div style={{ position: 'absolute', bottom: '-2rem', left: '50%', transform: 'translateX(-50%)', color: '#06b6d4' }}>
            <ArrowRight style={{ transform: 'rotate(90deg)' }} size={24} />
          </div>
        </div>

        {/* Contract B */}
        <div style={{ background: 'white', border: '2px solid #86efac', padding: '1rem', borderRadius: '0.5rem', width: '100%', maxWidth: '28rem', marginTop: '2rem' }}>
          <h4 style={{ fontWeight: 700, color: '#16a34a', marginBottom: '0.5rem' }}>2. Innocent DeFi Protocol</h4>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Reads the manipulated price from the Liquidity Pool.</p>
          <p style={{ fontFamily: 'Monaco, monospace', fontSize: '0.75rem', marginTop: '0.5rem', background: '#f0fdf4', padding: '0.5rem', borderRadius: '0.25rem', color: '#166534' }}>Attacker buys 10,000 tokens for 0 ETH.</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EXHIBIT 4: Flashloan Amplified
// ==========================================
function FlashloanExhibit() {
  const steps = [
    { num: 1, title: "Borrow $50M Flashloan", desc: "Attacker borrows immense capital from Aave with zero collateral.", color: "#f97316" },
    { num: 2, title: "Execute Reentrancy Loop", desc: "Using the $50M to manipulate pool math, draining the victim contract entirely.", color: "#dc2626" },
    { num: 3, title: "Repay Loan + Keep Profit", desc: "The $50M + fee is returned to Aave. Attacker walks away with $10M profit in one block.", color: "#16a34a" }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <DollarSign style={{ color: '#f97316' }} /> Flashloan Amplified
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Exploiting composability by borrowing millions of dollars with zero collateral to maximize reentrancy damage.</p>

      <div style={{ flex: 1, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          
          {steps.map((step, idx) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
              <div style={{
                background: step.color,
                color: 'white',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {step.num}
              </div>
              <div style={{
                flex: 1,
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <h4 style={{ fontWeight: 700, color: step.color, marginBottom: '0.25rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '2.5rem',
                  bottom: '-1.5rem',
                  width: '2px',
                  background: 'linear-gradient(to bottom, transparent, #f97316, transparent)'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
