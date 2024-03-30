//  "use client"
 
//  import Button_with_hover from '@/components/style/Style'
//  import { Suspense, useState,lazy } from 'react';
//  import {lazyRetry} from '@/lib/utils';
//  import { Generic } from '../generic/Generic';

// //import GetCurrentQuoteWithHook from '@/components/quotes/display_quotes/GetCurrentQuoteWithHook';

// const GetCurrentQuoteWithHook = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/app/components/quotes/display/middleware/GetCurrentQuoteWithHook'), "GetCurrentQuoteWithHook"));

// interface GetQuoteButtonProps{
//     disable:boolean,
// }
 
//  export default function GetQuoteButton({disable}:GetQuoteButtonProps)
//  {

//     // flag to enable/disable the display of a quote
//     const [DisplayQuote,SetDisplayQuote] =  useState(false)
//     // flag to indicate that a user request to display of a quote
//     const [RefreshQuote,SetRefreshQuote] =  useState(false)
// // 
//     const handleGetQuote = () => {
//         // enable the display of the quote
//         SetDisplayQuote(true)
//         // a user made a request to display the quote
//         SetRefreshQuote(true)
//         console.log('DisplayQuote',DisplayQuote);
//         console.log('RefreshQuote',RefreshQuote);
//     }

    
    
    
 
//     return ( 
//     <>
//         {/* <Generic as="Button_with_hover" >Hello World!</Generic>  */}
//         {/* api GetQuote  */}
//         <Button_with_hover 
//         disable={disable} // disable button if smart contract is not avaialable
//         text={"Read latest quote of last author on Blockchain"} 
//         onClick={handleGetQuote}/>
//         <Suspense fallback={ // display spinner until component is loaded
//         <div className="spinner-border text-warning" role="status">
//         <span className="visually-hidden">Loading...</span>
//         </div>}
//         >
//             { DisplayQuote && <GetCurrentQuoteWithHook refreshQuote={RefreshQuote} SetRefreshQuote={SetRefreshQuote} SetDisplayQuote={SetDisplayQuote} />}
//         </Suspense>
//     </>
//     )   


// }