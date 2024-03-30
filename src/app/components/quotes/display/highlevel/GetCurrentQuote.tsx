import Section from "@/app/ui_menu/Section";
import {SectionProps} from "@/app/ui_menu/Section";
import { Suspense, useState,lazy } from 'react';
import {lazyRetry} from '@/lib/utils';
// import ApiHookWrapper from "../../common_api/ApiHookWrapper";
import {ApiHookWrapperProps} from "../../common_api/ApiHookWrapper";

// const GetCurrentQuoteWithHook = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/app/components/quotes/display/middleware/GetCurrentQuoteWithHook'), "GetCurrentQuoteWithHook"));
const ApiHookWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/common_api/ApiHookWrapper'), "ApiHookWrapper"));


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
    const [displayResult,SetDisplayResult] =  useState(false)
    // flag to indicate that a user request to display of a quote
    const [refreshResult,SetRefreshResult] =  useState(false)

    const SectionProps: Omit<SectionProps, 'children'> = {
        button_props:button_props,
        DisplayResult:displayResult,
        SetDisplayResult:SetDisplayResult,
        SetRefreshResult:SetRefreshResult,
    }

    const ChildrenProps:ApiHookWrapperProps = {
        apiName:'getQuote',
        refreshResult: refreshResult,
        SetDisplayResult:SetDisplayResult,
        SetRefreshResult:SetRefreshResult,

    }


    return(
        <Section {...SectionProps}>
                    <Suspense fallback={ // display spinner until component is loaded
                <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>}
                >
                    { displayResult && <ApiHookWrapper {...ChildrenProps} />}
                </Suspense>
        </Section>
    )
}