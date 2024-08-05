import {DisableProps} from  '@/components/quotes/display/middleware/type';
import Functions from "./Functions";

export default function SetQuote ({disable}:DisableProps)
{
    const functionName = "setQuote"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}