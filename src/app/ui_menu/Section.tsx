import Button_with_hover, {Button_with_hoverProps} from "@/components/style/Style"
import React from "react"



// type Props <C extends React.ReactElement> =
// React.PropsWithChildren<ChildrenProps<C>> &
// SectionProps

type Props =
React.PropsWithChildren<ChildrenProps> &
SectionProps

export type ChildrenProps  =  {
//export type ChildrenProps  <C extends React.ReactElement> =  {
    refreshResult?: boolean,
    SetRefreshResult?:(flag: boolean) => void, // manage the flag to display the result
    SetDisplayResult?: (flag: boolean) => void // manage the update of the result
}

export interface SectionProps
{
    
    children: ChildrenProps, // the component to display in result of the api call
    //children: ChildrenProps<React.ReactElement>, // the component to display in result of the api call
    button_props:Omit<Button_with_hoverProps, 'onClick'>, 
    handleUserClick:() => void

}


export default function Section({children,button_props,//DisplayResult,
//    handleUserClick}:Props<React.ReactElement>)
    handleUserClick}:Props)

{

    // const handleGetQuote = () => {
    //     // enable the display of the quote
    //     SetDisplayResult(true)
    //     // a user made a request to display the quote
    //     SetRefreshResult(true)
    // }

    console.log("Section children",children);  
    


    return ( 
        <>
            {/* Button to request a call to a smart contract api */}
            <Button_with_hover onClick={handleUserClick}
             {...button_props}/>
            {/* result provided by the api */}
                {/* { DisplayResult && children}  */}
                {children}
        </>
        )   

}