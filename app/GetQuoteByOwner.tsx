import { useState, lazy, Suspense } from "react";
//import ListQuotes from "./ListQuotes";
import Button_with_hover from './Style';
import {check_input_author,default_bytes20,lazyRetry} from './utils.js'

const ListQuotes = lazy(() => lazyRetry(() => import(/* webpackChunkName: "ListQuotes" */ './ListQuotes'), "ListQuotes"));

interface GetQuoteByOwnerProps{
    quotes: QuoteAuthorList | undefined,
    SetOwnerSetByUser: (owner:string) => void,
    activateOwnerSetByUser:  boolean,
    SetShowOwnerSetByUser: (flag: boolean) => void ,
    SetActivateOwnerSetByUser: (flag: boolean) => void,
    disable:boolean
}

/**
 * 
 * @param quotes list of quotes of a specific author
 * @param SetOwnerSetByUser function to memorize the author set by the user in App
 * @param activateOwnerSetByUser  indicate all quotes for the author have been fetched and stored
 * @param SetShowOwnerSetByUser  function to set user flag in Form to trigger a call to GetQuotesByOwner api from App
 * @param SetActivateOwnerSetByUser function to reset fetch flag once all quotes for the author 
 *                                  have been displayed and the user request to clear all quotes
 * @param disable button disabled 
 * @returns 
 */
export default function GetQuoteByOwner({quotes,
                                        SetOwnerSetByUser,
                                        activateOwnerSetByUser,
                                        SetShowOwnerSetByUser,
                                        SetActivateOwnerSetByUser,
                                        disable=false}:GetQuoteByOwnerProps)
{

    
    const [emptyInput,setEmptyInput] = useState(false);
    //const title = `Author: ${quotes.author}`;



    const handleSubmit = () =>
    {
            // get author from user input
            const author_input = document.getElementById("author_input") as HTMLInputElement | null;;
            let value: string;
            if(author_input != null)
            {
                value = author_input.value;
            }
            
            //console.log("value",value);


            // indicate that the user made a request for reading quotes
            SetShowOwnerSetByUser(true);

            if(author_input != null)
            {

                // the user typed something
                if(author_input.value.length != 0)
                {
                    // the input is right formated
                    if(check_input_author(author_input.value))
                    {
                        console.log("value",author_input.value,);
                        // memorizing author set by user
                        SetOwnerSetByUser(author_input.value);
                        //setEmptyInput(false);
                    }
                    else
                    {
                        // memorizing author set by user
                        // call the smart contract with a default 20 bytes since they are no record for a bad formated input
                        SetOwnerSetByUser(default_bytes20);
                    }

                    setEmptyInput(false);

                }
                else
                {
                    setEmptyInput(true);
                }
            }



    }
    return ( 

    <div id="menu_get_author">
    {/* <form id="quotesform" onSubmit={handleSubmit}> */}
        <input id="author_input" type="text" alt="text field to enter the author" placeholder="type the author address"/>
        <Button_with_hover 
            disable={disable}
            v_align={true}
            onClick={handleSubmit}
            display="inline"
            text={"Read quotes from author"}
            //alt="button to submit the author"
           // type="submit"
            value="Read quotes from author"/>    
        {/* <input alt="button to submit the author" type="submit" placeholder="Read quotes from author"/> */}
    {/* </form> */}

        {/* The user entered a valid author and clicked on the button  */}
        <Suspense fallback={ // display spinner until component is loaded
        <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>}
        >
            {
                activateOwnerSetByUser &&   /* The user made a request. i.e clicked on the button */   
                !emptyInput  /* The user input is not empty */ &&
                quotes != undefined &&
                quotes.quotes.length > 0 && /* There is at least 1 quote to display */
                <ListQuotes /* The list of quotes fetched for the user input */ 
                    quoteslist={quotes.quotes}
                    title={`Author: ${quotes.author}`}
                    SetActivateOwnerSetByUser={SetActivateOwnerSetByUser}
                /> 
            }
        </Suspense>



    {/* The user entered an invalid author and clicked on the button  */}
    {
        activateOwnerSetByUser &&   /* The user made a request. i.e clicked on the button */   
        !emptyInput  /* The user input is not empty */ &&
        quotes != undefined &&
        quotes.quotes.length == 0 &&
        /* no quotes were found since the author does not exist */
        <div className="alert alert-warning alert-dismissible fade show"  role="alert" style={ {width:"50%",margin:"auto"}} >
            Author not found. <br></br>
            Please enter a valid address for the author. <br></br>
            You may want to use "List all authors"
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
			  	<span aria-hidden="true">&times;</span>
			</button>

        </div>
    }
    
    {/* The user did not enter any input and clicked on the button  */}
    {
    activateOwnerSetByUser &&   /* The user made a request. i.e clicked on the button */   
    emptyInput  /* The user input is not empty */  &&
    <>
        <div className="alert alert-warning alert-dismissible fade show" role="alert"  style={ {width:"50%",margin:"auto"}}>
        No author was entered. Please enter an address for the author.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
			{/* <span aria-hidden="True">&times;</span> */}
		</button>
        
    </div>

    </>

        }

    </div>

    )
}