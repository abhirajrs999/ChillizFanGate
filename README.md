# ChilizFanGate ⚽

A decentralized fan engagement platform built on Chiliz blockchain that enables token-gated content access, creator monetization, and community rewards.

## 🏆 Track Coverage

**Track 1: Fan Token & Wallet Integration Challenge**
- ✅ Token-gated content access based on CFG holdings
- ✅ Seamless wallet integration with Chiliz Spicy Testnet
- ✅ Multi-tier access levels (Basic, Standard, Premium, VIP)

**Track 2: Fan-Created Content and Monetization Platforms**
- ✅ Content creation with automatic creator rewards (50 CFG tokens)
- ✅ Community engagement rewards (1 CFG per like, 10 CFG daily)
- ✅ Decentralized content distribution

## 🚀 Features

### Token Economy
- **Creator Rewards**: 50 CFG tokens per content publication
- **Engagement Rewards**: 1 CFG token per content like
- **Daily Activity**: 10 CFG tokens for active community members
- **Progressive Access**: 4-tier system based on token holdings

### Content Access Levels
- **Public** (0 CFG): Accessible to everyone
- **Standard** (10+ CFG): Basic premium content
- **Premium** (100+ CFG): High-quality exclusive content
- **VIP** (1000+ CFG): Ultra-exclusive experiences

### Smart Contract Features
- ERC-20 compatible CFG tokens
- Automated reward distribution
- Token-gated access control
- Gas-optimized operations

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Chakra UI v2** for modern components
- **Framer Motion** for animations

### Blockchain
- **Chiliz Spicy Testnet** (Chain ID: 88882)
- **wagmi** for Web3 React hooks
- **RainbowKit** for wallet connections
- **Solidity 0.8.20** for smart contracts

### Development Tools
- **OpenZeppelin** contracts for security
- **Remix IDE** for contract deployment
- **ChilizScan** for blockchain verification

## 📦 Installation

### Prerequisites
- Node.js 18+
- MetaMask wallet
- Chiliz Spicy Testnet configured

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ChilizFanGate.git
   cd ChilizFanGate

Install dependencies
bashnpm install

Configure environment
bashcp .env.example .env
# Add your contract addresses and API keys

Start development server
bashnpm run dev

Open application
Navigate to http://localhost:5173

🔧 Smart Contract Deployment
1. Deploy FanGateToken Contract
solidity// Deploy with initial supply of 100,000 CFG tokens
constructor() ERC20("ChilizFanGate Token", "CFG")
2. Deploy FanGate Platform Contract
solidity// Deploy with FanGateToken address
constructor(address _fanToken)
3. Transfer Token Ownership
Transfer FanGateToken ownership to FanGate contract to enable automatic rewards.
🌐 Network Configuration
Chiliz Spicy Testnet

Chain ID: 88882
RPC URL: https://spicy-rpc.chiliz.com
Explorer: https://testnet.chiliscan.com
Faucet: Get CHZ tokens for gas fees

MetaMask Setup

Add Chiliz Spicy network to MetaMask
Import CHZ tokens for gas fees
Connect to ChilizFanGate dApp

📝 Smart Contracts
FanGateToken (CFG)

Type: ERC-20 Token
Symbol: CFG
Max Supply: 1,000,000 CFG
Features: Mintable, Burnable, Access Control

FanGate Platform

Content Creation: Users can publish content with token requirements
Reward Distribution: Automatic CFG token rewards for activities
Access Control: Token-gated content based on user holdings
Activity Tracking: User engagement and reward history

🎯 Usage
For Content Creators

Connect Wallet: Link MetaMask to Chiliz Spicy Testnet
Create Content: Publish videos, articles, or media
Set Access Level: Choose token requirements (0-1000+ CFG)
Earn Rewards: Receive 50 CFG tokens per publication

For Fans

Connect Wallet: Join with MetaMask wallet
Engage Content: Like and view creator content
Earn Tokens: Get CFG tokens for community activities
Unlock Access: Higher token holdings = premium content

For Communities

Daily Rewards: Active members earn 10 CFG daily
Progressive Benefits: More tokens unlock better experiences
Decentralized Governance: Community-driven development

🔍 Verification
All transactions are verifiable on ChilizScan:

Token Contract: View CFG token details and transfers
Platform Contract: Verify content creation and rewards
User Activity: Track engagement and earnings

🛣 Roadmap
Phase 1: Core Platform ✅

Token-gated content system
Creator reward mechanism
Wallet integration

Phase 2: Enhanced Features 🚧

NFT integration for exclusive content
Creator subscription models
Mobile application

Phase 3: Ecosystem Growth 🔮

Multi-sport expansion
Cross-chain compatibility
DAO governance implementation

🤝 Contributing
We welcome contributions to ChilizFanGate! Please read our contributing guidelines:

Fork the repository
Create a feature branch
Make your changes
Add tests if applicable
Submit a pull request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.