import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { LnbCompoent } from './@components/LnbCompoent';
import { MainComponent } from './@components/MainComponent';
import { Modal } from './@Modal/Modal';
import { useChargeStore } from './@store/charge.store';
import { useLoadingStore } from './@store/loading.store';
import { useSelectIndexStore } from './@store/selectIndex.store';
import { ChargerStatus } from './@types/enum';
import { ChargeItem } from './@types/type';
import { convertTemp } from './@utils/convert';
import { TempUploadImage } from './@utils/uploadImage';
import { ModalPortal } from './ModalPortal';

function App() {
  const loading = useLoadingStore((state) => state.loading);
  const [chargeList,setChargeList] = useChargeStore((state) => [state.chargeList,state.setChargeList]);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setIndex = useSelectIndexStore((state) => state.setSelectIndex);

  useEffect(() => {
    const queryParams = qs.stringify({
      serviceKey: decodeURIComponent(
        'bBp2FAqdVTBRbmBtB0c9ieFF%2FEdvbwtDZYE2mi4s1FGRJgAQ6dEErPlKSLhXbvqeFGYkJSs7%2FFQR6S8Lsy5ZAQ%3D%3D',
      ),
      pageNo: 1,
      numOfRows: 10,
      statId: 'ME20A411',
    });
    setLoading(true);
    axios.get(`/B552584/EvCharger/getChargerInfo?${queryParams}`).then((res) => {
      if (res?.data?.items![0].item) {
        const list = res.data.items[0].item;

        // 시연을 위해 가라 이미지

        const one = TempUploadImage('/assets/one.jpeg');
        const two = TempUploadImage('/assets/two.jpg');
        const three = TempUploadImage('/assets/three.jpeg');
        
        Promise.all([one,two,three])
          .then((image) => {
            if (image && list) {
              const chargeItems: ChargeItem[] = list.map((item: any, index: number) => {
                if (index === 3) {
                  // return {
                  //   active: true, // 원래라면 item.stat값과 차량 이미지 분석 데이터를 통해 활성여부 체크
                  //   chargerStatus: ChargerStatus.NONE_ELECTRIC, // 시연을 위해 static하게 구성 원래라면 item.stat값을 바라봐야됨
                  //   chargeStatus: convertTemp(item.chgerType, false), // 정적인 데이터라 그대로 넣어줌
                  //   time: 1,
                  //   overTime: 10,
                  //   memberShip: false, // 차번을 이용해 확인할 계획
                  //   carNo: image[index].resultText,
                  //   carType: image[index].resultType,
                  //   imageUrl: image[index].url,
                  // };
                } else {
                  return {
                    active: true, // 원래라면 item.stat값과 차량 이미지 분석 데이터를 통해 활성여부 체크
                    chargerStatus: image[index]?.resultType==='Electric'?ChargerStatus.CHARGING:ChargerStatus.NONE_ELECTRIC, // 시연을 위해 static하게 구성 원래라면 item.stat값을 바라봐야됨
                    chargeStatus: convertTemp(item.chgerType, image[index]?.resultType==='Electric'), // 정적인 데이터라 그대로 넣어줌
                    time: image[index]?.resultType==='Electric'?1:0,
                    overTime: 10, // 시연을 위해 static하게 구성 원래라면 item.lastTedt값을 바라봐야됨
                    memberShip: true, // 차번을 이용해 확인할 계획
                    carNo: image[index].resultText,
                    carType: image[index].resultType,
                    imageUrl: image[index].url,
                  };
                }
              });
              const newChargeList= chargeList.map((item,index)=>{
                if(chargeItems[index]){
                  return chargeItems[index]
                }else {
                  return item
                }
              })
              setChargeList(newChargeList);
              setIndex(0);
            }
          })
          .catch((error) => console.error(error))
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }, []);
  return (
    <>
      <div className="App w-full h-full bg-gray-100">
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
