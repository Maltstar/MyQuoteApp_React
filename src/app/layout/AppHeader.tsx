import ConnectButton from "../components/button/ConnectButton"
import Nav from "../ui_menu/Nav"

export default function AppHeader ()
{
    const title = 'Quote App'

    return(
        <div>
            <div id="title_and_button">
                <h1 id='main_title'>{title}</h1>
                <ConnectButton/>
            </div>

            <Nav/>
        </div>
    )
}