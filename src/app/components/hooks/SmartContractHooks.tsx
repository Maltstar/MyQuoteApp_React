import { useReadContract } from 'wagmi'
import artifact from '@/gen/artifacts/infos_contract';
import { config } from '@/config/index'


const abi = artifact["abi"]
const contractAddress = artifact["address"]

// interface useSmartContractFunctionReadProps  {
//   functionName:FunctionNameSmartContract,
//   params ?: Address
// }

export function useSmartContractFunctionRead(functionName:FunctionNameSmartContract,params?: Address)
{
  let result:ResultType = undefined
  console.log("useSmartContractFunctionRead functionName, params",functionName, params );
  

  // either there are input parameter for the api (call to getQuotesbyOwner)
  const resultReadContract = params != undefined ? 
  useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: functionName,
     args: [params],
  
    //chainId:goerli.id
    config,
  })
  : // or none
  useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: functionName,
    config,
  })



//  let result:[string, `0x${string}`, bigint]|[] = ["no quote fetched yet",'0x00',BigInt(0)]

  
  if(resultReadContract)
    {
        if(resultReadContract.data != undefined ) 
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