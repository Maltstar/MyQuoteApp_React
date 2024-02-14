import { Small_Button_with_hover } from "./Style";
import Header from "./Header";
    
    

    interface GetCurrentQuoteProps{
        quote: Quote_with_Author | undefined,
        title:string,
        SetActivateReadQuote: (flag: boolean) => void
    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    export default function GetCurrentQuote({quote,title, SetActivateReadQuote}:GetCurrentQuoteProps)
    {

        console.log('GetCurrentQuote: quote',quote);
        // console.log('GetQuote: quote.currentQuote',quote.myQuote);
        // console.log('GetQuote: quote.timestamp',quote.timestamp);

        function convert_timestamp_to_date(timestamp: BigInt)
        {
            //return new Date(timestamp*1000).toUTCString();
            console.log('convert_timestamp_to_date',timestamp.toString());
            // convert timestamp BigInt to string which is in seconds unit
            // convert the string to a number with the millisecond unit and multiply by 1000 for having the right unit in seconds
            const writtingDate = new Date(Number(timestamp.toString())*1000)
            console.log('writtingDate',writtingDate);
            // convert the date into UTC format
            
            return writtingDate.toUTCString();
           // return new Date(timestamp.toString()).toUTCString();
           // return new Date(timestamp.toString()*1000).toUTCString();
        }
        
           

            return(
                quote != undefined &&
                <div className="result">
                    <article>
                        <h4 className="quote_title">{title}</h4>
                        <ul>
                            <li>
                                <Header>"{quote.myQuote}"</Header>
                            </li>
                            <li className='info'>
                                Author: {quote.owner}
                            </li>
                            <li className='info'>
                                written on: {convert_timestamp_to_date(quote.timestamp)}
                            </li>
                        </ul>

                        <Small_Button_with_hover onClick={() => SetActivateReadQuote(false)} text={"clear quote"}/>
                    </article>


                </div>
            )

    }
    
 