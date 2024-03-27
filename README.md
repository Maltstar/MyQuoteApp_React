## Project Description

# MyQuoteApp_React
Porting of My_quote_app_simple_html on react and next js
Web App to consume smart contract ABI and output blockchain data.

### What?
 Save relevant information, quote, thoughts and thinking in form of a text.
 
 
### Why?

   - Access your quote from everywhere as long as you have an internet connection
   - Make your quote persistent, immutable, independent of a device, and decentralized,
   - which means that the storage network is not under the control of a centralized entity that may shut down
   - or restrict access to the devices where your quote is stored.
   - Make the quote author identifiable and at the same time respect privacy with pseudo-anonymity.
   - Make your quote resistant to censorship, nobody can filter your quote.

### How?
   - Using an existing blockchain network : e.g Ethereum on testnet Sepolia 
   - Programing a smart contract to interact with the blockchain network and store the quote  
   - Contract [0x6A4D382239F8BAb7A481e59A0A4A67CA33D3BBF2](https://sepolia.etherscan.io/address/0x6a4d382239f8bab7a481e59a0a4a67ca33d3bbf2)
   - Programing a backend to interact with the smart contract and retrieve quotes.
   - Programing a frontend to display the quotes.


Tested on Firefox and Chromium.

## How to run the Project

After cloning or downloading the repository.

install the necessary packages with npm:

```bash
npm install
# or
yarn install
```

run a server and serve the webapp:
run the development server:
```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live demo
Live demo available at https://my-quote-app-react.vercel.app/