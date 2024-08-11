// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrustFolio {
    struct Requirement {
        string title;
        string description;
        string user;
        string[] tags;
        string additionalInfo;
        string datePosted;
        uint256 amount;
        uint256 totalResponses;
        string status;
        address payable poster;
    }

    struct DataItem {
        uint256 id;
        uint256 requirementId;
        string title;
        string description;
        string sampleData;
        string fullData;
        bool isVerified;
        address payable seller;
    }

    struct Bid {
        uint256 requirementId;
        string title;
        string status;
        uint256 bidAmount;
        string time;
        string user;
        string description;
        address payable bidder;
    }

    Requirement[] public requirements;
    DataItem[] public dataItems;
    Bid[] public bids;

    mapping(address => uint256) public earnings;
    mapping(address => uint256) public spendings;

    event RequirementPosted(uint256 requirementId, address poster);
    event DataSubmitted(uint256 requirementId, address submitter);
    event DataSold(uint256 dataItemId, address buyer);
    event BidAccepted(uint256 bidId, address bidder);
    event BidRejected(uint256 bidId, address bidder);

    function postRequirement(
        string memory _title,
        string memory _description,
        string memory _user,
        string[] memory _tags,
        string memory _additionalInfo,
        string memory _datePosted,
        uint256 _amount
    ) public payable {
        require(msg.value == _amount, "Amount must be paid to post requirement");

        requirements.push(
            Requirement({
                title: _title,
                description: _description,
                user: _user,
                tags: _tags,
                additionalInfo: _additionalInfo,
                datePosted: _datePosted,
                amount: _amount,
                totalResponses: 0,
                status: "open",
                poster: payable(msg.sender)
            })
        );

        emit RequirementPosted(requirements.length - 1, msg.sender);
    }

    function submitData(
        uint256 _requirementId,
        string memory _title,
        string memory _description,
        string memory _sampleData,
        string memory _fullData,
        bool _isVerified
    ) public {
        uint256 dataItemId = dataItems.length;
        dataItems.push(
            DataItem({
                id: dataItemId,
                requirementId: _requirementId,
                title: _title,
                description: _description,
                sampleData: _sampleData,
                fullData: _fullData,
                isVerified: _isVerified,
                seller: payable(msg.sender)
            })
        );
        emit DataSubmitted(_requirementId, msg.sender);
    }

    function placeBid(
        uint256 _requirementId,
        string memory _title,
        uint256 _bidAmount,
        string memory _time,
        string memory _user,
        string memory _description
    ) public {
        require(_requirementId < requirements.length, "Invalid requirement ID");

        bids.push(
            Bid({
                requirementId: _requirementId,
                title: _title,
                status: "Pending",
                bidAmount: _bidAmount,
                time: _time,
                user: _user,
                description: _description,
                bidder: payable(msg.sender)
            })
        );
    }

    function acceptBid(uint256 _bidId) public {
        require(_bidId < bids.length, "Invalid bid ID");
        Bid storage bid = bids[_bidId];
        require(bid.status == "Pending", "Bid is not pending");

        bid.status = "Accepted";
        bid.bidder.transfer(bid.bidAmount);
        spendings[bid.bidder] += bid.bidAmount;

        emit BidAccepted(_bidId, bid.bidder);
    }

    function rejectBid(uint256 _bidId) public {
        require(_bidId < bids.length, "Invalid bid ID");
        Bid storage bid = bids[_bidId];
        require(bid.status == "Pending", "Bid is not pending");

        bid.status = "Rejected";

        emit BidRejected(_bidId, bid.bidder);
    }

    function getEarnings(address _user) public view returns (uint256) {
        uint256 totalEarnings = 0;
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].bidder == _user && keccak256(abi.encodePacked(bids[i].status)) == keccak256(abi.encodePacked("Accepted"))) {
                totalEarnings += bids[i].bidAmount;
            }
        }
        return totalEarnings;
    }

    function getSpendings(address _user) public view returns (uint256) {
        return spendings[_user];
    }

    function getUserBids(address _user) public view returns (Bid[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].bidder == _user) {
                count++;
            }
        }

        Bid[] memory userBids = new Bid[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].bidder == _user) {
                userBids[index] = bids[i];
                index++;
            }
        }

        return userBids;
    }

    function getUserRequirements(address _user) public view returns (Requirement[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < requirements.length; i++) {
            if (requirements[i].poster == _user) {
                count++;
            }
        }

        Requirement[] memory userRequirements = new Requirement[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < requirements.length; i++) {
            if (requirements[i].poster == _user) {
                userRequirements[index] = requirements[i];
                index++;
            }
        }

        return userRequirements;
    }

    function getUserDataItems(address _user) public view returns (DataItem[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < dataItems.length; i++) {
            if (dataItems[i].seller == _user) {
                count++;
            }
        }

        DataItem[] memory userDataItems = new DataItem[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < dataItems.length; i++) {
            if (dataItems[i].seller == _user) {
                userDataItems[index] = dataItems[i];
                index++;
            }
        }

        return userDataItems;
    }

    function getResponsesForRequirement(uint256 _requirementId) public view returns (DataItem[] memory) {
        require(_requirementId < requirements.length, "Invalid requirement ID");

        uint256 count = 0;
        for (uint256 i = 0; i < dataItems.length; i++) {
            if (dataItems[i].requirementId == _requirementId) {
                count++;
            }
        }

        DataItem[] memory responses = new DataItem[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < dataItems.length; i++) {
            if (dataItems[i].requirementId == _requirementId) {
                responses[index] = dataItems[i];
                index++;
            }
        }

        return responses;
    }

    function getAllRequirements() public view returns (Requirement[] memory) {
        return requirements;
    }

    function getAllDataItems() public view returns (DataItem[] memory) {
        return dataItems;
    }
}