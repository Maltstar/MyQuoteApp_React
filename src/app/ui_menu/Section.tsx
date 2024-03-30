import Button_with_hover, {Button_with_hoverProps} from "@/components/style/Style"
import { Suspense, useState } from "react"
import React from "react"
import { CommonProps } from "../components/quotes/display/middleware/type"

export type ChildrenProps  <C extends React.ReactElement> =  {
    refreshResult?: boolean,
    SetRefreshResult?:(flag: boolean) => void,
    SetDisplayResult?: (flag: boolean) => void
}

type Props <C extends React.ReactElement> =
React.PropsWithChildren<ChildrenProps<C>> &
SectionProps

export interface SectionProps extends CommonProps
{
    children: ChildrenProps<React.ReactElement>, // the component to display in result of the api call
    button_props:Omit<Button_with_hoverProps, 'onClick'>, 
    DisplayResult: boolean, // enable/disable the display of the result
    SetDisplayResult:(flag: boolean) => void, // manage the flag to display the result
    SetRefreshResult:(flag: boolean) => void, // manage the update of the result


}


export default function Section({children,button_props,DisplayResult,SetDisplayResult,SetRefreshResult}:Props<React.ReactElement>)
{

    const handleGetQuote = () => {
        // enable the display of the quote
        SetDisplayResult(true)
        // a user made a request to display the quote
        SetRefreshResult(true)
    }

    console.log("Section children",children);  
    


    return ( 
        <>
            {/* Button to request a call to a smart contract api */}
            <Button_with_hover onClick={handleGetQuote}
             {...button_props}/>
            {/* result provided by the api */}
                { DisplayResult && children} 
        </>
        )   

}