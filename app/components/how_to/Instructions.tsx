function Instructions(){

    return(
    <article id="instructions">
        <h2 className="instructions_title">Read or write your quote on blockchain (Goerli test network)</h2>
        <h3 className="instructions_title">How to use:</h3>
        <ul className="list_instructions">
            <li>  1- Connect to <a href="https://metamask.io/download/">Metamask</a> on <a href="https://www.tech-zone.co.uk/Guides/how-to-add-goerli-network-to-metamask">Goerli test network</a> (use the button at the corner above left)</li>
            <li>  2- Read or write a quote by clicking on the associated button and filling the form when required  </li>
            <li>  <strong>Note:</strong> the writing of a quote costs a fee to compute and store your quote on the blockchain network, make sure to have some <a href="https://goerlifaucet.org/">Goerli</a><a href="https://goerli-faucet.pk910.de/">ETH</a> before writing </li>
            <li>  <strong>In case of writing a quote :</strong> after paying the transaction, wait for the transaction confirmation (MetaMask Popup "Confirmed transaction") for the availability of your quote on the blockchain </li>         
        </ul>
    </article>)
}

export default Instructions