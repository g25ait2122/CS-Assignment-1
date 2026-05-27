// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

// 1. A Standard ERC20 Token (e.g., Mock USDC)
class MockERC20 is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

// 2. The Vulnerable Yield Vault
contract YieldVault {
    ERC20 public stakingToken;
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public lastClaimTime;

    constructor(address _stakingToken) {
        stakingToken = ERC20(_stakingToken);
    }

    // Standard ERC20 Deposit
    function deposit(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        
        // Protocol transfers standard ERC20 from user to vault
        stakingToken.transferFrom(msg.sender, address(this), amount);
        
        stakedBalances[msg.sender] += amount;
        if (lastClaimTime[msg.sender] == 0) {
            lastClaimTime[msg.sender] = block.timestamp;
        }
    }

    // VULNERABLE: Claims ETH rewards based on staked ERC20
    function claimRewards() external {
        uint256 staked = stakedBalances[msg.sender];
        require(staked > 0, "No tokens staked");
        
        // Calculate fake reward: 0.1 ETH per staked token per transaction (just for demo)
        uint256 reward = 0.1 ether; 
        require(address(this).balance >= reward, "Vault empty");

        // VULNERABILITY: External call before updating lastClaimTime
        (bool success, ) = msg.sender.call{value: reward}("");
        require(success, "Reward transfer failed");

        // State update happens too late!
        lastClaimTime[msg.sender] = block.timestamp;
    }

    // Allow protocol to be funded with ETH for rewards
    receive() external payable {}
}