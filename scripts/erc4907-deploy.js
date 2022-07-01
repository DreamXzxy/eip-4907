const hre = require("hardhat");

async function main() {
  const ERC4907Demo = await hre.ethers.getContractFactory("ERC4907Demo");
  const erc4907 = await ERC4907Demo.deploy("ERC4907", "ERC4907");
  await erc4907.deployed();

  console.log("ERC4907Demo deployed to:", erc4907.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
