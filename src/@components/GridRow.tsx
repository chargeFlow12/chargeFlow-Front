import { PropsWithChildren } from "react"

export const GridRow=({children}:PropsWithChildren)=>{
    return(
        <div className={'row-span-1 border p-2 grid items-center grid-cols-4'}>
            {children}
        </div>
    )
}