import { Small_Button_with_hover } from "@/components/style/Style";
import Header from "@/lib/Header";
import {convert_timestamp_to_date} from "@/lib/utils"
import { useReadContract } from 'wagmi';
import artifact from '@/gen/artifacts/infos_contract';
import { config } from '@/config/index'


import {ContextProvider} from '@/context/index'
import {useGetQuote} from '@/components/hooks/SmartContractHooks'
import { useEffect, useMemo, useState } from "react";
    


export interface GetCurrentQuoteWithHookProps{
        refreshQuote:boolean,
        SetRefreshQuote: (flag: boolean) => void, 
        SetDisplayQuote: (flag: boolean) => void
    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    export default function GetCurrentQuoteWithHook({refreshQuote,SetRefreshQuote,SetDisplayQuote}:GetCurrentQuoteWithHookProps)
    {

         console.log('GetCurrentQuoteWithHook: RefreshQuote',refreshQuote);
        const [Quote,SetQuote] = useState<Quote_with_Author|undefined>(undefined)
        const fetchedQuoteData = useGetQuote()

        console.log('GetCurrentQuoteWithHook: fetchedQuoteData',fetchedQuoteData);

        const title = "Read latest quote of last author on Blockchain"        

        // function convert_timestamp_to_date(timestamp: BigInt)
        // {
        //     //return new Date(timestamp*1000).toUTCString();
        //     console.log('convert_timestamp_to_date',timestamp.toString());
        //     // convert timestamp BigInt to string which is in seconds unit
        //     // convert the string to a number with the millisecond unit and multiply by 1000 for having the right unit in seconds
        //     const writtingDate = new Date(Number(timestamp.toString())*1000)
        //     console.log('writtingDate',writtingDate);
        //     // convert the date into UTC format
            
        //     return writtingDate.toUTCString();
        //    // return new Date(timestamp.toString()).toUTCString();
        //    // return new Date(timestamp.toString()*1000).toUTCString();
        // }

        useEffect(() => {
            console.log("useEffect fetchedQuoteData",fetchedQuoteData)
            console.log("useEffect RefreshQuote",refreshQuote)

        if(refreshQuote)
        {
            if(fetchedQuoteData != undefined)
            {
                const [dataQuote,dataOwner,dataTimestamp] = fetchedQuoteData 
                const QuoteData : Quote_with_Author = {
                    'myQuote':dataQuote,
                    'owner': dataOwner,
                    'timestamp':dataTimestamp
                }
                SetQuote(QuoteData)
                //console.log("useEffect",Quote);
                
                SetRefreshQuote(false)
            }
            
            
        }
            

        },[refreshQuote,fetchedQuoteData,SetQuote,SetRefreshQuote])
  
           
            return(
                Quote != undefined &&
                <div className="result">
                    <article>
                        <h4 className="quote_title">{title}</h4>
                        <ul>
                            <li>
                                <Header>&#34;{Quote.myQuote}&#34;</Header>
                            </li>
                            <li className='info'>
                                Author: {Quote.owner}
                            </li>
                            <li className='info'>
                                written on: {convert_timestamp_to_date(Quote.timestamp)}
                            </li>
                        </ul>

                        <Small_Button_with_hover onClick={() => SetDisplayQuote(false)} text={"clear quote"}/>
                    </article>


                </div>

            )

    }


    // export function  GetCurrentQuoteWithHookWrapper(){
    //     return(
    //         <ContextProvider> 
    //             <GetCurrentQuoteWithHook/>
    //         </ContextProvider>
    //     )
    // }
