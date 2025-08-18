import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
    forlong: {
      url: "http://119.28.156.50:8545",
      chainId: 1337,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "KRW",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
    showMethodSig: true, // 메서드 시그니처 표시
    showUncalledMethods: true, // 호출 안된 메서드도 표시
    // outputFile: "gas-report.txt", // 결과 파일 저장
  },
};

export default config;
