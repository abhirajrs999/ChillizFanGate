// Replace with your actual deployed contract addresses
export const CONTRACT_ADDRESSES = {
  FAN_TOKEN: '0x7df0d1BA1dC29B16283D175c6a4442aCB69B972d',
  FAN_GATE: '0xd9145CCE52D386f254917e481eB44e9943F39138',
} as const;

// Complete FanGateToken ABI
export const FAN_TOKEN_ABI = [
  {
    "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{"name": "owner", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}]
  },
  {
    "name": "symbol",
    "type": "function", 
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{"name": "", "type": "string"}]
  },
  {
    "name": "name",
    "type": "function",
    "stateMutability": "view", 
    "inputs": [],
    "outputs": [{"name": "", "type": "string"}]
  },
  {
    "name": "hasAccess",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {"name": "user", "type": "address"},
      {"name": "minTokens", "type": "uint256"}
    ],
    "outputs": [{"name": "", "type": "bool"}]
  },
  {
    "name": "transferOwnership",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [{"name": "newOwner", "type": "address"}],
    "outputs": []
  },
  {
    "name": "owner",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{"name": "", "type": "address"}]
  }
] as const;

// Complete FanGate ABI  
export const FAN_GATE_ABI = [
  {
    "name": "createContent",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {"name": "_title", "type": "string"},
      {"name": "_description", "type": "string"},
      {"name": "_contentHash", "type": "string"},
      {"name": "_minTokensRequired", "type": "uint256"}
    ],
    "outputs": []
  },
  {
    "name": "claimDailyReward",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [],
    "outputs": []
  },
  {
    "name": "likeContent",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [{"name": "_contentId", "type": "uint256"}],
    "outputs": []
  },
  {
    "name": "getUserAccessLevel",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "string"}]
  },
  {
    "name": "userActivity",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [
      {"name": "totalViews", "type": "uint256"},
      {"name": "totalLikes", "type": "uint256"}, 
      {"name": "contentCreated", "type": "uint256"},
      {"name": "lastActiveTimestamp", "type": "uint256"},
      {"name": "totalRewardsEarned", "type": "uint256"}
    ]
  },
  {
    "name": "getTotalContentCount",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}]
  }
] as const;