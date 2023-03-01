import { HardhatUserConfig, task } from "hardhat/config"; 
import "@nomiclabs/hardhat-waffle";
import "hardhat-preprocessor";
import "@typechain/hardhat";

import verify from "./tasks/verify";
import prove from "./tasks/prove";


task("gen-proof", "Generate proof for the local Noir circuit").setAction(prove);
task("verify", "Verify that the proof(passed in first param) is valid")
  .setAction(async (_,hre) => verify(hre));


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
