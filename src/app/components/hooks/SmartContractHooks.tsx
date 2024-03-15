import { useReadContract } from 'wagmi'
import artifact from '@/gen/artifacts/infos_contract';
import { config } from '@/config/index'


const abi = artifact["abi"]
const contractAddress = artifact["address"]
 

export function useGetQuote ()
{
  const resultReadContract =  useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: 'getQuote',
    //chainId:goerli.id
    config,
  })

//  let result:[string, `0x${string}`, bigint]|[] = ["no quote fetched yet",'0x00',BigInt(0)]

  let result:[string, `0x${string}`, bigint]|undefined = undefined

  if(resultReadContract != undefined) 
    {
        if(resultReadContract.data != undefined)
        {
          result = Object.assign([], resultReadContract.data)
          console.log("result",result);
          
        }
     }

   return result
} 