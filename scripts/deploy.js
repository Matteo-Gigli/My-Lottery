const hre = require("hardhat");

async function main() {
    Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy();


    LotteryToken = await ethers.getContractFactory("LotteryToken");
    lotteryToken = await LotteryToken.deploy("MyToken", "MTK", 5000);


    LotteryInfo = await ethers.getContractFactory("LotteryInfo");
    lotteryInfo = await LotteryInfo.deploy();

    await lottery.deployed();
    await lotteryInfo.deployed();
    await lotteryToken.deployed();


  console.log(`Lottery Address: ${lottery.address}`);
  console.log(`Lottery Info Address: ${lotteryInfo.address}`);
  console.log(`Lottery Token Address: ${lotteryToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});