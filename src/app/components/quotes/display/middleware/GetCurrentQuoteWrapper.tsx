
import { useEffect, useState } from "react";
import DisplayCurrentQuote from "../lowlevel/DisplayCurrentQuote";
import {CommonWithHookProps} from "./type"
import { useSmartContractFunctionRead } from "@/app/components/hooks/SmartContractHooks";


export interface GetCurrentQuoteWrapperProps extends CommonWithHookProps{
}

export default function GetCurrentQuoteWrapper({refreshResult,SetRefreshResult,SetDisplayResult}:GetCurrentQuoteWrapperProps)
{

    const [Quote,SetQuote] = useState<Quote_with_Author|undefined>(undefined)
    const apiName:FunctionNameSmartContract = "getQuote"
    const fetchedData = useSmartContractFunctionRead(apiName) as ResultGetQuoteType

    // title of the section
    const title = "Latest quote of last author"        

    useEffect(() => {
        //console.log("useEffect fetchedData",fetchedData)

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
