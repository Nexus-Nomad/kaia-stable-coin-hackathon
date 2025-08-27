// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {KaiaDID} from "../src/KaiaDID.sol";

/// @title KaiaDID 배포 스크립트
/// @dev KaiaDID 컨트랙트를 Kaia 네트워크에 배포
contract KaiaDIDScript is Script {
    function setUp() public {}

    /// @notice KaiaDID 컨트랙트 배포
    function run() public {
        uint256 deployerPrivateKey = uint256(vm.envBytes32("PRIVATE_KEY"));
        
        vm.startBroadcast(deployerPrivateKey);

        // KaiaDID 컨트랙트 배포
        KaiaDID kaiaDID = new KaiaDID();

        console.log("=== KaiaDID Deployment Info ===");
        console.log("Contract Address:", address(kaiaDID));
        console.log("Owner:", kaiaDID.owner());
        console.log("Block Number:", block.number);
        console.log("Block Timestamp:", block.timestamp);
        console.log("Deployer:", msg.sender);
        console.log("===============================");

        vm.stopBroadcast();
    }
}
