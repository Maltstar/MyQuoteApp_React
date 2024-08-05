import { useEffect, useState } from "react";
import { CommonWithHookProps } from "./type";
import { useSmartContractFunctionWrite } from "@/app/components/hooks/SmartContractHooks";
import AlertWarning, { AlertWarningProps } from "./AlertWarning";

export interface SetQuoteWrapperProps extends CommonWithHookProps{
}

// eslint-disable-next-line 
export default function SetQuoteWrapper({SetDisplayResult,SetRefreshResult,refreshResult}:SetQuoteWrapperProps)

{

    const [showAlertWarning, setshowAlertWarning] = useState(false);
    const [showAlertSuccess, setshowAlertSuccess,] = useState(false);
    const [userQuote, SetUserQuote] = useState('')
    const functionWrite= useSmartContractFunctionWrite('setQuote',userQuote)

    console.log('SetQuoteWrapper userQuote', userQuote);
    


    // handling side effects (accessing the DOM) in event handler (client side)
    const handleSubmit = () =>
    {
        const quote_input = document.getElementById("quote_input") as HTMLTextAreaElement | null;
        
        if(quote_input != null)
        {
            if(quote_input.value.length != 0)
            {
                
                SetUserQuote(quote_input.value);
               // SetWarningQuoteEmpty(false)
            }
            else
            {
                setshowAlertWarning(true)

            }
        }
    }

    /* Managing side effect with event handler*/
    useEffect(() => {

        if(refreshResult)
        {
            handleSubmit()  
            SetRefreshResult(false)  
        }

    },[refreshResult])


    // each time the userQuote changes
    useEffect(() => {

        if(userQuote != '')
        {
            // call setQuote from smart contract
            if(functionWrite != undefined)
            {
                if(functionWrite.writeFunction != undefined) 
                {
                    console.log('functionWrite.param',functionWrite.param);
                    const abi  = functionWrite.param.abi
                    // see doc https://wagmi.sh/react/api/hooks/useWriteContract
                    const result = functionWrite.writeFunction(
                        {
                            abi,
                            address:functionWrite.param.address,
                            functionName:functionWrite.param.functionName,
                            args:[functionWrite.param.args]
                        }
                    )


                    console.log('SetQuoteWrapper result',result);
                    
                }

                // display success
                setshowAlertSuccess(true)
                    

                    
            }
            
        }


    },[userQuote])

    const AlertSuccessProps : Omit<AlertWarningProps,'type'> = 
    {
        variant:"success",
        show:showAlertSuccess,
        setShow:setshowAlertSuccess
    } 


    const AlertWarnProps : Omit<AlertWarningProps,'type'> = 
    {
        variant:"warning",
        show:showAlertWarning,
        setShow:setshowAlertWarning
    } 


    return (
        <div>
            <AlertWarning {...AlertWarnProps } type="empty_quote"/>
            <AlertWarning {...AlertSuccessProps } type="success_set_quote"/>
        </div>

    )
}


