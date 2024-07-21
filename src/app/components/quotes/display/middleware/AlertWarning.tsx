import { Alert } from "react-bootstrap";
import { alert_message, alert_type } from "./type";


interface AlertWarningWrapperProps{
    show:boolean,
    setShow: (flag :boolean) => void,
    message: alert_message
}

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
  }

  

function AlertWarningWrapper({show,setShow,message}:AlertWarningWrapperProps) {
      
    if (show) {
      return (
        <Alert style={ {width:"30%",margin:"auto"} } variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{message.header}</Alert.Heading>
          <p className="alert">
            {message.text}
          </p>
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
        default:
            break
    }


      return (
        <AlertWarningWrapper {...rest} message={warning_message}/>
      );
    }

  