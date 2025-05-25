# ChilizFanGate ⚽

A decentralized fan engagement platform built on Chiliz blockchain that enables token-gated content access, creator monetization, and community rewards.

[Demo Link](https://drive.google.com/file/d/1hoYEfTFeAib-H9oM8Bg0rgn0t1hReDB1/view?usp=drive_link)

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
- Chiliz Spicy Testnet configured in MetaMask

### Setup
1.  **Clone the repository:**
    ```
    git clone https://github.com/YOUR_USERNAME/ChilizFanGate.git
    cd ChilizFanGate
    ```
2.  **Install dependencies:**
    ```
    npm install
    ```
3.  **Configure environment variables:**
    Copy the example environment file:
    ```
    cp .env.example .env
    ```
    Open the `.env` file and add your contract addresses, API keys, and any other required configuration.
4.  **Start the development server:**
    ```
    npm run dev
    ```
5.  **Open the application:**
    Navigate to `http://localhost:5173` in your web browser.

### 🔧 Smart Contract Deployment
These are general steps for deploying your smart contracts to the Chiliz Spicy Testnet.

1.  **Deploy `FanGateToken.sol` Contract:**
    *   This contract defines your ERC-20 token (e.g., "ChilizFanGate Token", "CFG").
    *   When deploying, you'll typically set an initial supply. Example constructor:
        ```
        // FanGateToken.sol
        constructor() ERC20("ChilizFanGate Token", "CFG") {
            _mint(msg.sender, 100000 * (10**decimals())); // Example: Mint 100,000 tokens to deployer
        }
        ```
2.  **Deploy `FanGatePlatform.sol` Contract:**
    *   This contract manages the core platform logic.
    *   It will likely require the address of the deployed `FanGateToken` contract. Example constructor:
        ```
        // FanGatePlatform.sol
        constructor(address _fanTokenAddress) {
            fanToken = IERC20(_fanTokenAddress);
        }
        ```
    *   Ensure you pass the correct `FanGateToken` contract address when deploying.
3.  **Transfer Token Ownership/Permissions (if needed):**
    *   For the `FanGatePlatform` contract to automatically distribute or mint `CFG` tokens, it may need appropriate permissions.
    *   If your `FanGateToken` contract uses OpenZeppelin's `Ownable` and restricts minting to the owner, you might need to transfer ownership of the `FanGateToken` contract to the `FanGatePlatform` contract.
    *   Alternatively, if using role-based access (e.g., `AccessControl` with a `MINTER_ROLE`), grant the `FanGatePlatform` contract the necessary role on the `FanGateToken` contract.

### 🌐 Network Configuration (Chiliz Spicy Testnet)
- **Chain ID**: `88882`
- **RPC URL**: `https://spicy-rpc.chiliz.com`
- **Explorer**: `https://testnet.chiliscan.com` (Note: The official explorer is usually `chilizscan.com`, but testnet might vary. Verify the correct URL.)
- **Native Currency Symbol**: `CHZ`
- **Faucet**: You'll need testnet CHZ for gas fees. Search for a "Chiliz Spicy Testnet Faucet".

### MetaMask Setup
1.  Add the Chiliz Spicy Testnet to MetaMask using the network configuration details above.
2.  Import an account or create a new one.
3.  Acquire testnet CHZ tokens from a faucet for gas fees.
4.  Connect MetaMask to the ChilizFanGate dApp when prompted.

## 📝 Smart Contracts Overview

### FanGateToken (CFG)
- **Type**: ERC-20 Token
- **Name**: ChilizFanGate Token (Example)
- **Symbol**: CFG (Example)
- **Max Supply**: e.g., 1,000,000 CFG (Define as per your tokenomics)
- **Features**: Standard ERC-20 functionalities. May include Mintable, Burnable, Pausable, Access Control (Ownable or Role-Based) depending on implementation.

### FanGate Platform
- **Content Creation**: Allows users to publish content and potentially set token requirements for access.
- **Reward Distribution**: Handles automatic distribution of CFG tokens for activities like content creation or engagement.
- **Access Control**: Implements token-gated logic based on user CFG holdings.
- **Activity Tracking**: May record user engagement and reward history.

## 🎯 Usage

### For Content Creators
1.  **Connect Wallet**: Link your MetaMask wallet, ensuring it's on the Chiliz Spicy Testnet.
2.  **Create Content**: Navigate to the content creation section to publish videos, articles, or other media.
3.  **Set Access Level**: Choose the CFG token requirement for accessing your content (e.g., Public (0 CFG), Standard (10+ CFG), Premium (100+ CFG), VIP (1000+ CFG)).
4.  **Earn Rewards**: Receive CFG tokens automatically (e.g., 50 CFG) upon successful publication, as defined by the platform's tokenomics.

### For Fans
1.  **Connect Wallet**: Join the platform by connecting your MetaMask wallet.
2.  **Explore & Engage**: Browse content, like posts, and participate in community activities.
3.  **Earn Tokens**: Receive CFG tokens for engagement (e.g., 1 CFG per like) and daily activity (e.g., 10 CFG), based on the platform rules.
4.  **Unlock Access**: Accumulate CFG tokens to unlock access to higher-tier, exclusive content.

### For Communities
- **Daily Rewards**: Active members can earn daily CFG rewards for their participation.
- **Progressive Benefits**: Increased token holdings lead to better experiences and access within the community.
- **Decentralized Governance (Future Potential)**: The token could eventually be used for community-driven decision-making.

## 🔍 Verification
All on-chain interactions can be verified using the Chiliz Spicy Testnet Explorer (e.g., ChilizScan for Testnet):
- **Token Contract**: View CFG token details, total supply, holders, and transfer history.
- **Platform Contract**: Verify contract interactions related to content creation, reward distributions, and access control changes.
- **User Activity**: Track your own on-chain transactions and token balances.

## 🛣 Roadmap

### Phase 1: Core Platform (✅ Completed / 🚧 In Progress)
- Token-gated content system
- Creator reward mechanism
- Wallet integration (Chiliz Spicy Testnet)

### Phase 2: Enhanced Features (🚧 Planned / In Development)
- NFT integration for exclusive digital collectibles or unique content access
- Creator subscription models
- Mobile application or responsive design improvements

### Phase 3: Ecosystem Growth (🔮 Future Vision)
- Expansion to support multiple sports or entertainment communities
- Potential cross-chain compatibility or bridges
- DAO (Decentralized Autonomous Organization) governance implementation

## 🤝 Contributing
We welcome contributions to ChilizFanGate! If you'd like to contribute, please:
1.  Fork the repository.
2.  Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name` or `bugfix/issue-name`).
3.  Make your changes and commit them with clear messages.
4.  Add tests if applicable.
5.  Push your branch to your fork.
6.  Submit a pull request to the main repository, detailing your changes.

Please read our `CONTRIBUTING.md` file (if available) for more detailed guidelines.

## 📄 License
This project is licensed under the MIT License - see the `LICENSE` file for details.
