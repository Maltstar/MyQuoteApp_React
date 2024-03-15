// doc https://docs.walletconnect.com/web3modal/react/hooks#useweb3modalstate
import { useWeb3ModalState } from '@web3modal/wagmi/react'
import { useState,lazy } from 'react';
import {lazyRetry} from '@/lib/utils';

const GetQuoteButton = lazy(() => lazyRetry(() => import(/* webpackChunkName: "GetCurrentQuote" */ '@/components/button/GetQuoteButton'), "GetQuoteButton"));


export default function Form()
{
    const { open, selectedNetworkId } = useWeb3ModalState()
    console.log("Web3ModalState",open);
    

    return(
        <GetQuoteButton disable={!open}/>
    )


}