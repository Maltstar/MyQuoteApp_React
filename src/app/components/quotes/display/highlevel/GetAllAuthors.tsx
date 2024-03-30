import Section from "@/app/ui_menu/Section";
import {SectionProps} from "@/app/ui_menu/Section";
import { Suspense, useState,lazy } from 'react';
import {lazyRetry} from '@/lib/utils';
//import ApiHookWrapper from "@/components/quotes/common_api/ApiHookWrapper";
import {ApiHookWrapperProps} from '@/components/quotes/common_api/ApiHookWrapper';
import {DisableProps} from  '@/components/quotes/display/middleware/type';


const ApiHookWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/common_api/ApiHookWrapper'), "ApiHookWrapper"));




export default function GetAllAuthors({disable}:DisableProps)
{
    const button_props = 
    {
        disable : disable,
        text :"List all authors"
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
        apiName:'getAllAuthors',
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