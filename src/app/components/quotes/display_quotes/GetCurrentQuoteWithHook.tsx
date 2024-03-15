import { Small_Button_with_hover } from "@/components/style/Style";
import Header from "@/lib/Header";
import { useReadContract } from 'wagmi';
import artifact from '@/gen/artifacts/infos_contract';
import { config } from '@/config/index'


import {ContextProvider} from '@/context/index'
import {useGetQuote} from '@/components/hooks/SmartContractHooks'
import { useEffect, useMemo, useState } from "react";
    


    

    // interface GetCurrentQuoteProps{
    //     quote: Quote_with_Author | undefined,
    //     title:string,
    //     SetActivateReadQuote: (flag: boolean) => void
    // }

    interface GetCurrentQuoteWithHook{
        RefreshQuote:boolean,
        SetRefreshQuote: (flag: boolean) => void
    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    export default function GetCurrentQuoteWithHook({RefreshQuote,SetRefreshQuote}:GetCurrentQuoteWithHook)
    {

         console.log('GetCurrentQuoteWithHook: RefreshQuote',RefreshQuote);
        // console.log('GetQuote: quote.currentQuote',quote.myQuote);
        // console.log('GetQuote: quote.timestamp',quote.timestamp);
        const [Quote,SetQuote] = useState<Quote_with_Author|undefined>(undefined)
        const fetchedQuoteData = useGetQuote()

       // cache fetchdata
        // const fetchedQuoteData:[string, `0x${string}`, bigint] | undefined = useMemo(() => {
        //     let result = undefined
        //     if(RefreshQuote= true)
        //     {
        //         result = useGetQuote()
        //     }
        //     return result
        //   }  , [RefreshQuote]) 

        console.log('GetCurrentQuoteWithHook: fetchedQuoteData',fetchedQuoteData);

        const title = "Read latest quote of last author on Blockchain"


        // const fetchGetQuote2 = () => {
        //   const resultReadContract =  useReadContract({
        //     abi: artifact["abi"],
        //     address: artifact["address"],
        //     functionName: 'getQuote',
        //     //chainId:goerli.id
        //     config,
        //   })

        //   console.log("resultReadContract",resultReadContract);
          

        // //   let result:[string, `0x${string}`, bigint]|undefined = undefined


        //   useEffect ( () => {
        //     if(resultReadContract != undefined) 
        //     {
        //         if(resultReadContract.data != undefined)
        //         {
        //           const [dataQuote,dataOwner,dataTimestamp] = resultReadContract.data
        //         //   if (dataQuote != undefined &&
        //         //     dataOwner != undefined &&
        //         //     dataTimestamp!= undefined )
        //         //     {

        //              const QuoteData : Quote_with_Author = {
        //                  'myQuote':dataQuote,
        //                  'owner': dataOwner,
        //                  'timestamp':dataTimestamp
        //              }
        //              console.log("QuoteData",QuoteData);
                     
        //              SetQuote(QuoteData)
        //         }
        //     }
        //   },[resultReadContract])
          
        // }



        

        function convert_timestamp_to_date(timestamp: BigInt)
        {
            //return new Date(timestamp*1000).toUTCString();
            console.log('convert_timestamp_to_date',timestamp.toString());
            // convert timestamp BigInt to string which is in seconds unit
            // convert the string to a number with the millisecond unit and multiply by 1000 for having the right unit in seconds
            const writtingDate = new Date(Number(timestamp.toString())*1000)
            console.log('writtingDate',writtingDate);
            // convert the date into UTC format
            
            return writtingDate.toUTCString();
           // return new Date(timestamp.toString()).toUTCString();
           // return new Date(timestamp.toString()*1000).toUTCString();
        }

        // const fetchGetQuote = () => {
        //     const result = useGetQuote()
        //     if(result != undefined)
        //         {
        //             const [dataQuote,dataOwner,dataTimestamp] = result 
        //             console.log("dataQuote",dataQuote);
        //             // if (dataQuote != undefined &&
        //             //    dataOwner != undefined &&
        //             //    dataTimestamp!= undefined )
        //             //    {

        //                 const QuoteData : Quote_with_Author = {
        //                     'myQuote':dataQuote,
        //                     'owner': dataOwner,
        //                     'timestamp':dataTimestamp
        //                 }
        //                 SetQuote(QuoteData)
        //                 //  }
        //         }

        //     useEffect(() => {
        //         console.log("useEffect",result)

        //     if(RefreshQuote)
        //     {
        //         if(fetchedQuoteData != undefined)
        //         {
        //             const [dataQuote,dataOwner,dataTimestamp] = fetchedQuoteData 
        //             const QuoteData : Quote_with_Author = {
        //                 'myQuote':dataQuote,
        //                 'owner': dataOwner,
        //                 'timestamp':dataTimestamp
        //             }
        //             SetQuote(QuoteData)
        //             SetRefreshQuote(false)
        //         }
                
                
        //     }
                
    
        //     },[RefreshQuote])
        // }

        useEffect(() => {
            console.log("useEffect fetchedQuoteData",fetchedQuoteData)
            console.log("useEffect RefreshQuote",RefreshQuote)

        if(RefreshQuote)
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
            

        },[RefreshQuote,fetchedQuoteData,SetQuote,SetRefreshQuote])
        //fetchGetQuote()
        //fetchGetQuote2()
        // console.log("result",result);

        
        // let quote = undefin
        // if (data != undefined)
        // {

        // }
        // const quote = {
        //     'myQuote': data.currentQuote,
        //     'owner': data.currentOwner,
        //     'timestamp':data.currentTimestamp
        // }

        /**
         * 

         */
        
           

            return(
                Quote != undefined ?
                (<div className="result">
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

                        {/* <Small_Button_with_hover onClick={() => SetActivateReadQuote(false)} text={"clear quote"}/> */}
                    </article>


                </div>)
                :
                <div>no result</div>
            )

    }


    // export function  GetCurrentQuoteWithHookWrapper(){
    //     return(
    //         <ContextProvider> 
    //             <GetCurrentQuoteWithHook/>
    //         </ContextProvider>
    //     )
    // }
