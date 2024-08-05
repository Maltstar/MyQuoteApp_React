import Functions from "./Functions"
import {DisableProps} from  '@/components/quotes/display/middleware/type';


export default function GetCurrentQuote({disable}:DisableProps)
{
    const functionName = "getQuote"
    

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}
