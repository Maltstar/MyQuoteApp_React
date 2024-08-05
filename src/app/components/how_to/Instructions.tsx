import Link from "next/link"

function Instructions(){

 const metamaskUrl = 'https://metamask.io/download/'
 const textConnect = ' e.g Metamask'
 const sepoliaTutoUrl = "https://moralis.io/how-to-add-the-sepolia-network-to-metamask-full-guide/"
 const sepoliaText = "Sepolia test network"
 const sepoliaFaucet1 = "https://www.sepoliafaucet.io/"
 const sepoliaFaucet1Text = "(Faucet 1"
 const sepoliaFaucet2 = "https://faucetlink.to/sepolia"
 const sepoliaFaucet2Text = "Faucet 2)"

    return(
    <article id="instructions">
        <h3 className="instructions_title">How to use:</h3>
        <ul className="list_instructions">
            <li>  
                1- Connect to a wallet that support ETH 
                <Link className="nextlink" href={metamaskUrl}>
                    {textConnect}
                </Link>
                on <Link className="nextlink" href={sepoliaTutoUrl}>
                    {sepoliaText}
                </Link>
                (use the "connect" button at the corner above left)
            </li>
            <li>  2- Read or write a quote by clicking on the associated button and filling the form when required  </li>
            <li>  <strong>Note:</strong> the writing of a quote costs a fee to compute and store your quote on the blockchain network, make sure to have some Sepolia ETH
                <Link className="nextlink" href={sepoliaFaucet1}>
                    {sepoliaFaucet1Text}
                </Link>
                ,
                <Link className="nextlink" href={sepoliaFaucet2}>
                    {sepoliaFaucet2Text}
                </Link>
            </li>  
            <li>  <strong>In case of writing a quote :</strong> after paying the transaction, wait for the transaction confirmation in your wallet (e.g MetaMask Popup "Confirmed transaction") for the availability of your quote on the blockchain </li>         
        </ul>
    </article>)
}

export default Instructions