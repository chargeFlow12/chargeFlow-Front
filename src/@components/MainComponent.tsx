import { ImageBox } from './ImageBox';

const MainComponent = () => {
  return (
    <div className={'w-3/4 h-full p-4 grid grid-rows-4 gap-2'}>
      <div className={` row-span-3 bg-main rounded-2xl shadow-2xl`}></div>
      <div className={' row-span-1 grid grid-cols-4 rounded-2xl gap-2'}>
        <div className={'col-span-1'}>
          <ImageBox index={0} />
        </div>
        <div className={'col-span-1'}>
          <ImageBox index={1} />
        </div>
        <div className={'col-span-1'}>
          <ImageBox index={2} />
        </div>
        <div className={'col-span-1'}>
          <ImageBox index={3} />
        </div>
      </div>
    </div>
  );
};
export { MainComponent };
