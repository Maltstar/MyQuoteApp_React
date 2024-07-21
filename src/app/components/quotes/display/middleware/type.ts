export interface CommonProps
{
    SetRefreshResult: (flag: boolean) => void, 
    SetDisplayResult: (flag: boolean) => void
}


export interface CommonWithHookProps extends CommonProps
{
    refreshResult:boolean,
}

export interface DisableProps
{
    disable:boolean
}

export type alert_type = "empty_input" | "error_input"

export type  alert_message ={header:string,text:string}
