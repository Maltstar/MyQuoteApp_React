
import GetCurrentQuoteWrapper from '../display/middleware/GetCurrentQuoteWrapper';
import { CommonWithHookProps } from '../display/middleware/type';
import GetAllAuthorsWrapper from '../display/middleware/GetAllAuthorsWrapper';
import GetQuotesbyOwnerWrapper from '../display/middleware/GetQuotesbyOwnerWrapper';
import GetAllQuotesWrapper from '../display/middleware/GetAllQuotesWrapper';
import { GetMostRecentQuoteWrapper } from '../display/middleware/GetMostRecentQuoteWrapper';
import SetQuoteWrapper from '../display/middleware/SetQuoteWrapper';
    


export interface ApiHookWrapperProps extends CommonWithHookProps{
        apiName:FunctionNameRead | FunctionNameWrite, // the name of the smart contract function to call

    }

        /**
     * Display the last quote of the last new author
     * 
     * @param quote last quote of the last new author 
     * @param title title of the section
     * @param SetActivateReadQuote enable or disable the display of the quote fron the parent component
     * @returns 
     */
    
    //    export default function ApiHookWrapper({apiName,refreshQuote,SetRefreshQuote,SetDisplayQuote}:ApiHookWrapperProps)
    export default function ApiHookWrapper({apiName,...rest}:ApiHookWrapperProps)
    {
           
            return(
                <>
                    {(() => {
                    switch (apiName) {
                    
                      case 'getQuote':
                        return <GetCurrentQuoteWrapper {...rest } />
                      
                      case 'getAllAuthors':
                        return <GetAllAuthorsWrapper {...rest } /> 

                      case 'getAllQuotes':
                          return <GetAllQuotesWrapper {...rest } /> 
                      
                      case 'getQuotesbyOwner': case 'getQuotesbyOwnerList':
                        return <GetQuotesbyOwnerWrapper {...rest }/>                         

                      case 'getMostRecentQuote':
                          return <GetMostRecentQuoteWrapper {...rest } /> 

                      case 'setQuote':
                            return <SetQuoteWrapper {...rest } />

                      default:
                        return null
                    }
                  })()}
                </>

            )

    }
