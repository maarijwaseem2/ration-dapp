// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RationDistribution {
    struct Claim {
        address user;
        string name;
        string nic;
        string[] items;
        uint256 timestamp;
        bool approved;
    }

    Claim[] public claims;
    address public admin;

    event Claimed(uint claimId, address indexed user, string name, string nic, string[] items);
    event Approved(uint claimId);

    constructor() {
        admin = msg.sender;
    }

    function claimRation(string memory name, string memory nic, string[] memory items) public {
        claims.push(Claim(msg.sender, name, nic, items, block.timestamp, false));
        emit Claimed(claims.length - 1, msg.sender, name, nic, items);
    }

    function approveClaim(uint claimId) public {
        require(msg.sender == admin, "Only admin can approve");
        claims[claimId].approved = true;
        emit Approved(claimId);
    }

    function getClaims() public view returns (Claim[] memory) {
        return claims;
    }
}