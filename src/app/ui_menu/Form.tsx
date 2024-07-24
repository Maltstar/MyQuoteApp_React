 'use client'


// doc https://docs.walletconnect.com/web3modal/react/hooks#useweb3modalstate
import { useState,lazy, useEffect } from 'react';
import {lazyRetry} from '@/lib/utils';
import { config, projectId } from '@/config/index'

import { useAccount } from 'wagmi'


import { createWeb3Modal, useWeb3ModalEvents } from '@web3modal/wagmi/react'
import {GetCurrentQuote,GetAllAuthors,GetQuotesbyOwner, GetQuotesbyOwnerList, GetAllQuotes, GetMostRecentQuote} from '../components/quotes/display/highlevel/GetFunctionsWrapper';

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
                
        </>

    )


}