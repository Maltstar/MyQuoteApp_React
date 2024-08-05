
import { lazyRetry } from "@/lib/utils"
import { ComponentType, lazy, LazyExoticComponent, Suspense, useEffect } from "react"
import { CommonWithHookProps } from '../display/middleware/type';

import SetQuoteWrapper from "@/components/quotes/display/middleware/SetQuoteWrapper";
import GetAllAuthorsWrapper from "@/components/quotes/display/middleware/GetAllAuthorsWrapper";
import GetMostRecentQuoteWrapper from "@/components/quotes/display/middleware/GetMostRecentQuoteWrapper";
// declaring components for lazy loading

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetCurrentQuoteWrapper  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
//let GetAllAuthorsWrapper  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetQuotesbyOwnerWrapper  :LazyExoticComponent<ComponentType<any>>|undefined = undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetAllQuotesWrapper  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
//let GetMostRecentQuoteWrapper  :LazyExoticComponent<ComponentType<any>>|undefined = undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
//let SetQuoteWrapper  :LazyExoticComponent<ComponentType<any>>|undefined = undefined

export interface ApiHookWrapperProps extends CommonWithHookProps{
        apiName:FunctionNameRead | FunctionNameWrite, // the name of the smart contract function to call

    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    
    //    export default function ApiHookWrapper({apiName,refreshQuote,SetRefreshQuote,SetDisplayQuote}:ApiHookWrapperProps)
    export default function ApiHookWrapper({apiName,...rest}:ApiHookWrapperProps)
    {

      useEffect(() => {
        // lazy loading all component with lazyRetry to avoid chunk errors
                    
        GetCurrentQuoteWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/display/middleware/GetCurrentQuoteWrapper'), "GetCurrentQuoteWrapper"));
        //GetAllAuthorsWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllAuthorsWrapper" */ '@/components/quotes/display/middleware/GetAllAuthorsWrapper'), "GetAllAuthorsWrapper"));
        GetAllQuotesWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetAllQuotesWrapper" */ '@/components/quotes/display/middleware/GetAllQuotesWrapper'), "GetAllQuotesWrapper"));
        GetQuotesbyOwnerWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetQuotesbyOwnerWrapper" */ '@/components/quotes/display/middleware/GetQuotesbyOwnerWrapper'), "GetQuotesbyOwnerWrapper"));
        //GetMostRecentQuoteWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetMostRecentQuoteWrapper" */ '@/components/quotes/display/middleware/GetMostRecentQuoteWrapper'), "GetMostRecentQuoteWrapper"));
        //SetQuoteWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "SetQuoteWrapper" */ '@/components/quotes/display/middleware/SetQuoteWrapper'), "SetQuoteWrapper"));

      },[])


           
            return(
                <>
                    {(() => {
                    switch (apiName) {
                    
                      case 'getQuote':
                        return(
                          <>
                                  {/* display spinner while lazy loading component  */ }
                                 <Suspense fallback={ // display spinner until component is loaded
                                      <div className="spinner-border text-warning" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                      </div>}
                                      >
                                          { GetCurrentQuoteWrapper!= undefined && <GetCurrentQuoteWrapper {...rest }/>}
                                  </Suspense>
                          </>
                              )
                      
                      case 'getAllAuthors':
                        return(
                          <>
                                  {/* display spinner while lazy loading component  */ }
                                 {/* <Suspense fallback={ // display spinner until component is loaded
                                      <div className="spinner-border text-warning" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                      </div>}
                                      >
                                          { GetAllAuthorsWrapper!= undefined && <GetAllAuthorsWrapper {...rest }/>}
                                  </Suspense> */}
                                  <GetAllAuthorsWrapper {...rest }/>
                          </>
                              )

                      case 'getAllQuotes':
                        return(
                          <>
                                  {/* display spinner while lazy loading component  */ }
                                 <Suspense fallback={ // display spinner until component is loaded
                                      <div className="spinner-border text-warning" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                      </div>}
                                      >
                                          { GetAllQuotesWrapper!= undefined && <GetAllQuotesWrapper {...rest }/>}
                                  </Suspense>
                          </>
                              )
                      
                      case 'getQuotesbyOwner': case 'getQuotesbyOwnerList':
                        return(
                          <>
                                  {/* display spinner while lazy loading component  */ }
                                 <Suspense fallback={ // display spinner until component is loaded
                                      <div className="spinner-border text-warning" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                      </div>}
                                      >
                                          { GetQuotesbyOwnerWrapper!= undefined && <GetQuotesbyOwnerWrapper {...rest }/>}
                                  </Suspense>
                          </>
                              )

                      case 'getMostRecentQuote':
                        return(
                          <>
                                  {/* display spinner while lazy loading component  */ }
                                 {/* <Suspense fallback={ // display spinner until component is loaded
                                      <div className="spinner-border text-warning" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                      </div>}
                                      >
                                          { GetMostRecentQuoteWrapper!= undefined && <GetMostRecentQuoteWrapper {...rest }/>}
                                  </Suspense> */}
                                  <GetMostRecentQuoteWrapper {...rest }/>
                          </>
                              )

                      case 'setQuote':
                        return(
                          <>
                                  {/* display spinner while lazy loading component  */ }
                                 {/* <Suspense fallback={ // display spinner until component is loaded
                                      <div className="spinner-border text-warning" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                      </div>}
                                      >
                                          { SetQuoteWrapper!= undefined && <SetQuoteWrapper {...rest }/>}
                                  </Suspense> */}
                                  <SetQuoteWrapper {...rest }/>
                          </>

                              )

                      default:
                        return null
                    }
                  })()}
                </>

            )

    }
