export const PragmaABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "CollectionCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "collectionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "collections",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "name",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "retrievalUrl",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "bytes32",
          "name": "root",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_name",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_retrievalUrl",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "_root",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "createCollection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        }
      ],
      "name": "getCollectionName",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        }
      ],
      "name": "getCollectionRetrievalUrl",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        }
      ],
      "name": "getCollectionRoot",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "enum Pragma.Role",
          "name": "_role",
          "type": "uint8"
        }
      ],
      "name": "grant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "revoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "_name",
          "type": "bytes32"
        }
      ],
      "name": "updateCollectionName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_retrievalUrl",
          "type": "string"
        }
      ],
      "name": "updateCollectionRetrievalUrl",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_collectionId",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "_root",
          "type": "bytes32"
        }
      ],
      "name": "updateCollectionRoot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]