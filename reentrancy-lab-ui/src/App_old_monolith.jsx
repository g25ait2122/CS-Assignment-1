import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { ShieldAlert, BookOpen, Activity, Lock, Cpu, PlayCircle, Wallet, AlertTriangle, CheckCircle, Code, TrendingUp, Brain, Network, Shield, Zap, Clock, DollarSign, GitBranch, Target, Eye, Layers, Home } from 'lucide-react';
import CallGraphVisualizer from './components/CallGraphVisualizer';

// --- REPLACE WITH YOUR ANVIL ADDRESSES ---
const VAULT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ATTACKER_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const attackerABI = [
  "function attack() external",
  "function withdrawLoot() external"
];

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Navigation />
        <main style={{ paddingTop: '5rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryTab />} />
            <Route path="/museum" element={<MuseumTab />} />
            <Route path="/defense" element={<DefenseTab />} />
            <Route path="/research" element={<ResearchTab />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// --- NAVIGATION ---

function Navigation() {
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

// --- HOME PAGE ---

function HomePage() {
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
              Smart Contract Security Assignment
            </div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '2rem',
              lineHeight: 1.2
            }}>
              Master Smart Contract
              <span style={{
                display: 'block',
                marginTop: '0.5rem',
                background: 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Reentrancy Attacks
              </span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.75
            }}>
              An interactive educational platform covering the history, execution, defense mechanisms, 
              and future research in smart contract security.
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
                Start Learning →
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
                Try Live Demo
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
              title="The Birth"
              description="Learn about The DAO hack and the origins of reentrancy vulnerabilities"
              color="blue"
            />
            <HomeCard 
              to="/museum"
              icon={<Activity style={{ color: '#8b5cf6' }} size={32} />}
              title="Attack Museum"
              description="Experience live demonstrations of reentrancy exploits with Web3"
              color="purple"
            />
            <HomeCard 
              to="/defense"
              icon={<Lock style={{ color: '#16a34a' }} size={32} />}
              title="Defenses"
              description="Master battle-tested patterns to prevent reentrancy attacks"
              color="green"
            />
            <HomeCard 
              to="/research"
              icon={<Cpu style={{ color: '#f97316' }} size={32} />}
              title="Research"
              description="Explore cutting-edge security technologies and future directions"
              color="orange"
            />
          </div>

          {/* Learning Objectives */}
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
            }}>What You'll Learn</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <LearningPoint 
                title="Historical Context"
                description="Understand the $70M DAO hack that led to Ethereum's hard fork"
              />
              <LearningPoint 
                title="Technical Mastery"
                description="Deep dive into vulnerability patterns and attack vectors"
              />
              <LearningPoint 
                title="Security Best Practices"
                description="Implement proven defense mechanisms in your smart contracts"
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

// TAB 1: HISTORY - The Birth of Reentrancy
function HistoryTab() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Birth of Reentrancy</h2>
        <p className="text-xl text-gray-600">The story of the most infamous smart contract vulnerability in blockchain history</p>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Clock className="text-blue-600" size={28} />
          Timeline: The DAO Incident
        </h3>
        
        <div className="space-y-8">
          <TimelineItem 
            date="April 30, 2016" 
            title="The DAO Launches"
            description="The Decentralized Autonomous Organization raises $150M in ETH (11.5M ETH), becoming the largest crowdfunding project in history."
            icon={<TrendingUp className="text-green-600" />}
            color="green"
          />
          
          <TimelineItem 
            date="June 17, 2016" 
            title="The Attack Begins"
            description="An attacker exploits a reentrancy vulnerability in the splitDAO function, draining 3.6M ETH (~$70M at the time)."
            icon={<AlertTriangle className="text-red-600" />}
            color="red"
          />
          
          <TimelineItem 
            date="June 17-20, 2016" 
            title="Community Response"
            description="Ethereum community debates solutions: do nothing, soft fork, or hard fork. The stolen funds are locked in a child DAO for 28 days."
            icon={<Network className="text-yellow-600" />}
            color="yellow"
          />
          
          <TimelineItem 
            date="July 20, 2016" 
            title="The Hard Fork"
            description="Ethereum executes a controversial hard fork at block 1,920,000, reversing the theft. This creates Ethereum (ETH) and Ethereum Classic (ETC)."
            icon={<GitBranch className="text-blue-600" />}
            color="blue"
          />
        </div>
      </div>

      {/* The Vulnerability Explained */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="text-red-600" />
            The Vulnerable Pattern
          </h3>
          <div className="bg-gray-50 p-6 rounded-xl font-mono text-sm border border-gray-200">
            <pre className="text-gray-800">
              <span className="text-purple-600 font-semibold">function</span> <span className="text-blue-600">withdraw</span>(uint amount) {"{"}
              {"  "}<span className="text-gray-500">// 1. Check balance</span>
              {"  "}<span className="text-purple-600 font-semibold">require</span>(balances[msg.sender] &gt;= amount);

              {"  "}<span className="text-gray-500">// 2. 🚨 Send ETH (external call)</span>
              {"  "}msg.sender.<span className="text-blue-600">call</span>{"{"}value: amount{"}"}("");

              {"  "}<span className="text-gray-500">// 3. Update state (TOO LATE!)</span>
              {"  "}balances[msg.sender] -= amount;
              {"}"}
            </pre>
          </div>
          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            The attacker's contract receives ETH via the <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded">receive()</code> function, which calls <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded">withdraw()</code> again before the balance is updated.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="text-green-600" />
            The Attack Flow
          </h3>
          <div className="space-y-3">
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
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 md:p-12 rounded-2xl border border-red-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <DollarSign className="text-red-600" />
          Impact & Legacy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="$70M" subtitle="Stolen in 2016" description="Worth over $1B today" />
          <StatCard title="11.5M ETH" subtitle="Total DAO funds" description="~5% of all ETH at the time" />
          <StatCard title="2 Chains" subtitle="ETH & ETC" description="The fork that divided Ethereum" />
        </div>
      </div>
    </div>
  );
}

