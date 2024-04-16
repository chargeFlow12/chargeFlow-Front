import { LnbCompoent } from './@components/LnbCompoent';
import { MainComponent } from './@components/MainComponent';
import { Modal } from './@Modal/Modal';
import { useLoadingStore } from './@store/loading.store';
import { ModalPortal } from './ModalPortal';
import {useEffect} from "react";
import axios from "axios";
import qs from 'qs'
import {ChargeItem, CommonChargeItem} from "./@types/type";
import {ChargerStatus} from "./@types/enum";
import {convertTemp} from "./@utils/convert";
import {useChargeStore} from "./@store/charge.store";

function App() {
  const loading = useLoadingStore((state) => state.loading);
  const setChargeList = useChargeStore((state)=>state.setChargeList)
  useEffect(()=>{
      const queryParams = qs.stringify(
          {
              serviceKey:decodeURIComponent('bBp2FAqdVTBRbmBtB0c9ieFF%2FEdvbwtDZYE2mi4s1FGRJgAQ6dEErPlKSLhXbvqeFGYkJSs7%2FFQR6S8Lsy5ZAQ%3D%3D'),
              pageNo: 1,
              numOfRows:10,
              statId:'ME20A411',
          },
      );

      axios.get(`/B552584/EvCharger/getChargerInfo?${queryParams}`).then((res)=>{
          if(res?.data?.items![0].item){
              const list = res.data.items[0].item
              console.log(list)
              const temp:ChargeItem[] = list.map((item:any,index:number)=>{
                  if(index===3){
                      return{
                          active:true, // 원래라면 item.stat값과 차량 이미지 분석 데이터를 통해 활성여부 체크
                          chargerStatus:ChargerStatus.NONE_ELECTRIC,// 시연을 위해 static하게 구성 원래라면 item.stat값을 바라봐야됨
                          chargeStatus:convertTemp(item.chgerType,false), // 정적인 데이터라 그대로 넣어줌
                          time:1,
                          overTime: 10,
                          memberShip:false,// 차번을 이용해 확인할 계획
                      }
                  }else{
                      return{
                          active:true, // 원래라면 item.stat값과 차량 이미지 분석 데이터를 통해 활성여부 체크
                          chargerStatus:ChargerStatus.CHARGING,// 시연을 위해 static하게 구성 원래라면 item.stat값을 바라봐야됨
                          chargeStatus:convertTemp(item.chgerType,true), // 정적인 데이터라 그대로 넣어줌
                          time:1,
                          overTime:10, // 시연을 위해 static하게 구성 원래라면 item.lastTedt값을 바라봐야됨
                          memberShip:true,// 차번을 이용해 확인할 계획
                      }
                  }
              });
              setChargeList(temp);
          }
      })
  },[])
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
