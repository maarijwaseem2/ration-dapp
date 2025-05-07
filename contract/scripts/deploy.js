const hre = require("hardhat");

async function main() {
  const RationDistribution = await hre.ethers.getContractFactory("RationDistribution");
  const contract = await RationDistribution.deploy();
  await contract.waitForDeployment();
  console.log("RationDistribution deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});