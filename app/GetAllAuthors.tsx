import Author from "./Author"; 
import {Small_Button_with_hover} from './Style'

    
    
    export default function GetAllAuthors({authors,SetActivateAllAuthors})
    {

        console.log('GetAllAuthors: authors',authors);        
           

            return(
                <>
                <h4 className="quote_title">Authors</h4>
                {authors.map((author,i) => 
                {
                    console.log(author,i);
                    
                   return <Author key={author} number={i+1} address={author}/>
                })}
                       
                {/* <button onClick={() => SetActivateAllAuthors(false)}>
                    clear authors
                </button> */}
                <Small_Button_with_hover text={"clear authors"} onClick={SetActivateAllAuthors} />
                </>

            )

    }
    
 