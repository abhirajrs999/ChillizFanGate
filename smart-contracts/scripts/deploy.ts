import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment...");
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "CHZ");
  
  // Deploy FanGateToken
  console.log("\n1. Deploying FanGateToken...");
  const FanGateToken = await ethers.getContractFactory("FanGateToken");
  const fanToken = await FanGateToken.deploy();
  await fanToken.waitForDeployment();
  const fanTokenAddress = await fanToken.getAddress();
  console.log("✅ FanGateToken deployed to:", fanTokenAddress);
  
  // Deploy FanGate
  console.log("\n2. Deploying FanGate...");
  const FanGate = await ethers.getContractFactory("FanGate");
  const fanGate = await FanGate.deploy(fanTokenAddress);
  await fanGate.waitForDeployment();
  const fanGateAddress = await fanGate.getAddress();
  console.log("✅ FanGate deployed to:", fanGateAddress);
  
  // Transfer ownership of token to FanGate contract
  console.log("\n3. Setting up permissions...");
  await fanToken.transferOwnership(fanGateAddress);
  console.log("✅ Ownership transferred to FanGate contract");
  
  console.log("\n🎉 Deployment completed!");
  console.log("=====================================");
  console.log("FanGateToken:", fanTokenAddress);
  console.log("FanGate:", fanGateAddress);
  console.log("Network: Chiliz Spicy Testnet");
  console.log("Chain ID: 88882");
  console.log("=====================================");
  
  // Save deployment info
  const deploymentInfo = {
    network: "chiliz-spicy",
    chainId: 88882,
    contracts: {
      FanGateToken: fanTokenAddress,
      FanGate: fanGateAddress,
    },
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };
  
  console.log("\nSave this deployment info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });