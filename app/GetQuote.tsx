import { useState } from "react";
import {Small_Button_with_hover} from './Style'
import Header from "./Header";

interface GetQuoteProps{
    quote:Quote,
    title:string,
    changeColor?:boolean
}
    /**
     *  Display a quote fetched
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @returns 
     */
    export default function GetQuote({quote,title,changeColor=false}:GetQuoteProps)
    {

        //const copy = Object.values(quote)

        console.log('GetQuote: quote',quote);
        console.log('GetQuote: quote',typeof(quote));

       const [activateReadQuote,SetActivateReadQuote] = useState(true)

        function convert_timestamp_to_date(timestamp:BigInt)
        {
            //return new Date(timestamp*1000).toUTCString();
            console.log('convert_timestamp_to_date',timestamp.toString());
            // convert timestamp BigInt to string which is in seconds unit
            // convert the string to a number with the millisecond unit and multiply by 1000 for having the right unit in seconds
            //const writtingDate = new Date(Number(timestamp.toString())*1000)
            const writtingDate = new Date(Number(timestamp)*1000)
            console.log('writtingDate',writtingDate);
            // convert the date into UTC format
            
            return writtingDate.toUTCString();
           // return new Date(timestamp.toString()).toUTCString();
           // return new Date(timestamp.toString()*1000).toUTCString();
        }
        
           

            return( activateReadQuote &&
                <div className="result">
                    <article>
                       {changeColor ? <h5 className="quote_title">{title}</h5> 
                       : <h5 className="section_title">{title}</h5> }
                        <ul>
                            <li>
                                 {/* <span className="quote">"{quote.myQuote}"</span> */}
                                 <Header>"{quote.myQuote}"</Header>

                            </li>

                            <li className='info'>
                                written on: {convert_timestamp_to_date(quote.timestamp)}
                            </li>
                        </ul>
                        <Small_Button_with_hover onClick={SetActivateReadQuote} text={"clear quote"}/>
                    </article>


                </div>
            )

    }
    
 