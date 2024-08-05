import {DisableProps} from  '@/components/quotes/display/middleware/type';
import Functions from "./Functions";

export default  function GetQuotesbyOwnerList ({disable}:DisableProps)
{
    const functionName = "getQuotesbyOwnerList"

    return(
        <Functions disable={disable} functionName={functionName}/>
    )
}