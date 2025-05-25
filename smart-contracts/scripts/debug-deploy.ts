import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment with Hardhat", require("hardhat/package.json").version);
  
  try {
    const [deployer] = await ethers.getSigners();
    console.log("✅ Signer created:", deployer.address);
    
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("✅ Balance retrieved:", ethers.formatEther(balance), "CHZ");
    
    console.log("📦 Getting contract factory...");
    const FanGateToken = await ethers.getContractFactory("FanGateToken");
    console.log("✅ Contract factory created");
    
    console.log("📡 Estimating gas...");
    const deploymentData = FanGateToken.getDeployTransaction();
    const gasEstimate = await deployer.estimateGas(deploymentData);
    console.log("✅ Gas estimated:", gasEstimate.toString());
    
    console.log("🔄 Sending deployment transaction...");
    const fanToken = await FanGateToken.deploy({
      gasLimit: gasEstimate * 2n, // Double the estimated gas
    });
    
    const txHash = fanToken.deploymentTransaction()?.hash;
    console.log("✅ Transaction sent! Hash:", txHash);
    console.log("🔗 View on explorer: https://testnet.chiliscan.com/tx/" + txHash);
    
    console.log("⏳ Waiting for confirmation...");
    await fanToken.waitForDeployment();
    
    const address = await fanToken.getAddress();
    console.log("🎉 FanGateToken deployed to:", address);
    
  } catch (error) {
    console.error("❌ Deployment failed:");
    console.error(error);
  }
}

main().catch(console.error);