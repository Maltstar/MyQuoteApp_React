import GetQuote from "./GetQuote"; 
import { useState } from "react";
import { Small_Button_with_hover } from "./Style";
    
    
    export default function ListQuotes({quoteslist, // quotes fetched on smart contract
                                        title
                                        }) // button to remove a quote individually
    {

        console.log('ListQuotes: quotes',quoteslist); 
        // flag to indicate that the current has been read and is ready to be displayed
        // default true all authors are displayed
        const [activateAuthor,SetActivateAuthor] = useState(true)
        // use to count the number of remaining quotes, once it reaches 0, removing the clear author button
        const [numberQuotes,SetNumberQuotes] = useState(quoteslist.length)

        //quotes.map((quote_details) => {console.log(quote_details);   })
        // const quote_details_start = quotes[0]
        // console.log('GetAllAQuotes: quote_details_start',quote_details_start); 
       // const title = 'Author: ' + quote_details_start.author;

            
 
            return(
                <>
                {/* <h4 className="quote_title">All Quotes</h4> */}
                {/* extract each object {author, quotes[]}*/

                   quoteslist.map((single_quote,i) =>   {
                        console.log('single_quote',single_quote);
                        const anothercopy = Object.values(single_quote)
                        console.log('anothercopy',anothercopy);
                        return  activateAuthor && <GetQuote key={i} quote={single_quote} title={title} SetNumberQuotes={SetNumberQuotes}/>
                        //return activateReadQuote && <GetQuote key={i} quote={single_quote} title={title} SetActivateReadQuote={SetActivateReadQuote}/>
                        //return <GetQuote key={i+10} quote={single_quote} title={title} SetActivateReadQuote={SetActivateReadQuote}/>
                    })

                }
                {/* display the button for the active author*/}
                { activateAuthor /* display the button for the active author*/
                  && (numberQuotes > 0)
                  && <Small_Button_with_hover onClick={SetActivateAuthor} text={"clear author"}/> }

                </>

            )
    }