// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Acc {

    uint256 public myValue;

    function incrementValue() public {
        myValue++;
    }

    function addValue(uint256 _value) public {
        myValue += _value;
    }

    function getValue() public view returns (uint256) {
        return myValue;
    }

    function print5() public pure returns (uint256) {
        return 5;
    }
}
