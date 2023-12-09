import Select from 'react-select'
//import ListQuotes from './ListQuotes';
import { useState, lazy, Suspense } from 'react';
import { customStylesSelect } from './Style';
import {lazyRetry} from './utils'
//import GetQuoteByOwnerList from './GetQuoteByOwnerList';

const ListQuotes = lazy(() => lazyRetry(() => import(/* webpackChunkName: "ListQuotes" */ './ListQuotes'), "ListQuotes"));

export default function GetQuoteByOwnerList({authors,
                                            quotes,
                                            activateOwnerSetByUserFromList,
                                            SetOwnerSetByUserFromList,
                                           // SetShowOwnerSetByUserFromList,
                                            SetActivateOwnerSetByUserFromList,
                                            disable=false})
    {

        const [optionSelected,setOptionSelected] = useState(false)
        const [author,setAuthor] = useState(null)
    // Dynamically create select list
        let options = [];
        authors.map((author,i) =>
        options.push({ label: `Author ${i+1}: ${author}`, value: author}),
        );

    const handleChange = (option) =>
    {
        //e.preventDefault()
        console.log(option.value);
        setAuthor(option)
        SetOwnerSetByUserFromList(option.value)
       // SetShowOwnerSetByUserFromList(true)
    
    }

    const colors = {
        "color-1" : "#0c09c7",
      "color-2" : "#8df308", 
      "color-3" : "#659de6", 
      "color-4" : "#343436", 
      "color-5" : "#498a23", 
      }

    return(

        //  <label>List of Authors
        <div id="select_menu">
        <h5 className="button_color"> Or <br></br>choose an author from the list to read his quotes</h5>
         <Select isDisabled={disable} id="select" options={options} onChange={handleChange} 
         styles={customStylesSelect}/>
         <Suspense fallback={ // display spinner until component is loaded
            <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>}
            >
            {       

                activateOwnerSetByUserFromList &&   /* The user made a request. i.e clicked on the button */   

                //Object.keys(quotes).length != 0 && /* quotes is not empty*/
                quotes.quotes.length > 0 && /* There is at least 1 quote to display */
                <ListQuotes /* The list of quotes fetched for the user input */ 
                            quoteslist={quotes.quotes}
                            title={author.label}
                            SetActivateOwnerSetByUser={SetActivateOwnerSetByUserFromList}
                /> 
            }
         </Suspense>
        </div>
         
    //   </label>

    )
    }


