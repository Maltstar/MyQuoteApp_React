const artifact = {
    "address": "0x869EB73925b91e230c2e6b6541cFfcca2eb35103",
    "abi": [
        {
            "inputs": [],
            "name": "getAllAuthors",
            "outputs": [
                {
                    "internalType": "bytes20[]",
                    "name": "allAuthors",
                    "type": "bytes20[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getLengthQuote",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "length",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getQuote",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "currentQuote",
                    "type": "string"
                },
                {
                    "internalType": "bytes20",
                    "name": "currentOwner",
                    "type": "bytes20"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes20",
                    "name": "author",
                    "type": "bytes20"
                }
            ],
            "name": "getQuotesbyOwner",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "myQuote",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Quote.QuoteDetails[]",
                    "name": "authorQuotes",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "newQuote",
                    "type": "string"
                }
            ],
            "name": "setQuote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
} as const; export default artifact;