import Author from "./Author"; 
import {Small_Button_with_hover} from '../style/Style'

interface GetAllAuthorsProps{
    authors:Authors | undefined,
    SetActivateAllAuthors: (flag:boolean) => void
} 
    
    export default function GetAllAuthors({authors,SetActivateAllAuthors}:GetAllAuthorsProps)
    {

        console.log('GetAllAuthors: authors',authors);        
           

            return(
                <>
                <h4 className="section_title">Authors</h4>
                {
                authors != undefined &&
                authors.map((author,i) => 
                {
                    console.log(author,i);
                    
                   return <Author key={author} position={i+1} address={author}/>
                })}
                       
                {/* <button onClick={() => SetActivateAllAuthors(false)}>
                    clear authors
                </button> */}
                <Small_Button_with_hover text={"clear authors"} onClick={SetActivateAllAuthors} />
                </>

            )

    }
    
 