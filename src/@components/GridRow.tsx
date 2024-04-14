import {PropsWithChildren, ReactNode} from "react"

type GridRowType={
    title:string|ReactNode
}

export const GridRow=({children,title}:PropsWithChildren<GridRowType>)=>{
    return(
        <div className={'row-span-1 border-b p-2 grid items-center grid-cols-4 '}>
            <span className='col-span-1 font-extrabold text-lg'>{title}</span>
            <span className='col-span-3'>
                {children}
            </span>

        </div>
    )
}