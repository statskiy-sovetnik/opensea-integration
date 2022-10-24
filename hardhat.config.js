require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");

const ALCHEMY_API_KEY = "https://eth-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY;
const GOERLY_ALCHEMY_API_KEY = "https://eth-goerli.g.alchemy.com/v2/" + process.env.GOERLY_ALCHEMY_API_KEY;
const GOERLY_PRIVATE_KEY = process.env.GOERLY_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,  
      },
    }
  },

  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_API_KEY,
      },
    },
    goerli: {
      url: GOERLY_ALCHEMY_API_KEY,
      accounts: [GOERLY_PRIVATE_KEY]
    }
  },
};
