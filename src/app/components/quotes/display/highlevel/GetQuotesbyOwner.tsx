import Functions from "./Functions"
import {DisableProps} from  '@/components/quotes/display/middleware/type';


export default function GetQuotesbyOwner ({disable}:DisableProps)
{
    const functionName = "getQuotesbyOwner"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}