import React, { useState, useEffect } from 'react';
import { Activity, Zap, Eye, DollarSign, PlayCircle, Terminal, RefreshCw } from 'lucide-react';
import { ethers } from 'ethers';

// --- PASTE DEPLOYED ADDRESSES HERE ---
const ADDR = {
    c_vault: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    c_attacker: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    x_vault: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    x_attacker: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    ro_pool: "0x0165878A594ca255338adfa4d48449f69242Eb8F",     // Fixed!
    ro_attacker: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    f_pool: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    f_attacker: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
};

export default function MuseumPage() {
  const [activeExhibit, setActiveExhibit] = useState(1);
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  
  // NEW: State for our Blockchain Time Machine
  const [snapshotId, setSnapshotId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // 1. Setup MetaMask Provider
    if (window.ethereum) {
      const p = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(p);
      window.ethereum.on('accountsChanged', (accounts) => setAccount(accounts[0] || ''));
    }

    // 2. SILENT AUTO-SNAPSHOT 
    // Automatically save the clean lab state as soon as the page loads!
    const initSnapshot = async () => {
      try {
        const directAnvil = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        const id = await directAnvil.send("evm_snapshot", []);
        setSnapshotId(id);
        console.log("✅ Silent Checkpoint Saved! ID:", id);
      } catch (e) {
        console.log("Anvil not running yet, skipping auto-snapshot.");
      }
    };
    initSnapshot();
    
  }, []);

  const connectMetaMask = async () => {
    if (!provider) return alert("Install MetaMask!");
    const accs = await provider.send("eth_requestAccounts", []);
    setAccount(accs[0]);
  };

  // --- 🛠️ LAB ADMIN CONTROLS (EVM Time Machine) ---
  const restoreSnapshot = async () => {
    if (!snapshotId) return alert("Checkpoint not found. Refresh the page to auto-save.");
    try {
      const directAnvil = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      
      // 1. Get the current nonce BEFORE reverting (This is what MetaMask expects next)
      const expectedNonce = await provider.getTransactionCount(account);
      
      // 2. Time travel back to the pristine snapshot (Vaults get their 10 ETH back)
      await directAnvil.send("evm_revert", [snapshotId]);
      
      // 3. THE MAGIC FIX: Force Anvil to update its nonce to match MetaMask!
      await directAnvil.send("anvil_setNonce", [
        account, 
        ethers.utils.hexlify(expectedNonce)
      ]);
      
      // 4. Take a new snapshot so we can restore again next time
      const newId = await directAnvil.send("evm_snapshot", []);
      setSnapshotId(newId);
      
      // 5. Force UI to refresh
      setRefreshKey(prev => prev + 1);
      
      console.log(`✅ Lab Restored! Synced Anvil Nonce to: ${expectedNonce}`);
      
    } catch (e) {
      console.error("Restore failed:", e);
      alert("Failed to restore snapshot.");
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      
      {/* Header & Wallet Connect */}
      <div style={{ 
        marginBottom: '1rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: '#111827', 
        padding: '1rem', 
        borderRadius: '0.75rem', 
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>The Attack Museum (Live Mode)</h2>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Executing real smart contracts on local Anvil node.</p>
        </div>
        <button 
          onClick={connectMetaMask} 
          style={{ 
            background: '#2563eb', 
            color: 'white', 
            padding: '0.5rem 1.5rem', 
            borderRadius: '0.5rem', 
            fontWeight: 700, 
            border: 'none', 
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
        >
          {account ? `Connected: ${account.substring(0,6)}...` : 'Connect MetaMask (Attacker)'}
        </button>
      </div>

      {/* � CONTRACT ADDRESSES */}
      <div style={{ 
        marginBottom: '2rem', 
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
        border: '1px solid #bae6fd', 
        padding: '1.5rem', 
        borderRadius: '0.75rem' 
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0369a1', marginBottom: '1rem' }}>
          📋 Deployed Contract Addresses
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '0.75rem',
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '0.75rem'
        }}>
          <AddressRow label="Classic Vault" address={ADDR.c_vault} color="#3b82f6" />
          <AddressRow label="Classic Attacker" address={ADDR.c_attacker} color="#3b82f6" />
          <AddressRow label="Cross-Function Vault" address={ADDR.x_vault} color="#8b5cf6" />
          <AddressRow label="Cross-Function Attacker" address={ADDR.x_attacker} color="#8b5cf6" />
          <AddressRow label="Read-Only Pool" address={ADDR.ro_pool} color="#06b6d4" />
          <AddressRow label="Read-Only Attacker" address={ADDR.ro_attacker} color="#06b6d4" />
          <AddressRow label="Flashloan Pool" address={ADDR.f_pool} color="#f97316" />
          <AddressRow label="Flashloan Attacker" address={ADDR.f_attacker} color="#f97316" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 3fr' : '1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <ExhibitBtn id={1} active={activeExhibit} set={setActiveExhibit} title="Classic Reentrancy" icon={<Zap/>} />
          <ExhibitBtn id={2} active={activeExhibit} set={setActiveExhibit} title="Cross-Function" icon={<Activity/>} />
          <ExhibitBtn id={3} active={activeExhibit} set={setActiveExhibit} title="Read-Only Oracle" icon={<Eye/>} />
          <ExhibitBtn id={4} active={activeExhibit} set={setActiveExhibit} title="Flashloan Attack" icon={<DollarSign/>} />
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '0.75rem', 
          border: '1px solid #e5e7eb', 
          padding: '1.5rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
        }}>
          {activeExhibit === 1 && <LiveExecutionPanel provider={provider} account={account} title="Classic Reentrancy" attackerAddr={ADDR.c_attacker} vaultAddr={ADDR.c_vault} exhibitId={1} successMsg="EVM Trace Extracted. Vault Drained completely." refreshKey={refreshKey} />}
          {activeExhibit === 2 && <LiveExecutionPanel provider={provider} account={account} title="Cross-Function" attackerAddr={ADDR.x_attacker} vaultAddr={ADDR.x_vault} exhibitId={2} successMsg="EVM Trace Extracted. Reward Pool Drained." refreshKey={refreshKey} />}
          {activeExhibit === 3 && <LiveExecutionPanel provider={provider} account={account} title="Read-Only Oracle" attackerAddr={ADDR.ro_attacker} vaultAddr={ADDR.ro_pool} attackVal="11" exhibitId={3} successMsg="Oracle Manipulated! Tokens bought at massive discount." refreshKey={refreshKey} />}
          {activeExhibit === 4 && <LiveExecutionPanel provider={provider} account={account} title="Flashloan Exploit" attackerAddr={ADDR.f_attacker} vaultAddr={ADDR.f_pool} isFlashloan={true} exhibitId={4} successMsg="Flashloan Repaid. Victim Vault Drained via Amplification." refreshKey={refreshKey} />}
        </div>
      </div>
    </div>
  );
}

function ExhibitBtn({ id, active, set, title, icon }) {
  const isActive = active === id;
  return (
    <button 
      onClick={() => set(id)} 
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '0.5rem',
        fontWeight: 700,
        transition: 'all 0.3s',
        border: 'none',
        cursor: 'pointer',
        background: isActive ? '#2563eb' : '#f3f4f6',
        color: isActive ? 'white' : '#6b7280',
        boxShadow: isActive ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#e5e7eb';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#f3f4f6';
        }
      }}
    >
      {icon} {title}
    </button>
  );
}

