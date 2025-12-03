import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

import dotenv from "dotenv";
dotenv.config();

const KAIROS_PRIVATE_KEY = process.env.KAIROS_PRIVATE_KEY ?? "";

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR:true,
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    kairos: {
      type: "http",
      chainType: "l1",
      url: "https://public-en-kairos.node.kaia.io",
      accounts: KAIROS_PRIVATE_KEY ? [KAIROS_PRIVATE_KEY] : [],
    },
  },
};

export default config;
