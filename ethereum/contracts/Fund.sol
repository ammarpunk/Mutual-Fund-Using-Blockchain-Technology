// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

contract FundFactory {
    address public manager;
    address[] public deployedFunds;

    function createFund(uint256 minimum) public {
        address newFund = address(new Fund(minimum, msg.sender));
        manager = msg.sender;
        deployedFunds.push(newFund);
    }

    function getDeployedFunds() public view returns (address[] memory) {
        return deployedFunds;
    }
}

contract Fund {
    struct Investment {
        uint256 amount;
        address investor;
    }

    Investment[] public investments;
    address[] public investors;
    address public manager;
    uint256 public minimumContribution;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 _minimum, address creator) {
        manager = creator;
        minimumContribution = _minimum;
    }

    function addInvestment() public payable {
        require(msg.value > minimumContribution);
        Investment storage newInvestment = investments.push();
        newInvestment.amount = msg.value;
        newInvestment.investor = msg.sender;
        investors.push(msg.sender);
    }

    function cancelInvestment(uint index) public {
        Investment storage investment = investments[index];

        payable(investment.investor).transfer(investment.amount);
        investment.amount = 0;
    }

    function getRevenue(uint256 revenue, uint index) public {
        Investment storage investment = investments[index];
        require(revenue <= investment.amount);

        investment.amount = investment.amount - revenue;
        payable(investment.investor).transfer(revenue);
    }
    
    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            investments.length,
            manager
        );
    }

    function getInventmentsCount() public view returns (uint) {
        return investments.length;
    }
}
