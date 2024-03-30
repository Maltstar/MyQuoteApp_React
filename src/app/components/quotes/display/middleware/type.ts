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

