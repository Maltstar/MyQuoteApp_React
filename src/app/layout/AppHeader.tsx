import ConnectButton from "../components/button/ConnectButton"
import Instructions from '../components/how_to/Instructions';
import Nav from "../ui_menu/Nav"

interface AppHeaderProps
{
    instructions:boolean
}

export default function AppHeader({instructions}:AppHeaderProps)
{
    const title = 'Quote App'

    return(
        <div>
            <div id="title_and_button">
                <h1 id='main_title'>{title}</h1>
                <ConnectButton/>
            </div>

            <Nav/>
            <h2 className="instructions_title">Read or write your quote on blockchain (Sepolia test network)</h2>
            {instructions && <Instructions/>}
            
        </div>
    )
}