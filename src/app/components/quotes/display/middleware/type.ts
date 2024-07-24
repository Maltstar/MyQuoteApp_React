export interface CommonProps
{
    SetRefreshResult: (flag: boolean) => void, // a user made a request to update the component
    SetDisplayResult: ((flag: boolean) => void) | null  // close current component from parent component
}


export interface CommonWithHookProps extends CommonProps
{
    refreshResult:boolean, // udpate requested by user
}

export interface DisableProps
{
    disable:boolean // disable button so that possible bugs are avoided
}

export type alert_type = "empty_input" | "error_input"

export type  alert_message ={header:string,text:string}
