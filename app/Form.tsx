'use client'

import GetQuote from './GetQuote'
import GetCurrentQuote from './GetCurrentQuote'
import GetAllAuthors from './GetAllAuthors';
import { useState } from 'react';
import GetAllQuotes from './GetAllQuotes';
import Button from 'react-bootstrap/Button';
import Button_with_hover from './Style';


export default function Form(
    {
        quote,activateReadQuote,SetShowCurrentQuote, SetActivateReadQuote, // api GetQuote parameters

        authors,activateAllAuthors,SetShowAllAuthors,SetActivateAllAuthors,// api GetAllAuthors parameters 

        quotes,activateAllQuotes, SetShowAllQuotes, SetActivateAllQuotes // api GetAllQuotes parameters 
    
    }) {

    const [showGetQuote,SetShowGetQuote] = useState(false)
    const [isHover, setIsHover] = useState(false);
    async function create(formData: FormData) {
    //  'use server'
   
      // mutate data
      // revalidate cache
    }

    function handleGetQuote()
    {
        console.log('handleGetQuote');
        SetShowCurrentQuote(true)

    }

    function handleGetAllAuthors()
    {
        console.log('handleGetAllAuthors');
        SetShowAllAuthors(true)
    }

    function handleGetAllQuotes()
    {
        console.log('handleGetAllQuotes');
        SetShowAllQuotes(true)
    }


    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };

     const colors = {
       "color-1" : "#0c09c7",
     "color-2" : "#8df308", 
     "color-3" : "#659de6", 
     "color-4" : "#343436", 
     "color-5" : "#498a23", 
     }
    const default_button_style = 
    {
        "font-size": "110%",
        "font-weight":"bold",
        "margin-top":"1%",
        "background":isHover ? colors["color-1" ] :'black',
        "color": isHover ? colors["color-2"] : colors["color-3"],
        "margin":"1%",
        // aligning
        "display":"block",
        "position": "'absolute', left: '50%', top: '50%'",
        "transform": 'translate(-50%, -50%)',
    };

   
    return (
<div id="menu">

{/* api GetQuote className="submit_read" */}

<Button_with_hover text={"Read current quote on Blockchain"} onClick={handleGetQuote}/>
{activateReadQuote && <GetCurrentQuote quote={quote} title="last quote" SetActivateReadQuote={SetActivateReadQuote}/>}  


{/* api GetAllAuthors */}
<Button_with_hover text={"List all authors"} onClick={handleGetAllAuthors}/>
{activateAllAuthors && <GetAllAuthors authors={authors} SetActivateAllAuthors={SetActivateAllAuthors}/>} 

{/* api GetAllQuotes */}
<Button_with_hover text={"List all quotes"} onClick={handleGetAllQuotes}/>
{activateAllQuotes && <GetAllQuotes quotes={quotes} SetActivateAllQuotes={SetActivateAllQuotes} SetActivateReadQuote={SetActivateReadQuote}/>} 

</div>
    )


    {/* <form id="quotesform">
    <div id="current_quote">
        <button className="submit_read" onClick={handleRead} >Read current quote on Blockchain <button/>
        <div id="result_read_current"className="result"></div>
    </div>
    <div id="all_quotes">
        <input id="read_all_quotes" className="submit_read" type="submit" value="Read all quotes"/>
        <div id="result_all_quotes"className="result"></div>
    </div>
    <div id="all_authors">
        <input id="read_all_authors" className="submit_read" type="submit" value="List all authors"/>
        <div id="result_all_authors"className="result"></div>
    </div>
    <div id="write">
        <textarea rows="4" cols="60" id="quote_input" name="user_quote"> </textarea>
        <input id="submit_write" alt="button to submit the quote" type="submit" value="Write quote on Blockchain"/>
    </div>
    <div id="quote_by_author">
        <input id="author_input" type="text" alt="text field to enter the author" placeholder="type the address of an author"/>
        <input id="read_quotes_from_author" className="submit_read" alt="button to submit the author" type="submit" value="Read quotes from author"/>
        <div id="result_quote_by_author" className="result" alt="quotes of the author with timestamps"></div>
    </div>

    </form>    */}

    
  }