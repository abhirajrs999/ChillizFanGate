// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./FanGateToken.sol";

contract FanGate is Ownable, ReentrancyGuard {
    FanGateToken public immutable fanToken;
    
    struct ExclusiveContent {
        uint256 id;
        string title;
        string description;
        string contentHash;
        uint256 minTokensRequired;
        address creator;
        uint256 views;
        uint256 likes;
        bool isActive;
        uint256 createdAt;
    }
    
    struct UserActivity {
        uint256 totalViews;
        uint256 totalLikes;
        uint256 contentCreated;
        uint256 lastActiveTimestamp;
        uint256 totalRewardsEarned;
    }
    
    mapping(uint256 => ExclusiveContent) public contents;
    mapping(address => UserActivity) public userActivity;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    mapping(uint256 => mapping(address => bool)) public hasViewed;
    
    uint256 public nextContentId;
    uint256 public constant DAILY_REWARD = 10 * 10**18;
    uint256 public constant LIKE_REWARD = 1 * 10**18;
    uint256 public constant CONTENT_CREATION_REWARD = 50 * 10**18;
    
    event ContentCreated(uint256 indexed contentId, address indexed creator, string title);
    event ContentViewed(uint256 indexed contentId, address indexed viewer);
    event ContentLiked(uint256 indexed contentId, address indexed liker);
    event DailyRewardClaimed(address indexed user, uint256 amount);
    
    constructor(address _fanToken) Ownable(msg.sender) {
        fanToken = FanGateToken(_fanToken);
    }
    
    function createContent(
        string memory _title,
        string memory _description,
        string memory _contentHash,
        uint256 _minTokensRequired
    ) external {
        uint256 contentId = nextContentId++;
        
        contents[contentId] = ExclusiveContent({
            id: contentId,
            title: _title,
            description: _description,
            contentHash: _contentHash,
            minTokensRequired: _minTokensRequired,
            creator: msg.sender,
            views: 0,
            likes: 0,
            isActive: true,
            createdAt: block.timestamp
        });
        
        userActivity[msg.sender].contentCreated++;
        userActivity[msg.sender].lastActiveTimestamp = block.timestamp;
        
        fanToken.rewardUser(msg.sender, CONTENT_CREATION_REWARD, "Content Creation");
        userActivity[msg.sender].totalRewardsEarned += CONTENT_CREATION_REWARD;
        
        emit ContentCreated(contentId, msg.sender, _title);
    }
    
    function viewContent(uint256 _contentId) external {
        require(_contentId < nextContentId, "Content doesn't exist");
        ExclusiveContent storage content = contents[_contentId];
        require(content.isActive, "Content is not active");
        
        require(
            fanToken.hasAccess(msg.sender, content.minTokensRequired),
            "Insufficient tokens for access"
        );
        
        if (!hasViewed[_contentId][msg.sender]) {
            hasViewed[_contentId][msg.sender] = true;
            content.views++;
            userActivity[msg.sender].totalViews++;
            userActivity[msg.sender].lastActiveTimestamp = block.timestamp;
            
            emit ContentViewed(_contentId, msg.sender);
        }
    }
    
    function likeContent(uint256 _contentId) external {
        require(_contentId < nextContentId, "Content doesn't exist");
        require(!hasLiked[_contentId][msg.sender], "Already liked");
        
        ExclusiveContent storage content = contents[_contentId];
        require(content.isActive, "Content is not active");
        
        require(
            fanToken.hasAccess(msg.sender, content.minTokensRequired),
            "Insufficient tokens for access"
        );
        
        hasLiked[_contentId][msg.sender] = true;
        content.likes++;
        userActivity[msg.sender].totalLikes++;
        userActivity[msg.sender].lastActiveTimestamp = block.timestamp;
        
        fanToken.rewardUser(msg.sender, LIKE_REWARD, "Content Like");
        userActivity[msg.sender].totalRewardsEarned += LIKE_REWARD;
        
        emit ContentLiked(_contentId, msg.sender);
    }
    
    function claimDailyReward() external nonReentrant {
        UserActivity storage activity = userActivity[msg.sender];
        
        require(
            block.timestamp >= activity.lastActiveTimestamp + 1 days,
            "Daily reward already claimed"
        );
        
        require(
            activity.totalViews > 0 || activity.totalLikes > 0,
            "No activity found"
        );
        
        activity.lastActiveTimestamp = block.timestamp;
        activity.totalRewardsEarned += DAILY_REWARD;
        
        fanToken.rewardUser(msg.sender, DAILY_REWARD, "Daily Activity Reward");
        
        emit DailyRewardClaimed(msg.sender, DAILY_REWARD);
    }
    
    function getUserAccessLevel(address user) external view returns (string memory) {
        uint256 balance = fanToken.balanceOf(user);
        
        if (balance >= 1000 * 10**18) return "VIP";
        if (balance >= 100 * 10**18) return "Premium";
        if (balance >= 10 * 10**18) return "Standard";
        return "Basic";
    }
    
    function getContent(uint256 _contentId) external view returns (ExclusiveContent memory) {
        require(_contentId < nextContentId, "Content doesn't exist");
        return contents[_contentId];
    }
    
    function getTotalContentCount() external view returns (uint256) {
        return nextContentId;
    }
}