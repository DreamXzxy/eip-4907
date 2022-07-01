const { expect } = require("chai");
const { ethers } = require("hardhat");
const { increaseWorldrimeInSeconds } = require("./utils/sleep");

let primary, alice, bob;
let erc4907;
const zeroAddr = "0x0000000000000000000000000000000000000000";
const expires = Math.floor(new Date().getTime()/1000) + 10;

console.log(expires, 'expires');
describe("Main", function () {
  before("Setup", async () => {
    signers = await ethers.getSigners();
    primary = signers[0];
    alice = signers[1];
    bob = signers[2];

    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    console.log(timestampBefore, 'timestampBefore');

    const ERC4907 = await ethers.getContractFactory(
      "ERC4907Demo"
    );
    erc4907 = await ERC4907.deploy("T", "T");
    await erc4907.deployed();

    await erc4907.mint(1, primary.address);
    await erc4907.setUser(1, alice.address, BigInt(expires));
  });

  it("Owner of NFT 1 should be Primary", async () => {
    let owner_1 = await erc4907.ownerOf(1);
    expect(owner_1).to.equal(primary.address);
  });

  it("User of NFT 1 should be Alice", async () => {
    let user_1 = await erc4907.userOf(1);
    expect(user_1).to.equal(alice.address);
  });

  it("User expires", async () => {
    await increaseWorldrimeInSeconds("0x1"); // await 1s, mint 10 blocks
    const blockNumAfter = await ethers.provider.getBlockNumber();
    const blockAfter = await ethers.provider.getBlock(blockNumAfter);
    const timestampAfter = blockAfter.timestamp;
    console.log(timestampAfter, 'timestampAfter');
    let user_1 = await erc4907.userOf(1);
    expect(user_1).to.equal(zeroAddr);
  });

  it("User of NFT 1 should not be Alice", async () => {
    await erc4907.transferFrom(primary.address, bob.address, 1);
    let user_1 = await erc4907.userOf(1);
    expect(user_1).to.equal(zeroAddr);
  });
});
