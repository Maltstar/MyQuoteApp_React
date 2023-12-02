import Select from 'react-select'
import ListQuotes from './ListQuotes';
import { useState } from 'react';

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

    return(

        //  <label>List of Authors
        <>
        <h5 className='button_color'> Or <br></br>choose an author from the list to read his quotes</h5>
         <Select id="select" options={options} onChange={handleChange}/>
         {//optionSelected && 
            activateOwnerSetByUserFromList &&   /* The user made a request. i.e clicked on the button */   

            //Object.keys(quotes).length != 0 && /* quotes is not empty*/
            quotes.quotes.length > 0 && /* There is at least 1 quote to display */
            <ListQuotes /* The list of quotes fetched for the user input */ 
                        quoteslist={quotes.quotes}
                        title={author.label}
                        SetActivateOwnerSetByUser={SetActivateOwnerSetByUserFromList}
            /> 
        }
        </>
         
    //   </label>

    )
    }


