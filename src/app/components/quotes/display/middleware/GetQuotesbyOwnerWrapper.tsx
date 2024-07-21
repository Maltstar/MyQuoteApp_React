//'use client'


import { useEffect, useState } from "react";
import {CommonProps, CommonWithHookProps} from "./type"
import DisplayAuthors from "../lowlevel/DisplayAuthors";
import AlertWarning from "./AlertWarning";
import { AlertWarningProps } from "./AlertWarning";
import ListQuotes from "../lowlevel/ListQuotes";
import { useSmartContractFunctionRead } from "@/app/components/hooks/SmartContractHooks";
import { check_input_author, default_bytes20 } from "@/lib/utils";
import {SingleValue} from 'react-select';
import Select from 'react-select';


interface SelectOwnerListProps{
    SetOwnerSetByUser: (owner:string) => void,
    SetRefreshResultWrapper:(refresh:boolean) => void,
    SetDisplayResult:(display:boolean) => void,
    disable:boolean
    //SetActivateOwnerSetByUserFromList:(flag: boolean) => void,
   // disable: boolean
}

export function SelectOwnerList({...rest}:SelectOwnerListProps)
{
    type option = {
        label:string,
        value:string
    }

    const apiName:FunctionNameSmartContract = "getAllAuthors"
    const fetchedAuthors = useSmartContractFunctionRead(apiName) as ResultGetAllAuthorsType

   // Dynamically create select list
    let options: option[] = [];
    if(fetchedAuthors != undefined)
    {
        fetchedAuthors.map((author,i) =>
        options.push({ label: `Author ${i+1}: ${author}`, value: author}),
        );
    }

    const handleChange = (option:SingleValue<option>) =>
        {
            //e.preventDefault()
            if(option!=null)
            {
                console.log(option.value);
                //setAuthor(option)
                rest.SetOwnerSetByUser(option.value)
                // wrapper should be updated with quotes from new selected author
                rest.SetRefreshResultWrapper(true)
                //
                rest.SetDisplayResult(true)
            }
    
           // SetShowOwnerSetByUserFromList(true)
        
        }

    return( 
        <>
            <h5 className="button_color"> Or <br></br>choose an author from the list to read his quotes</h5>
            <Select isDisabled={rest.disable} id="select" instanceId="select" options={options} onChange={(option) => handleChange(option)} />
                
        </>
        )
}

export interface GetQuotesbyOwnerInputCheckedProps extends CommonWithHookProps{
    owner:Author
    }

    /**
 * Display the last quote of the last new author
 * 
 * @param quote last quote of the last new author 
 * @param title title of the section
 * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
 * @returns 
 */
function GetQuotesbyOwnerInputChecked({owner,SetDisplayResult,refreshResult,SetRefreshResult}:GetQuotesbyOwnerInputCheckedProps)
{

    const [quotes,SetQuotes] = useState<QuoteAuthorList|undefined>(undefined)
    const apiName:FunctionNameSmartContract = "getQuotesbyOwner"
    // console.log('OwnerSetByUser before checkAuthorInput:',OwnerSetByUser);
    // console.log('OwnerSetByUser:',OwnerSetByUser);

    const fetchedData = useSmartContractFunctionRead(apiName,owner as Address)

    
    // const fetchedData:ResultType = useGetQuote('getQuote')
    
    


    useEffect(() => {
        console.log("useEffect fetchedData",fetchedData)
        // console.log("useEffect refreshResult",refreshResult)

    const manageResult = (fetchedData:ResultGetQuotebyOwner) => {

        const result  = fetchedData 
        // construct an array of Quote from the array of quotes fetched as result

        const quotes_fetched:Quote[] = []

        result.map((quote_details_fetched) => {
            // const quote_details:Quote = {timestamp :quote_details_fetched[0],myQuote:quote_details_fetched[1]}
            quotes_fetched.push(quote_details_fetched)
        })

        const quote_and_auhtor:QuoteAuthorList =
        {
            quotes:quotes_fetched,
            author: owner
        }
        // updating current Quote
        SetQuotes(quote_and_auhtor)
        
    }    

    if(refreshResult)
    {
        
        // the smart contract returned data
        if(fetchedData != undefined) 
        //if (fetchedData is ResultGetQuoteType)
        {
            manageResult(fetchedData as ResultGetQuotebyOwner)
            SetRefreshResult(false)
        }
    }

    },[refreshResult,fetchedData,SetQuotes])


    
    

        
        return(
            quotes != undefined &&
            <ListQuotes title={`Author ${quotes.author}`}  quoteslist={quotes.quotes} SetActivateOwnerSetByUser={SetDisplayResult}/>
            
        )

}


