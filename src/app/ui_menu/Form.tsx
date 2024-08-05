 'use client'


// doc https://docs.walletconnect.com/web3modal/react/hooks#useweb3modalstate
import { useState, useEffect, lazy, ComponentType, LazyExoticComponent, Suspense } from 'react';
import { config } from '@/config/index'
import GetMostRecentQuote from '../components/quotes/display/highlevel/GetMostRecentQuote';
import { useAccount } from 'wagmi'
import { lazyRetry } from '@/lib/utils';

// declaring components for lazy loading

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetCurrentQuote  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetAllAuthors  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetQuotesbyOwner  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetQuotesbyOwnerList  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetAllQuotes  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
//let GetMostRecentQuote  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let SetQuote  :LazyExoticComponent<ComponentType<any>>|undefined = undefined



// const GetCurrentQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/display/highlevel/FunctionsWrapper'), "GetCurrentQuote"));


export default function Form()
{
    console.log('Form - GetCurrentQuote',GetCurrentQuote);

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


    useEffect(() =>{
            // lazy loading all component with lazyRetry to avoid chunk errors

            GetCurrentQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/display/highlevel/GetCurrentQuote'), "GetCurrentQuote"));
            GetAllAuthors = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllAuthors" */ '@/components/quotes/display/highlevel/GetAllAuthors'), "GetAllAuthors"));
            GetQuotesbyOwner = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetQuotesbyOwner" */ '@/components/quotes/display/highlevel/GetQuotesbyOwner'), "GetQuotesbyOwner"));
            GetQuotesbyOwnerList = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetQuotesbyOwnerList" */ '@/components/quotes/display/highlevel/GetQuotesbyOwnerList'), "GetQuotesbyOwnerList"));
            GetAllQuotes = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllQuotes" */ '@/components/quotes/display/highlevel/GetAllQuotes'), "GetAllQuotes"));
           // GetMostRecentQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllQuotes" */ '@/components/quotes/display/highlevel/GetMostRecentQuote'), "GetMostRecentQuote"));
            SetQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllQuotes" */ '@/components/quotes/display/highlevel/SetQuote'), "SetQuote"));
            
            
    },[])
    

    return(
        <>
                {/* display spinner while lazy loading component  */ }
               {/* <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { GetMostRecentQuote!= undefined && <GetMostRecentQuote disable={!ActivateForm}/>}
                </Suspense> */}
                <GetMostRecentQuote disable={!ActivateForm}/>

                <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { GetCurrentQuote != undefined && <GetCurrentQuote disable={!ActivateForm}/>}
                </Suspense>

                <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { GetAllQuotes != undefined && <GetAllQuotes disable={!ActivateForm}/>}
                </Suspense>

                <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { GetAllAuthors != undefined && <GetAllAuthors disable={!ActivateForm}/>}
                </Suspense>

                <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { GetQuotesbyOwner != undefined && <GetQuotesbyOwner disable={!ActivateForm}/>}
                </Suspense>


                <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { GetQuotesbyOwnerList != undefined && <GetQuotesbyOwnerList disable={!ActivateForm}/>}
                </Suspense>



                <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { SetQuote != undefined && <SetQuote disable={!ActivateForm}/>}
                </Suspense>
                
        </>

    )


}