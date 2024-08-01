import Section from "@/app/ui_menu/Section";
import {SectionProps} from "@/app/ui_menu/Section";
import { Suspense, useState } from 'react';

import {ApiHookWrapperProps} from '@/components/quotes/common_api/ApiHookWrapper';
import {DisableProps} from  '@/components/quotes/display/middleware/type';

import ApiHookWrapper from '@/components/quotes/common_api/ApiHookWrapper'
import TextArea from "@/app/components/style/TextArea";

//const ApiHookWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/common_api/ApiHookWrapper'), "ApiHookWrapper"));


interface FunctionsProps extends DisableProps
{
    functionName: FunctionNameRead | FunctionNameWrite
}

const ButtonName = {
    "getAllAuthors": "List all authors",
    "getAllQuotes": "List all quotes",
    "getLengthQuote": "Show the length of a quote",
    "getQuote": "Read latest quote of last author on Blockchain",
    "getQuotesbyOwner": "Read Quote from author",
    "getQuotesbyOwnerList": "Read Quote from author list",
    "getMostRecentQuote": "Read most recent quote",
    "setQuote":"Write a quote on the blockchain"
}

/* Common component for all api of the smart contract at high level*/




export default function Functions({disable,functionName}:FunctionsProps)
{
    /* Common interface to call the function*/
    const button_props = functionName != "getQuotesbyOwner" ?
    {
        disable : disable,
        text:ButtonName[functionName]
    }
    : 
    {
        disable : disable,
        text:ButtonName[functionName],
        display:"inline",
        v_align:true
    }


    // flag to enable/disable the display of a quote for all components except getQuotesbyOwnerList
    const [displayResult,SetDisplayResult] =  useState(false)
    // flag to enable/disable the display of a quote for getQuotesbyOwnerList
    // eslint-disable-next-line
    const [displayResultOwnerList,SetDisplayResultOwnerList] =  useState(true)
    // flag to indicate that a user request to display of a quote
    const [refreshResult,SetRefreshResult] =  useState(false)

    // common behavior for apis GetAllAuthors, GetCurrentQuote, GetMostRecentQuote 
    // different for GetQuoteByOwner
    const handleUserClick = () => {
        // enable the display of the quote
        SetDisplayResult(true)
        // a user made a request to display the quote
        SetRefreshResult(true)
    } 



    const sectionProps: Omit<SectionProps, 'children'> = {
        button_props: button_props,
        //DisplayResult: displayResult,
        handleUserClick: handleUserClick,
    }

    const ChildrenPropsRead:ApiHookWrapperProps = {
        apiName:functionName as FunctionNameRead,
        refreshResult: refreshResult,
        SetDisplayResult:SetDisplayResult,
        SetRefreshResult:SetRefreshResult,

    }   

    // props for the case GetOwnerQuotesbyList
    const OwnerListChildrenProps : ApiHookWrapperProps & {list:boolean, disable:boolean} = {
        apiName:functionName as FunctionNameRead,
        refreshResult: refreshResult,
        SetDisplayResult:SetDisplayResultOwnerList,
        SetRefreshResult:SetRefreshResult,
        list:true,
        disable:disable

    }   

    return(
        <>
            {(() => {
                switch (functionName) {
                
                /******************* Read function ************** */

                case 'getQuote': case 'getAllAuthors':  case 'getAllQuotes': case 'getMostRecentQuote':
                    return (
                    <Section {...sectionProps}>
                        <Suspense fallback={ // display spinner until component is loaded
                    <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}
                    >
                        { displayResult && <ApiHookWrapper {...ChildrenPropsRead} />}
                    </Suspense>
                    </Section>
                )
                
                
                
                case 'getQuotesbyOwner':
                    return (// interface for GetQuotesbyOwner
                        <>
                            <div id="menu_get_author">
                                <input id="author_input" type="text" alt="text field to enter the author" placeholder="type the author address"/>
                                <Section {...sectionProps}>
                                    
                                        <Suspense fallback={ // display spinner until component is loaded
                                        <div className="spinner-border text-warning" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div>}
                                        >
                                            { displayResult && <ApiHookWrapper {...ChildrenPropsRead}  />}
                                        </Suspense>                          
                                </Section>
                            </div>
                        </>)

                case 'getQuotesbyOwnerList':
                    return (
                        <Suspense fallback={ // display spinner until component is loaded
                        <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>}
                        >
                            <ApiHookWrapper {...OwnerListChildrenProps}  />
                        </Suspense>
                        )

                /******************* Write function ************** */
                case 'setQuote':
                   return(
                    <div id="write_quote_menu">
                        <Section {...sectionProps}>
                           
                            <Suspense fallback={ // display spinner until component is loaded
                                <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>}
                                >
                                    { displayResult && <ApiHookWrapper {...ChildrenPropsRead} />}
                            </Suspense>

                             {/* https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/*/}
                            {/* <div className="grow-wrap">  */}
                            <TextArea placeholder='enter your quote, e.g “But I know, somehow, that only when it is dark enough can you see the stars.” ― Martin Luther King, Jr.'/>

                        </Section>
                     </div>
                   )

                default:
                    return null
                }
            })()}
        </>
    )
   
  
}




