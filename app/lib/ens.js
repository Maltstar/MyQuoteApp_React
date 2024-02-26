import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { addEnsContracts } from '@ensdomains/ensjs'
import { getName } from '@ensdomains/ensjs/public'

/**
 * 
 * @param {*} address: array of bytes20 
 */
async function fetch_ens_name(address)
{
    if(address.length > 0)
    {
        // https://www.npmjs.com/package/@ensdomains/ensjs
        const client = createPublicClient({
            chain: addEnsContracts(mainnet),
            transport: http(),
          })
    
          console.log('client',client);
          const result = await getName(client, {
            address: address,
          })
    
          if(result != null)
          {
    
          }
          // test 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 vitalik.eth
          console.log('ENS 0xb382696d42005e8ff0b73fb39a88c074cfda738d',result);
    }
    
}

    // // for each author, collect their quotes
    // const allENS = []
    // const promises:Array<Promise<QuoteAuthorList|undefined>> = []
    // if(allAuthors)
    // {
    //   allAuthors.map((author) => 
    //   {
    //     // create an array of promise for which each promise will be a call to getQuotesbyOwner(author) for all authors
    //     promises.push(getQuotesbyOwnerWrapper(author))
    //   });
    // }


function get_ens()
{
    const client = createPublicClient({
        chain: addEnsContracts(mainnet),
        transport: http(),
      })
}

const fetch_ens_test = () => {
    const address = ['0xb382696d42005e8ff0b73fb39a88c074cfda738d'];

     fetch_ens_name(address)
}

export default fetch_ens_test