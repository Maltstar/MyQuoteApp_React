 
    export default function Author({number, address})
    {

        console.log('Author: number',number);
        console.log('Author: address',address);
        
        // to do, add the ability to remove each author individually
           

            return(
                <div className="result">
                    <article>
                        
                            <h5 className="white">Author {number}: {address}
                            </h5>
                        {/* <button onClick={() => SetActivateReadQuote(false)}>
                            clear authors
                        </button> */}
                    </article>


                </div>
            )

    }
    
 