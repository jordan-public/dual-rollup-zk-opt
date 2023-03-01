import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-preprocessor";
import { HardhatUserConfig, task } from "hardhat/config";

import prove from "./tasks/prove";

task("prove", "Prove it ...").setAction(async () => {
  await prove()
});


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
    sources: "./sampleckt/contract",
  },
};

export default config;
