const { expect } = require("chai");
const { expectRevert} = require('@openzeppelin/test-helpers');


describe("Setting some test for the functionality of the contracts", function() {

    let Lottery, lottery, LotteryToken, lotteryToken, LotteryInfo, lotteryInfo,
        owner, account1, account2, account3, account4, account5, account6;


    before(async () => {

        [owner, account1, account2, account3, account4, account5, account6] = await ethers.getSigners();

        Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.deploy();


        LotteryToken = await ethers.getContractFactory("LotteryToken");
        lotteryToken = await LotteryToken.deploy("MyToken", "MTK", 5000);


        LotteryInfo = await ethers.getContractFactory("LotteryInfo");
        lotteryInfo = await LotteryInfo.deploy();


        await lottery.deployed();
        await lotteryInfo.deployed();
        await lotteryToken.deployed();


        await lottery.initLotteryTokenContract(lotteryToken.address);
        await lottery.initLotteryInfoContract(lotteryInfo.address);
        await lotteryInfo.initLotteryContract(lottery.address);
    });


    it("should be able to set an item for the lottery if you are the owner", async()=>{
        await lottery.setItemToWin("Car", 5, 1661526477);
        let itemName = await lotteryInfo.getItemName(1);
        let defaultBid = await lotteryInfo.getDefaultItemBid(1);
        let endingLottery = await lotteryInfo.getEndingTimeLottery(1);
        expect(itemName).to.be.equal("Car");
        expect(defaultBid).to.be.equal(5);
        expect(endingLottery).to.be.equal(1661526477);
    });


    it("should revert to set an item for the lottery if you are not the owner", async()=>{
        await expectRevert(lottery.connect(account1).setItemToWin("Car", 5, 1661453774),
            "Ownable: caller is not the owner");
    });



    it("should revert buy tokens if you are the owner", async()=>{
        await expectRevert(lottery.buyTokens(10,{value: "200000000000000000"}),
            "Admin Cannot Buy Tokens!");
    });



    it("should revert buy tokens if the price is not right", async()=>{
        await expectRevert(lottery.connect(account1).buyTokens(10,{value: "100000000000000000"}),
            "Please set the right price!");
    });



    it("should be able to buy some tokens", async()=>{
        let lotteryTokenOwnerPreBuy = await lotteryToken.balanceOf(owner.address);
        await lottery.connect(account1).buyTokens(10,{value: "200000000000000000"});
        let lotteryTokenOwnerAfterBuy = await lotteryToken.balanceOf(owner.address);
        let account1BalanceAfterBuy = await lotteryToken.balanceOf(account1.address);
        expect(lotteryTokenOwnerPreBuy).to.be.equal(5000);
        expect(lotteryTokenOwnerAfterBuy).to.be.equal(4990);
        expect(account1BalanceAfterBuy).to.be.equal(10);
    });



    it("should approve the amount of tokens bought at the Lottery contract", async()=>{
        let account1BalanceAfterBuy = await lotteryToken.balanceOf(account1.address);
        await lotteryToken.connect(account1).approve(lottery.address, account1BalanceAfterBuy);
        let allowancesFromUserToLottery = await lotteryToken.allowance(account1.address, lottery.address);
        expect(allowancesFromUserToLottery).to.be.equal(10);
    })



    it("should be able to buy some tokens", async()=>{
        let lotteryTokenOwnerPreBuy = await lotteryToken.balanceOf(owner.address);
        await lottery.connect(account2).buyTokens(10,{value: "200000000000000000"});
        let lotteryTokenOwnerAfterBuy = await lotteryToken.balanceOf(owner.address);
        let account2BalanceAfterBuy = await lotteryToken.balanceOf(account2.address);
        expect(lotteryTokenOwnerPreBuy).to.be.equal(4990);
        expect(lotteryTokenOwnerAfterBuy).to.be.equal(4980);
        expect(account2BalanceAfterBuy).to.be.equal(10);
    });



    it("should approve the amount of tokens bought at the Lottery contract", async()=>{
        let account2BalanceAfterBuy = await lotteryToken.balanceOf(account2.address);
        await lotteryToken.connect(account2).approve(lottery.address, account2BalanceAfterBuy);
        let allowancesFromUserToLottery = await lotteryToken.allowance(account2.address, lottery.address);
        expect(allowancesFromUserToLottery).to.be.equal(10);
    })



    it("should be able to buy some tokens", async()=>{
        let lotteryTokenOwnerPreBuy = await lotteryToken.balanceOf(owner.address);
        await lottery.connect(account3).buyTokens(10,{value: "200000000000000000"});
        let lotteryTokenOwnerAfterBuy = await lotteryToken.balanceOf(owner.address);
        let account3BalanceAfterBuy = await lotteryToken.balanceOf(account3.address);
        expect(lotteryTokenOwnerPreBuy).to.be.equal(4980);
        expect(lotteryTokenOwnerAfterBuy).to.be.equal(4970);
        expect(account3BalanceAfterBuy).to.be.equal(10);
    });



    it("should approve the amount of tokens bought at the Lottery contract", async()=>{
        let account3BalanceAfterBuy = await lotteryToken.balanceOf(account3.address);
        await lotteryToken.connect(account3).approve(lottery.address, account3BalanceAfterBuy);
        let allowancesFromUserToLottery = await lotteryToken.allowance(account3.address, lottery.address);
        expect(allowancesFromUserToLottery).to.be.equal(10);
    })



    it("should be able to buy some tokens", async()=>{
        let lotteryTokenOwnerPreBuy = await lotteryToken.balanceOf(owner.address);
        await lottery.connect(account4).buyTokens(10,{value: "200000000000000000"});
        let lotteryTokenOwnerAfterBuy = await lotteryToken.balanceOf(owner.address);
        let account4BalanceAfterBuy = await lotteryToken.balanceOf(account4.address);
        expect(lotteryTokenOwnerPreBuy).to.be.equal(4970);
        expect(lotteryTokenOwnerAfterBuy).to.be.equal(4960);
        expect(account4BalanceAfterBuy).to.be.equal(10);
    });




    it("should approve the amount of tokens bought at the Lottery contract", async()=>{
        let account4BalanceAfterBuy = await lotteryToken.balanceOf(account4.address);
        await lotteryToken.connect(account4).approve(lottery.address, account4BalanceAfterBuy);
        let allowancesFromUserToLottery = await lotteryToken.allowance(account4.address, lottery.address);
        expect(allowancesFromUserToLottery).to.be.equal(10);
    })





    it("should be able to buy some tokens", async()=>{
        let lotteryTokenOwnerPreBuy = await lotteryToken.balanceOf(owner.address);
        await lottery.connect(account5).buyTokens(10,{value: "200000000000000000"});
        let lotteryTokenOwnerAfterBuy = await lotteryToken.balanceOf(owner.address);
        let account5BalanceAfterBuy = await lotteryToken.balanceOf(account5.address);
        expect(lotteryTokenOwnerPreBuy).to.be.equal(4960);
        expect(lotteryTokenOwnerAfterBuy).to.be.equal(4950);
        expect(account5BalanceAfterBuy).to.be.equal(10);
    });




    it("should approve the amount of tokens bought at the Lottery contract", async()=>{
        let account5BalanceAfterBuy = await lotteryToken.balanceOf(account5.address);
        await lotteryToken.connect(account5).approve(lottery.address, account5BalanceAfterBuy);
        let allowancesFromUserToLottery = await lotteryToken.allowance(account5.address, lottery.address);
        expect(allowancesFromUserToLottery).to.be.equal(10);
    })



    it("Should be able to place a bid",async()=>{
        await lottery.connect(account1).placeABid(1);
        let amountUserBettedOn = await lotteryInfo.getBidAmount(1);
        let usersCountOnItem = await lotteryInfo.getBidderAddress(1);
        let usersCountOnItemLength = await usersCountOnItem.length;
        expect(amountUserBettedOn).to.be.equal(5);
        expect(usersCountOnItemLength).to.be.equal(1);
    })




    it("Should be able to place a bid",async()=>{
        await lottery.connect(account2).placeABid(1);
        let amountUserBettedOn = await lotteryInfo.getBidAmount(1);
        let usersCountOnItem = await lotteryInfo.getBidderAddress(1);
        let usersCountOnItemLength = await usersCountOnItem.length;
        expect(amountUserBettedOn).to.be.equal(10);
        expect(usersCountOnItemLength).to.be.equal(2);
    })



    it("Should be able to place a bid",async()=>{
        await lottery.connect(account3).placeABid(1);
        let amountUserBettedOn = await lotteryInfo.getBidAmount(1);
        let usersCountOnItem = await lotteryInfo.getBidderAddress(1);
        let usersCountOnItemLength = await usersCountOnItem.length;
        expect(amountUserBettedOn).to.be.equal(15);
        expect(usersCountOnItemLength).to.be.equal(3);
    })



    it("Should be able to place a bid",async()=>{
        await lottery.connect(account4).placeABid(1);
        let amountUserBettedOn = await lotteryInfo.getBidAmount(1);
        let usersCountOnItem = await lotteryInfo.getBidderAddress(1);
        let usersCountOnItemLength = await usersCountOnItem.length;
        expect(amountUserBettedOn).to.be.equal(20);
        expect(usersCountOnItemLength).to.be.equal(4);
    })



    it("Should be able to place a bid",async()=>{
        await lottery.connect(account5).placeABid(1);
        let amountUserBettedOn = await lotteryInfo.getBidAmount(1);
        let usersCountOnItem = await lotteryInfo.getBidderAddress(1);
        let usersCountOnItemLength = await usersCountOnItem.length;
        expect(amountUserBettedOn).to.be.equal(25);
        expect(usersCountOnItemLength).to.be.equal(5);
    })


    it("Should revert to place a bid if you are the owner",async()=>{
        await expectRevert(lottery.placeABid(1),
            "Admin Cannot Place A Bid!");

    })



    it("Should revert to place a bid if don't have the amount of tokens for default bid",async()=>{
        await expectRevert(lottery.connect(account6).placeABid(1),
            "No Necessary Funds To Partecipate!");

    })


    it("should give me the actual block number", async()=>{
        let blockNumber = await ethers.provider.getBlockNumber();
        console.log("Actual Block Number", blockNumber);
    })



    it('should mint some hours', async () => {
        let time = 25000;
        for (let i = 0; i < time; i++) {
            await ethers.provider.send('evm_mine', []);
        }
    });



    it("...", async()=>{
        let blockNumBefore = await ethers.provider.getBlockNumber();
        let blockBefore = await ethers.provider.getBlock(blockNumBefore);
        let timestampBefore = blockBefore.timestamp;
        console.log("Timestamp Before", timestampBefore);
    })





    it("Should be able to pick the winner", async()=>{
        await lottery.pickTheWinner(1);
        let winner = await lotteryInfo.getWinner(1);
        console.log(winner);
    })
})