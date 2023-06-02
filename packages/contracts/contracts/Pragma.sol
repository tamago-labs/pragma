// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Pragma {
    enum Role {
        UNAUTHORIZED,
        ADMIN
    }

    struct Collection {
        bytes32 name;
        string retrievalUrl;
        bool active;
        bytes32 root; // Merkle Tree's root of all item's id
        address delegator;
        address owner;
    }

    // Permission list
    mapping(address => Role) private permissions;
    // Collections
    mapping(uint256 => Collection) public collections;
    uint256 public collectionCount;

    event CollectionCreated(uint256 _id, address indexed owner);

    constructor() {
        permissions[msg.sender] = Role.ADMIN;
    }

    // creaate new collection
    function createCollection(
        bytes32 _name,
        string memory _retrievalUrl,
        bytes32 _root,
        address _owner
    ) external onlyAdmin {
        collectionCount += 1;

        collections[collectionCount].name = _name;
        collections[collectionCount].retrievalUrl = _retrievalUrl;
        collections[collectionCount].root = _root;
        collections[collectionCount].active = true;
        collections[collectionCount].delegator = msg.sender;
        collections[collectionCount].owner = _owner;

        emit CollectionCreated(collectionCount, _owner);
    }

    function getCollectionName(
        uint256 _collectionId
    ) external view returns (bytes32) {
        require(
            collections[_collectionId].active == true,
            "Given ID is invalid"
        );
        return (collections[_collectionId].name);
    }

    function getCollectionRetrievalUrl(
        uint256 _collectionId
    ) external view returns (string memory) {
        require(
            collections[_collectionId].active == true,
            "Given ID is invalid"
        );
        return (collections[_collectionId].retrievalUrl);
    }

    function getCollectionRoot(
        uint256 _collectionId
    ) external view returns (bytes32) {
        require(
            collections[_collectionId].active == true,
            "Given ID is invalid"
        );
        return (collections[_collectionId].root);
    }

     // update collection's name
    function updateCollectionName(uint256 _collectionId, bytes32 _name) external onlyAdmin {
        require(
            collections[_collectionId].active == true,
            "Given ID is invalid"
        );
        collections[_collectionId].name = _name;
    }

    // update collection's url
    function updateCollectionRetrievalUrl(uint256 _collectionId, string memory _retrievalUrl) external onlyAdmin {
        require(
            collections[_collectionId].active == true,
            "Given ID is invalid"
        );
        collections[_collectionId].retrievalUrl = _retrievalUrl;
    }

    // update collection's root
    function updateCollectionRoot(uint256 _collectionId, bytes32 _root) external onlyAdmin {
        require(
            collections[_collectionId].active == true,
            "Given ID is invalid"
        );
        collections[_collectionId].root = _root;
    }

    // give a specific permission to the given address
    function grant(address _address, Role _role) external onlyAdmin {
        require(_address != msg.sender, "You cannot grant yourself");
        permissions[_address] = _role;
    }

    // remove any permission binded to the given address
    function revoke(address _address) external onlyAdmin {
        require(_address != msg.sender, "You cannot revoke yourself");
        permissions[_address] = Role.UNAUTHORIZED;
    }

    // INTERNAL

    modifier onlyAdmin() {
        require(
            permissions[msg.sender] == Role.ADMIN,
            "Caller is not the admin"
        );
        _;
    }
}
