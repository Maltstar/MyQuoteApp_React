import GetQuote from "./GetQuote"; 
import { useState } from "react";
import { Small_Button_with_hover } from "./Style";
    
    
    export default function ListQuotes({quoteslist, // quotes fetched on smart contract
                                        title,
                                        SetActivateOwnerSetByUser=null}) // button to remove a quote individually
    {

        console.log('ListQuotes: quotes',quoteslist); 
        // flag to indicate that the current has been read and is ready to be displayed
        // default true all authors are displayed
        const [activateAuthor,SetActivateAuthor] = useState(true)
        console.log('activateAuthor',activateAuthor); 
        
        //quotes.map((quote_details) => {console.log(quote_details);   })
        // const quote_details_start = quotes[0]
        // console.log('GetAllAQuotes: quote_details_start',quote_details_start); 
       // const title = 'Author: ' + quote_details_start.author;

       const handleClick = () =>
       {
        // default
        // clear author will all his quotes
        SetActivateAuthor(false);

        // clear ListQuotes from parent
        // useful for the case read quote from author
        if(SetActivateOwnerSetByUser!=null)
        {
            SetActivateOwnerSetByUser(false)
        }
        
       }

            
 
            return(
                activateAuthor && <div >
                {/* <h4 className="quote_title">All Quotes</h4> */}
                <h5 className="white">{title}</h5>
                {/* extract each object {author, quotes[]}*/

                   quoteslist.map((single_quote,i) =>   {
                        console.log('single_quote',single_quote);
                        const anothercopy = Object.values(single_quote)
                        const title = `quote ${i+1}`
                        console.log('anothercopy',anothercopy);
                       // return  activateAuthor && <GetQuote key={i} quote={single_quote} title={title} />
                        return  <GetQuote key={i} quote={single_quote} title={title} />
                        //return activateReadQuote && <GetQuote key={i} quote={single_quote} title={title} SetActivateReadQuote={SetActivateReadQuote}/>
                        //return <GetQuote key={i+10} quote={single_quote} title={title} SetActivateReadQuote={SetActivateReadQuote}/>
                    })

                }
                {/* display the button for the active author*/}
                {/* { activateAuthor /* display the button for the active author*/ }
                  {<Small_Button_with_hover onClick={handleClick} text={"clear author"}/> }

                </div>

            )
    }