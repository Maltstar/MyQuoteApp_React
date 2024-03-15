 "use client"
 
 import Button_with_hover from '@/components/style/Style'
 import { Suspense, useState } from 'react';
import GetCurrentQuoteWithHook from '@/components/quotes/display_quotes/GetCurrentQuoteWithHook';

 
 export default function GetQuoteButton()
 {

    const [DisplayQuote,SetDisplayQuote] =  useState(false)
    const [RefreshQuote,SetRefreshQuote] =  useState(false)
    const handleGetQuote = () => {
        SetDisplayQuote(true)
        SetRefreshQuote(true)
        console.log('DisplayQuote',DisplayQuote);
        console.log('RefreshQuote',RefreshQuote);
    }

    
    
 
    return ( 
    <>
        {/* api GetQuote  */}
        <Button_with_hover 
        disable={false} // disable button if smart contract is not avaialable
        text={"Read latest quote of last author on Blockchain"} 
        onClick={handleGetQuote}/>
        <Suspense fallback={ // display spinner until component is loaded
        <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>}
        >
            {/* { DisplayQuote && <GetCurrentQuoteWrapper/>} */}
            {/* { DisplayQuote && <GetCurrentQuoteWithHookWrapper RefreshQuote={RefreshQuote} SetRefreshQuote={SetRefreshQuote}/>} */}
            { DisplayQuote && <GetCurrentQuoteWithHook RefreshQuote={RefreshQuote} SetRefreshQuote={SetRefreshQuote}/>}
        </Suspense>
    </>
    )   


}