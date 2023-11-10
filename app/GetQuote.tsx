import { useState } from "react";
import {Small_Button_with_hover} from './Style'

    //export default function GetQuote({quote,title, SetActivateReadQuote})
    export default function GetQuote({quote,title})
    {

        //const copy = Object.values(quote)

        console.log('GetQuote: quote',quote);
        console.log('GetQuote: quote',typeof(quote));
        //console.log('GetQuote: copy',copy);
       // console.log('GetQuote: quote.currentQuote',quote.myQuote);
       // console.log('GetQuote: quote.timestamp',quote.timestamp);
       const [activateReadQuote,SetActivateReadQuote] = useState(true)

        function convert_timestamp_to_date(timestamp)
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
        
           

            return( activateReadQuote &&
                <div className="result">
                    <article>
                        <h4 className="quote_title">{title}</h4>
                        <ul>
                            <li>
                                 "{quote.myQuote}"
                            </li>

                            <li>
                                written on: {convert_timestamp_to_date(quote.timestamp)}
                            </li>
                        </ul>
                        <Small_Button_with_hover onClick={SetActivateReadQuote} text={"clear quote"}/>
                    </article>


                </div>
            )

    }
    
 