
import { useEffect, useState } from "react";
import DisplayCurrentQuote from "../lowlevel/DisplayCurrentQuote";
import {CommonWithHookProps} from "./type"
import DisplayAuthors from "../lowlevel/DisplayAuthors";


export interface GetAllAuthorsWrapperProps extends CommonWithHookProps{
    fetchedData:ResultGetAllAuthorsType, // the name of the smart contract function to call

    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    export default function GetAllAuthorsWrapper({refreshResult,fetchedData,SetRefreshResult,SetDisplayResult}:GetAllAuthorsWrapperProps)
    {

        const [AllAuthors,SetAllAuthors] = useState<Authors|undefined>(undefined)
       // const fetchedData:ResultType = useGetQuote('getQuote')
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
                AllAuthors != undefined &&
                <DisplayAuthors title={title} authors={AllAuthors} SetDisplayAutors={SetDisplayResult}/>
              
            )

    }
