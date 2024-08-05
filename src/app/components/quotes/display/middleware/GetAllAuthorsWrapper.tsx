
import { useEffect, useState } from "react";
import {CommonWithHookProps} from "./type"
import DisplayAuthors from "../lowlevel/DisplayAuthors";
import { useSmartContractFunctionRead } from "@/app/components/hooks/SmartContractHooks";


export interface GetAllAuthorsWrapperProps extends CommonWithHookProps{
    }

export default function GetAllAuthorsWrapper({refreshResult,SetRefreshResult,SetDisplayResult}:GetAllAuthorsWrapperProps)
    {

        const [AllAuthors,SetAllAuthors] = useState<Authors|undefined>(undefined)
        const apiName:FunctionNameSmartContractRead = "getAllAuthors"
        const fetchedData = useSmartContractFunctionRead(apiName) as ResultGetAllAuthorsType

        const title = "List of all authors"        

        useEffect(() => {
            console.log("useEffect fetchedData",fetchedData)
           // console.log("useEffect refreshResult",refreshResult)

        const manageResult = (fetchedData:ResultGetAllAuthorsType) => {

            const result :string[] = fetchedData 
            // updating current Quote
            SetAllAuthors(result)
            // current Quote was updated
            SetRefreshResult(false)
        }    

        if(refreshResult)
        {
            // the smart contract returned data
            if(fetchedData != undefined) 
            //if (fetchedData is ResultGetQuoteType)
            {
                manageResult(fetchedData as ResultGetAllAuthorsType)
            }
        }

        },[fetchedData,SetAllAuthors,SetRefreshResult])
  
           
            return(
                AllAuthors != undefined && SetDisplayResult != null &&
                <DisplayAuthors title={title} authors={AllAuthors} SetDisplayAutors={SetDisplayResult}/>
              
            )

    }
