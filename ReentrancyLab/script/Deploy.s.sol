// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/DeFiVault.sol";
import "../src/Attacker.sol";

contract DeployScript is Script {
    function run() external {
        // Use Anvil's default private key 0
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(deployerPrivateKey);

        MockERC20 token = new MockERC20();
        YieldVault vault = new YieldVault(address(token));
        Attacker attacker = new Attacker(address(vault), address(token));

        // Fund the Vault with 10 ETH for rewards
        payable(address(vault)).transfer(10 ether);

        // Give the attacker contract 1 ERC20 token to start the attack
        token.transfer(address(attacker), 1e18);

        console.log("MockERC20 Deployed to:", address(token));
        console.log("YieldVault Deployed to:", address(vault));
        console.log("Attacker Deployed to:", address(attacker));

        vm.stopBroadcast();
    }
}