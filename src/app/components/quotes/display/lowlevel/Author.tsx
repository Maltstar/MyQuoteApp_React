 
 interface AuthorProps{
    position:number,
    address:string
 }
    export default function Author({position, address}:AuthorProps)
    {

        console.log('Author: number',position);
        console.log('Author: address',address);
        
        // to do, add the ability to remove each author individually
           

            return(
                <div className="result">
                    <article>
                        
                            <h5 className="title_author">Author {position}: {address}
                            </h5>
                    </article>


                </div>
            )

    }
    
 