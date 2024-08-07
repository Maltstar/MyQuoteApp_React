import Header from "@/lib/Header";
import {convert_timestamp_to_date} from "@/lib/utils"
import { Small_Button_with_hover } from "@/components/style/Style";
import FormatText from "../format/FormatText";




export interface DisplayCurrentQuoteProps{
    title:string,
    Quote:Quote_with_Author,
    SetDisplayQuote: ((flag: boolean) => void) | null
}

export default function DisplayCurrentQuote({title,Quote,SetDisplayQuote}:DisplayCurrentQuoteProps)
{
return(
    <div className="result">
        <article>
            <h4 className="quote_title">{title}</h4>
            <ul>
                <li>
                    {/* <Header>&#34;{Quote.myQuote}&#34;</Header> */}
                    <Header>
                            <FormatText text={Quote.myQuote}/>
                    </Header>
                </li>
                <li className='info'>
                    Author: {Quote.owner}
                </li>
                <li className='info_timestamp'>
                    written on: {convert_timestamp_to_date(Quote.timestamp)}
                </li>
            </ul>

            <Small_Button_with_hover onClick={() => {
                if(SetDisplayQuote != null)
                {
                    SetDisplayQuote(false)
                }
               }} 
               text={"clear quote"}/>
        </article>
    </div>
    )
}