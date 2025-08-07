import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

async function deployTokenFixture() {
  const initialSupply = 10000;
  const [owner, addr1] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("KSHToken", "KSH", initialSupply);
  return { token, owner, initialSupply, addr1 };
}

describe("Token", () => {
  it("should mint token", async () => {
    const { token, owner, initialSupply, addr1 } = await loadFixture(
      deployTokenFixture
    );

    const balance = await token.balanceOf(owner.address);
    const totalSupply = await token.totalSupply();

    const transferAmount = ethers.parseEther("100");
    const tx = await token.transfer(addr1.address, transferAmount);
    const receipt = await tx.wait();

    describe("Token Contract", function () {
      it("Address 1 should have 100 tokens", async () => {
        const balance = await token.balanceOf(addr1.address);
        expect(balance).to.equal(transferAmount);
      });

      it("Owner  should have 9900 tokens", async () => {
        const balance = await token.balanceOf(owner.address);
        const checkBalance = ethers.parseEther(
          (initialSupply - 100).toString()
        );
        expect(balance).to.equal(checkBalance);
      });
    });

    // console.log("Gas used:", receipt!.gasUsed.toString());
    // console.log("Gas price (wei):", tx.gasPrice.toString());
    // console.log(
    //   "Total cost (wei):",
    //   ethers.formatEther(receipt!.gasUsed * tx.gasPrice).toString()
    // );
    // console.log(
    //   "Total cost (ETH):",
    //   ethers.formatEther(receipt!.gasUsed * tx.gasPrice).toString()
    // );

    // expect(ethers.formatEther(balance)).to.equal(initialSupply.toString());
    // expect(ethers.formatEther(totalSupply)).to.equal(initialSupply.toString());
  });
});
