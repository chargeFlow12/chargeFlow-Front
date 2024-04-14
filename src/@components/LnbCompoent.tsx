import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useChargeStore } from '../@store/charge.store';
import { convertCharge, convertCharger } from '../@utils/convert';
import { Button } from './Button';
import { useSelectIndexStore } from '../@store/selectIndex.store';
import { GridRow } from './GridRow';

const LnbCompoent = () => {
  const chargeList = useChargeStore((state) => state.chargeList);
  const selectIndex = useSelectIndexStore((state)=>state.selectIndex)
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

  const checkBoolean=()=>{
   return selectIndex!==0&&!selectIndex&&!chargeList[selectIndex!]?.active
  }

  return (
    <section className={'w-1/2 grid p-4 border grid-rows-2'}>
      <section className="grid grid-rows-5">
        <div className="grid row-span-1 grid-cols-4 p-4 gap-2">
          <Button item={chargeList[0]} index={0}/>
          <Button item={chargeList[1]} index={1}/>
          <Button item={chargeList[2]} index={2}/>
          <Button item={chargeList[3]} index={3}/>
        </div>
        <div className="grid grid-rows-[4] row-span-3 p-4 gap-2">
          {/* 하나라도 있으면 상태:충전중 아니면 상태:비어있음 상태:비전기차 주차 */}
          <GridRow>
            <span className='col-span-1'>충전기상태</span>
            <span className='col-span-3'>
              {checkBoolean()?'':convertCharge(chargeList[selectIndex!].chargerStatus)}
            </span>
          </GridRow>
          {/*  */}
          <GridRow>
            <span className='col-span-1'>충전상태</span>
            <span className='col-span-3'>
            {checkBoolean()?'':convertCharger(chargeList[selectIndex!].chargeStatus)}
            </span>
          </GridRow>
          <GridRow>
            <span className='col-span-1'>충전 잔여시간</span>
            <span className='col-span-3'>
              {checkBoolean()?'':chargeList[selectIndex!].time}
            </span>
          </GridRow>
          <GridRow>
            <span className='col-span-1'>멤버쉽 동의 여부</span>
            <span className='col-span-3'>
              <input type="checkbox" checked={chargeList[selectIndex!]?.memberShip!}/>
              </span>
          </GridRow>
          <GridRow>
            <span className='col-span-1'>오버타임</span>
            <span className='col-span-3'>
              {selectIndex===undefined?'':'급속 1시간/완속 10시간'}
            </span>
          </GridRow>
          <GridRow>
            <span className='col-span-1'>차번 및 차종</span>
            <span className='col-span-3'>{selectIndex!==undefined&&!chargeList[selectIndex!]?.carNo?'':`${chargeList[selectIndex!]?.carNo!}/${chargeList[selectIndex!]?.carType!}`}</span>
          </GridRow>
        </div>
      </section>
      <section className="">
      </section>
    </section>
  );
};
export { LnbCompoent };
