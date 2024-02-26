import { useState } from "react";
import Button_with_hover from "../style/Style";
import TextArea from '../style/TextArea'

interface WriteQuoteProps{
    SetUserQuote: (quote:string) => void,
    disable: boolean
}

export default function WriteQuote(this: any, {
    SetUserQuote,
    disable=false}: WriteQuoteProps)

{

    const [warningQuoteEmpty,SetWarningQuoteEmpty] = useState(false)
  

    const handleSubmit = () =>
    {
        const quote_input = document.getElementById("quote_input") as HTMLTextAreaElement | null;
        
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
            {/* https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/*/}
            {/* <div className="grow-wrap">  */}
            <TextArea placeholder='enter your quote, e.g “But I know, somehow, that only when it is dark enough can you see the stars.” ― Martin Luther King, Jr.'/>
                

                {/* <textarea 
                placeholder="enter your quote, e.g “But I know, somehow, that only when it is dark enough can you see the stars.” ― Martin Luther King, Jr."
                style={
                    {"height": "4rem",
                    "width":"30%",
                    "color":"white"
                    }}
                    onChange={copy_value}
                    
                    id="quote_input">
                </textarea> */}
            {/* </div> */}

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