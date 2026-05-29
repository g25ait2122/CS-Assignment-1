# Reentrancy Attack Analysis & Demonstration

## Project Overview

This project provides a comprehensive analysis of reentrancy vulnerabilities in smart contracts, featuring live demonstrations on a local Ethereum Virtual Machine (EVM). The system includes four distinct attack variants with interactive Web3 execution capabilities.

---

## High-Level Design (HLD)

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ History  │  │  Museum  │  │ Defense  │  │ Research │   │
│  │   Page   │  │   Page   │  │   Page   │  │   Page   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│       React 19 + React Router + ethers.js                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Web3 Integration Layer                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  MetaMask Provider + JSON-RPC (Anvil localhost:8545) │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Blockchain Layer (Anvil)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Victim Vaults│  │   Attacker   │  │  Flashloan   │      │
│  │  (4 types)   │  │  Contracts   │  │     Pool     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│              Solidity 0.8.19 + Foundry                       │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### Frontend Components
- **HistoryPage**: Historical context of The DAO hack (2016)
- **MuseumPage**: Interactive attack demonstrations with live Web3 execution
- **DefensePage**: Security patterns (CEI, Mutex locks)
- **ResearchPage**: Future security technologies

#### Smart Contracts
- **ClassicVault**: Basic reentrancy vulnerability
- **CrossVault**: Cross-function reentrancy
- **ReadOnlyPool**: Read-only reentrancy (oracle manipulation)
- **MockFlashloan**: Flashloan-amplified attack

---

## Low-Level Design (LLD)

### Attack Flow Diagrams

#### 1. Classic Reentrancy Attack

```
┌─────────────┐                                    ┌─────────────┐
│   Attacker  │                                    │ClassicVault │
│  Contract   │                                    │             │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │  1. deposit(1 ETH)                              │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │  2. withdraw()                                   │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │                        3. Check: balances[msg.sender] = 1 ETH
       │                                                  │
       │  4. Transfer 1 ETH (external call)              │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  [receive() fallback triggered]                 │
       │                                                  │
       │  5. withdraw() [REENTRANT CALL]                 │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │                        6. Check: balances[msg.sender] = 1 ETH
       │                           (NOT UPDATED YET!)     │
       │                                                  │
       │  7. Transfer 1 ETH again                        │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  [Loop continues until vault empty]             │
       │                                                  │
       │                        8. balances[msg.sender] = 0
       │                           (TOO LATE)             │
       │                                                  │
```

**Vulnerability**: State update occurs after external call, allowing recursive exploitation.

---

#### 2. Cross-Function Reentrancy Attack

```
┌─────────────┐                                    ┌─────────────┐
│   Attacker  │                                    │ CrossVault  │
│  Contract   │                                    │             │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │  1. deposit(1 ETH)                              │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │  2. claimReward()                               │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │                        3. Check: balances[msg.sender] > 0
       │                        4. Check: !rewardsClaimed[msg.sender]
       │                                                  │
       │  5. Transfer 1 ETH reward                       │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  [receive() fallback triggered]                 │
       │                                                  │
       │  6. claimReward() [DIFFERENT FUNCTION]          │
       │─────────────────────────────────────────────────>│
       │                                                  │
       │                        7. Check: !rewardsClaimed[msg.sender]
       │                           (STILL FALSE!)         │
       │                                                  │
       │  8. Transfer 1 ETH reward again                 │
       │<─────────────────────────────────────────────────│
       │                                                  │
       │  [Loop continues]                               │
       │                                                  │
       │                        9. rewardsClaimed[msg.sender] = true
       │                           (TOO LATE)             │
       │                                                  │
```

**Vulnerability**: Flag update occurs after external call, allowing cross-function reentrancy.

---

#### 3. Read-Only Reentrancy Attack

```
┌─────────────┐  ┌──────────────┐  ┌──────────────┐
│  Attacker   │  │ ReadOnlyPool │  │  Innocent    │
│  Contract   │  │   (Oracle)   │  │  Protocol    │
└──────┬──────┘  └──────┬───────┘  └──────┬───────┘
       │                │                  │
       │  1. deposit(10 ETH)               │
       │────────────────>│                  │
       │                │                  │
       │  2. withdraw() │                  │
       │────────────────>│                  │
       │                │                  │
       │                │ 3. Transfer 10 ETH
       │<────────────────│                  │
       │                │                  │
       │  [receive() fallback triggered]   │
       │                │                  │
       │  4. buyTokens(1 ETH)              │
       │──────────────────────────────────>│
       │                │                  │
       │                │  5. getPrice()   │
       │                │<─────────────────│
       │                │                  │
       │                │ 6. Return: balance / totalDeposits
       │                │    = 0 / 10 = 0  │
       │                │    (MANIPULATED!)│
       │                │──────────────────>│
       │                │                  │
       │                │  7. Mint tokens at crashed price
       │<──────────────────────────────────│
       │                │                  │
       │                │ 8. totalDeposits -= 10
       │                │    (TOO LATE)    │
       │                │                  │
```

