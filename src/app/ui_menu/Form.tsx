 'use client'


// doc https://docs.walletconnect.com/web3modal/react/hooks#useweb3modalstate
import { useState, useEffect } from 'react';
import { config } from '@/config/index'

import { useAccount } from 'wagmi'
import {GetCurrentQuote,GetAllAuthors,GetQuotesbyOwner, GetQuotesbyOwnerList, GetAllQuotes, GetMostRecentQuote, SetQuote} from '../components/quotes/display/highlevel/FunctionsWrapper';

//const GetQuoteButton = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/button/GetQuoteButton'), "GetQuoteButton"));


export default function Form()
{
    
    // fetch the connection status of modal connector
    const { status } = useAccount({
        config, 
      }) 

    const [ActivateForm,SetActivateForm] = useState(false)

    useEffect( ()=> {
        
        console.log('status connector',status);
        
        switch(status)
        {
            
            case 'connected':
                // enable buttons on the form
                SetActivateForm(true)
                break;
           
            case 'disconnected':
                 // disable buttons on the form
                SetActivateForm(false)
                break;
            default: // connecting or reconnecting
                break;
        }
        
    },[status,SetActivateForm])
    

    return(
        <>
                <GetMostRecentQuote disable={!ActivateForm}/>
                <GetCurrentQuote disable={!ActivateForm}/>
                <GetAllQuotes disable={!ActivateForm}/>
                <GetAllAuthors disable={!ActivateForm}/>
                <GetQuotesbyOwner disable={!ActivateForm}/>
                <GetQuotesbyOwnerList disable={!ActivateForm}/>
                <SetQuote disable={!ActivateForm}/>
                
        </>

    )


}