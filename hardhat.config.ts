import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-preprocessor";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./sampleckt/contract", // Use ./src rather than ./contracts as Hardhat expects
  },
};

export default config;
