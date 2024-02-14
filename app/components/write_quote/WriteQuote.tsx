import { useState } from "react";
import Button_with_hover from "../style/Style";

interface WriteQuoteProps{
    SetUserQuote: (quote:string) => void,
    disable: boolean
}

export default function WriteQuote({
    SetUserQuote,
    disable=false}: WriteQuoteProps)

{

    const [warningQuoteEmpty,SetWarningQuoteEmpty] = useState(false)
  

    const handleSubmit = () =>
    {
        const quote_input = document.getElementById("quote_input") as HTMLTextAreaElement | null;
        //const value = quote_input?.value;
        //console.log("handleSubmit",value);
        
        if(quote_input != null)
        {
            if(quote_input.value.length != 0)
            {
                SetWarningQuoteEmpty(false)
                SetUserQuote(quote_input.value);
            }
            else
            {
                SetWarningQuoteEmpty(true)
            }
        }

        
    }


    return (

        <div id="write_quote_menu">
            {/* <input id="quote_input" type="text" alt="text field to enter the author" placeholder="type your quote"/> rows="2" cols="60" */}
            <textarea 
             placeholder="enter your quote"
             style={
                {"height": "4rem",
                "width":"30%",
                "color":"white"
                }}
                
                id="quote_input" ></textarea>

            <Button_with_hover 
                disable={disable}
                v_align={true}
                onClick={handleSubmit}
                display="inline"
                text={"Write quote on blockchain"}
               // alt="button to write quote"
                //type="submit"
                value="Write quote on blockchain"/>  


            {warningQuoteEmpty && 
                <div className="alert alert-warning"  style={ {width:"50%",margin:"auto"}} >
                    Empty quote. <br></br>
                    Please enter at least 1 character for the quote. <br></br>
                </div>}
             
        </div>
 
      
        

        
   


    )
 

}