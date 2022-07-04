require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.4" },
      { version: "0.8.7" }
    ]
  },
  paths: {
    artifacts: "../election-frontend/src/artifacts",
    source: "./contracts/Election.sol"
  },
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
