import {DisableProps} from  '@/components/quotes/display/middleware/type';
import Functions from "./Functions";

export default function GetAllQuotes({disable}:DisableProps)
{
    const functionName = "getAllQuotes"
    

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}