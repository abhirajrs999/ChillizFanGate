import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Fast deployment starting...");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  
  const FanGateToken = await ethers.getContractFactory("FanGateToken");
  
  const fanToken = await FanGateToken.deploy({
    gasPrice: ethers.parseUnits("2501", "gwei"), // Much higher gas price
    gasLimit: 5000000,
  });
  
  console.log("Transaction hash:", fanToken.deploymentTransaction()?.hash);
  await fanToken.waitForDeployment();
  
  console.log("✅ Deployed to:", await fanToken.getAddress());
}

main().catch(console.error);