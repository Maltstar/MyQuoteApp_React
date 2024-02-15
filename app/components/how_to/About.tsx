function About(){

    return(
        <article id="about">
            <h3 className="about_title">What?</h3>
            <ul className="list_instructions_about">
                <li>Save relevant information, quote, thoughts and thinking in form of a text. </li>
            </ul>
            <h3 className="about_title"> Why?</h3>
                <ul className="list_instructions_about">
                    <li> Access your quote from everywhere as long as you have an internet connection </li>
                    <li> Make your quote persistent, immutable, independent of a device, and decentralized, <br></br>which means that the storage network is not under the control of a centralized entity that may shut down <br></br>or restrict access to the devices where your quote is stored. </li>
                    <li> Make the quote author identifiable and at the same time respect privacy with pseudo-anonymity.   </li>
                    <li> Make your quote resistant to censorship, nobody can filter your quote.  </li>         
                </ul>
            <br></br>
            <h3 className="about_title">How?</h3>
            <ul className="list_instructions_about">
                <li> <span className="text_about"> Using an existing blockchain network :&emsp;e.g Ethereum on testnet Goerli </span> </li>
                <li> <span className="text_about">  Programing a smart contract to interact with the blockchain network and store the quote: &emsp; Contract<a href="https://goerli.etherscan.io/address/0x869eb73925b91e230c2e6b6541cffcca2eb35103"> 0x869EB73925b91e230c2e6b6541cFfcca2eb35103</a> </span></li>
                <li> Programing a backend to interact with the smart contract and retrieve quotes.  </li>
                <li> Programing a frontend to display the quotes.</li>         
            </ul>
        </article>
    )
}

export default About