import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    spicy: {
      url: "https://88882.rpc.thirdweb.com", // ← Try ThirdWeb RPC
      chainId: 88882,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 25000000000, // Increased gas price
      gas: 8000000, // Added gas limit
      timeout: 60000, // 60 second timeout
    },
    spicy2: {
      url: "https://spicy-rpc.chiliz.com/", // Fallback original
      chainId: 88882,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 25000000000,
      gas: 8000000,
      timeout: 60000,
    },
  },
};

export default config;