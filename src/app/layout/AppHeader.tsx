import Nav from "../ui_menu/Nav"

export default function AppHeader ()
{
    const title = 'Quote App'

    return(
        <div>
            <h1 id='main_title'>{title}</h1>
            <Nav/>
        </div>
    )
}