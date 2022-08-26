//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Lottery.sol";

pragma solidity ^0.8.4;

contract LotteryInfo is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    Lottery private lottery;

    struct itemToWin{
        string name;
        uint amountBettedOn;
        uint defaultBid;
        address[] bidderAddress;
        uint endingTimeLottery;
    }

    mapping(uint=>itemToWin) private itemDescription;

    mapping(uint=>address)private ItemWinner;

    event ItemCreated(uint tokenId, string name, uint amountBettedOn, uint defaultBid);


    modifier onlyLottery(){
        msg.sender == address(lottery);
        _;
    }



    constructor(){

    }



    function initLotteryContract(address _lotteryContract)public onlyOwner{
        lottery = Lottery(_lotteryContract);
    }



    function setItemToWin(
        string memory _name,
        uint _defaultBid,
        uint _endingTimeLottery
        )public onlyLottery{
            _tokenId.increment();
            uint newId = _tokenId.current();
            itemDescription[newId] = itemToWin(
                _name,
                0,
                _defaultBid,
                new address[](0),
                _endingTimeLottery
            );
        emit ItemCreated(newId, _name, 0, _defaultBid);
    }



    function updateBid(uint _tokenIds, uint _amount)external onlyLottery{
        itemDescription[_tokenIds].amountBettedOn += _amount;
    }



    function updateAddress(uint _tokenIds, address _bidder)external onlyLottery{
        itemDescription[_tokenIds].bidderAddress.push(_bidder);
    }



    function setWinnerLottery(uint itemIndex, address winner)external onlyLottery{
        ItemWinner[itemIndex] = winner;
    }



    function getWinner(uint itemIndex)public view returns(address){
        return ItemWinner[itemIndex];
    }



    function getItemName(uint _tokenIds)public view returns(string memory){
        return itemDescription[_tokenIds].name;
    }



    function getBidderAddress(uint _tokenIds)public view returns(address[]memory){
        return itemDescription[_tokenIds].bidderAddress;
    }



    function getDefaultItemBid(uint _tokenIds)public view returns(uint){
        return itemDescription[_tokenIds].defaultBid;
    }



    function getEndingTimeLottery(uint _tokenIds)public view returns(uint){
        return itemDescription[_tokenIds].endingTimeLottery;
    }



    function getBidAmount(uint _tokenIds)public view returns(uint){
        return itemDescription[_tokenIds].amountBettedOn;
    }
}
