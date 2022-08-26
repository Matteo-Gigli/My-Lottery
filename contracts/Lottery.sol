//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LotteryToken.sol";
import "./LotteryInfo.sol";

pragma solidity ^0.8.4;

contract Lottery is Ownable{

    LotteryInfo private lotteryInfo;
    LotteryToken private lotteryToken;

    event BidCorrect(address bidder, uint tokenId, uint defaultBid);

    constructor(){
        transferOwnership(msg.sender);
    }


    function initLotteryTokenContract(address _lotteryTokenContract)public onlyOwner{
        lotteryToken = LotteryToken(_lotteryTokenContract);
        lotteryToken.increaseAllowance(address(this), lotteryToken.totalSupply());
    }



    function initLotteryInfoContract(address _lotteryInfoContract)public onlyOwner{
        lotteryInfo = LotteryInfo(_lotteryInfoContract);
    }



    function setItemToWin(
        string memory _name,
        uint _defaultBid,
        uint _endingTimeLottery
        )public onlyOwner{
            require(_endingTimeLottery > block.timestamp, "Cannot set a date in the Past!");
            lotteryInfo.setItemToWin(_name, _defaultBid, _endingTimeLottery);
    }



    function buyTokens(uint _quantity)external payable{
        uint singleTokenPrice = 0.02 ether;
        uint finalPrice = singleTokenPrice * _quantity;
        require(msg.sender != owner() && msg.sender != lotteryToken.owner(), "Admin Cannot Buy Tokens!");
        require(msg.value == finalPrice, "Please set the right price!");
        payable(owner()).transfer(msg.value);
        address lotteryTokenOwner = lotteryToken.owner();
        lotteryToken.transferFrom(lotteryTokenOwner, msg.sender, _quantity);
    }




    function placeABid(uint _tokenIds)public{
        require(block.timestamp < lotteryInfo.getEndingTimeLottery(_tokenIds), "Lottery is closed!");
        require(msg.sender != owner() && msg.sender != lotteryToken.owner(), "Admin Cannot Place A Bid!");
        uint requiredTokenAmounts = lotteryInfo.getDefaultItemBid(_tokenIds);
        require(lotteryToken.balanceOf(msg.sender) >= requiredTokenAmounts, "No Necessary Funds To Partecipate!");
        address lotteryTokenOwner = lotteryToken.owner();
        lotteryInfo.updateBid(_tokenIds, requiredTokenAmounts);
        lotteryInfo.updateAddress(_tokenIds, msg.sender);
        lotteryToken.transferFrom(msg.sender, lotteryTokenOwner, requiredTokenAmounts);
        emit BidCorrect(msg.sender, _tokenIds, requiredTokenAmounts);
    }



    function random(uint _tokenIds) internal view returns(uint){
        uint bidderAddressCount = lotteryInfo.getBidderAddress(_tokenIds).length;
        return uint(keccak256(abi.encodePacked(block.difficulty, block.number, block.timestamp, bidderAddressCount)));
    }



    function pickTheWinner(uint _tokenIds)public onlyOwner{
        require(block.timestamp > lotteryInfo.getEndingTimeLottery(_tokenIds), "Can't pick the winner yet!");
        uint bidderAddressCount = lotteryInfo.getBidderAddress(_tokenIds).length;
        address[]memory bidderAddress = lotteryInfo.getBidderAddress(_tokenIds);
        require(bidderAddressCount > 3, "Not enough address to pick the winner!");
        address winner = bidderAddress[random(_tokenIds) % bidderAddressCount];
        lotteryInfo.setWinnerLottery(_tokenIds, winner);
    }



    function getLotteryTokenContract()public view returns(address){
        return address(lotteryToken);
    }



    function getLotteryInfoContract()public view returns(address){
        return address(lotteryInfo);
    }



    function getContractBalance()public view returns(uint){
        return lotteryToken.balanceOf(address(this));
    }

}
