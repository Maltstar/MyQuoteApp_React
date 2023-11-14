export function check_input_author(author)
{
        const regx = "^0x.*S";
        let check = false;
        // checking syntax of input user as an address
        //checking the format of the input, the smart contract expect a bytes20 
        //0x566851a04fb394f9bbd4672d3429dd2a2192bd80
        // new contract with private state variable 0xc1df7fdbacecbbf1eadd6c9d20389c1235c75c8b
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

export const default_bytes20 ="0x0000000000000000000000000000000000000000"