import GetQuoteButton from "@/components/button/GetQuoteButton"
import ConnectButton from "@/components/button/ConnectButton"
import './App.scss';
import Form from "@/app/ui_menu/Form";

export default function App()
{
    return (
        <>
            <ConnectButton/>
            <GetQuoteButton disable={false}/>
            {/* <Form/> */}
        </>
    )
}