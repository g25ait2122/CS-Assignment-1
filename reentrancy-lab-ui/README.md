# 🛡️ ReentrancyLab - Interactive Smart Contract Security Assignment

A comprehensive, professional educational platform for learning about reentrancy attacks in smart contracts. This elegant React application features proper routing, a clean white theme, and provides an interactive, one-stop learning experience covering the history, execution, defense mechanisms, and future research in smart contract security.

## ✨ Design Features

- **Elegant White Theme**: Professional, clean design suitable for academic and corporate environments
- **Proper Routing**: React Router implementation with dedicated URLs for each section
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern Typography**: Inter font family with smooth anti-aliasing
- **Smooth Animations**: Fade-in and slide transitions for enhanced UX

## 🎯 Features

### **Act 1: The Birth of Reentrancy**
- Interactive timeline of The DAO hack (2016)
- Visual explanation of the vulnerability pattern
- Step-by-step attack flow breakdown
- Impact statistics and legacy analysis

### **Act 2: Attack Museum (Live Demo)**
- Live Web3 integration with MetaMask
- Real-time smart contract exploit execution
- Visual balance tracking
- Interactive code walkthrough
- Attack mechanism explanation

### **Act 3: The Evolution of Defense**
- **Checks-Effects-Interactions (CEI)** pattern with side-by-side code comparison
- **ReentrancyGuard** (Mutex Lock) implementation
- **Pull over Push** payment pattern
- Security best practices checklist

### **Act 4 & 5: The Future of Security**
- AI-powered vulnerability detection
- Formal verification techniques
- Cross-chain bridge security
- Emerging research areas (MEV, ZK-proofs, quantum resistance)
- Community resources and tools

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MetaMask browser extension
- Anvil (local Ethereum node) running with deployed contracts

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Configuration

Update the contract addresses in `src/App.jsx`:

```javascript
const VAULT_ADDRESS = "YOUR_VAULT_ADDRESS";
const ATTACKER_ADDRESS = "YOUR_ATTACKER_ADDRESS";
```

## 🏗️ Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **ethers.js v5** - Web3 integration
- **Lucide React** - Icon library
- **Google Fonts (Inter)** - Typography

## 📁 Project Structure

```
reentrancy-lab-ui/
├── src/
│   ├── App.jsx          # Main application with routing
│   ├── index.css        # Global styles and animations
│   └── main.jsx         # Entry point
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🗺️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with overview and navigation cards |
| `/history` | HistoryTab | The DAO hack timeline and vulnerability explanation |
| `/museum` | MuseumTab | Live Web3 attack demonstration |
| `/defense` | DefenseTab | Security patterns and best practices |
| `/research` | ResearchTab | Future research and emerging technologies |

## 🎨 UI Components

### Main Tabs
- `HistoryTab` - DAO hack timeline and vulnerability explanation
- `MuseumTab` - Live attack demonstration
- `DefenseTab` - Security patterns and best practices
- `ResearchTab` - Future research and emerging technologies

### Helper Components
- `TimelineItem` - Historical event display
- `AttackStep` - Attack flow visualization
- `StatCard` - Impact statistics
- `BestPractice` - Security checklist items
- `ResearchCard` - Research area cards
- `ToolBadge` - Tool/framework badges
- `MitigationCard` - Security mitigation strategies
- `ResearchArea` - Emerging research topics
- `ResourceLink` - External resource links

## 🔗 Integration with Smart Contracts

This UI connects to the following contracts:
- `YieldVault` - Vulnerable DeFi vault contract
- `Attacker` - Exploit contract demonstrating reentrancy

Ensure these contracts are deployed on your local Anvil node before running the demo.

## 🎓 Educational Goals

1. **Understand** the historical context of reentrancy attacks
2. **Visualize** how the attack works in real-time
3. **Learn** battle-tested defense patterns
4. **Explore** cutting-edge security research

## 🛠️ Development

```bash
# Run linter
npm run lint

# Preview production build
npm run preview
```

## 📚 Resources

- OpenZeppelin Security Blog
- Consensys Diligence
- Trail of Bits
- Secureum

## 🤝 Contributing

This is an educational project. Feel free to enhance the content, add more visualizations, or improve the UI/UX.

## 📄 License

MIT License - Educational purposes

---

**Built with ❤️ for the Web3 security community**
