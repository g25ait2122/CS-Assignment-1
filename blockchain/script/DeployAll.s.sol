// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/ReentrancyLab.sol";

contract DeployAll is Script {
    function run() external {
        // We use Anvil's Account 1 to deploy and fund (The Victim)
        uint256 deployerKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(deployerKey);

        // 1. Classic
        ClassicVault cVault = new ClassicVault();
        ClassicAttacker cAttacker = new ClassicAttacker(address(cVault));
        cVault.deposit{value: 10 ether}(); // Fund victim

        // 2. Cross
        CrossVault xVault = new CrossVault();
        CrossAttacker xAttacker = new CrossAttacker(address(xVault));
        xVault.deposit{value: 10 ether}(); // Fund victim

        // 3. ReadOnly
        ReadOnlyPool roPool = new ReadOnlyPool();
        InnocentProtocol roVictim = new InnocentProtocol(address(roPool));
        ReadOnlyAttacker roAttacker = new ReadOnlyAttacker(address(roPool), address(roVictim));
        roPool.deposit{value: 10 ether}(); // Innocent users fund pool

        // 4. Flashloan
        MockFlashloan flash = new MockFlashloan();
        FlashAttacker fAttacker = new FlashAttacker(address(flash), address(cVault));
        payable(address(flash)).transfer(50 ether); // Provide flash liquidity

        vm.stopBroadcast();

        // Print to copy into React
        console.log("=== COPY THESE INTO REACT ===");
        console.log("C_VAULT:", address(cVault));
        console.log("C_ATTACKER:", address(cAttacker));
        console.log("X_VAULT:", address(xVault));
        console.log("X_ATTACKER:", address(xAttacker));
        console.log("RO_POOL:", address(roPool));
        console.log("RO_ATTACKER:", address(roAttacker));
        console.log("F_POOL:", address(flash));
        console.log("F_ATTACKER:", address(fAttacker));
    }
}