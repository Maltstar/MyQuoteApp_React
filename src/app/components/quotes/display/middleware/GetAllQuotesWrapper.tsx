
import { useEffect, useState } from "react";
import {CommonWithHookProps} from "./type"
import { useSmartContractFunctionRead } from "@/app/components/hooks/SmartContractHooks";
import { GetQuotesbyOwnerInputChecked, GetQuotesbyOwnerInputCheckedProps } from './GetQuotesbyOwnerWrapper';
import { Small_Button_with_hover } from "@/app/components/style/Style";


export interface GetAllQuotesWrapperProps extends CommonWithHookProps{
    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    export default function GetAllQuotesWrapper({refreshResult,SetRefreshResult,SetDisplayResult}:GetAllQuotesWrapperProps)
    {

        const [AllAuthors,SetAllAuthors] = useState<Authors|undefined>(undefined)
        const apiName:FunctionNameSmartContractRead = "getAllAuthors"
        const fetchedData = useSmartContractFunctionRead(apiName) as ResultGetAllAuthorsType

        const title = "List of all quotes"        

        useEffect(() => {
            console.log("GetAllQuotesWrapper useEffect fetchedData",fetchedData)
           // console.log("useEffect refreshResult",refreshResult)

        const manageResult = (fetchedData:ResultGetAllAuthorsType) => {

            const result :string[] = fetchedData 
            // updating current Quote
            SetAllAuthors(result)

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

       },[refreshResult,fetchedData,SetAllAuthors,SetRefreshResult])

       // close component from parent
       const handleClick = () => {
            
        if(SetDisplayResult != null)
            {
                SetDisplayResult(false)
            }
       }

       const GetQuotesbyOwnerInputProps:Omit<GetQuotesbyOwnerInputCheckedProps,'owner'> =
       {
           refreshResult:refreshResult,
           SetDisplayResult:null,
           SetRefreshResult:SetRefreshResult
        }
  
        
            return(
                

                AllAuthors != undefined && AllAuthors.length > 0 &&
                <div>
                    <h4 className="quote_title">{title}</h4>
                    {/* // iterates all authors and display their quotes */}
                    <AllQuotes authors={AllAuthors} {...GetQuotesbyOwnerInputProps}/>
                    <Small_Button_with_hover onClick={handleClick} text={"clear all quotes"}/> 
                </div>
            
               

            )

    }

   interface AllQuotesProps extends Omit<GetQuotesbyOwnerInputCheckedProps,'owner'> {
    authors: Authors
   }

function AllQuotes({authors,...rest}:AllQuotesProps) 
{


    console.log('AllQuotes authors', authors);
    
        // iterates all authors and display their quotes

        return(
            <div>
            
                {authors.map((author,i) => {
                    return(
                        <GetQuotesbyOwnerInputChecked key={i} rank={i+1} owner={author}  {...rest}/>
                    )
                })}
            </div>
        )
            




}
