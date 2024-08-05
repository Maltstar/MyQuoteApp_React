import { Alert } from "react-bootstrap";
import { alert_message, alert_type } from "./type";
import FormatText from "../format/FormatText";


interface AlertWarningWrapperProps{
    show:boolean,
    variant:string,
    setShow: (flag :boolean) => void,
    message: alert_message
}

const text_success_set_quote = 
          `Your quote was successfully submitted.
          Accept the transaction in your Wallet.
          Wait for the confirmation of the transaction in your wallet..
          You may want to use "Read Most Recent Quote"
          to fetch and display your quote from the blockchain network.
          Note: It might take up to 7s to validate your transaction
          on the blockchain network`

const warning_messages = {
    empty_input:{
        header:"Warning: you did not enter any author!", 
        text:`No author was entered. 
        Please enter an valid wallet address for the author.
        You may want to use "List all authors`,
    },
    error_input:{
        header:"Warning: you did not enter a valid author!", 
        text:`Author not found. 
        Please enter an valid wallet address for the author. 
        You may want to use "List all authors"`},
    empty_quote:{
      header: "Warning: you did enter any character for the quote!", 
      text :`Please enter at least 1 character for the quote.`
    },
  
  success_set_quote:
  {
    header:"Success: you quote has been submitted", 
    text:text_success_set_quote
  }
}





function AlertWarningWrapper({variant,show,setShow,message}:AlertWarningWrapperProps) {
      
    if (show) {
      // close automatically the alert after 3 s
      setTimeout(() => setShow(false),10000 )

      return (
        <Alert style={ {width:"30%",margin:"auto"} } variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{message.header}</Alert.Heading>
          <FormatText text={message.text}/>
        </Alert>
      );
    }

  }

  export interface AlertWarningProps extends Omit <AlertWarningWrapperProps,'message'>
  {
    type:alert_type
  }

  export default function AlertWarning({type,...rest}: AlertWarningProps){
    let warning_message = {} as alert_message

    switch(type)
    {
        case "empty_input":
          
            warning_message = warning_messages.empty_input
            break;
        case "error_input":
            warning_message = warning_messages.error_input
            break;
        case "success_set_quote":
            warning_message = warning_messages.success_set_quote
            break;
        case "empty_quote":
            warning_message = warning_messages.empty_quote
            break;
        default:
            break
    }


      return  <AlertWarningWrapper {...rest} message={warning_message}/>
      
    }

  