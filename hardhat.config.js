require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const NETWORK_ID = process.env.NETWORK_ID;
const is_hardhat_network = Boolean(NETWORK_ID); // mainnet forking, if not specified
const ALCHEMY_API_KEY = "https://eth-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY;

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
    forking: {
      url: ALCHEMY_API_KEY,
    }
  },
};