// --- THE REAL-TIME EXECUTION ENGINE ---
function LiveExecutionPanel({ provider, account, title, attackerAddr, vaultAddr, attackVal = "1", isFlashloan = false, successMsg, exhibitId, refreshKey }) {
  const [vBal, setVBal] = useState('...');
  const [aBal, setABal] = useState('...');
  const [victimBal, setVictimBal] = useState('...'); // For flashloan: the actual drained vault
  const [status, setStatus] = useState('Ready.');
  const [traceHtml, setTraceHtml] = useState([]);
  const [attackExecuted, setAttackExecuted] = useState(false); // Track if attack was executed

  // Fetch Real Balances
  const refreshBalances = async () => {
    if (!provider) return;
    const v = await provider.getBalance(vaultAddr);
    const a = await provider.getBalance(attackerAddr);
    setVBal(ethers.utils.formatEther(v));
    setABal(ethers.utils.formatEther(a));
    
    // For flashloan, also check the Classic Vault (the actual victim)
    if (isFlashloan) {
      const classicVault = await provider.getBalance(ADDR.c_vault);
      setVictimBal(ethers.utils.formatEther(classicVault));
    }
  };

  // 🚨 Add refreshKey here so it auto-refreshes when the lab is restored!
  useEffect(() => { 
    refreshBalances(); 
    setTraceHtml([]); 
    setStatus('Ready.');
  }, [provider, vaultAddr, refreshKey]);

  const executeRealAttack = async () => {
    if (!account) return alert("Connect MetaMask first!");
    setStatus('Confirm in MetaMask...');
    setTraceHtml([]);

    try {
      const signer = provider.getSigner();
      
      // ABI for our Attack functions
      const abi = isFlashloan ? ["function attack(uint256 amount) external"] : ["function attack() external payable"];
      const contract = new ethers.Contract(attackerAddr, abi, signer);

      let tx;
      if (isFlashloan) {
        tx = await contract.attack(ethers.utils.parseEther("10")); // Borrow 10 ETH
      } else {
        tx = await contract.attack({ value: ethers.utils.parseEther(attackVal) });
      }

      setStatus('Tx Sent! Mining block & extracting EVM trace...');
      const receipt = await tx.wait();
      
      refreshBalances();
      setStatus(`Success! Block ${receipt.blockNumber}. Fetching Trace...`);

      // 🚨 THE FIX: Bypass MetaMask's firewall to fetch the debug trace directly from Anvil
      const directAnvilProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      const rawTrace = await directAnvilProvider.send("debug_traceTransaction", [
        receipt.transactionHash, 
        { tracer: "callTracer" }
      ]);

      // Parse the JSON tree visually
      const visualTree = parseAnvilTrace(rawTrace, 0);
      setTraceHtml(visualTree);
      setStatus(successMsg);
      
      // Mark attack as executed
      setAttackExecuted(true);
      
    } catch (e) {
      console.error(e);
      setStatus('Transaction Reverted or Rejected.');
    }
  };

  // Recursively format the raw Anvil trace into a UI tree
  const parseAnvilTrace = (node, depth) => {
    let lines = [];
    const indent = "  ".repeat(depth);
    
    // Fallbacks in case node structure varies
    const gas = node.gasUsed ? parseInt(node.gasUsed, 16) : 0;
    let toStr = node.to ? `${node.to.substring(0,8)}...` : 'ContractCreation';
    let type = node.type || 'CALL';
    
    // Check for reentrancy warning visually (depth > 1 means it re-entered!)
    const isWarning = depth > 1 && type === 'CALL';
    
    lines.push(
      <div key={Math.random()} style={{
        fontFamily: 'Monaco, Consolas, monospace',
        fontSize: '0.75rem',
        marginBottom: '0.25rem',
        color: isWarning ? '#ef4444' : '#22c55e',
        fontWeight: isWarning ? 700 : 400
      }}>
        {indent}├─ [{gas} gas] {type} to {toStr} {isWarning && "🚨 REENTRANCY DETECTED"}
      </div>
    );

    if (node.calls && node.calls.length > 0) {
      node.calls.forEach(child => {
        lines = lines.concat(parseAnvilTrace(child, depth + 1));
      });
    }
    return lines;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{title}</h3>
        <button 
          onClick={refreshBalances} 
          style={{ 
            color: '#9ca3af', 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
        >
          <RefreshCw size={18}/>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isFlashloan ? '1fr 1fr 1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {isFlashloan && (
          <div style={{ 
            background: attackExecuted ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : '#f3f4f6', 
            padding: '1rem', 
            borderRadius: '0.75rem', 
            border: attackExecuted ? '2px solid #ef4444' : '1px solid #e5e7eb', 
            boxShadow: attackExecuted ? '0 4px 12px rgba(239,68,68,0.3)' : '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'all 0.5s ease'
          }}>
            <p style={{ fontSize: '0.875rem', color: attackExecuted ? '#991b1b' : '#6b7280', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {attackExecuted && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1s ease-in-out infinite' }}></span>}
              Victim Vault {attackExecuted && '• DRAINED'}
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: victimBal === '0.0' ? '#dc2626' : '#22c55e' }}>{victimBal} ETH</p>
          </div>
        )}
        <div style={{ 
          background: isFlashloan && attackExecuted ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : !isFlashloan && attackExecuted ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : '#f3f4f6', 
          padding: '1rem', 
          borderRadius: '0.75rem', 
          border: isFlashloan && attackExecuted ? '2px solid #16a34a' : !isFlashloan && attackExecuted ? '2px solid #ef4444' : '1px solid #e5e7eb', 
          boxShadow: attackExecuted ? (isFlashloan ? '0 4px 12px rgba(22,163,74,0.3)' : '0 4px 12px rgba(239,68,68,0.3)') : '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'all 0.5s ease'
        }}>
          <p style={{ fontSize: '0.875rem', color: isFlashloan && attackExecuted ? '#166534' : !isFlashloan && attackExecuted ? '#991b1b' : '#6b7280', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {attackExecuted && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isFlashloan ? '#16a34a' : '#ef4444', animation: 'pulse 1s ease-in-out infinite' }}></span>}
            {isFlashloan ? (
              attackExecuted ? 'Flashloan Pool • REPAID' : 'Flashloan Pool'
            ) : (
              attackExecuted ? 'Victim Vault • DRAINED' : 'Victim Vault'
            )}
          </p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: !isFlashloan && vBal === '0.0' ? '#dc2626' : '#22c55e' }}>{vBal} ETH</p>
        </div>
        <div style={{ 
          background: attackExecuted ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : '#f3f4f6', 
          padding: '1rem', 
          borderRadius: '0.75rem', 
          border: attackExecuted ? '2px solid #f59e0b' : '1px solid #e5e7eb', 
          boxShadow: attackExecuted ? '0 4px 12px rgba(245,158,11,0.3)' : '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'all 0.5s ease'
        }}>
          <p style={{ fontSize: '0.875rem', color: attackExecuted ? '#92400e' : '#6b7280', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {attackExecuted && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', animation: 'pulse 1s ease-in-out infinite' }}></span>}
            {attackExecuted ? (isFlashloan ? 'Attacker • PROFIT' : 'Attacker • STOLEN') : 'Attacker Balance'}
          </p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: attackExecuted ? '#b45309' : '#111827' }}>{aBal} ETH</p>
        </div>
      </div>

      <button 
        onClick={executeRealAttack} 
        style={{ 
          width: '100%', 
          background: '#dc2626', 
          color: 'white', 
          fontWeight: 700, 
          padding: '1rem', 
          borderRadius: '0.75rem', 
          marginBottom: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(220,38,38,0.5)',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
      >
        <PlayCircle/> Execute Exploit (MetaMask)
      </button>

      <p style={{ fontSize: '0.875rem', fontWeight: 700, textAlign: 'center', color: '#eab308', marginBottom: '1.5rem' }}>{status}</p>

      <div style={{ 
        background: '#0a0a0a', 
        padding: '1rem', 
        borderRadius: '0.75rem', 
        border: '1px solid #27272a', 
        height: '16rem', 
        overflowY: 'auto',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: '#6b7280', 
          fontSize: '0.75rem', 
          marginBottom: '0.75rem', 
          borderBottom: '1px solid #27272a', 
          paddingBottom: '0.5rem' 
        }}>
          <Terminal size={14}/> LIVE RPC `debug_traceTransaction` 
        </div>
        {traceHtml.length > 0 ? traceHtml : <p style={{ color: '#4b5563', fontFamily: 'Monaco, Consolas, monospace', fontSize: '0.875rem' }}>Awaiting execution...</p>}
      </div>

      {/* NEW: Under the hood explanation */}
      <UnderTheHood exhibitId={exhibitId} />
    </div>
  );
}

// --- NEW COMPONENT: UNDER THE HOOD EXPLANATIONS ---
function UnderTheHood({ exhibitId }) {
  const content = {
    1: {
      title: "How Classic Reentrancy Works",
      steps: [
        "Attacker calls attack(), depositing 1 ETH into the Vault.",
        "Attacker calls withdraw(). The Vault verifies the 1 ETH balance.",
        "Vault sends 1 ETH to the Attacker using msg.sender.call().",
        "This triggers the Attacker's receive() fallback function.",
        "Inside receive(), the Attacker calls withdraw() AGAIN.",
        "Because the Vault hasn't updated the balance yet, it sends another 1 ETH.",
        "This loops until the Vault's ETH is completely drained."
      ],
      code: `function withdraw() external {\n  uint bal = balances[msg.sender];\n  // 🚨 EXTERNAL CALL FIRST\n  (bool s, ) = msg.sender.call{value: bal}("");\n  \n  // 🐌 STATE UPDATED TOO LATE\n  balances[msg.sender] = 0;\n}` 
    },
    2: {
      title: "How Cross-Function Reentrancy Works",
      steps: [
        "Attacker deposits standard tokens (e.g. USDC).",
        "Attacker calls claimReward() to get their ETH reward.",
        "Vault sends the ETH reward, triggering the Attacker's receive() function.",
        "Instead of calling claimReward() again, the Attacker calls a DIFFERENT function (like transfer() or withdraw()).",
        "The rewardsClaimed flag hasn't been set to true yet, allowing infinite claims."
      ],
      code: `function claimReward() external {\n  require(!rewardsClaimed[msg.sender], "Claimed");\n  // 🚨 REWARD SENT FIRST\n  (bool s, ) = msg.sender.call{value: 1 ether}("");\n  \n  // 🐌 FLAG UPDATED TOO LATE\n  rewardsClaimed[msg.sender] = true;\n}` 
    },
    3: {
      title: "How Read-Only Reentrancy Works",
      steps: [
        "Attacker deposits 10 ETH into the Liquidity Pool and immediately withdraws it.",
        "During the withdrawal, the Pool sends the ETH back, triggering receive().",
        "At this exact moment, the Pool's ETH balance is depleted, but totalDeposits hasn't updated yet.",
        "The getPrice() Oracle formula (ETH Balance / totalDeposits) mathematically crashes to near zero.",
        "Attacker uses this crashed price to buy massive amounts of tokens from a third-party InnocentProtocol."
      ],
      code: `function getPrice() external view returns (uint) {\n  // 🚨 If called during a fallback, address(this).balance \n  // is 0, but totalDeposits is still high!\n  return (address(this).balance * 1e18) / totalDeposits;\n}` 
    },
    4: {
      title: "How Flashloan Amplification Works",
      steps: [
        "Attacker doesn't have funds. They borrow 50 ETH from a Flashloan pool.",
        "The Flashloan pool sends 50 ETH and calls the Attacker's executeOperation() callback.",
        "Inside the callback, the Attacker uses the massive 50 ETH capital to trigger a classic reentrancy loop.",
        "The massive capital drains the victim vault completely in just a few loops.",
        "Attacker repays the 50 ETH flashloan plus a small fee, keeping the remaining stolen ETH as pure profit."
      ],
      code: `receive() external payable {\n  if (msg.sender == flashPool) {\n    // 🚨 Massive capital received. Trigger Attack.\n    vault.deposit{value: msg.value}();\n    vault.withdraw();\n    // Repay loan instantly\n    payable(flashPool).transfer(msg.value);\n  }\n}` 
    }
  };

  const data = content[exhibitId];

  return (
    <div style={{ 
      background: '#f9fafb', 
      borderRadius: '0.75rem', 
      border: '1px solid #e5e7eb', 
      padding: '1.5rem',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <h4 style={{ 
        fontSize: '1.125rem', 
        fontWeight: 700, 
        color: '#111827', 
        marginBottom: '1rem', 
        borderBottom: '1px solid #e5e7eb', 
        paddingBottom: '0.5rem' 
      }}>
        ⚙️ Under the Hood: {data.title}
      </h4>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr', 
        gap: '1.5rem' 
      }}>
        <div>
          <h5 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#6b7280', 
            textTransform: 'uppercase', 
            marginBottom: '0.75rem' 
          }}>Execution Flow</h5>
          <ol style={{ 
            listStyleType: 'decimal', 
            listStylePosition: 'inside', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem', 
            fontSize: '0.875rem', 
            color: '#374151' 
          }}>
            {data.steps.map((step, i) => (
              <li key={i} style={{ lineHeight: '1.6' }}>{step}</li>
            ))}
          </ol>
        </div>
        
        <div>
          <h5 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#6b7280', 
            textTransform: 'uppercase', 
            marginBottom: '0.75rem' 
          }}>Vulnerable Code</h5>
          <div style={{ 
            background: '#111827', 
            borderRadius: '0.5rem', 
            padding: '1rem', 
            fontFamily: 'Monaco, Consolas, monospace', 
            fontSize: '0.75rem', 
            color: '#93c5fd', 
            overflowX: 'auto', 
            border: '1px solid #374151' 
          }}>
            <pre>{data.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component to display contract addresses
function AddressRow({ label, address, color }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Truncate address: 0x5FbD...0aa3
  const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      background: 'white',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${color}20`,
      position: 'relative'
    }}>
      <div style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%', 
        background: color,
        flexShrink: 0
      }} />
      <span style={{ 
        fontSize: '0.75rem', 
        fontWeight: 600, 
        color: '#374151',
        minWidth: '140px'
      }}>
        {label}:
      </span>
      <code 
        style={{ 
          color: color, 
          fontWeight: 600,
          fontSize: '0.7rem',
          cursor: 'pointer',
          position: 'relative'
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {truncated}
        
        {/* Tooltip */}
        {showTooltip && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '0.5rem',
            background: '#1f2937',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.7rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            zIndex: 50,
            pointerEvents: 'none'
          }}>
            {address}
            {/* Tooltip arrow */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #1f2937'
            }} />
          </div>
        )}
      </code>
    </div>
  );
}
