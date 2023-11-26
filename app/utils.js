
/**
 * 
 * @param {*} author the user input for the author
 * @returns  true if user input matches an ethereum address format, false otherwise
 */
export function check_input_author(author)
{
        const regx = "^0x.*S";
        let check = false;
        // checking syntax of input user as an ethereum address
        //checking the format of the input, the smart contract expect a bytes20 
        if(author.search(regx))
        {
            console.log(author.length);
            if(author.length == 42)
            {
                // call the smart contract with a default 20 bytes
                check = true;
            }
        }

        console.log('check',check);
        return check;
}

/**
 *  default dummy address to call the smart contract from
 *  when user input does not match an address format 
 */
export const default_bytes20 ="0x0000000000000000000000000000000000000000"


// a function to retry loading a chunk to avoid chunk load error for out of date code
// see https://www.codemzy.com/blog/fix-chunkloaderror-react
/**
 * 
 * @param {*} componentImport the module to import
 * @param {*} name the name of the module to identify which module was refreshed or not
 * @returns 
 */
export const lazyRetry = function(componentImport, name) {
    return new Promise((resolve, reject) => {
        // check if the window has already been refreshed
        const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem(`retry-${name}-refreshed`) || 'false'
        );
        // try to import the component
        componentImport().then((component) => {
            window.sessionStorage.setItem(`retry-${name}-refreshed`, 'false'); // success so reset the refresh
            resolve(component);
        }).catch((error) => {
            if (!hasRefreshed) { // not been refreshed yet
                window.sessionStorage.setItem(`retry-${name}-refreshed`, 'true'); // we are now going to refresh
                return window.location.reload(); // refresh the page
            }
            reject(error); // Default error behaviour as already tried refresh
        });
    });
}