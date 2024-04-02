import { LnbCompoent } from './@components/LnbCompoent';
import { MainComponent } from './@components/MainComponent';
import { Modal } from './@Modal/Modal';
import { useLoadingStore } from './@store/loading.store';
import { ModalPortal } from './ModalPortal';

function App() {
  const loading = useLoadingStore((state) => state.loading);
  return (
    <>
      <div className="App w-full h-full">
        <section className="w-full h-full flex">
          <LnbCompoent />
          <MainComponent />
        </section>
      </div>
      {<ModalPortal>{loading && <Modal />}</ModalPortal>}
    </>
  );
}

export default App;
