 
    export default function Author({number, address})
    {

        console.log('Author: number',number);
        console.log('Author: address',address);
        
        // to do, add the ability to remove each author individually
           

            return(
                <div className="result">
                    <article>
                        
                            <h3>
                                Author {number}: {address}
                            </h3>
                        {/* <button onClick={() => SetActivateReadQuote(false)}>
                            clear authors
                        </button> */}
                    </article>


                </div>
            )

    }
    
 