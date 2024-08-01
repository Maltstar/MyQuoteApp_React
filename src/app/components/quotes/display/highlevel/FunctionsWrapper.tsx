import {DisableProps} from  '@/components/quotes/display/middleware/type';
import Functions from "./Functions";



/********************* Read Functions **********************/ 

export function GetAllAuthors({disable}:DisableProps)
{
    const functionName = "getAllAuthors"
    

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}


export function GetAllQuotes({disable}:DisableProps)
{
    const functionName = "getAllQuotes"
    

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}


export function GetCurrentQuote({disable}:DisableProps)
{
    const functionName = "getQuote"
    

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}



export function GetQuotesbyOwner ({disable}:DisableProps)
{
    const functionName = "getQuotesbyOwner"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}

export function GetQuotesbyOwnerList ({disable}:DisableProps)
{
    const functionName = "getQuotesbyOwnerList"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}

export function GetMostRecentQuote ({disable}:DisableProps)
{
    const functionName = "getMostRecentQuote"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}

/********************* Write Functions **********************/

export function SetQuote ({disable}:DisableProps)
{
    const functionName = "setQuote"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}

