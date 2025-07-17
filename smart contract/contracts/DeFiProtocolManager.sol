//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

contract DeFiProtocolManager {
    

    struct defiProtocol {
        string name;
        uint256 apy;
        uint256 tvl ;      
    }

    defiProtocol[] public protocols;
    mapping(string name => uint256 index) public protocolToIndex;
    mapping(string name => bool) public protocolExists;

    error ProtocolNotExists();

    /**
     * @dev Adds a new protocol
     * @notice if the name is existing, it will use the updateProtocol function
     */

    function addProtocol(string memory _name, uint256 _apy, uint256 _tvl) public {
        if(protocolExists[_name]) {
            updateProtocol(_name, _apy, _tvl);           
        }
        else{
        defiProtocol memory newProtocol = defiProtocol({
            name: _name,
            apy: _apy,
            tvl: _tvl
        });

        protocols.push(newProtocol);
        protocolToIndex[_name] = protocols.length-1;
        protocolExists[_name] = true;

        }
    }

    function updateProtocol(string memory _name, uint256 _apy, uint256 _tvl) public {
            if(!protocolExists[_name]) {
                revert ProtocolNotExists();
            }
            uint256 index= protocolToIndex[_name];       
            protocols[index].apy = _apy;
            protocols[index].tvl = _tvl;

    }

    function showAllProtocols() public view returns (defiProtocol[] memory) {
        return protocols;
    }

    function getProtocolsLength() public view returns (uint256 lengthOfProtocols) {
        lengthOfProtocols = protocols.length;
    }
}