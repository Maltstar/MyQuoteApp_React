
import { useEffect, useState } from "react";
import {CommonWithHookProps} from "./type"
import DisplayAuthors from "../lowlevel/DisplayAuthors";
import { useSmartContractFunctionRead } from "@/app/components/hooks/SmartContractHooks";


export interface GetAllQuotesAuthorProps extends CommonWithHookProps{
    owner:string
    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    export default function GetAllQuotesAuthor({refreshResult,SetRefreshResult,SetDisplayResult,owner}:GetAllQuotesAuthorProps)
    {

        // const [AllQuotes,SetAllQuotes] = useState<{author:string,quotes:Array<string>}|undefined>(undefined)
        // const apiName:FunctionNameSmartContract = "getQuotesbyOwner"
        // // console.log('OwnerSetByUser before checkAuthorInput:',OwnerSetByUser);
        // // console.log('OwnerSetByUser:',OwnerSetByUser);
    
        // const fetchedData = useSmartContractFunctionRead(apiName,owner as Address)


        // const title = "List of all authors"        

        // useEffect(() => {
        //     console.log("useEffect fetchedData",fetchedData)
        //    // console.log("useEffect refreshResult",refreshResult)

        // const manageResult = (fetchedData:ResultGetAllAuthorsType) => {

        //     const result :string[] = fetchedData 
        //     // updating current Quotes
        //     SetAllQuotes({'author':owner,quotes:result})
        //     // current Quote was updated
        //     SetRefreshResult(false)
        // }    

        // if(refreshResult)
        // {
        //     // the smart contract returned data
        //     if(fetchedData != undefined) 
        //     {
        //         manageResult(fetchedData as ResultGetAllAuthorsType)
        //     }
        // }

        // },[fetchedData,SetAllQuotes,SetRefreshResult])
  
           
        //     return(
        //         AllQuotes != undefined &&
        //         <ListQuotes title={`Author ${AllQuotes.author}`}  quoteslist={AllQuotes.quotes} SetActivateOwnerSetByUser={SetDisplayResult}/>
              
        //     )
        return

    }
