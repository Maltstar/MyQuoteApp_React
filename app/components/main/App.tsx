'use client'
import './App.scss';   // stylesheet
import { SetStateAction, useEffect, useState } from 'react';
//import { Head } from 'next/document';
import {default_bytes20, findMostRecentQuote} from '../../lib/utils'
import {Contract, ContractAbi, Web3} from 'web3'
import Form from '../UI_menu/Form';
import { error } from 'console';


export default function App(){


  // store web3 object
  /**
   * There are several possibilities for the design to get a connection to the web3 object
   * and call the smart contract apis:
   *  either :
   *  + create a web3 object for each component that will be called in the Form:
   *    - advantages:
   *                 each component is independent and sufficient on its own
   *    - drawback:
   *                 each component need to create a web3 object and make a request to a blockchain node
   *                 which cost resources, time and make the code redundant
   * 
   *  + create a single web3 object which would be shared at the top level and each component will trigger
   *    a call to the smart contract api on the top level and the top level component will
   *    distribute the result at a lower component level:
   *    - advantages:
   *                 no redundant code, smart contract handling is located in a single component
   *    - drawback:
   *                 parameters redundancy from the top level component to the lower level components
   * 
   *  for performance reason and simplicity it has been decided to choose the design with a single top level component
   *  handling the web3 object and the apis call to the smart contract
   * 
   **/

  // store web3 object created from window object
  const [web3Gateway,setWeb3Gateway] = useState<Web3 | undefined>()
  // store contract interface json
  const [contractJson,setContractJson] = useState<ContractJson | null>(null)

  // redefining abi for typescript
  const abiTest = [
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
] as const
  // store contract interface derived from web3 object
  const [contract,setContract] = useState<Contract<typeof abiTest> | null>(null)

  // handling connection status to metamask
  const [connectWallet,SetConnectWallet] = useState(false)

  //#####################
  // api GetQuote()
  //#####################


  // store result from GetQuote()
  const [currentQuote,SetCurrentQuote] = useState<Quote_with_Author|undefined>(undefined)
  // user request to read GetQuote()
  const [showCurrentQuote,SetShowCurrentQuote] = useState(false)
  // flag to indicate that the current has been read and is ready to be displayed
  const [activateReadQuote,SetActivateReadQuote] = useState(false)


  //#####################
  // api GetLastQuote()
  //#####################
  // user request to read the most recent quote on the blockchain
  const [showMostRecentQuote,SetShowMostRecentQuote] = useState(false)
  // memorize most recent quote
  const [mostRecentQuote,SetMostRecentQuote] = useState<Quote_with_Author | undefined>()


  //#####################
  // api GetAllAuthors()
  //#####################

  // store result from GetAllAuthors()
  const [allAuthors,SetAllAuthors] = useState<Authors|undefined>([])
  // user request to read AllAuthors
  const [showAllAuthors,SetShowAllAuthors] = useState(false)
  // flag to indicate that the current has been read and is ready to be displayed
  const [activateAllAuthors,SetActivateAllAuthors] = useState(false)



  //#####################
  // api GetAllQuotes()
  //#####################

  // store result from GetAllQuotes()
  const [allQuotes,SetAllQuotes] = useState<(QuoteAuthorList | undefined)[]>([])
  // user request to read all quotes
  const [showAllQuotes,SetShowAllQuotes] = useState(false)
  // flag to indicate that the all the quotes have been read and are ready to be displayed
  const [activateAllQuotes,SetActivateAllQuotes] = useState(false)


  //#####################
  // api GetQuoteByOwner()
  //#####################

  // store user input as author/owner
  // call the smart contract with a default 20 bytes since they are no record for a bad formated input
  const [ownerSetByUser,SetOwnerSetByUser] = useState<string>(default_bytes20)
     // user request to read quotes from a specific author
  const [showOwnerSetByUser,SetShowOwnerSetByUser] = useState(false)
    // flag to indicate that the current has been read and is ready to be displayed
  const [activateOwnerSetByUser,SetActivateOwnerSetByUser] = useState(false)
   // store the quotes of the request author
//   const [quotesOwnerSetByUser,SetQuotesOwnerSetByUser] = useState<Quote[]>([])
const [quotesOwnerSetByUser,SetQuotesOwnerSetByUser] = useState<QuoteAuthorList | undefined>()

   

  //#####################
  // api GetQuoteByOwnerList()
  //#####################
  // call the smart contract with a default 20 bytes since they are no record for a bad formated input
  const [ownerSetByUserFromList,SetOwnerSetByUserFromList] = useState<string>(default_bytes20)
 // flag to indicate that the authors list has been read and is ready to be displayed
  const [activateAllAuthorsList,SetActivateAllAuthorsList] = useState(false)
    // user request to read quotes from a specific author from the select list
  const [quotesOwnerSetByUserFromList,SetQuotesOwnerSetByUserFromList] = useState<QuoteAuthorList|undefined>(undefined)
   // flag to indicate that the current has been read and is ready to be displayed
  const [activateOwnerSetByUserFromList,SetActivateOwnerSetByUserFromList] = useState(false)
  
  //#####################
  // api WriteQuote()
  //#####################

  // store account, wallet address of the current user
  const [account, setAccount] = useState<string | undefined>("");

  // memorize quote from user input
  const [userQuote,SetUserQuote] = useState<string>("")



//   const [currentOwner,SetCurrentOwner] = useState('')
//   const [currentTimestamp,SetCurrentTimestamp] = useState('')


  //let accounts;
 // let privateKey = process.env.PRIVATE_KEY;
  //let contract_json 

//   const disconnectWallet =  async () => 
//   {
//     let  account;
//     if (window.ethereum)
//     {
//        account = await window.ethereum.request({
//         method: "wallet_requestPermissions",
//         params: [
//           {
//             eth_accounts: {}
//           }
//         ]
//       });
//     }
//     console.log(account);
    
// }

const removeWeb3 = async () =>{
  setWeb3Gateway(undefined);
}

// eth_accounts always returns an array.
function handleAccountsChanged(accounts:Array<string>) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts.
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== account) {
    // Reload your interface with accounts[0].
    setAccount(accounts[0]);

  }
}
// connect to MetaMask and fetch user account
const fetchAccount = async () => {
      // try {
      //   // pop up metamask and waiting for the user to login
      //   window.ethereum.enable().then(async () => {
      //     // get a getaway from metamask to web3
      //     const web3 = new Web3(window.ethereum);
      //     // fetching accounts list on metamask
      //     const accounts = await web3.eth.getAccounts();
      //     // take the first address on the list
      //     const userAddress = accounts[0];
      //     //// console.log("account",account);
      //     // memorize address
      //     setAccount(userAddress);
      //     // memorize web3 object
      //     setWeb3Gateway(web3)
      //     // memorizing the connection state
      //     SetConnectWallet(true)

      //     // window.ethereum.on("accountsChanged", async (accounts) => {
      //     //   // handle account change
      //     //   accounts = await web3.eth.getAccounts();
      //     //   const userAddress = accounts[0];
      //     //   // console.log("userAddress",userAddress);
      //     //   setAccount(userAddress);
      //     // });

      //     // window.ethereum.on("disconnect", () => {
      //     //   // handle metamask logout
      //     //   // console.log("disconnect");
      //     //   setAccount(null);
      //     // });
      //   });
      // } 
      if (window.ethereum)
      {
        try{
          const web3 = new Web3(window.ethereum);
          // fetching accounts list on metamask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          // take the first address on the list
          const userAddress = accounts[0];
          setAccount(userAddress);
          // memorize web3 object
          setWeb3Gateway(web3)
          // memorizing the connection state
          SetConnectWallet(true)

          window.ethereum.on('accountsChanged', handleAccountsChanged);



        }catch (error) {
          if (error instanceof Error)
          {
            if (error.message === "User denied account authorization") {
              // handle the case where the user denied the connection request
                console.log("Please authorize the connection to your account");
                
            } else if (error.message === "MetaMask is not enabled") {
              // handle the case where MetaMask is not available
              console.log("Please authorize the connection to your account");
            } else {
              // handle other errors
              console.log(error)
            }
          }
  
        }
      }
      else
      {
        console.log("Please install MetaMask on your browser before using this webapp")
        alert("MetaMask is not installed, please install metamask before using the webapp")
      }  
      
    };

   //fetch smart contract interface from json file
  const fetchContractInterface= async () => {
    try {
      await fetch('/contracts/infos_contract.json')
      .then((response) => response.json())
      .then((json_contract_interface) => 
      {
        setContractJson(json_contract_interface)
        //// console.log('after setContractJson', json_contract_interface);
    })

  }
  catch(error)
  {
    // console.log(error);
    
  }
 }

    /**
     * Gateway to web3 by :
     *  - fetching account (wallet) on blockchain node provider (e.g MetaMask)
     *  - fetching the ABI to the quote smart contract
     */
  const connectToWeb3 = () => {
        // fetch account on MetaMask
        fetchAccount()

        //fetch smart contract interface
        fetchContractInterface()
  }

  /**
   * fetch all authors from smart contract
   * @returns allAuthors : array of strings
   */
  const getAllAuthorsWrapper = async () => 
  {
    // console.log('getAllAuthors');
    if(contract !=null)
    {
      const allAuthors:Authors= await contract.methods.getAllAuthors().call()
      return allAuthors;
    }
   
  }

  // fetch all author as soon as the interface to smart contract is available
  useEffect(() => {

    if(contract != null)
    {
        // fetch authors list for display as a list

        const getAllAuthors = async () => {
        // const data = await contract.methods.getAllAuthors().call();
          const data = await getAllAuthorsWrapper();
        //const allAuthors = await getAllAuthors();
          const allAuthors = data
         // // console.log('getAllAuthors',allAuthors);
          
          // memorize quote
          SetAllAuthors(allAuthors)
          // enable display of the quote since the quote has been memorized in a state
          SetActivateAllAuthorsList(true)

          // reset the flag user read request
          SetShowAllAuthors(false)
          //// console.log(data);
        };


        getAllAuthors()
      
    }

  },[contract])


  // remove all state derived from web3 object
  useEffect(() => {


    // web3 object was removed but MetaMask wallet is connected
    if(web3Gateway == undefined && connectWallet)
    {
      setAccount(undefined) // reset account
      setContract(null) // remove connection between web3 object and smart contract
      SetConnectWallet(false) // indicate that wallet is not anymore connected
    }
  }, [web3Gateway]);


  // fetch smart contract on the blockchain via a web3 object and contract object
  useEffect(() => {
    const fetchContract= async () => {

        // the web3 instance was created and the json data for the smart contract are available
        if((web3Gateway != null) && (contractJson != null))
        {
          // fetch gateway to smart contract
          // const contract = new web3Gateway.eth.Contract<typeof abiTest>(
          //   //contractJson['abi'],
          //   abiTest,
          //   contractJson['address'])


            const contract = new Contract<typeof abiTest>(
              //contractJson['abi'],
              abiTest,
              contractJson['address'],web3Gateway)
          
          setContract(contract)
          // enable the button
          
          // // console.log('web3Gateway',web3Gateway); 
          // console.log('contractJson',contractJson);
          // console.log("account",account);
          // console.log("contract",contract);
        }
        else
        {
          // console.log('Either not metamask or no json interface for smart contract');
          // console.log('web3Gateway',web3Gateway);
          // console.log('contractJson',contractJson);
          
          
        }

    }

    // fetch smart contract
    fetchContract();
   // getQuote();
  },[web3Gateway,contractJson])


  /* call to getQuotesbyOwner() from the user input */
  useEffect( () =>
  {
    if(showOwnerSetByUser)
    {
      const fetchAuthorQuote = async () =>
      {
        const data = await getQuotesbyOwnerWrapper(ownerSetByUser);
        
        // memorizing for the authors requested
        SetQuotesOwnerSetByUser(data)
        // indicating that the quotes are ready to be displayed
        SetActivateOwnerSetByUser(true)
        // reset flag for next request
        SetShowOwnerSetByUser(false)


      }


      fetchAuthorQuote();
      
    }
    else
    {
     //  SetActivateOwnerSetByUser(false)
    }
// when author changed or the read quote by author was clicked
  },[ownerSetByUser,showOwnerSetByUser]) 


   /* call to getQuotesbyOwner() from the user input */
   useEffect( () =>
   {
    // if(showOwnerSetByUserFromList)
    // {

      if(ownerSetByUserFromList != default_bytes20)
      {
        const fetchAuthorQuote = async () =>
        {
          const data = await getQuotesbyOwnerWrapper(ownerSetByUserFromList);
          
          // memorizing for the authors requested
          SetQuotesOwnerSetByUserFromList(data)
          // indicating that the quotes are ready to be displayed
          SetActivateOwnerSetByUserFromList(true)
          // console.log('ownerSetByUserFromList');
          
  
  
        }
  
  
        fetchAuthorQuote();
        
      //}
    }

 // when author changed or the read quote by author was clicked
   },[ownerSetByUserFromList]) 

  // call getQuote method of smart contract with RPC
  // each time the user click on the button "Read Quote on Blockchain"
  useEffect(() =>
  {
    if(showCurrentQuote)
    {
      // console.log('showCurrentQuote 1');
      const getQuote = async () => {
        // console.log('showCurrentQuote 2');
        if(contract != null)
        {
          const data = await contract.methods.getQuote().call();
          // console.log('showCurrentQuote',data);
          const quote = {
              'myQuote': data.currentQuote,
              'owner': data.currentOwner,
              'timestamp':data.currentTimestamp
          }
          // console.log('showCurrentQuote',quote);
          
          // memorize quote
          SetCurrentQuote(quote)
          // enable display of the quote since the quote has been memorized in a state
          SetActivateReadQuote(true)
  
          // reset the flag user read request
          SetShowCurrentQuote(false)
        }
       
        // console.log(data);
      };

      
     getQuote()
    }

  },[showCurrentQuote])




  // Handle ReadAllQuotes
  useEffect(() =>
  {
    if(showMostRecentQuote)
    {
      // console.log('showCurrentQuote 1');
      const getMostRecentQuote = async () => {
        const allQuotes = await getAllQuotesWrapper();
        // const promises = await getAllQuotesPromises();
        // const allQuotes:Array<QuoteAuthorList | undefined> = []
        // // execute each call to each promise, i.e getQuotesbyOwner(author).call() for all authors
        // Promise.allSettled(promises).then((results) => {
        //   // console.log("results",results);
          
        //   // results is array that store all the subsequent result of each call to getQuotesbyOwner(author).call() 
        //   // memorize the attribute value which is an object with the author and all his quotes of each result 
        
        
        //   //results.forEach((result) =>  allQuotes.push(result.value))
        //   // filter resolved promised and work with then
        //   results.filter((val): val is PromiseFulfilledResult<QuoteAuthorList | undefined> => val.status === 'fulfilled').forEach(result => allQuotes.push(result.value))

          //results.forEach((result) =>  allQuotes.push(result.value))
        // memorize quote when the data are available
          // console.log("showMostRecentQuote",allQuotes);
          //const quote = findMostRecentQuote(allQuotes);
         // // console.log("showMostRecentQuote",quote);
          
          //const quote_details = {          }
          SetMostRecentQuote(findMostRecentQuote(allQuotes));
          
       // SetAllQuotes(allQuotes)
        }       
        
        // // memorize quote
        // SetCurrentQuote(quote)
        // // enable display of the quote since the quote has been memorized in a state
        // SetActivateReadQuote(true)

        // // reset the flag user read request
        // SetShowCurrentQuote(false)
        // // console.log(data);
        getMostRecentQuote()
      }

  },[showMostRecentQuote])


    // call getAllAuthors method of smart contract with RPC
  useEffect(() =>
  {
    if(showAllAuthors)
    {
      const getAllAuthors = async () => {
       // const data = await contract.methods.getAllAuthors().call();
        const data = await getAllAuthorsWrapper();
       //const allAuthors = await getAllAuthors();
        const allAuthors = data
        // console.log('showCurrentQuote',allAuthors);
        
        // memorize quote
        SetAllAuthors(allAuthors)
        // enable display of the quote since the quote has been memorized in a state
        SetActivateAllAuthors(true)

        // reset the flag user read request
        SetShowAllAuthors(false)
        //// console.log(data);
      };


      getAllAuthors()
    }

  },[showAllAuthors])

  const setQuoteWrapper = async () => 
  {
    // console.log('setQuoteWrapper',userQuote,account);

    if(contract != null)
    {
      // write quote on blockchain
      try{

        await contract.methods.setQuote(userQuote).send({from:account});

      }
      catch(error){
      if (error instanceof Error)
      {
          // console.log(error.message);
          
      }
      }
    }
    
 }
  // call setQuote method of smart contract with RPC
  useEffect(() =>
  {
    if(userQuote != "")
    {
      if(userQuote.length != 0)
      {
        const writeQuote = async () => {
         // const data = await contract.methods.getAllAuthors().call();
          await setQuoteWrapper();
         //const allAuthors = await getAllAuthors();
          
          // reset quote
          SetUserQuote("")
  
        };
  
  
        writeQuote()
      }
    }


  },[userQuote])

 
  

  const getQuotesbyOwnerWrapper = async (author:Author) =>
  {
      // console.log('getQuotesbyOwnerWrapper');
      // console.log('author',author);
      if(contract != null)
      {
        const quote_details = await contract.methods.getQuotesbyOwner(author).call()
        //const array_author = 
        const quote_with_author = { 'quotes': quote_details, 'author': author}
        return quote_with_author
      }

  }


  


  const getAllQuotesPromises = async () => {
        
    // console.log('getAllQuotesPromises')
    // fetch all authors
    const allAuthors = await getAllAuthorsWrapper();
    // console.log('allAuthors',allAuthors);
    const allQuotesdummy: Array<String> = []
    // console.log('allAuthors',allAuthors);
    
    // for each author, collect their quotes
    const allQuotes = []
    //const allQuotes: Array<String> = await allAuthors.reduce(addQuotesbyOwner,allQuotesdummy)
    //// console.log('allQuotes',allQuotes);

    const promises:Array<Promise<QuoteAuthorList|undefined>> = []
    if(allAuthors)
    {
      allAuthors.map((author) => 
      {
        // create an array of promise for which each promise will be a call to getQuotesbyOwner(author) for all authors
        promises.push(getQuotesbyOwnerWrapper(author))
        // console.log('allAuthors.map','author',author);
        
        //   const quote_details = await contract.methods.getQuotesbyOwner(author).call()
        //   // await  contract.methods.getQuotesbyOwner(author).call({from: ""},function(error, result){
        //   // allQuotes[author] = result;
        //   // console.log('quote',quote_details);
        // //});
      });
    }



    // console.log("getAllQuotesPromises, promises",promises);
    

    return promises
  }


  const getAllQuotesWrapper = async () => {
        
    const promises = await getAllQuotesPromises();
    const allQuotes:Array<QuoteAuthorList | undefined> = []
    // execute each call to each promise, i.e getQuotesbyOwner(author).call() for all authors
    await Promise.allSettled(promises).then((results) => {
      // filter resolved promised and work with then
      results.filter((val): val is PromiseFulfilledResult<QuoteAuthorList | undefined> => val.status === 'fulfilled').forEach(result => allQuotes.push(result.value));
      //results.filter((val): val is PromiseFulfilledResult<QuoteAuthorList | undefined> => val.status === 'rejected').forEach(result => allQuotes.push(result.reason));
      
      console.log("getAllQuotesWrapper - allQuotes",allQuotes)
      //return allQuotes
    },)
    // .catch(resaon)
    // {
    //   return allQuotes
    // }
    console.log("getAllQuotesWrapper - allQuotes 2nd return",allQuotes)

    return allQuotes
  }

  // call getAllQuotes method of smart contract with RPC
  // each time the user click on the button "Read All Quote on Blockchain"
  useEffect(() =>
  {
    if(showAllQuotes)
    {


      const getAllQuotes = async () => {

        //const allQuotes: Array<(QuoteAuthorList | undefined)> = [];
        const allQuotes:Array<QuoteAuthorList | undefined> = await getAllQuotesWrapper();
        // const json = JSON.stringify(allQuotes);
        // const Quotes = JSON.parse(json);
        //allQuotes.fromAsync(getAllQuotesWrapper()) ;
        console.log("getAllQuotes- allQuotes",allQuotes);
       // console.log("getAllQuotes- Quotes[0]",Quotes['0']);
        console.log("getAllQuotes- Quotes[1]",allQuotes[1]);
       // console.log("getAllQuotes- Quotes[2]",allQuotes['2']);

        if (allQuotes[0] != undefined)
        {
          // memorize quote when the data are available
          SetAllQuotes(allQuotes)
          console.log("getAllQuotes- allQuotes",allQuotes);
          
          // enable display of the quote since the quote has been memorized in a state
          SetActivateAllQuotes(true)
        }
        
      //   const promises = await getAllQuotesPromises();
      //   const allQuotes:Array<QuoteAuthorList | undefined> = []
      //   // execute each call to each promise, i.e getQuotesbyOwner(author).call() for all authors
      //   Promise.allSettled(promises).then((results) => {
      //     // filter resolved promised and work with then
      //     results.filter((val): val is PromiseFulfilledResult<QuoteAuthorList | undefined> => val.status === 'fulfilled').forEach(result => allQuotes.push(result.value))
          
      //   },)
      //   return allQuotes

        // // console.log('getAllQuotes')
        // // fetch all authors
        // const allAuthors = await getAllAuthorsWrapper();
        // // console.log('allAuthors',allAuthors);
        // const allQuotesdummy: Array<String> = []
        // // console.log('allAuthors',allAuthors);
        
        // // for each author, collect their quotes
        // const allQuotes:Array<QuoteAuthorList | undefined> = []
        // // //const allQuotes: Array<String> = await allAuthors.reduce(addQuotesbyOwner,allQuotesdummy)
        // // //// console.log('allQuotes',allQuotes);

        // const promises = []
        // if(allAuthors != undefined)
        // {
        //     allAuthors.map((author) => 
        //   {
        //     // create an array of promise for which each promise will be a call to getQuotesbyOwner(author) for all authors
        //     promises.push(getQuotesbyOwnerWrapper(author))
        //     // console.log('allAuthors.map','author',author);
            
        //     //   const quote_details = await contract.methods.getQuotesbyOwner(author).call()
        //     //   // await  contract.methods.getQuotesbyOwner(author).call({from: ""},function(error, result){
        //     //   // allQuotes[author] = result;
        //     //   // console.log('quote',quote_details);
        //     // //});
        //   });

        //   // // console.log('promises',promises);

        //   const promises = await getAllQuotesPromises();
        //   // console.log("getAllQuotes, promises",promises);


        //   // execute each call to each promise, i.e getQuotesbyOwner(author).call() for all authors
        //   Promise.allSettled(promises).then((results) => {
        //     // console.log("results",results);
            
        //     // results is array that store all the subsequent result of each call to getQuotesbyOwner(author).call() 
        //     // memorize the attribute value which is an object with the author and all his quotes of each result 
        //     //results.forEach((result) =>  allQuotes.push(result.value))
        //     // filter resolved promised and work with then
        //     results.filter((val): val is PromiseFulfilledResult<Quote[] | undefined> => val.status === 'fulfilled').forEach(result => allQuotes.push(result.value))


        //     // memorize quote when the data are available
        //     SetAllQuotes(allQuotes)
        //   }
        //   ,

        //   )

        // console.log('showAllQuotes',allQuotes);
        
        

        
        

        // reset the flag user read request
        SetShowAllQuotes(false)
        
      };


      getAllQuotes()
    }

  },[showAllQuotes])

  // useEffect(() =>
  // {
  //     // console.log('after update of getAllQuotes',allQuotes);
    
  // },[allQuotes])
  // const getQuote = async () => {
  //   const data = await contract.methods.getQuote().call();
  //   const quote = {
  //       'quote': data.currentQuote,
  //       'owner': data.currentOwner,
  //       'timestamp':data.currentTimestamp
  //   }
  //   // console.log('quote',quote);
    
  //   SetCurrentQuote(quote)
  //   // console.log(data);
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded position-absolute top-0 end-0"
            onClick={() => connectToWeb3()}//window.ethereum.enable()}
          >
            Connect to MetaMask
          </button>
        ) : <div></div>}

        {account && window.ethereum.isConnected()? (
          <div >
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
            <p className="badge rounded-pill bg-dark text-success position-absolute fs-6 top-0 end-0" >Your account address: <br></br>{account}</p>
            <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded position-absolute top-10 end-0"
            onClick={() => removeWeb3()}//window.ethereum.enable()}
          >
            Disconnect
          </button>
          </div>
        ) :  <div></div>}
      </div>

      { <Form 




            // ########### GetQuote api ################ //
            quote={currentQuote} //last quote
            activateReadQuote={activateReadQuote} // indicate that last quote has been fetched and stored
            SetShowCurrentQuote={SetShowCurrentQuote} // set user flag in Form to trigger a call to getQuote api from App
            SetActivateReadQuote={SetActivateReadQuote}  // reset fetch flag once the quote has been displayed and the user request to clear the quote
            

            // ########### GetMostRecentQuote api ################ //
            mostRecentQuote={mostRecentQuote} 
            SetShowMostRecentQuote={SetShowMostRecentQuote}
            showMostRecentQuote={showMostRecentQuote}

            // ########### GetAllAuthors api ################ //
            authors={allAuthors} // list of all authors
            activateAllAuthors={activateAllAuthors} // indicate all authors have been fetched and stored
            SetShowAllAuthors={SetShowAllAuthors} // set user flag in Form to trigger a call to GetAllAuthors api from App
            SetActivateAllAuthors={SetActivateAllAuthors} // reset fetch flag once all authors have been displayed and the user request to clear all authors

            // ########### GetAllQuotes api ################ //
            quotes={allQuotes} // list of all quotes
            activateAllQuotes={activateAllQuotes} // indicate all quotes have been fetched and stored
            SetShowAllQuotes={SetShowAllQuotes} // set user flag in Form to trigger a call to GetAllQuotes api from App
            SetActivateAllQuotes={SetActivateAllQuotes} // reset fetch flag once all quotes have been displayed and the user request to clear all quotes

            // ########### GetQuotesByOwner api ################ //
            quotesOwnerSetByUser={quotesOwnerSetByUser} // list of quotes fetched for the author/owner set by user
            activateOwnerSetByUser={activateOwnerSetByUser} // indicate all quotes for the author have been fetched and stored
            SetOwnerSetByUser={SetOwnerSetByUser} // memorize the author set by the user
            SetShowOwnerSetByUser={SetShowOwnerSetByUser} // set user flag in Form to trigger a call to GetQuotesByOwner api from App
            SetActivateOwnerSetByUser={SetActivateOwnerSetByUser} // reset fetch flag once all quotes for the author have been displayed and the user request to clear all quotes

            // ########### GetQuotesByOwnerList api ################ //
            activateAllAuthorsList={activateAllAuthorsList}
            activateOwnerSetByUserFromList={activateOwnerSetByUserFromList}
            SetActivateOwnerSetByUserFromList={SetActivateOwnerSetByUserFromList}
            quotesOwnerSetByUserFromList={quotesOwnerSetByUserFromList}
            SetOwnerSetByUserFromList={SetOwnerSetByUserFromList}
            
            // ########### WriteQuote api ################ //
            SetUserQuote={SetUserQuote}
            userAuthor={account}


            
            
            // ######## Smart contract Interface availability ###### //
            contractAvailable={contract !=null ? true:false}
            

            /> }
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
//             // console.log('Connected with MetaMask account: ' + accounts[0]);
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
// //         // console.log('Connected with MetaMask account: ' + accounts[0]);
        
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
