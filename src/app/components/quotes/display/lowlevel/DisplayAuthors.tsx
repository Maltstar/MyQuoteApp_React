import Header from "@/lib/Header";
import Author from "./Author";
import { Small_Button_with_hover } from "@/app/components/style/Style";





export interface DisplayAuthorsProps{
    authors:Authors,
    title:string,
    SetDisplayAutors: (flag: boolean) => void
}

export default function DisplayAuthors({authors,title,SetDisplayAutors}:DisplayAuthorsProps)
{
return(
    <div className="result">
        <article>
            <h4 className="quote_title">{title}</h4>
            {authors.map((author,i) => 
                {
                    console.log(author,i);
                    
                   return <Author key={author} position={i+1} address={author}/>
                })}

            <Small_Button_with_hover onClick={() => SetDisplayAutors(false)} text={"clear authors"}/>

        </article>
    </div>
    )
}