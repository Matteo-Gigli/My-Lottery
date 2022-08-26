# My-Lottery


<h2>💡 Lottery </h2>
<br>

<p><strong>I just created a Lottery.</strong></p>
<br>

<h2>🔍 Contracts Detail</h2>
<br>


<h3>💰 LotteryToken.sol</h3>
<br>
<p><strong>Simple Erc20 Token where we are going to override some functions.</strong></p>
<p><strong>As usual, to use this contract, we must to pass some parameters as name, symbol, totalSupply for our new Token.</strong></p>
<p><strong>This token will be the method of payment to partecipate lottery.</strong></p>
<br>

<h3>📊 LotteryInfo.sol</h3>
<br>

<p><strong>This is the contract where we store all the information about what happens in Lottery.sol</strong></p>
<p><strong>We can find set-get function, working for the Lottery.sol contract.</strong></p>
<p><strong>Once the contract is deployed we have to use the initLotteryContract function(), passing the Lottery contract address.</strong></p>
<p><strong>This create a pointer to the Lottery, necessary to work with the contracts togheter.</strong></p>
<p><strong>That means, if i do something in Lottery.sol contract, the LotteryInfo.sol will receive all the information,and store this data.</strong></p>
<br>


<h3>🎉 Lottery.sol</h3>
<br>
<p><strong>This is the contract contains all the function for the Lottery.</strong></p>
<p><strong>As before the functions to start with are the initLotteryTokenContract and the initLotteryInfoContract (passing LotteryToken address and LotteryInfo address).</strong></p>
<p><strong>As we can see from the contract, now we have some functions.</strong></p> 
<br>
<br>
<h3>Functions are:</h3>
<br>
<p><strong>buyTokens(where a user can pay via ether and receive tokens)</strong></p>
<br>
<p><strong>setItemToWin(name, defaultBid, endingTimeLottery) Only For the Owner and gives the possibility to set an item for the Lottery</strong></p>
<br>
<p><strong>placeABid(tokenIds) Give us the opportunity to place a bid on a specific item via it's own tokenIds</strong></p>
<br>
<p><strong>random(tokenIds) is an internal function that helps us to choose a random winner for the lottery.</strong></p>
<br>
<p><strong>pickTheWinner(tokenIds) Only For the Owner and gives the possibility to get the Lottery Winner.</strong></p>

