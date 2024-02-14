import Button_with_hover from "../style/Style"
import GetCurrentQuote from "./GetCurrentQuote"
import { Suspense,useState } from "react"
import GetQuote from "./GetQuote"

interface GetMostRecentQuoteProps{
    quoteDetails:Quote_with_Author | undefined,
    showMostRecentQuote:boolean, 
    disable:boolean,
    SetShowMostRecentQuote: (flag: boolean) => void
}
/**
 *  Display a quote fetched
 * 
 * @param quote last quote of the last new author 
 * @param title title of the section
 * @returns 
 */
export default function GetMostRecentQuote({quoteDetails,showMostRecentQuote, disable=true,SetShowMostRecentQuote}:GetMostRecentQuoteProps)
{


    //const [activateReadQuote,SetActivateReadQuote] = useState(true)
   // console.log("GetMostRecentQuote",quoteDetails,quoteDetails.length);
    

    function handleGetMostRecentQuote()
    {
        console.log('handleGetMostRecentQuote');
        SetShowMostRecentQuote(true)

    }

        return(
        <div>
            <Button_with_hover 
            disable={disable} // disable button if smart contract is not avaialable
            text={"Read most recent quote on Blockchain"} 
            onClick={handleGetMostRecentQuote}/>
            <Suspense fallback={ // display spinner until component is loaded
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            >
                
              {

                quoteDetails != undefined && Object.keys(quoteDetails).length > 0 && // the last quote was fetched
                showMostRecentQuote && 
                <>
                    <GetCurrentQuote quote={quoteDetails} title={"Most Recent Quote"} SetActivateReadQuote={SetShowMostRecentQuote}/>
                
                </>
                }  
            </Suspense>
        </div>
        )
}