import Section from "@/app/ui_menu/Section";
import {SectionProps} from "@/app/ui_menu/Section";
import { Suspense, useState,lazy } from 'react';
import {lazyRetry} from '@/lib/utils';
//import ApiHookWrapper from "@/components/quotes/common_api/ApiHookWrapper";
import {ApiHookWrapperProps} from '@/components/quotes/common_api/ApiHookWrapper';
import {DisableProps} from  '@/components/quotes/display/middleware/type';
import GetFunctions from "./GetFunctions";


const ApiHookWrapper = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/quotes/common_api/ApiHookWrapper'), "ApiHookWrapper"));




export function GetAllAuthors({disable}:DisableProps)
{
    const functionName = "getAllAuthors"
    

    return(
        <GetFunctions disable={disable} functionName={functionName}/>
    )
}


export function GetAllQuotes({disable}:DisableProps)
{
    const functionName = "getAllQuotes"
    

    return(
        <GetFunctions disable={disable} functionName={functionName}/>
    )
}


export function GetCurrentQuote({disable}:DisableProps)
{
    const functionName = "getQuote"
    

    return(
        <GetFunctions disable={disable} functionName={functionName}/>
    )
}



export function GetQuotesbyOwner ({disable}:DisableProps)
{
    const functionName = "getQuotesbyOwner"

    return(
        <GetFunctions disable={disable} functionName={functionName}/>
    )
}

export function GetQuotesbyOwnerList ({disable}:DisableProps)
{
    const functionName = "getQuotesbyOwnerList"

    return(
        <GetFunctions disable={disable} functionName={functionName}/>
    )
}

export function GetMostRecentQuote ({disable}:DisableProps)
{
    const functionName = "getMostRecentQuote"

    return(
        <GetFunctions disable={disable} functionName={functionName}/>
    )
}
