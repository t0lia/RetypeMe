const hre = require("hardhat");

async function main() {

  const acc = await hre.ethers.deployContract("Acc");

  await acc.waitForDeployment();

  console.log(
    `Acc deployed to ${acc.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
