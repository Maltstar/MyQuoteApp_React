import { useState } from "react";
import {convert_timestamp_to_date} from "@/lib/utils"

import {Small_Button_with_hover} from '@/components/style/Style'
import Header from "@/lib/Header";

interface DisplayQuoteProps{
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
    export default function DisplayQuote({quote,title,changeColor=false}:DisplayQuoteProps)
    {

       const [activateReadQuote,SetActivateReadQuote] = useState(true)


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

                            <li className='info_timestamp'>
                                written on: {convert_timestamp_to_date(quote.timestamp)}
                            </li>
                        </ul>
                        <Small_Button_with_hover onClick={SetActivateReadQuote} text={"clear quote"}/>
                    </article>


                </div>
            )

    }
    
 