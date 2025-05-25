// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract FanGateToken is ERC20, Ownable, ERC20Permit {
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18;
    
    event TokensRewarded(address indexed user, uint256 amount, string reason);
    event TokensBurned(address indexed user, uint256 amount);
    
    constructor() 
        ERC20("ChilizFanGate Token", "CFG") 
        Ownable(msg.sender)
        ERC20Permit("ChilizFanGate Token")
    {
        _mint(msg.sender, 100000 * 10**18);
    }
    
    function rewardUser(address to, uint256 amount, string memory reason) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
        emit TokensRewarded(to, amount, reason);
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    function hasAccess(address user, uint256 minTokens) external view returns (bool) {
        return balanceOf(user) >= minTokens;
    }
}