import { ImageBox } from './ImageBox';

const MainComponent = () => {
  return (
    <div className={'w-3/4 p-4 border'}>
      <div className={`h-3/4 border bg-main`} >
      </div>
      <div className={'h-1/4 border grid grid-cols-4'}>
        <div className={'col-span-1 border p-2'}>
          <ImageBox index={0} />
        </div>
        <div className={'col-span-1 border p-2'}>
          <ImageBox index={1} />
        </div>
        <div className={'col-span-1 border p-2'}>
          <ImageBox index={2} />
        </div>
        <div className={'col-span-1 border p-2'}>
          <ImageBox index={3} />
        </div>
      </div>
    </div>
  );
};
export { MainComponent };
