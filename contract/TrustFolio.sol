// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrustFolio {
    struct Requirement {
        uint256 id;
        address payable poster;
        string title;
        string description;
        string videoUrl;
        string thumbnailUrl;
        string dataType;
        string additionalData;
        uint256 tokenOffered;
        bool isFullfilled;
        bool isTransferred;
    }

    struct Bid {
        uint256 id;
        uint256 requirementId;
        address payable bidder;
        string title;
        string description;
        string sampleDataUrl;
        string fullDataUrl;
        bool isAccepted;
    }

    uint256 public requirementCount;
    uint256 public bidCount;
    mapping(uint256 => Requirement) public requirements;
    mapping(uint256 => Bid) public bids;
    mapping(uint256 => uint256[]) public requirementBids;

    event RequirementPosted(uint256 id, address poster, string title, uint256 tokenOffered);
    event BidPlaced(uint256 id, uint256 requirementId, address bidder);
    event BidAccepted(uint256 bidId, uint256 requirementId);
    event TokensTransferred(uint256 bidId, uint256 requirementId, address bidder, uint256 amount);

    function postRequirement(
        string memory _title,
        string memory _description,
        string memory _videoUrl,
        string memory _thumbnailUrl,
        string memory _dataType,
        string memory _additionalData,
        uint256 _tokenOffered
    ) public payable {
        require(_tokenOffered > 0, "Token offered must be greater than zero");
        require(msg.value == _tokenOffered, "Sent ETH amount must equal token offered");

        requirementCount++;
        requirements[requirementCount] = Requirement(
            requirementCount,
            payable(msg.sender),
            _title,
            _description,
            _videoUrl,
            _thumbnailUrl,
            _dataType,
            _additionalData,
            _tokenOffered,
            false,
            false
        );
        emit RequirementPosted(requirementCount, msg.sender, _title, _tokenOffered);
    }

    function placeBid(
        uint256 _requirementId,
        string memory _title,
        string memory _description,
        string memory _sampleDataUrl,
        string memory _fullDataUrl
    ) public {
        require(_requirementId > 0 && _requirementId <= requirementCount, "Invalid requirement ID");
        bidCount++;
        bids[bidCount] = Bid(
            bidCount,
            _requirementId,
            payable(msg.sender),
            _title,
            _description,
            _sampleDataUrl,
            _fullDataUrl,
            false
        );
        requirementBids[_requirementId].push(bidCount);
        emit BidPlaced(bidCount, _requirementId, msg.sender);
    }

    function acceptBid(uint256 _bidId) public {
        Bid storage bid = bids[_bidId];
        Requirement storage requirement = requirements[bid.requirementId];
        require(msg.sender == requirement.poster, "Only the poster can accept bids");
        require(!requirement.isFullfilled, "Requirement already fulfilled");
        bid.isAccepted = true;
        requirement.isFullfilled = true;

        // Transfer ETH to the bidder
        bid.bidder.transfer(requirement.tokenOffered);
        requirement.isTransferred = true;

        emit BidAccepted(_bidId, bid.requirementId);
        emit TokensTransferred(_bidId, bid.requirementId, bid.bidder, requirement.tokenOffered);
    }

    function getAllRequirements() public view returns (Requirement[] memory) {
        Requirement[] memory allRequirements = new Requirement[](requirementCount);
        for (uint256 i = 1; i <= requirementCount; i++) {
            allRequirements[i - 1] = requirements[i];
        }
        return allRequirements;
    }

    function getRequirementBids(uint256 _requirementId) public view returns (uint256[] memory) {
        return requirementBids[_requirementId];
    }

    function getBidsForRequirement(uint256 _requirementId) public view returns (Bid[] memory) {
        uint256[] memory bidIds = requirementBids[_requirementId];
        Bid[] memory bidsForRequirement = new Bid[](bidIds.length);
        for (uint256 i = 0; i < bidIds.length; i++) {
            bidsForRequirement[i] = bids[bidIds[i]];
        }
        return bidsForRequirement;
    }

    function getUserRequirements() public view returns (Requirement[] memory) {
        uint256 totalUserRequirements = 0;

        // Calculate the number of requirements by the user
        for (uint256 i = 1; i <= requirementCount; i++) {
            if (requirements[i].poster == msg.sender) {
                totalUserRequirements++;
            }
        }

        // Create an array to store the user's requirements
        Requirement[] memory userRequirements = new Requirement[](totalUserRequirements);
        uint256 counter = 0;

        // Store each requirement in the array
        for (uint256 i = 1; i <= requirementCount; i++) {
            if (requirements[i].poster == msg.sender) {
                userRequirements[counter] = requirements[i];
                counter++;
            }
        }

        return userRequirements;
    }

    function getUserBids() public view returns (Bid[] memory) {
        uint256 totalUserBids = 0;

        // Calculate the number of bids by the user
        for (uint256 i = 1; i <= bidCount; i++) {
            if (bids[i].bidder == msg.sender) {
                totalUserBids++;
            }
        }

        // Create an array to store the user's bids
        Bid[] memory userBids = new Bid[](totalUserBids);
        uint256 counter = 0;

        // Store each bid in the array
        for (uint256 i = 1; i <= bidCount; i++) {
            if (bids[i].bidder == msg.sender) {
                userBids[counter] = bids[i];
                counter++;
            }
        }

        return userBids;
    }
}