**Vulnerability**: View function reads inconsistent state during reentrancy, enabling oracle manipulation.

---

#### 4. Flashloan Amplification Attack

```
┌─────────────┐  ┌──────────────┐  ┌──────────────┐
│   Flash     │  │  Flashloan   │  │ ClassicVault │
│  Attacker   │  │     Pool     │  │              │
└──────┬──────┘  └──────┬───────┘  └──────┬───────┘
       │                │                  │
       │  1. attack(50 ETH)                │
       │────────────────>│                  │
       │                │                  │
       │                │ 2. Transfer 50 ETH (loan)
       │<────────────────│                  │
       │                │                  │
       │  [receive() callback triggered]   │
       │                │                  │
       │  3. deposit(50 ETH)               │
       │──────────────────────────────────>│
       │                │                  │
       │  4. withdraw() │                  │
       │──────────────────────────────────>│
       │                │                  │
       │                │  5. Transfer 50 ETH
       │<──────────────────────────────────│
       │                │                  │
       │  [receive() fallback - REENTRANCY]│
       │                │                  │
       │  6. withdraw() [RECURSIVE]        │
       │──────────────────────────────────>│
       │                │                  │
       │                │  7. Transfer 50 ETH again
       │<──────────────────────────────────│
       │                │                  │
       │  [Vault drained in 2-3 loops]     │
       │                │                  │
       │  8. Repay 50 ETH loan             │
       │────────────────>│                  │
       │                │                  │
       │  9. Keep profit (10 ETH)          │
       │                │                  │
```

**Vulnerability**: Uncollateralized loan provides capital for amplified reentrancy attack.

---

## Technology Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Web3 Library**: ethers.js v5
- **Styling**: Pure CSS (inline styles)
- **Icons**: lucide-react

### Blockchain
- **Language**: Solidity 0.8.19
- **Framework**: Foundry
- **Local Node**: Anvil (Foundry's EVM)
- **Testing**: Forge

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Wallet**: MetaMask

---

## Project Structure

```
Assignment1/
├── blockchain/
│   ├── src/
│   │   └── ReentrancyLab.sol          # All 4 attack contracts
│   ├── script/
│   │   └── DeployAll.s.sol            # Deployment script
│   ├── deploy.sh                       # Automated deployment
│   └── foundry.toml                    # Foundry configuration
│
├── reentrancy-lab-ui/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx           # Landing page
│   │   │   ├── HistoryPage.jsx        # DAO hack history
│   │   │   ├── MuseumPage.jsx         # Live attack demos
│   │   │   ├── DefensePage.jsx        # Security patterns
│   │   │   └── ResearchPage.jsx       # Future research
│   │   ├── components/
│   │   │   └── layout/
│   │   │       └── Navigation.jsx     # Navigation bar
│   │   ├── App.jsx                    # Main app component
│   │   ├── index.css                  # Global styles
│   │   └── main.jsx                   # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Foundry (latest)
- MetaMask browser extension

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Assignment1
```

2. **Deploy smart contracts**
```bash
cd blockchain
./deploy.sh
```

3. **Install frontend dependencies**
```bash
cd ../reentrancy-lab-ui
npm install
```

4. **Start development server**
```bash
npm run dev
```

5. **Configure MetaMask**
   - Network: Localhost 8545
   - Chain ID: 31337
   - Import test account using private key from Anvil output

---

## Usage

### Running Attack Demonstrations

1. Navigate to the Museum page
2. Connect MetaMask wallet
3. Select an attack type from the sidebar
4. Click Execute Exploit to run the attack
5. Observe real-time balance changes and EVM call trace

## Security Patterns Demonstrated

### 1. Checks-Effects-Interactions (CEI)
```solidity
function withdraw() external {
    uint bal = balances[msg.sender];
    require(bal > 0);
    balances[msg.sender] = 0;        // Effect BEFORE interaction
    (bool s, ) = msg.sender.call{value: bal}("");
    require(s);
}
```

### 2. Reentrancy Guard (Mutex)
```solidity
bool private locked;

modifier nonReentrant() {
    require(!locked, "Reentrant call");
    locked = true;
    _;
    locked = false;
}

function withdraw() external nonReentrant {
    // Safe from reentrancy
}
```

---

## Contract Addresses (Local Anvil)

After running `deploy.sh`, contracts are deployed at:

```
ClassicVault:     0x5FbDB2315678afecb367f032d93F642f64180aa3
ClassicAttacker:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
CrossVault:       0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
CrossAttacker:    0x0165878A594ca255338adfa4d48449f69242Eb8F
ReadOnlyPool:     0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
ReadOnlyAttacker: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
FlashloanPool:    0x610178dA211FEF7D417bC0e6FeD39F05609AD788
FlashAttacker:    0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e
```

---

## References

- [The DAO Hack (2016)](https://www.gemini.com/cryptopedia/the-dao-hack-makerdao)
- [Ethereum Hard Fork](https://ethereum.org/en/history/)
- [OpenZeppelin ReentrancyGuard](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard)
