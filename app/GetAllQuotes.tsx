import ListQuotes from './ListQuotes'
import { Small_Button_with_hover } from "./Style";

    
    
    export default function GetAllQuotes({quotes, // quotes fetched on smart contract
                                         SetActivateAllQuotes}) // button to display or remove all quotes
    {

        console.log('GetAllAQuotes: quotes',quotes); 
        console.log('GetAllAQuotes: typeof quotes',typeof(quotes));
        console.log('GetAllAQuotes: quotes[0]',quotes[0],quotes[1],quotes[2]); 
        
        const copy = Object.values(quotes)
        console.log('GetAllAQuotes', Object.values(quotes));
        //quotes.map((quote_details) => {console.log(quote_details);   })
        // const quote_details_start = quotes[0]
        // console.log('GetAllAQuotes: quote_details_start',quote_details_start); 
       // const title = 'Author: ' + quote_details_start.author;

            
 
            return(
                <>
                <h4 className="quote_title">All Quotes</h4>
                {/* extract each object {author, quotes[]}*/}

                {copy.map((quote_details,j) => 
                {
                    const title = `Author ${j+1}: ${quote_details.author} ` ;
                    console.log('Author',title);
                    return <ListQuotes quoteslist={quote_details.quotes} title={title}/>

                })
            }
                

                {/* {
                    for (const [author, quote_details] of quotes)
                    {

                    }
                } */}
                       
                <Small_Button_with_hover text={"clear all quotes"} onClick={SetActivateAllQuotes}/>
                </>

            )
    }