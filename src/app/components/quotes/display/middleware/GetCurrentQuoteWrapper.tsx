
import { useEffect, useState } from "react";
import DisplayCurrentQuote from "../lowlevel/DisplayCurrentQuote";
import {CommonWithHookProps} from "./type"


export interface GetCurrentQuoteWrapperProps extends CommonWithHookProps{
    fetchedData:ResultGetQuoteType, // the name of the smart contract function to call

    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    export default function GetCurrentQuoteWrapper({refreshResult,fetchedData,SetRefreshResult,SetDisplayResult}:GetCurrentQuoteWrapperProps)
    {

        const [Quote,SetQuote] = useState<Quote_with_Author|undefined>(undefined)
       // const fetchedData:ResultType = useGetQuote('getQuote')
        const title = "Latest quote of last author"        

        useEffect(() => {
            console.log("useEffect fetchedData",fetchedData)
           // console.log("useEffect refreshResult",refreshResult)

        const manageResult = (fetchedData:ResultGetQuoteType) => {

            const [dataQuote,dataOwner,dataTimestamp] = fetchedData 
            const QuoteData : Quote_with_Author = {
                'myQuote':dataQuote,
                'owner': dataOwner,
                'timestamp':dataTimestamp
            }
            // updating current Quote
            SetQuote(QuoteData)
            // current Quote was updated
            SetRefreshResult(false)
        }    

        if(refreshResult)
        {
            // the smart contract returned data
            if(fetchedData != undefined) 
            //if (fetchedData is ResultGetQuoteType)
            {
                manageResult(fetchedData as ResultGetQuoteType)
            }
        }

        },[fetchedData,SetQuote,SetRefreshResult])
  
           
            return(
                Quote != undefined &&
                <DisplayCurrentQuote title={title} Quote={Quote} SetDisplayQuote={SetDisplayResult}/>
              
            )

    }
