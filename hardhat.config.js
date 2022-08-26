require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",

    networks: {
      rinkeby: {
        url : process.env.ALCHEMY_API_KEY_URL,
        accounts: [process.env.PRIVATE_KEY],
      }
    }
};