interface GetQuotesbyOwnerWrapperProps extends CommonWithHookProps{
    list?:boolean
    disable?:boolean,
    }
    
export default function GetQuotesbyOwnerWrapper({refreshResult,SetRefreshResult,SetDisplayResult,list=false, disable=false}:GetQuotesbyOwnerWrapperProps)
{

        // common to QuotesbyOwner from an input and from a list
        const [ownerSetByUser,SetOwnerSetByUser] = useState<Author>(default_bytes20)
        const [refreshResultWrapper,SetRefreshResultWrapper] = useState(false)

        // QuotesbyOwner from an input
        const [emptyInput,setEmptyInput] = useState(false);
        const [errorInput,setErrorInput] = useState(false);
        const [showAlert, setshowAlert] = useState(false);

        // QuotesbyOwner from a list
        const [displayResutlOwnerList,SetDisplayResutlOwnerList] = useState(false)

        const SelectListOwnerProps:SelectOwnerListProps =
        {
            SetOwnerSetByUser:SetOwnerSetByUser,
            SetRefreshResultWrapper:SetRefreshResultWrapper,
            SetDisplayResult:SetDisplayResutlOwnerList,
            disable:disable
        }

        

        // QuotesbyOwner from an input

        const getAuthorInput = () =>{

            const author_input = document.getElementById("author_input") as HTMLInputElement | null;
 


            if(author_input != null)
            {

                // the user typed something
                if(author_input.value.length != 0)
                {
                    // the input is right formated
                    if(check_input_author(author_input.value))
                    {
                        console.log('getAuthorInput author_input',author_input.value);

                        console.log("value",author_input.value,);
                        // memorizing author set by user
                        SetOwnerSetByUser(author_input.value);
                        // wrapper should be updated with quotes from new selected author
                        SetRefreshResultWrapper(true)
                        setErrorInput(false)
                        //setEmptyInput(false);
                        //return author_input.value as Address
                    }
                    else
                    {
                        // memorizing author set by user
                        // call the smart contract with a default 20 bytes since they are no record for a bad formated input
                        SetOwnerSetByUser(default_bytes20);
                        // wrapper should not be updated
                        SetRefreshResultWrapper(false)
                        // signal an erroneous input
                        setErrorInput(true)
                    }

                    setEmptyInput(false);

                }
                else // input empty
                {
                    // signal an empty input but not an erroneous input
                    setEmptyInput(true);
                    setErrorInput(false);
                    // trigger the alert for an empty input
                    setshowAlert(true)
                    // wrapper should not be updated since the alert is displayed instead
                    SetRefreshResultWrapper(false)
                    
                    //return default_bytes20
                }
            }
        
        }


        useEffect(() =>
        {
            // Author is typed
            if(refreshResult)
            {
                // Author is typed as an input
                // update OwnerSetByUser
                getAuthorInput()

                // author is chosen from a list 

                // current Quote was updated
                SetRefreshResult(false)
                
            }

            


        },[refreshResult,SetRefreshResult])

        const GetQuotesbyOwnerInputProps:GetQuotesbyOwnerInputCheckedProps =
        {
            owner:ownerSetByUser,
            refreshResult:refreshResultWrapper,
            SetDisplayResult:SetDisplayResult,
            SetRefreshResult:SetRefreshResultWrapper
        }

        const GetQuotesbyOwnerListProps:GetQuotesbyOwnerInputCheckedProps =
        {
            owner:ownerSetByUser,
            refreshResult:refreshResultWrapper,
            SetDisplayResult:SetDisplayResutlOwnerList,
            SetRefreshResult:SetRefreshResultWrapper
        }

        const AlertWarnProps : Omit<AlertWarningProps,'type'> = 
        {
            show:showAlert,
            setShow:setshowAlert
        }
    
        return(

            !list ? // author is typed as input
            (
            emptyInput ? /* The user input is empty className=fade show style={ {width:"50%",margin:"auto"}} */  
            <>
                <AlertWarning {...AlertWarnProps } type="empty_input"/>
                
            </>
            :/* The user input is incorrectly formated or is not a valid author address*/  
            errorInput ? 
            <>
            <AlertWarning {...AlertWarnProps } type="error_input"/>
            </>
            
            : /* The user entered a valid author*/
            <GetQuotesbyOwnerInputChecked {...GetQuotesbyOwnerInputProps}/>)

            : // author is chosen from a list
            
            <>
                <SelectOwnerList {...SelectListOwnerProps}/>
                {displayResutlOwnerList &&
                <GetQuotesbyOwnerInputChecked {...GetQuotesbyOwnerListProps}/>}
            </>
            
            

            

        )
}