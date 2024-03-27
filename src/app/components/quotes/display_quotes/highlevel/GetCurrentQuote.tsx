import Section from "@/app/ui_menu/Section";
import {GetCurrentQuoteWithHookProps} from "@/components/quotes/display_quotes/middleware/GetCurrentQuoteWithHook"
import { Suspense, useState,lazy } from 'react';
import {lazyRetry} from '@/lib/utils';
//import GetCurrentQuoteWithHook from "../middleware/GetCurrentQuoteWithHook";

const GetCurrentQuoteWithHook = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/display_quotes/middleware/GetCurrentQuoteWithHook'), "GetCurrentQuoteWithHook"));


interface GetCurrentQuoteProps
{
    disable:boolean
}

export default function GetCurrentQuote({disable}:GetCurrentQuoteProps)
{
    const button_props = 
    {
        disable : disable,
        text :"Read latest quote of last author on Blockchain"
    }

    // flag to enable/disable the display of a quote
    const [DisplayResult,SetDisplayResult] =  useState(false)
    // flag to indicate that a user request to display of a quote
    const [RefreshResult,SetRefreshResult] =  useState(false)

    const SectionProps = {
        button_props:button_props,
        DisplayResult:DisplayResult,
        SetDisplayResult:SetDisplayResult,
        SetRefreshResult:SetRefreshResult,
    }

    const ChildrenProps:GetCurrentQuoteWithHookProps = {
        refreshQuote: RefreshResult,
        SetDisplayQuote:SetDisplayResult,
        SetRefreshQuote:SetRefreshResult,

    }


    return(
        <Section {...SectionProps}>
                    <Suspense fallback={ // display spinner until component is loaded
                <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>}
                >
                    { DisplayResult && <GetCurrentQuoteWithHook {...ChildrenProps} />}
                </Suspense>
            
            {/* <GetCurrentQuoteWithHook {...ChildrenProps}/> */}
        </Section>
    )
}