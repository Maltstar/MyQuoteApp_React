
import {useSmartContractFunction} from '@/components/hooks/SmartContractHooks'
import { useEffect, useState } from "react";
import DisplayCurrentQuote from "../display/lowlevel/DisplayCurrentQuote";
import GetCurrentQuoteWrapper from '../display/middleware/GetCurrentQuoteWrapper';
import {GetCurrentQuoteWrapperProps} from '@/app/components/quotes/display/middleware/GetCurrentQuoteWrapper';
import { CommonWithHookProps } from '../display/middleware/type';
import GetAllAuthorsWrapper from '../display/middleware/GetAllAuthorsWrapper';
    


export interface ApiHookWrapperProps extends CommonWithHookProps{
        apiName:FunctionNameSmartContract, // the name of the smart contract function to call

    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    
    //    export default function ApiHookWrapper({apiName,refreshQuote,SetRefreshQuote,SetDisplayQuote}:ApiHookWrapperProps)
    export default function ApiHookWrapper({apiName,...rest}:ApiHookWrapperProps)
    {

       // const [Quote,SetQuote] = useState<Quote_with_Author|undefined>(undefined)
        const fetchedQuoteData = useSmartContractFunction(apiName)

          


        // useEffect(() => {
        //     console.log("useEffect fetchedQuoteData",fetchedQuoteData)
        //     console.log("useEffect RefreshQuote",refreshQuote)

        // const manageGetQuote = (fetchedQuoteData:ResultGetQuoteType) => {

        //     const [dataQuote,dataOwner,dataTimestamp] = fetchedQuoteData 
        //     const QuoteData : Quote_with_Author = {
        //         'myQuote':dataQuote,
        //         'owner': dataOwner,
        //         'timestamp':dataTimestamp
        //     }
        //     // updating current Quote
        //     SetQuote(QuoteData)
        //     // current Quote was updated
        //     SetRefreshQuote(false)
        // }    
        // // the user requested to display the current Quote
        // if(refreshQuote)
        // {
        //     // the smart contract returned data
        //      if(fetchedQuoteData != undefined) 
        //     //if (fetchedQuoteData is ResultGetQuoteType)
        //     {
        //        switch(apiName)
        //        {
        //         case 'getAllAuthors':
        //         case 'getLengthQuote':
        //         case 'getQuote':
        //             manageGetQuote(fetchedQuoteData as ResultGetQuoteType)
        //         break
        //         case 'getQuotesbyOwner':
        //             break
        //         default:
        //             break
        //        }
        //     }
            
            
        // }
            

        // },[refreshQuote,fetchedQuoteData,SetQuote,SetRefreshQuote])
  
           
            return(
                <>
                    {(() => {
                    switch (apiName) {
                      case 'getQuote':
                        return <GetCurrentQuoteWrapper {...rest } fetchedData={fetchedQuoteData as ResultGetQuoteType}/>
                      case 'getAllAuthors':
                        return <GetAllAuthorsWrapper {...rest } fetchedData={fetchedQuoteData as ResultGetAllAuthorsType}/> 
                      default:
                        return null
                    }
                  })()}
                </>


                // (apiName == 'getQuote' &&
                // <GetCurrentQuoteWrapper {...rest } fetchedQuoteData={fetchedQuoteData as ResultGetQuoteType}/>)
                
                

            )

    }
