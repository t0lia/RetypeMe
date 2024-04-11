// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract GamingContract {
    address public owner;
    uint256 public commissionRate;
    uint256 public fixedDepositAmount;
    uint256 public totalCommission;

    struct Player {
        address wallet;
        uint256 depositAmount;
        uint256 gameId;
    }

    mapping(uint256 => Player[]) public gameSessions;
    mapping(uint256 => address) public winners;
    mapping(uint256 => uint256) public sessionWinnings;

    event GameStarted(uint256 indexed sessionId);
    event GameEnded(uint256 indexed sessionId, address winner, uint256 winnings);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        commissionRate = 20;
        fixedDepositAmount =  0.001 ether;
    }

    function deposit(uint256 sessionId) external payable {
        require(msg.value == fixedDepositAmount, "Deposit amount must be equal fixed deposit amount");

        Player memory player = Player({
            wallet: msg.sender,
            depositAmount: msg.value,
            gameId: sessionId
        });

        gameSessions[sessionId].push(player);

        if (gameSessions[sessionId].length == 2) {
            emit GameStarted(sessionId);
        }
    }

    function endGame(uint256 _sessionId, address _winner) external onlyOwner {
        require(gameSessions[_sessionId].length == 2, "Game not started");
        require(_winner ==  gameSessions[_sessionId][0].wallet || _winner == gameSessions[_sessionId][1].wallet, "This address can't be the winner. It is not in the current game session.");

        // Logic to determine the winner and calculate winnings and commission
        // For simplicity, assuming winner is provided and winnings are total deposit amount minus commission

        uint256 totalDeposit = gameSessions[_sessionId][0].depositAmount + gameSessions[_sessionId][1].depositAmount;
        uint256 commission = (totalDeposit * commissionRate) / 100;
        sessionWinnings[_sessionId] = totalDeposit - commission;
        totalCommission+=commission;

        winners[_sessionId] = _winner;

        emit GameEnded(_sessionId, _winner, sessionWinnings[_sessionId]);
    }

    function withdrawWinnings(uint256 _sessionId) external {
        require(winners[_sessionId]==msg.sender, "Only the winner can withdraw winnings");

        payable(msg.sender).transfer(sessionWinnings[_sessionId]);
    }

    function withdrawFundsFromContract() external onlyOwner {
        // we are withdrawing all the balance
        require(address(this).balance > 0, "No funds to withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function withdrawCommissionFromContract() external onlyOwner {
        // withdrawing only total commission
        require(totalCommission>0, "No commision to withdraw at the moment");
        payable(owner).transfer(totalCommission);
        totalCommission = 0;
    }

    function changeCommissionRate(uint256 _newCommissionRate) public onlyOwner {
        commissionRate = _newCommissionRate;
    }

    function changeFixedDepositAmount(uint256 _newFixedDepositAmount) public onlyOwner {
        fixedDepositAmount = _newFixedDepositAmount;
    }
}