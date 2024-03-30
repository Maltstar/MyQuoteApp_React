import {CSSProperties} from 'react';

export {}

declare global {

    interface Abi {
      inputs:Array<object>
      name:string,
      outputs: Array<object>,
      stateMutability:string,
      type:string
    }

    interface ContractJson {
      address: string,
      //abi:Array<Abi>
      abi:ContractAbi
    }
    
    // interface Quote_with_Author {
    //   myQuote: string,
    //   owner: MatchPrimitiveType<"bytes20", unknown>,
    //   timestamp: MatchPrimitiveType<"uint256", unknown>
    // }

    // format of GetQuote result with wagmi hook readContract [string, `0x${string}`, bigint]
    interface Quote_with_Author {
      myQuote: string,
      owner: `0x${string}`,
      timestamp: bigint
    }

    interface Quote {
        timestamp: MatchPrimitiveType<"uint256", unknown>;
        myQuote: string;
    };

    /* quote format 
      {myQuote: string,
      timestamp: BigInt}
*/

    interface QuoteAuthorList {
      quotes:Quote[],
      author:string
  };
      
    
/* quote format 
      myQuote: string,
      owner: string,
      timestamp: BigInt
*/
    interface AuthorWithQuotes { 
      quotes: Quote_with_Author[], 
      author: string}

    interface Window {
      ethereum: any,
    }

    type Authors = Array<string>

    type Author = string

    type ResultGetQuoteType = [string, `0x${string}`, bigint] // result type for 'getQuote'
    type ResultGetAllAuthorsType = `0x${string}`[]  // result type for 'getAllAuthors'
    type ResultGetQuoteLengthType = Number
    type ResultGetQuotebyOwner =[bigint, string][] // result type for 'getQuotesbyOwner'

    type ResultType = 
    ResultGetQuoteType |
    ResultGetAllAuthorsType |
    ResultGetQuoteLengthType |
    undefined

    /* function name taken from the abi of the smart contract*/
    type FunctionNameSmartContract = "getAllAuthors" | "getLengthQuote" | 
    "getQuote" | "getQuotesbyOwner" //| "setQuote"


    interface MyCustomCSS extends CSSProperties {
}

    type MyOptionType = {
      label: string;
      value: string;
    };

    type IsMulti = false;

    type Props = {
      children?: React.ReactNode;
    };
  }