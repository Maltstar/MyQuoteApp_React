
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useSmartContractFunctionRead } from "../../../hooks/SmartContractHooks";
import DisplayCurrentQuote from "../lowlevel/DisplayCurrentQuote";
import { CommonWithHookProps } from "./type";
import { findMostRecentQuote } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//let DisplayCurrentQuote :LazyExoticComponent<ComponentType<any>>|undefined = undefined

export default function GetMostRecentQuoteWrapper({SetRefreshResult,SetDisplayResult,refreshResult}:CommonWithHookProps)
{
     
    const AllQuotes = useRef< Array<QuoteAuthorList> >(new Array<QuoteAuthorList>)

    const getAllAuthors:FunctionNameSmartContractRead = "getAllAuthors"
    const fetchedAuthors = useSmartContractFunctionRead(getAllAuthors) as ResultGetAllAuthorsType
    
    console.log(' GetMostRecentQuoteWrapper fetchedAuthors Ref',fetchedAuthors);


    if(fetchedAuthors != undefined)
    {


        return  fetchedAuthors.map((author,i,authors) => {
            console.log('GetMostRecentQuoteWrapper map author',author);
            
            return (<FetchQuotes 
            key={author} 
            author={author} 
            positionAuthor={i}
            refreshResult={refreshResult}
            nbAuthors={authors.length}
            allQuotes={AllQuotes}
            SetRefreshResult={SetRefreshResult}
            SetDisplayResult={SetDisplayResult}
            
            />)

        })
     
    }
 }


interface FetchQuotesProps extends CommonWithHookProps
{
    author:Author,
    nbAuthors:number,
    positionAuthor:number,
    refreshResult:boolean,
    setAllQuotes?: (quotes:Array<QuoteAuthorList>) => void,
    allQuotes:  MutableRefObject<QuoteAuthorList[]>,
}

/**
 * Fetch Quotes for a given Author
 * and update parent with Quotes fetched
 * @param param0 
 */
function FetchQuotes({author,
                     nbAuthors,
                     positionAuthor,
                     refreshResult,
                     allQuotes,
                     SetRefreshResult,
                     SetDisplayResult}:FetchQuotesProps)
{
    console.log(' FetchQuotes')
    const getQuotesbyOwner:FunctionNameSmartContractRead = "getQuotesbyOwner"
    const [findMostRecentQuote, SetfindMostRecentQuote] = useState(false)
    const fetchedQuotes = useSmartContractFunctionRead(getQuotesbyOwner, author as Address) as ResultGetQuotebyOwner
    //let allQuotesWithAuthor:QuoteAuthorList[] = []

    console.log(' FetchQuotes fetchedQuotes',fetchedQuotes);

    useEffect(() => {
        if(fetchedQuotes != undefined && !findMostRecentQuote && refreshResult)
            {
        
                console.log('FetchQuotes Ref',allQuotes.current);
                
                if(allQuotes.current.length == 0 || // no quotes were stored, AllQuotes is empty
                    allQuotes.current[allQuotes.current.length-1].author != author) // the quotes for the author requested were not already stored
                {
                    console.log('FetchQuotes Ref before push AllQuotes length',allQuotes.current.length );
                    console.log('FetchQuotes Ref before push last element',allQuotes.current[allQuotes.current.length-1]);
                    // store value of ref
                    const newQuotes:QuoteAuthorList[] =  allQuotes.current
                    // add new author with quotes to previous data
                    newQuotes.push({author:author, quotes:fetchedQuotes})
                    // update ref with updated data
                    allQuotes.current = newQuotes
                }
        
                // last author was called
                // so sorting most recent quote from all quotes can began
                if(nbAuthors === positionAuthor+1)
                {
                    if(refreshResult)
                    {
        
                        //allQuotesWithAuthor = allQuotes.current
                        SetfindMostRecentQuote(true)
                        SetRefreshResult(false)
                        
                        
                    }
                    
                }
                
                  
            }
    },[fetchedQuotes,findMostRecentQuote,refreshResult])
    

    console.log(' FetchQuotes AllQuotes',allQuotes.current);

    return(<>

        {
            findMostRecentQuote && // all quotes are fetched
            <FindMostRecentQuote allQuotes={allQuotes.current} SetDisplayResult={SetDisplayResult}/>
        }

    </>)
}


interface FindMostRecentQuoteProps extends Omit<CommonWithHookProps,'SetRefreshResult' |'refreshResult'>
{

    allQuotes:  QuoteAuthorList[] ,
}

function FindMostRecentQuote({allQuotes,SetDisplayResult}:FindMostRecentQuoteProps)
{
    const mostRecentQuote = useMemo( () => findMostRecentQuote(allQuotes),[allQuotes])
    //console.log('FindMostRecentQuote mostRecentQuote',mostRecentQuote);
    // useEffect(() => {
    //     DisplayCurrentQuote = lazy(() => lazyRetry(() => import(/* webpackChunkName: "DisplayCurrentQuote" */ '@/components/quotes/display/lowlevel/DisplayCurrentQuote'), "DisplayCurrentQuote"));
    // },[])
    
    const title = 'Most Recent Quote'

    return (
    
        DisplayCurrentQuote != undefined && <DisplayCurrentQuote  title={title} Quote={mostRecentQuote} SetDisplayQuote={SetDisplayResult}/>
    )
    
}