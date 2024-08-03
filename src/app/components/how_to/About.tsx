function About(){

    return(
        <article id="about">
            <h2 className="about_title">What?</h2>
            <ul className="list_instructions_about">
                <li>Save relevant information, quote, thoughts and thinking in form of a text. </li>
            </ul>
            <h2 className="about_title"> Why?</h2>
                <ul className="list_instructions_about">
                    <li> Access your quote from everywhere as long as you have an internet connection </li>
                    <li> Make your quote persistent, immutable, independent of a device, and decentralized, <br></br>which means that the storage network is not under the control of a centralized entity that may shut down <br></br>or restrict access to the devices where your quote is stored. </li>
                    <li> Make the quote author identifiable and at the same time respect privacy with pseudo-anonymity.   </li>
                    <li> Make your quote resistant to censorship, nobody can filter your quote.  </li>         
                </ul>
            <br></br>
            <h2 className="about_title">How?</h2>
            <ul className="list_instructions_about">
                <li> <span className="text_about"> Using an existing blockchain network :&emsp;e.g Ethereum on testnet Sepolia </span> </li>
                <li> <span className="text_about">  Programing a smart contract to interact with the blockchain network and store the quote: &emsp; Contract<a href="https://sepolia.etherscan.io/address/0x6a4d382239f8bab7a481e59a0a4a67ca33d3bbf2"> 0x6A4D382239F8BAb7A481e59A0A4A67CA33D3BBF2</a> </span></li>
                <li> Programing a backend to interact with the smart contract and retrieve quotes.  </li>
                <li> Programing a frontend to display the quotes.</li>         
            </ul>
        </article>
    )
}

export default About