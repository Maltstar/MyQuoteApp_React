'use client'
import './App.scss';   // stylesheet
import { SetStateAction, useEffect, useState } from 'react';
import { Head } from 'next/document';
import {Web3} from 'web3'
import Form from './Form';


export default function App(){

  //  const [account, SetAccount] =useState()
    // store account
  const [account, setAccount] = useState();
  // store web3 object
  const [web3Gateway,setWeb3Gateway] = useState()
  // store contract interface json
  const [contractJson,setContractJson] = useState()
  // store contract interface 
  const [contract,setContract] = useState(null)

  //#####################
  // api GetQuote()
  //#####################


  // store result from GetQuote()
  const [currentQuote,SetCurrentQuote] = useState({})
  // user request to read GetQuote()
  const [showCurrentQuote,SetShowCurrentQuote] = useState(false)
  // flag to indicate that the current has been read and is ready to be displayed
  const [activateReadQuote,SetActivateReadQuote] = useState(false)


  //#####################
  // api GetAllAuthors()
  //#####################

  // store result from GetAllAuthors()
  const [allAuthors,SetAllAuthors] = useState({})
  // user request to read AllAuthors
  const [showAllAuthors,SetShowAllAuthors] = useState(false)
  // flag to indicate that the current has been read and is ready to be displayed
  const [activateAllAuthors,SetActivateAllAuthors] = useState(false)


  //#####################
  // api GetAllQuotes()
  //#####################

  // store result from GetAllQuotes()
  const [allQuotes,SetAllQuotes] = useState({})
  // user request to read all quotes
  const [showAllQuotes,SetShowAllQuotes] = useState(false)
  // flag to indicate that the all the quotes have been read and are ready to be displayed
  const [activateAllQuotes,SetActivateAllQuotes] = useState(false)



//   const [currentOwner,SetCurrentOwner] = useState('')
//   const [currentTimestamp,SetCurrentTimestamp] = useState('')


  let accounts;
 // let privateKey = process.env.PRIVATE_KEY;
  let contract_json 


  // fetch crypto account from MetaMask
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        window.ethereum.enable().then(async () => {
          const web3 = new Web3(window.ethereum);
          // fetching accounts list on metamask
          accounts = await web3.eth.getAccounts();
          // take the first address on the list
          const userAddress = accounts[0];
          console.log("account",account);
          // memorize address
          setAccount(userAddress);
          // memorize web3 object
          setWeb3Gateway(web3)

          // window.ethereum.on("accountsChanged", async (accounts) => {
          //   // handle account change
          //   accounts = await web3.eth.getAccounts();
          //   const userAddress = accounts[0];
          //   console.log("userAddress",userAddress);
          //   setAccount(userAddress);
          // });

          // window.ethereum.on("disconnect", () => {
          //   // handle metamask logout
          //   console.log("disconnect");
          //   setAccount(null);
          // });
        });
      } catch (error) {
        if (error.message === "User denied account authorization") {
          // handle the case where the user denied the connection request
        } else if (error.message === "MetaMask is not enabled") {
          // handle the case where MetaMask is not available
        } else {
          // handle other errors
        }
      }
    };

  //  fetch smart contract interface from json file

  const fetchContractInterface= async () => {
    try {
      await fetch('/contracts/infos_contract.json')
      .then((response) => response.json())
      .then((json_contract_interface) => 
      {
        setContractJson(json_contract_interface)
        console.log('after setContractJson', json_contract_interface);
    })

  }
  catch(error)
  {
    console.log(error);
    
  }
}

    // fetch account
    fetchAccount()

    //fetch smart contract interface
    fetchContractInterface()
      // make sure to catch any error
      .catch(console.error);
  }, []);


  /// fetch smart contract on the blockchain via a web3 object and contract object
  useEffect(() => {
    const fetchContract= async () => {

        // the web3 instance was created and the json data for the smart contract are available
        if((web3Gateway != null) && (contractJson != null))
        {
          // fetch gateway to smart contract
          const contract = new web3Gateway.eth.Contract(
            contractJson['abi'],
            contractJson['address'])
          
          setContract(contract)
          // enable the button
          
          console.log('web3Gateway',web3Gateway);
          console.log('contractJson',contractJson);
          console.log("account",account);
          console.log("contract",contract);
        }
        else
        {
          console.log('Either not metamask or no json interface for smart contract');
          console.log('web3Gateway',web3Gateway);
          console.log('contractJson',contractJson);
          
          
        }

    }

    // fetch smart contract
    fetchContract();
   // getQuote();
  },[web3Gateway,contractJson])


  // useEffect(() => {
  //   const fetchContractInterface= async () => {
  //     try {
  //       await fetch('/contracts/infos_contract.json')
  //       .then((response) => response.json())
  //       .then((json_contract_interface) => 
  //       {
  //         setContractJson(json_contract_interface)
  //     }

  // )}
  //   catch(error)
  //   {
  //     console.log(error);
      
  //   }
  // }
  //     // call the function
  //     fetchContractInterface()
  //     // make sure to catch any error
  //     .catch(console.error);
  // },[])


  // const getContract = async () => {
  //   await get_contract_interface()
  //   const web3 = new Web3(window.ethereum);
  //   const contract = new web3.eth.Contract(
  //     contract_json['abi'],
  //     contract_json['address']
  //   );

  //   const data = await contract.methods.getQuote().call();
  //   console.log(data);
  // };

  // call getQuote method of smart contract with RPC
  // each time the user click on the button "Read Quote on Blockchain"
  useEffect(() =>
  {
    if(showCurrentQuote)
    {
      console.log('showCurrentQuote 1');
      const getQuote = async () => {
        console.log('showCurrentQuote 2');
        const data = await contract.methods.getQuote().call();
        console.log('showCurrentQuote',data);
        const quote = {
            'quote': data.currentQuote,
            'owner': data.currentOwner,
            'timestamp':data.currentTimestamp
        }
        console.log('showCurrentQuote',quote);
        
        // memorize quote
        SetCurrentQuote(quote)
        // enable display of the quote since the quote has been memorized in a state
        SetActivateReadQuote(true)

        // reset the flag user read request
        SetShowCurrentQuote(false)
        console.log(data);
      };

      
     getQuote()
    }

  },[showCurrentQuote])


    // call getAllAuthors method of smart contract with RPC
  // each time the user click on the button "Read Quote on Blockchain"
  useEffect(() =>
  {
    if(showAllAuthors)
    {
      const getAllAuthors = async () => {
       // const data = await contract.methods.getAllAuthors().call();
        const data = await getAllAuthorsWrapper();
       //const allAuthors = await getAllAuthors();
        const allAuthors = data
        console.log('showCurrentQuote',allAuthors);
        
        // memorize quote
        SetAllAuthors(allAuthors)
        // enable display of the quote since the quote has been memorized in a state
        SetActivateAllAuthors(true)

        // reset the flag user read request
        SetShowAllAuthors(false)
        //console.log(data);
      };


      getAllAuthors()
    }

  },[showAllAuthors])

 
  const getAllAuthorsWrapper = async () => 
  {
    console.log('getAllAuthors');
    const allAuthors = await contract.methods.getAllAuthors().call()
    return allAuthors;
  }

  const getQuotesbyOwnerWrapper = async (author) =>
  {
      console.log('getQuotesbyOwnerWrapper');
      console.log('author',author);
      const quote_details = await contract.methods.getQuotesbyOwner(author).call()
      //const array_author = 
      const quote_with_author = { 'quotes': quote_details, 'author': author}
      return quote_with_author
  }

  const addQuotesbyOwner = async (allQuotesdummy: Array<{}>,authorQuotes) =>
  {
      console.log('addQuotesbyOwner');
     // console.log('author',author);
      console.log('authorQuotes',authorQuotes);
      const quote_details = await getQuotesbyOwnerWrapper(authorQuotes)
      console.log('quote_details',quote_details);
     // allQuotesdummy.push(quote_details)
      return quote_details
  }

  // call getAllQuotes method of smart contract with RPC
  // each time the user click on the button "Read All Quote on Blockchain"
  useEffect(() =>
  {
    if(showAllQuotes)
    {

      const getAllQuotes = async () => {
        
        console.log('getAllQuotes')
        // fetch all authors
        const allAuthors = await getAllAuthorsWrapper();
        console.log('allAuthors',allAuthors);
        const allQuotesdummy: Array<String> = []
        console.log('allAuthors',allAuthors);
        
        // for each author, collect their quotes
        const allQuotes = []
        //const allQuotes: Array<String> = await allAuthors.reduce(addQuotesbyOwner,allQuotesdummy)
        //console.log('allQuotes',allQuotes);

        const promises = []

        allAuthors.map((author) => 
        {
          // create an array of promise for which each promise will be a call to getQuotesbyOwner(author) for all authors
          promises.push(getQuotesbyOwnerWrapper(author))
          console.log('allAuthors.map','author',author);
          
          //   const quote_details = await contract.methods.getQuotesbyOwner(author).call()
          //   // await  contract.methods.getQuotesbyOwner(author).call({from: ""},function(error, result){
          //   // allQuotes[author] = result;
          //   console.log('quote',quote_details);
          // //});
        });

        console.log('promises',promises);


        // execute each call to each promise, i.e getQuotesbyOwner(author).call() for all authors
        Promise.allSettled(promises).then((results) => {
          // results is array that store all the subsequent result of each call to getQuotesbyOwner(author).call() 
          // memorize the attribute value which is an object with the author and all his quotes of each result 
          results.forEach((result) =>  allQuotes.push(result.value))
        // memorize quote when the data are available
        SetAllQuotes(allQuotes)
        }
        ,

        )

      //   Promise.allSettled(promises).then((results) => {

      //   results.forEach((result) =>  allQuotes.push(result.value))
      //   //return results
      
      // })


        console.log('allQuotes',allQuotes);
          
        
        // allAuthors.map((author,i) => async function()
        // {
        //     const quote_details = await contract.methods.getQuotesbyOwner(author).call()
        //     // await  contract.methods.getQuotesbyOwner(author).call({from: ""},function(error, result){
        //     // allQuotes[author] = result;
        //     console.log('quote',quote_details);
        //   //});
        // })

        // for(let i=0;i<allAuthors.length;i++)
        // {
        //     //await  contract.methods.getQuotesbyOwner(allAuthors[i]).call({from: address_backend},function(error, result){
        //     await  contract.methods.getQuotesbyOwner(allAuthors[i]).call({from: ""},function(error, result){
        //       allQuotes[allAuthors[i]] =result;
        //     });
        // }

        console.log('showAllQuotes',allQuotes);
        
        
        // enable display of the quote since the quote has been memorized in a state
        SetActivateAllQuotes(true)

        // reset the flag user read request
        SetShowAllQuotes(false)
        
      };


      getAllQuotes()
    }

  },[showAllQuotes])

  useEffect(() =>
  {
      console.log('after update of getAllQuotes',allQuotes);
    
  },[allQuotes])
  // const getQuote = async () => {
  //   const data = await contract.methods.getQuote().call();
  //   const quote = {
  //       'quote': data.currentQuote,
  //       'owner': data.currentOwner,
  //       'timestamp':data.currentTimestamp
  //   }
  //   console.log('quote',quote);
    
  //   SetCurrentQuote(quote)
  //   console.log(data);
  // };
