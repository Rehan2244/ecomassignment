import { ReactElement } from "react"

export interface IComponent{
    isHeaderEnabled?:boolean
}

export interface IRootComponent{
    header:React.ComponentType<any>,
}