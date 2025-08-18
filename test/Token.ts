import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { TokenDeployer } from "../typechain-types";

async function deployTokenDeployerFixture() {
  const TokenDeployer = await ethers.getContractFactory("TokenDeployer");
  const tokenDeployer = await TokenDeployer.deploy();
  await tokenDeployer.waitForDeployment();

  return { tokenDeployer };
}

describe("Token", () => {
  let tokenDeployer: TokenDeployer;
  let owner: Signer;
  let other: Signer;
  let ownerAddress: string;
  let otherAddress: string;

  before(async () => {
    const fixture = await loadFixture(deployTokenDeployerFixture);
    [owner, other] = await ethers.getSigners();

    tokenDeployer = fixture.tokenDeployer;
    owner = owner;
    other = other;
    ownerAddress = await owner.getAddress();
    otherAddress = await other.getAddress();
  });

  it("첫번째 토큰 생성", async () => {
    const tokenName = "KSHToken";
    const tokenSymbol = "KSH";

    await expect(
      tokenDeployer.deployToken(tokenName, tokenSymbol, 10000, ownerAddress)
    )
      .to.emit(tokenDeployer, "TokenDeployed")
      .withArgs("KSHToken", "KSH", 10000, ownerAddress);

    const tokenAddress = await tokenDeployer.tokenAddresses("KSH");
    const token = await ethers.getContractAt("Token", tokenAddress);
    const balance = await token.connect(owner).balanceOf(ownerAddress);

    expect(balance).to.equal(ethers.parseEther("10000"));
  });

  it("두번째 토큰 생성", async () => {
    const tokenName = "LWHToken";
    const tokenSymbol = "LWH";

    await expect(
      tokenDeployer.deployToken(tokenName, tokenSymbol, 10000, otherAddress)
    )
      .to.emit(tokenDeployer, "TokenDeployed")
      .withArgs("LWHToken", "LWH", 10000, otherAddress);

    const tokenAddress = await tokenDeployer.tokenAddresses("LWH");
    const token = await ethers.getContractAt("Token", tokenAddress);
    const balance = await token.connect(other).balanceOf(otherAddress);

    expect(balance).to.equal(ethers.parseEther("10000"));
  });

  it("똑같은 심볼로 토큰 생성 시도", async () => {
    const tokenName = "LWHToken";
    const tokenSymbol = "LWH";

    await expect(
      tokenDeployer.deployToken(tokenName, tokenSymbol, 10000, ownerAddress)
    ).to.be.revertedWith("Token already deployed");
  });

  it("owner 에서 other 주소로 토큰 전송", async () => {
    const tokenAddress = await tokenDeployer.tokenAddresses("KSH");
    const token = await ethers.getContractAt("Token", tokenAddress);
    const balance = await token.connect(owner).balanceOf(ownerAddress);

    await token.connect(owner).transfer(otherAddress, balance);

    const balance2 = await token.connect(other).balanceOf(otherAddress);
    expect(balance2).to.equal(balance);
  });
});