//   const sexContract = async () => {
//     const web3 = new Web3(window.ethereum);
//     const contract = new web3.eth.Contract(
//       process.env.ABI,
//       process.env.CONTRACT_ADDRESS
//     );

//     const value = 1;
//     const gas = await contract.methods.setData(value).estimateGas();

//     const gasPrice = await web3.eth.getGasPrice();
//     const nonce = await web3.eth.getTransactionCount(userAddress);

//     const tx = {
//       from: userAddress,
//       //to: process.env.CONTRACT_ADDRESS,
//       gasPrice: gasPrice,
//       gas: gas,
//       nonce: nonce,
//       data: contract.methods.setData(value).encodeABI(),
//     };

//     const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

//     const receipt = await web3.eth.sendSignedTransaction(
//       signedTx.rawTransaction
//     );
//     if (receipt.status === "0x1") {
//       // the transaction was successful
//     } else {
//       // the transaction failed
//     }
//   };

  return (
    <>
      {/* <Head>
        <title>MetaMask and Web3.js Integration with Next.js</title>
        <meta
          name="description"
          content="MetaMask and Web3.js Integration with Next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div >
        {!account ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => window.ethereum.enable()}
          >
            Connect to MetaMask
          </button>
        ) : null}
        {account ? (
          <>
            {/* <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              onClick={getQuote}
            >
              Get Smart Contract
            </button> */}
            {/* <button
              className="ml-5 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              onClick={sexContract}
            >
              Set Smart Contract
            </button> */}
            <p >Your account address: {account}</p>
          </>
        ) : null}
      </div>

      <Form 

            // ########### GetQuote api ################ //
            quote={currentQuote} //last quote
            activateReadQuote={activateReadQuote} // indicate that last quote has been fetched and stored
            SetShowCurrentQuote={SetShowCurrentQuote} // set user flag in Form to trigger a call to getQuote api from App
            SetActivateReadQuote={SetActivateReadQuote}  // reset fetch flag once the quote has been displayed and the user request to clear the quote
            
            // ########### GetAllAuthors api ################ //
            authors={allAuthors} // list of all authors
            activateAllAuthors={activateAllAuthors}
            SetShowAllAuthors={SetShowAllAuthors}
            SetActivateAllAuthors={SetActivateAllAuthors}

            // ########### GetAllQuotes api ################ //
            quotes={allQuotes} // list of all quotes
            activateAllQuotes={activateAllQuotes}
            SetShowAllQuotes={SetShowAllQuotes}
            SetActivateAllQuotes={SetActivateAllQuotes}
            
            />
    </>
  );
};

//     useEffect( () => 
//     {
//         const fetchAccount = async () =>
//         {
//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             await window.ethereum.enable();
//             SetAccount(accounts[0])
//             console.log('Connected with MetaMask account: ' + accounts[0]);
//         }

//         fetchAccount()

//     },[])

//     // Check if web3 is available
// // if (typeof window.ethereum !== 'undefined') {
// //     // Use the browser injected Ethereum provider
// //     //const web3 = new Web3(window.ethereum);
// //     const web3Gateway = new Web3(window['ethereum']);
// //     // Request access to the user's MetaMask account
// //    // window.ethereum.enable();
// //     // Get the user's accounts
    


// //     web3Gateway.eth.getAccounts().then(function (accounts) {
// //         // Show the first account
// //         // document.getElementById('log').innerHTML =
// //         //     'Connected with MetaMask account: ' + accounts[0];
// //         console.log('Connected with MetaMask account: ' + accounts[0]);
        
// //     });
// // } else {
// //     // If web3 is not available, give instructions to install MetaMask
// //     // document.getElementById('log').innerHTML =
// //     //     'Please install MetaMask to connect with the Ethereum network';
// // }


// return(
// <div>
//     Hello
// </div>)
