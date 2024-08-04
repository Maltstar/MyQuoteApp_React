import './App.scss';
import Form from "@/app/ui_menu/Form";
import AppHeader from "@/app/layout/AppHeader";

export default function App()
{
    return (
        <>
            <AppHeader instructions={true}/>  
            <Form/>
        </>
    )
}