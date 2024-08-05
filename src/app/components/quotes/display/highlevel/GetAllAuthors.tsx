import {DisableProps} from  '@/components/quotes/display/middleware/type';
import Functions from "./Functions";


export default function GetAllAuthors({disable}:DisableProps)
{
    const functionName = "getAllAuthors"
    

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}