// TAB 2: ATTACK MUSEUM (The Web3 Live Demo)
function MuseumTab() {
  const [account, setAccount] = useState('');
  const [vaultBal, setVaultBal] = useState('...');
  const [attackerBal, setAttackerBal] = useState('...');
  const [status, setStatus] = useState('Awaiting execution...');
  const [isAttacking, setIsAttacking] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setAccount(await signer.getAddress());
    updateBalances(provider);
  };

  const updateBalances = async (provider) => {
    try {
      const vBal = await provider.getBalance(VAULT_ADDRESS);
      const aBal = await provider.getBalance(ATTACKER_ADDRESS);
      setVaultBal(ethers.utils.formatEther(vBal));
      setAttackerBal(ethers.utils.formatEther(aBal));
    } catch {
      console.error("Contract not deployed yet or wrong network.");
    }
  };

  const executeAttack = async () => {
    if (!account) return alert("Connect Wallet First!");
    setIsAttacking(true);
    setStatus('MetaMask opened. Please confirm transaction...');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ATTACKER_ADDRESS, attackerABI, signer);
      
      const tx = await contract.attack();
      setStatus('Transaction sent! Waiting for block confirmation...');
      
      await tx.wait();
      setStatus('🚨 EXPLOIT SUCCESSFUL! VAULT DRAINED.');
      updateBalances(provider);
    } catch {
      setStatus('Transaction failed or rejected.');
    }
    setIsAttacking(false);
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">DeFi Yield Vault Exploit</h2>
        <p className="text-xl text-gray-600">Live execution of a cross-contract control transfer vulnerability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Context & Controls */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Wallet size={20} className="text-blue-600"/> 
                Web3 Execution Panel
              </h3>
              <button 
                onClick={connectWallet}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white font-medium transition-colors shadow-sm"
              >
                {account ? `Connected: ${account.substring(0,6)}...` : 'Connect MetaMask'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <p className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">Target Vault Balance</p>
                <p className={`text-3xl font-bold ${vaultBal === '0.0' ? 'text-red-600' : 'text-green-600'}`}>{vaultBal} ETH</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                <p className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">Attacker Loot</p>
                <p className={`text-3xl font-bold ${attackerBal !== '0.0' && attackerBal !== '...' ? 'text-red-600' : 'text-gray-400'}`}>{attackerBal} ETH</p>
              </div>
            </div>

            <button 
              onClick={executeAttack}
              disabled={!account || isAttacking}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                !account ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 
                'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              <PlayCircle /> {isAttacking ? 'EXECUTING...' : 'EXECUTE SMART CONTRACT EXPLOIT'}
            </button>
            
            <p className={`mt-4 text-center text-sm font-medium ${status.includes('SUCCESS') ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
              {status}
            </p>
          </div>
        </div>

        {/* Right Column: The Code & Attack Explanation */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-gray-700 mb-4 font-semibold">// VULNERABLE FUNCTION: claimRewards()</h3>
            <pre className="text-gray-800 font-mono text-sm">
              <span className="text-purple-600 font-semibold">function</span> <span className="text-blue-600">claimRewards</span>() <span className="text-purple-600 font-semibold">external</span> {"{"}
              {"  "}uint256 staked = stakedBalances[msg.sender];
              {"  "}<span className="text-purple-600 font-semibold">require</span>(staked &gt; 0, <span className="text-green-600">"No tokens"</span>);

              {"  "}uint256 reward = 0.1 <span className="text-purple-600 font-semibold">ether</span>;
              {"  "}<span className="text-gray-500">// 🚨 VULNERABILITY: External call BEFORE state update</span>
              {"  "}(<span className="text-purple-600 font-semibold">bool</span> success, ) = msg.sender.<span className="text-blue-600">call</span>{"{"}value: reward{"}"}(<span className="text-green-600">""</span>);
              {"  "}<span className="text-purple-600 font-semibold">require</span>(success, <span className="text-green-600">"Failed"</span>);

              {"  "}<span className="text-gray-500">// 🐌 State update happens too late!</span>
              {"  "}lastClaimTime[msg.sender] = <span className="text-orange-600">block.timestamp</span>;
              {"}"}
            </pre>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How the Attack Works</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="text-blue-600 font-bold">1.</div>
                <div className="text-gray-700">Attacker deposits ERC20 tokens into the vault</div>
              </div>
              <div className="flex gap-3">
                <div className="text-blue-600 font-bold">2.</div>
                <div className="text-gray-700">Calls <code className="bg-gray-100 px-2 py-1 rounded">claimRewards()</code> to withdraw ETH</div>
              </div>
              <div className="flex gap-3">
                <div className="text-blue-600 font-bold">3.</div>
                <div className="text-gray-700">Vault sends ETH → triggers attacker&apos;s <code className="bg-gray-100 px-2 py-1 rounded">receive()</code></div>
              </div>
              <div className="flex gap-3">
                <div className="text-blue-600 font-bold">4.</div>
                <div className="text-gray-700">Attacker&apos;s contract calls <code className="bg-gray-100 px-2 py-1 rounded">claimRewards()</code> again</div>
              </div>
              <div className="flex gap-3">
                <div className="text-blue-600 font-bold">5.</div>
                <div className="text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">lastClaimTime</code> still not updated → check passes!</div>
              </div>
              <div className="flex gap-3">
                <div className="text-blue-600 font-bold">6.</div>
                <div className="text-gray-700">Loop continues until vault is drained</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Graph Visualizer - The Killer Feature! */}
      <div className="mt-12">
        <CallGraphVisualizer attackType="classic" isAttacking={isAttacking} />
      </div>
    </div>
  );
}

// TAB 3: DEFENSES - Evolution of Defense
function DefenseTab() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Evolution of Defense</h2>
        <p className="text-xl text-gray-600">Battle-tested patterns and mechanisms to prevent reentrancy attacks</p>
      </div>

      {/* Defense Pattern 1: CEI */}
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
          <CheckCircle size={28} />
          Pattern 1: Checks-Effects-Interactions (CEI)
        </h3>
        <p className="text-gray-700 mb-8 text-lg">The golden rule of smart contract security: Always update state before making external calls.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-600" size={20} />
              <h4 className="text-lg font-semibold text-red-600">❌ Vulnerable Code</h4>
            </div>
            <div className="bg-red-50 p-6 rounded-xl font-mono text-sm border-2 border-red-200">
              <pre className="text-gray-800">
                <span className="text-purple-600 font-semibold">function</span> <span className="text-blue-600">claimRewards</span>() {"{"}
                {"  "}<span className="text-gray-500">// 1. Checks</span>
                {"  "}<span className="text-purple-600 font-semibold">require</span>(staked &gt; 0);

                {"  "}<span className="text-gray-500">// 2. Interactions (WRONG ORDER!)</span>
                {"  "}msg.sender.<span className="text-blue-600">call</span>{"{"}value: reward{"}"}("");

                {"  "}<span className="text-gray-500">// 3. Effects (TOO LATE)</span>
                {"  "}lastClaim[msg.sender] = now;
                {"}"}
              </pre>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-600" size={20} />
              <h4 className="text-lg font-semibold text-green-600">✅ Secure Code</h4>
            </div>
            <div className="bg-green-50 p-6 rounded-xl font-mono text-sm border-2 border-green-200">
              <pre className="text-gray-800">
                <span className="text-purple-600 font-semibold">function</span> <span className="text-blue-600">claimRewards</span>() {"{"}
                {"  "}<span className="text-gray-500">// 1. Checks</span>
                {"  "}<span className="text-purple-600 font-semibold">require</span>(staked &gt; 0);

                {"  "}<span className="text-gray-500">// 2. Effects (UPDATE FIRST!)</span>
                {"  "}lastClaim[msg.sender] = now;

                {"  "}<span className="text-gray-500">// 3. Interactions (SAFE NOW)</span>
                {"  "}msg.sender.<span className="text-blue-600">call</span>{"{"}value: reward{"}"}("");
                {"}"}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Defense Pattern 2: ReentrancyGuard */}
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          <Lock size={28} />
          Pattern 2: Reentrancy Guard (Mutex Lock)
        </h3>
        <p className="text-gray-700 mb-8 text-lg">Use a state variable to prevent recursive calls to the same function.</p>
        
        <div className="bg-blue-50 p-8 rounded-xl font-mono text-sm border border-blue-200">
          <pre className="text-gray-800">
            <span className="text-purple-600 font-semibold">contract</span> <span className="text-blue-600">ReentrancyGuard</span> {"{"}
            {"  "}<span className="text-purple-600 font-semibold">bool</span> <span className="text-purple-600 font-semibold">private</span> locked;
            {"\n"}
            {"  "}<span className="text-purple-600 font-semibold">modifier</span> <span className="text-blue-600">nonReentrant</span>() {"{"}
            {"    "}<span className="text-purple-600 font-semibold">require</span>(!locked, <span className="text-green-600">"No reentrancy"</span>);
            {"    "}locked = <span className="text-purple-600 font-semibold">true</span>;
            {"    "}<span className="text-purple-600 font-semibold">_</span>;
            {"    "}locked = <span className="text-purple-600 font-semibold">false</span>;
            {"  }"}
            {"\n"}
            {"  "}<span className="text-purple-600 font-semibold">function</span> <span className="text-blue-600">withdraw</span>() <span className="text-purple-600 font-semibold">external</span> <span className="text-blue-600">nonReentrant</span> {"{"}
            {"    "}<span className="text-gray-500">// Safe from reentrancy!</span>
            {"    "}msg.sender.<span className="text-blue-600">call</span>{"{"}value: amount{"}"}("");
            {"  }"}
            {"}"}
          </pre>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <p className="text-blue-900 text-sm leading-relaxed">
            <strong>💡 Pro Tip:</strong> OpenZeppelin provides a battle-tested <code className="bg-white px-2 py-1 rounded">ReentrancyGuard</code> contract. Always prefer audited libraries over custom implementations.
          </p>
        </div>
      </div>

      {/* Defense Pattern 3: Pull over Push */}
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
          <Zap size={28} />
          Pattern 3: Pull Over Push Payments
        </h3>
        <p className="text-gray-700 mb-8 text-lg">Instead of sending ETH directly, let users withdraw their funds themselves.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-red-600 font-semibold mb-4">❌ Push Pattern (Risky)</h4>
            <div className="bg-red-50 p-6 rounded-xl font-mono text-sm border border-red-200">
              <pre className="text-gray-800">
                <span className="text-purple-600 font-semibold">function</span> <span className="text-blue-600">distribute</span>() {"{"}
                {"  "}<span className="text-gray-500">// Sends to everyone</span>
                {"  "}<span className="text-purple-600 font-semibold">for</span> (uint i = 0; i &lt; users.length; i++) {"{"}
                {"    "}users[i].<span className="text-blue-600">transfer</span>(amount);
                {"  }"}
                {"}"}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-green-600 font-semibold mb-4">✅ Pull Pattern (Safe)</h4>
            <div className="bg-green-50 p-6 rounded-xl font-mono text-sm border border-green-200">
              <pre className="text-gray-800">
                <span className="text-purple-600 font-semibold">function</span> <span className="text-blue-600">withdraw</span>() {"{"}
                {"  "}uint amount = balances[msg.sender];
                {"  "}balances[msg.sender] = 0;
                {"  "}msg.sender.<span className="text-blue-600">transfer</span>(amount);
                {"}"}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 md:p-12 rounded-2xl border border-green-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Shield className="text-green-600" />
          Security Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BestPractice text="Always follow Checks-Effects-Interactions pattern" />
          <BestPractice text="Use OpenZeppelin's ReentrancyGuard for critical functions" />
          <BestPractice text="Prefer pull over push for payments" />
          <BestPractice text="Update state before external calls" />
          <BestPractice text="Use .transfer() or .send() with proper error handling" />
          <BestPractice text="Audit all external calls and state changes" />
        </div>
      </div>
    </div>
  );
}

// TAB 4: RESEARCH - Future of Smart Contract Security
function ResearchTab() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Future of Security</h2>
        <p className="text-xl text-gray-600">Emerging technologies and research directions in smart contract security</p>
      </div>

      {/* AI-Powered Detection */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 rounded-2xl border border-purple-200 mb-8">
        <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <Brain size={28} />
          AI-Powered Vulnerability Detection
        </h3>
        <p className="text-gray-700 mb-8 text-lg">Machine learning models trained on millions of smart contracts to detect vulnerabilities before deployment.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResearchCard 
            title="Static Analysis AI"
            description="Neural networks analyze bytecode patterns to identify potential reentrancy vulnerabilities with 95%+ accuracy."
            tools={['Slither', 'Mythril', 'Securify']}
          />
          <ResearchCard 
            title="Runtime Monitoring"
            description="AI agents monitor transaction patterns in real-time to detect and prevent attacks before they complete."
            tools={['Forta Network', 'OpenZeppelin Defender', 'Tenderly']}
          />
        </div>
      </div>

      {/* Formal Verification */}
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-2xl font-bold text-cyan-600 mb-4 flex items-center gap-2">
          <CheckCircle size={28} />
          Formal Verification
        </h3>
        <p className="text-gray-700 mb-8 text-lg">Mathematical proofs that smart contracts behave correctly under all possible conditions.</p>
        
        <div className="bg-cyan-50 p-8 rounded-xl border border-cyan-200">
          <h4 className="text-gray-900 font-semibold mb-4 text-lg">Example: Proving Reentrancy Safety</h4>
          <div className="font-mono text-sm text-gray-800 space-y-2">
            <div><span className="text-purple-600 font-semibold">Invariant:</span> <span className="text-green-600">balance[user] ≥ 0</span></div>
            <div><span className="text-purple-600 font-semibold">Precondition:</span> <span className="text-yellow-600">balance[user] ≥ amount</span></div>
            <div><span className="text-purple-600 font-semibold">Postcondition:</span> <span className="text-cyan-600">balance[user] = old(balance[user]) - amount</span></div>
          </div>
          <div className="mt-6 flex gap-4 flex-wrap">
            <ToolBadge name="Certora" />
            <ToolBadge name="K Framework" />
            <ToolBadge name="Coq" />
          </div>
        </div>
      </div>

      {/* Cross-Chain Security */}
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
          <Network size={28} />
          Cross-Chain Bridge Security
        </h3>
        <p className="text-gray-700 mb-8 text-lg">New attack vectors emerge as assets move between blockchains. Reentrancy can occur across chains.</p>
        
        <div className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <h4 className="text-red-700 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle size={18} />
              Cross-Chain Reentrancy Attack
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Attacker exploits message passing between chains to re-enter a contract before state is finalized on the source chain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MitigationCard title="Atomic Swaps" description="Ensure all-or-nothing execution" />
            <MitigationCard title="Time Locks" description="Delay finalization to detect attacks" />
            <MitigationCard title="Multi-Sig Validation" description="Require multiple validators" />
          </div>
        </div>
      </div>

      {/* Emerging Research Areas */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 rounded-2xl border border-blue-200 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Layers className="text-blue-600" />
          Emerging Research Areas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResearchArea 
            icon={<Eye className="text-green-600" />}
            title="MEV Protection"
            description="Preventing front-running and sandwich attacks through encrypted mempools and fair ordering."
          />
          <ResearchArea 
            icon={<Zap className="text-yellow-600" />}
            title="Zero-Knowledge Proofs"
            description="Privacy-preserving smart contracts that hide execution details while proving correctness."
          />
          <ResearchArea 
            icon={<Shield className="text-blue-600" />}
            title="Hardware Security"
            description="Trusted Execution Environments (TEEs) for secure smart contract execution."
          />
          <ResearchArea 
            icon={<Brain className="text-purple-600" />}
            title="Automated Repair"
            description="AI systems that automatically fix vulnerabilities in smart contract code."
          />
          <ResearchArea 
            icon={<Network className="text-cyan-600" />}
            title="Decentralized Auditing"
            description="Community-driven security reviews with on-chain incentives and reputation."
          />
          <ResearchArea 
            icon={<Target className="text-red-600" />}
            title="Quantum Resistance"
            description="Preparing smart contracts for the post-quantum cryptography era."
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 md:p-12 rounded-2xl border border-cyan-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Research Community</h3>
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          Smart contract security is an evolving field. Stay updated with the latest research, contribute to open-source tools, and help build a safer Web3 ecosystem.
        </p>
        <div className="flex flex-wrap gap-4">
          <ResourceLink text="OpenZeppelin Security Blog" />
          <ResourceLink text="Consensys Diligence" />
          <ResourceLink text="Trail of Bits" />
          <ResourceLink text="Secureum" />
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function TimelineItem({ date, title, description, icon, color }) {
  const colorClasses = {
    green: 'border-green-300 bg-green-50',
    red: 'border-red-300 bg-red-50',
    yellow: 'border-yellow-300 bg-yellow-50',
    blue: 'border-blue-300 bg-blue-50'
  };

  return (
    <div className={`border-l-4 pl-8 pb-8 relative ${colorClasses[color]}`}>
      <div className="absolute -left-4 top-0 bg-white p-2 rounded-full shadow-sm border-2 border-gray-100">
        {icon}
      </div>
      <div className="text-sm text-gray-600 font-semibold mb-2">{date}</div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}

function AttackStep({ num, text }) {
  return (
    <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl border border-blue-200">
      <div className="bg-blue-600 text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
        {num}
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

function StatCard({ title, subtitle, description }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <div className="text-4xl font-bold text-gray-900 mb-2">{title}</div>
      <div className="text-blue-600 font-semibold mb-3">{subtitle}</div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function BestPractice({ text }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

function ResearchCard({ title, description, tools }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

function ToolBadge({ name }) {
  return (
    <span className="bg-white text-cyan-700 px-4 py-2 rounded-lg text-sm font-semibold border border-cyan-200 shadow-sm">
      {name}
    </span>
  );
}

function MitigationCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h5 className="text-gray-900 font-semibold mb-2">{title}</h5>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function ResearchArea({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
      <div className="mb-4">{icon}</div>
      <h4 className="text-lg font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ResourceLink({ text }) {
  return (
    <a 
      href="#" 
      className="bg-white hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-xl font-medium transition-all border border-blue-200 hover:border-blue-400 hover:shadow-sm inline-flex items-center gap-2"
    >
      {text} →
    </a>
  );
}
