import { useReadContract } from 'wagmi'
import artifact from '@/gen/artifacts/infos_contract';
import { config } from '@/config/index'


const abi = artifact["abi"]
const contractAddress = artifact["address"]



export function useSmartContractFunction(functionName:FunctionNameSmartContract)
{
  let result:ResultGetQuoteType|ResultGetAllAuthorsType|undefined = undefined

  const resultReadContract =  useReadContract({
    abi: abi,
    address: contractAddress,
    //functionName: functionName,
    functionName: functionName,
    //chainId:goerli.id
    config,
  })

//  let result:[string, `0x${string}`, bigint]|[] = ["no quote fetched yet",'0x00',BigInt(0)]

  
  if(resultReadContract != undefined) 
    {
        if(resultReadContract.data != undefined)
        {
          result = Object.assign([], resultReadContract.data)
          console.log("result",result);
          console.log("typeof result",typeof result);
          
        }
     }

   return result
}

// export function useAllAuthors ()
// {
//   const resultReadContract =  useReadContract({
//     abi: abi,
//     address: contractAddress,
//     functionName: 'getAllAuthors',
//     //chainId:goerli.id
//     config,
//   })

// //  let result:[string, `0x${string}`, bigint]|[] = ["no quote fetched yet",'0x00',BigInt(0)]

//   let result:`0x${string}`[]|undefined = undefined

//   if(resultReadContract != undefined) 
//     {
//         if(resultReadContract.data != undefined)
//         {
//           result = Object.assign([],resultReadContract.data)
//           console.log("result",result);
          
//         }
//      }

//    return result
// } 