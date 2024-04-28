import { PropsWithChildren, ReactNode } from 'react';

type GridRowType = {
  title: string | ReactNode;
  color: 'gray' | 'green' | 'red';
};

export const GridRow = ({ children, title, color }: PropsWithChildren<GridRowType>) => {
  return (
    <div className={'row-span-1 border-b p-2 grid items-center grid-cols-4'}>
      <span className="col-span-1 font-bold text-2xl">{title}</span>
      <span className="col-span-3">
        <a
          style={{ backgroundColor: color }}
          className={`font-bold text-xl border rounded-2xl p-3 px-5 text-white shadow-2xl`}
        >
          {children}
        </a>
      </span>
    </div>
  );
};
