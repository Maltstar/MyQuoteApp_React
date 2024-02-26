'use client'


import { useState, lazy, Suspense } from 'react';

import GetQuoteByOwner from '../display_quotes/GetQuoteByOwner'
import WriteQuote from '../write_quote/WriteQuote'
import Button_with_hover from '../style/Style';

import {lazyRetry} from '../../lib/utils';
import GetMostRecentQuote from '../display_quotes/GetMostRecentQuote';


/* for better performance lazy loading of components*/
 const GetCurrentQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '../display_quotes/GetCurrentQuote'), "GetCurrentQuote"));
 const GetAllQuotes = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllQuotes" */ '../display_quotes/GetAllQuotes'), "GetAllQuotes"));
 const GetAllAuthors = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllAuthors" */ '../display_authors/GetAllAuthors'), "GetAllAuthors"));
 //const GetMostRecentQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetMostRecentQuote" */ './GetMostRecentQuote'), "GetMostRecentQuote"));
 const GetQuoteByOwnerList = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetQuoteByOwnerList" */ '../display_quotes/GetQuoteByOwnerList'), "GetQuoteByOwnerList"));


interface FormProps{
    // ########### api GetQuote parameters ################ //
    quote:Quote_with_Author|undefined, //last quote
    activateReadQuote:boolean, // bool indicate that last quote has been fetched and stored
    SetShowCurrentQuote:(flag :boolean) => void, // bool set user flag in Form to trigger a call to getQuote api from App
    SetActivateReadQuote:(flag :boolean) => void, // reset fetch flag once the quote has been displayed and the user request to clear the quote

    // ########### api GetMostRecentQuote parameters ################ //
    mostRecentQuote:Quote_with_Author|undefined, 
    showMostRecentQuote:boolean,
    SetShowMostRecentQuote:(flag :boolean) => void, // trigger fetch of the most recent quote


    // ########### api GetAllAuthors parameters ################ //
    authors:Authors|undefined, // list of all authors
    activateAllAuthors:boolean, // indicate all authors have been fetched and stored
    SetShowAllAuthors:(flag :boolean) => void, // set user flag in Form to trigger a call to GetAllAuthors api from App
    SetActivateAllAuthors:(flag :boolean) => void,  // reset fetch flag once all authors have been displayed and the user request to clear all authors

    // ########### api GetAllQuotes parameters ################ //
    quotes:(QuoteAuthorList | undefined)[], // list of all quotes
    activateAllQuotes:boolean, // indicate all quotes have been fetched and stored
    SetShowAllQuotes:(flag :boolean) => void, // set user flag in Form to trigger a call to GetAllQuotes api from App
    SetActivateAllQuotes:(flag :boolean) => void, // reset fetch flag once all quotes have been displayed and the user request to clear all quotes

    // ########### api GetQuotesByOwner parameters ################ //
    quotesOwnerSetByUser:QuoteAuthorList | undefined, // author/owner set by user
    activateOwnerSetByUser:boolean, // indicate all quotes for the author have been fetched and stored
    SetOwnerSetByUser:(author :string) => void, // memorize the author set by the user in App
    SetShowOwnerSetByUser:(flag :boolean) => void, // set user flag in Form to trigger a call to GetQuotesByOwner api from App
    SetActivateOwnerSetByUser:(flag :boolean) => void,// reset fetch flag once all quotes for the author have been displayed and the user request to clear all quotes

    // ########### api GetQuotesByOwnerList parameters ################ //
    activateAllAuthorsList:boolean,
    activateOwnerSetByUserFromList:boolean,
    SetActivateOwnerSetByUserFromList:(flag :boolean) => void,
    quotesOwnerSetByUserFromList:QuoteAuthorList | undefined,
    SetOwnerSetByUserFromList:(author :string) => void,


    // ########### api WriteQuote ################ //
    SetUserQuote:(quote :string) => void,
    userAuthor:string | undefined,



    // common
    contractAvailable:boolean //inform the availability of the contract

}
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

        
    
    }: FormProps) {

    const [showGetQuote,SetShowGetQuote] = useState(false)
    const [isHover, setIsHover] = useState(false);

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
    text={"Read latest quote of last author on Blockchain"} 
    onClick={handleGetQuote}/>
    <Suspense fallback={ // display spinner until component is loaded
    <div className="spinner-border text-warning" role="status">
    <span className="visually-hidden">Loading...</span>
    </div>}
    >
        {activateReadQuote && <GetCurrentQuote quote={quote} title="Latest quote of last author" SetActivateReadQuote={SetActivateReadQuote}/>}  
    </Suspense>


    {/* api GetAllQuotes*/ }
    <Button_with_hover 
    disable={!contractAvailable} // disable button if smart contract is not avaialable
    text={"Read all quotes"} 
    onClick={handleGetAllQuotes}/>
    <Suspense fallback={ // display spinner until component is loaded
    <div className="spinner-border text-warning" role="status">
    <span className="visually-hidden">Loading...</span>
    </div>}
    >
        {activateAllQuotes && <GetAllQuotes quotes={quotes} SetActivateAllQuotes={SetActivateAllQuotes} />} 
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


    {/* api GetQuoteByOwner */ }
    <div>
        <GetQuoteByOwner disable={!contractAvailable}
                        quotes={quotesOwnerSetByUser}
                        SetOwnerSetByUser={SetOwnerSetByUser}
                        activateOwnerSetByUser={activateOwnerSetByUser}
                        SetShowOwnerSetByUser={SetShowOwnerSetByUser}
                        SetActivateOwnerSetByUser={SetActivateOwnerSetByUser}/>

        {/* api GetQuoteByOwnerList */ }
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
    </div>    
        {/* api WriteQuote */ }
    
    <WriteQuote SetUserQuote={SetUserQuote}
                disable={!contractAvailable}
    />

        <div>

    </div> 

</div>
    )

    
  }