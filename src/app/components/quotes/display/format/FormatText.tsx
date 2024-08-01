
interface FormatTextAlertProps
{
  text:string
}

export default function FormatText({text}:FormatTextAlertProps){
  
  // match all dot forms  
  const rExp: RegExp = /\.{1}|!{1}|\?{1}/gi;
   console.log("FormatTextWithoutBR text.match",text.match(rExp));
  const array = text.split(rExp)
  return( 
  <div>
  {
      
      <p className="alert">
          &#34; 
      {
          array.map((sentence,i, array) => {

             
               
              // adding a break line for all sentence
              // except the last one
              switch(i)
              {         
                  // i < array.length -1                  
                  case array.length -1:
                      // writting each sentence with "."
                      return( 
                          <span key={sentence}>
                              {sentence}
                          </span>
                          )
                  // i < array.length -2
                  default:
                      if(i < array.length -2)
                      {
                          return( 
                              // writting each sentence with "." and breakline
                              <span key={`${sentence}${i}`}>
                                  {sentence}.
                                  { 
              
                                      <br></br>
                                  } 
                              </span>
                              )
                      }
                      else
                      {
                          return( 
                              // writting each sentence with "." 
                              <span key={sentence}>
                                  {sentence}.
                              </span>
                              )
                      }
                  


              }
 
              
          })
      }
          &#34;
      </p>
  }
  
  </div>
  )
}

