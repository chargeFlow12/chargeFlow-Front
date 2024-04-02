import { ImageBox } from './ImageBox';

const MainComponent = () => {
  return (
    <div className={'w-3/4 p-4 border'}>
      <div className={'h-3/4 border'}>main area</div>
      <div className={'h-1/4 border grid grid-cols-4'}>
        <div className={'col-span-1 border p-2'}>
          <ImageBox />
        </div>
        <div className={'col-span-1 border p-2'}>
          <ImageBox />
        </div>
        <div className={'col-span-1 border p-2'}>
          <ImageBox />
        </div>
        <div className={'col-span-1 border p-2'}>
          <ImageBox />
        </div>
      </div>
    </div>
  );
};
export { MainComponent };
