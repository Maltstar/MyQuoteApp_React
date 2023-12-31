'use client'


//import GetCurrentQuote from './GetCurrentQuote'
//import GetAllAuthors from './GetAllAuthors';
import { useState, lazy, Suspense } from 'react';
//import GetAllQuotes from './GetAllQuotes';
import GetQuoteByOwner from './GetQuoteByOwner'
import WriteQuote from './WriteQuote'
import Button_with_hover from './Style';
import {lazyRetry} from './utils'
import GetMostRecentQuote from './GetLatestQuote';
//import GetQuoteByOwnerList from './GetQuoteByOwnerList';

const GetCurrentQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ './GetCurrentQuote'), "GetCurrentQuote"));
const GetAllQuotes = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllQuotes" */ './GetAllQuotes'), "GetAllQuotes"));
const GetAllAuthors = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllAuthors" */ './GetAllAuthors'), "GetAllAuthors"));
const GetQuoteByOwnerList = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetQuoteByOwnerList" */ './GetQuoteByOwnerList'), "GetQuoteByOwnerList"));


//const GetCurrentQuote = lazy(() => import(/* webpackChunkName: "GetCurrentQuote" */ './GetCurrentQuote'));;

export default function Form(
    {
        // ########### api GetQuote parameters ################ //
        quote, //last quote
        activateReadQuote, // bool indicate that last quote has been fetched and stored
        SetShowCurrentQuote, // bool set user flag in Form to trigger a call to getQuote api from App
        SetActivateReadQuote, // reset fetch flag once the quote has been displayed and the user request to clear the quote

        // ########### api GetMostRecentQuote parameters ################ //
        mostRecentQuote, 
        SetShowMostRecentQuote, // trigger fetch of the most recent quote
        showMostRecentQuote,

        // ########### api GetAllAuthors parameters ################ //
        authors, // list of all authors
        activateAllAuthors, // indicate all authors have been fetched and stored
        SetShowAllAuthors, // set user flag in Form to trigger a call to GetAllAuthors api from App
        SetActivateAllAuthors,  // reset fetch flag once all authors have been displayed and the user request to clear all authors

        // ########### api GetAllQuotes parameters ################ //
        quotes, // list of all quotes
        activateAllQuotes, // indicate all quotes have been fetched and stored
        SetShowAllQuotes, // set user flag in Form to trigger a call to GetAllQuotes api from App
        SetActivateAllQuotes, // reset fetch flag once all quotes have been displayed and the user request to clear all quotes

        // ########### api GetQuotesByOwner parameters ################ //
        quotesOwnerSetByUser, // author/owner set by user
        activateOwnerSetByUser, // indicate all quotes for the author have been fetched and stored
        SetOwnerSetByUser, // memorize the author set by the user in App
        SetShowOwnerSetByUser, // set user flag in Form to trigger a call to GetQuotesByOwner api from App
        SetActivateOwnerSetByUser,// reset fetch flag once all quotes for the author have been displayed and the user request to clear all quotes

        // ########### api GetQuotesByOwnerList parameters ################ //
        //authors
        activateAllAuthorsList,
        activateOwnerSetByUserFromList,
        SetActivateOwnerSetByUserFromList,
        quotesOwnerSetByUserFromList,
        SetOwnerSetByUserFromList,


        // ########### api WriteQuote ################ //
        //authors
        SetUserQuote,
        userAuthor,



        // common
        contractAvailable //inform the availability of the contract

        
    
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


   
    return (
<div id="menu">




{/* api GetMostRecentQuote  */}
<GetMostRecentQuote 
    quoteDetails={mostRecentQuote}
    disable={!contractAvailable}
    SetShowMostRecentQuote={SetShowMostRecentQuote}
    showMostRecentQuote={showMostRecentQuote}
/>

{/* api GetQuote  */}
<Button_with_hover 
disable={!contractAvailable} // disable button if smart contract is not avaialable
text={"Read latest quote of latest author on Blockchain"} 
onClick={handleGetQuote}/>
<Suspense fallback={ // display spinner until component is loaded
<div className="spinner-border text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
>
    {activateReadQuote && <GetCurrentQuote quote={quote} title="Latest quote of new author" SetActivateReadQuote={SetActivateReadQuote}/>}  
</Suspense>


{/* api GetAllQuotes */}
<Button_with_hover 
disable={!contractAvailable} // disable button if smart contract is not avaialable
text={"Read all quotes"} 
onClick={handleGetAllQuotes}/>
<Suspense fallback={ // display spinner until component is loaded
<div className="spinner-border text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
>
    {activateAllQuotes && <GetAllQuotes quotes={quotes} SetActivateAllQuotes={SetActivateAllQuotes} SetActivateReadQuote={SetActivateReadQuote}/>} 
</Suspense>


{/* api GetAllAuthors */}
<Button_with_hover disable={!contractAvailable} text={"List all authors"} onClick={handleGetAllAuthors}/>
<Suspense fallback={ // display spinner until component is loaded
<div className="spinner-border text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
>
    {activateAllAuthors && <GetAllAuthors authors={authors} SetActivateAllAuthors={SetActivateAllAuthors}/>} 
</Suspense>


    {/* api GetQuoteByOwner */}
    <div>
    <GetQuoteByOwner disable={!contractAvailable}
                     quotes={quotesOwnerSetByUser}
                     SetOwnerSetByUser={SetOwnerSetByUser}
                     activateOwnerSetByUser={activateOwnerSetByUser}
                     SetShowOwnerSetByUser={SetShowOwnerSetByUser}
                     SetActivateOwnerSetByUser={SetActivateOwnerSetByUser}/>

    {/* api GetQuoteByOwnerList */}
    <Suspense fallback={ // display spinner until component is loaded
        <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>}
        >
            {activateAllAuthorsList && 
            <GetQuoteByOwnerList disable={!contractAvailable}
                                quotes={quotesOwnerSetByUserFromList}
                                authors={authors}
                                activateOwnerSetByUserFromList={activateOwnerSetByUserFromList}
                                SetActivateOwnerSetByUserFromList={SetActivateOwnerSetByUserFromList}
                                SetOwnerSetByUserFromList={SetOwnerSetByUserFromList}/>}
    </Suspense>
    
    {/* api WriteQuote */}
    </div>
    <WriteQuote SetUserQuote={SetUserQuote}
                disable={!contractAvailable}
    />

    <div>

    </div>

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