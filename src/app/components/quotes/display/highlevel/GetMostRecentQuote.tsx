import {DisableProps} from  '@/components/quotes/display/middleware/type';
import Functions from "./Functions";


export default function GetMostRecentQuote ({disable}:DisableProps)
{
    const functionName = "getMostRecentQuote"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}