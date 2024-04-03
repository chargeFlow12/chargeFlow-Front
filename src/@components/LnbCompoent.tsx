import axios from 'axios';
import { useRef } from 'react';
import { ImageBox } from './ImageBox';
import { useChargeStore } from '../@store/charge.store';
import {convertCharge, convertCharger} from "../@utils/convert";
import {motion} from 'framer-motion'

const LnbCompoent = () => {
  const chargeList = useChargeStore((state)=>state.chargeList)
  const fileInputRefs = useRef([]);

  const handleFileChange = async (e: any) => {
    const file = e.target?.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('http://localhost:8000/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
    }
  };

  return (
    <section className={'w-1/2 grid p-4 border grid-rows-2'}>
      <section className="grid grid-rows-5">
          <div className="grid row-span-1 grid-cols-4 p-4 gap-2">
            <motion.div className={`text-3xl text-center grid items-center border shadow-lg`}
            animate={{boxShadow:`${chargeList[0].active?`inset 1px 5px 1px rgba(0,0,0,0.2)`:`offset 2px 6px 2px rgba(0,0,0,0.2)`}`}}
            >1</motion.div>
              <motion.div className={`text-3xl text-center grid items-center border shadow-lg`}
                          animate={{boxShadow:`${chargeList[1].active?`inset 1px 5px 1px rgba(0,0,0,0.2)`:`offset 2px 6px 2px rgba(0,0,0,0.2)`}`}}
              >2</motion.div>
              <motion.div className={`text-3xl text-center grid items-center border shadow-lg`}
                          animate={{boxShadow:`${chargeList[2].active?`inset 1px 5px 1px rgba(0,0,0,0.2)`:`offset 2px 6px 2px rgba(0,0,0,0.2)`}`}}
              >3</motion.div>
              <motion.div className={`text-3xl text-center grid items-center border shadow-lg`}
                          animate={{boxShadow:`${chargeList[3].active?`inset 1px 5px 1px rgba(0,0,0,0.2)`:`offset 2px 6px 2px rgba(0,0,0,0.2)`}`}}
              >4</motion.div>
          </div>
          <div className="grid grid-rows-[4] row-span-3 p-4 gap-2">
            {/* 하나라도 있으면 상태:충전중 아니면 상태:비어있음 상태:비전기차 주차 */}
            <div className={'row-span-1 border p-2 flex items-center'}>
                <span>충전기상태 : </span>
                <span>{convertCharge(chargeList[0].chargerStatus)}/{convertCharge(chargeList[1].chargerStatus)}/{convertCharge(chargeList[2].chargerStatus)}/{convertCharge(chargeList[3].chargerStatus)}</span>
            </div>
            {/*  */}
            <div className={'row-span-1 border p-2 flex items-center'}>
                <span>충전상태 : </span>
                <span>{convertCharger(chargeList[0].chargeStatus)}/{convertCharger(chargeList[1].chargeStatus)}/{convertCharger(chargeList[2].chargeStatus)}/{convertCharger(chargeList[3].chargeStatus)}</span>
            </div>
            <div className={'row-span-1 border p-2 flex items-center'}>
                <span>충전 잔여시간 : </span>
                <span>{chargeList[0].time}/{chargeList[1].time}/{chargeList[2].time}/{chargeList[3].time}</span>

            </div>
          </div>
      </section>
      <section className=""></section>
    </section>
  );
};
export { LnbCompoent };
