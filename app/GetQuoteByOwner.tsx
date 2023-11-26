import { useState, lazy, Suspense } from "react";
//import ListQuotes from "./ListQuotes";
import Button_with_hover from './Style';
import {check_input_author,default_bytes20,lazyRetry} from './utils.js'

const ListQuotes = lazy(() => lazyRetry(() => import(/* webpackChunkName: "ListQuotes" */ './ListQuotes'), "ListQuotes"));


export default function GetQuoteByOwner({quotes,
                                        SetOwnerSetByUser,
                                        activateOwnerSetByUser,
                                        SetShowOwnerSetByUser,
                                        SetActivateOwnerSetByUser,
                                        disable=false})
{

    const title = `Author: ${quotes.author}`;
    const [emptyInput,setEmptyInput] = useState(false);



    const handleSubmit = () =>
    {
            // get author from user input
            const author_input = document.getElementById("author_input");
            const value = author_input.value;
            console.log("value",value,);


            // indicate that the user made a request for reading quotes
            SetShowOwnerSetByUser(true);

            // the user typed something
            if(author_input.value.length != 0)
            {
                // the input is right formated
                if(check_input_author(value))
                {
                    console.log("value",value,);
                    // memorizing author set by user
                    SetOwnerSetByUser(value);
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
                // indicate that the user made a request for reading quotes
                //SetShowOwnerSetByUser(true);
            }



    }
    return ( 

    <div id="menu_get_author">
    {/* <form id="quotesform" onSubmit={handleSubmit}> */}
        <input id="author_input" type="text" alt="text field to enter the author" placeholder="type the author address"/>
        <Button_with_hover disable={disable} v_align={true} onClick={handleSubmit} display="inline" text={"Read quotes from author"} alt="button to submit the author" type="submit" value="Read quotes from author"/>    
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
                quotes.quotes.length > 0 && /* There is at least 1 quote to display */
                <ListQuotes /* The list of quotes fetched for the user input */ 
                    quoteslist={quotes.quotes}
                    title={title}
                    SetActivateOwnerSetByUser={SetActivateOwnerSetByUser}
                /> 
            }
        </Suspense>



    {/* The user entered an invalid author and clicked on the button  */}
    {
        activateOwnerSetByUser &&   /* The user made a request. i.e clicked on the button */   
        !emptyInput  /* The user input is not empty */ &&
        quotes.quotes.length == 0 &&
        /* no quotes were found since the author does not exist */
        <div className="alert alert-warning"  style={ {width:"50%",margin:"auto"}} >
            Author not found. <br></br>
            Please enter a valid address for the author. <br></br>
            You may want to use "List all authors"
        </div>
    }
    
    {/* The user did not enter any input and clicked on the button  */}
    {
    activateOwnerSetByUser &&   /* The user made a request. i.e clicked on the button */   
    emptyInput  /* The user input is not empty */  &&
    <div className="alert alert-warning" role="alert"  style={ {width:"50%",margin:"auto"}}>
        No author was entered. Please enter an address for the author.
    </div>
    }

    </div>

    )
}