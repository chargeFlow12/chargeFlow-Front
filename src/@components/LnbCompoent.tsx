import { faCarOn, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useChargeStore } from '../@store/charge.store';
import { useSelectIndexStore } from '../@store/selectIndex.store';
import { ChargerStatus } from '../@types/enum';
import { convertCharge, convertCharger, convertCongestion, convertOverTime } from '../@utils/convert';
import { Button } from './Button';
import { GridRow } from './GridRow';

const LnbCompoent = () => {
  const chargeList = useChargeStore((state) => state.chargeList);
  const selectIndex = useSelectIndexStore((state) => state.selectIndex);
  const [congestion, setCongestion] = useState<number>(0);

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
    }
  };

  const checkBoolean = () => {
    return selectIndex !== 0 && !selectIndex && !chargeList[selectIndex!]?.active;
  };

  useEffect(() => {
    const activList = chargeList.filter((item) => item.active);
    const _congestion = activList.length / chargeList.length;
    setCongestion(_congestion);
  }, [chargeList]);

  const switchColor = useMemo((): 'gray' | 'green' | 'red' => {
    if (!chargeList[selectIndex!]?.active) {
      return 'gray';
    } else if (chargeList[selectIndex!]?.chargerStatus === ChargerStatus.CHARGING) {
      return 'green';
    } else return 'red';
  }, [selectIndex, chargeList]);

  return (
    <section className={'w-1/2 grid p-4 grid-rows-5 gap-4 font-medium'}>
      <section className="grid grid-cols-2 row-span-1 gap-2 bg-white rounded-2xl p-4 shadow-2xl">
        {/*충전소 상태*/}

        <div className={'w-full h-full col-span-1 grid grid-rows-2 items-center text-center border-r '}>
          <div className={'text-4xl font-extrabold gap-2 flex text-green-600 justify-center row-span-1'}>
            <FontAwesomeIcon icon={faCarOn} />
            전체 혼잡도
          </div>
          <div className={'w-full text-2xl font-bold grid items-center row-span-1'}>
            <span>{convertCongestion(congestion)}</span>
            <div className={'w-full px-10'}>
              <div className={'w-[70%]] h-6 rounded-2xl border'}>
                <div style={{ width: `${congestion * 100}%` }} className={'bg-green-500 h-full rounded-2xl'} />
              </div>
            </div>
            <span className={'text-lg text-gray-400'}>{congestion * 100}% 사용중</span>
          </div>
        </div>
        <div className="col-span-1 grid grid-rows-2 items-center justify-center text-center">
          <div className={'text-4xl font-extrabold gap-2 flex text-green-600 row-span-1'}>
            <span>
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </span>
            <span>충전소 평균오버타임</span>
          </div>
          <div className={'text-2xl row-span-1'}>
            <a className={'font-bold'}>급속 충전기</a> <a className={'text-gray-600'}>평균 오버타임</a>{' '}
            <a className={'font-bold'}>52분</a> <br />
            <a className={'font-bold'}>완속 충전기</a>
            <a className={'text-gray-600'}> 평균 오버타임</a> <a className={'font-bold'}>9시간</a>
          </div>
        </div>
        {/*<GridRow title={'전체 혼잡도'}>{convertCongestion(congestion)}</GridRow>*/}
        {/*<GridRow title={'충전소 평균오버타임'}>급송 충전기 평균 오버타임 52분  완속 충전기 평균 오버타임 9시간</GridRow>*/}
      </section>
      <section className="grid grid-rows-5 row-span-4 bg-white rounded-2xl shadow-2xl">
        <div className={'row-span-1 grid grid-rows-4  p-2'}>
          <div className={'grid row-span-1 text-2xl font-extrabold items-center px-4 py-4'}>충전기별 상태</div>
          <div className="grid row-span-3 grid-cols-4 p-4 gap-2">
            <Button item={chargeList[0]} index={0} />
            <Button item={chargeList[1]} index={1} />
            <Button item={chargeList[2]} index={2} />
            <Button item={chargeList[3]} index={3} />
          </div>
        </div>

        <div className="row-span-5 grid grid-rows-[3] row-span-3 p-4 gap-2">
          {/* 하나라도 있으면 상태:충전중 아니면 상태:비어있음 상태:비전기차 주차 */}
          <GridRow title={'충전기상태'} color={switchColor}>
            {checkBoolean() ? '' : convertCharge(chargeList[selectIndex!].chargerStatus)}
          </GridRow>
          {/*  */}
          <GridRow title={'충전기 종류'} color={switchColor}>
            {checkBoolean() ? '' : convertCharger(chargeList[selectIndex!].chargeStatus)}
          </GridRow>
          <GridRow title={'충전 잔여시간'} color={switchColor}>
            {checkBoolean() ? '' : chargeList[selectIndex!].time}
          </GridRow>
          <GridRow title={'오버타임'} color={switchColor}>
            {checkBoolean()
              ? ''
              : convertOverTime(chargeList[selectIndex!]?.chargeStatus!, chargeList[selectIndex!]?.overTime!)}
          </GridRow>
          <GridRow title={'차번 및 차종'} color={switchColor}>
            {selectIndex !== undefined && !chargeList[selectIndex!]?.carNo
              ? ''
              : `${chargeList[selectIndex!]?.carNo!}/${chargeList[selectIndex!]?.carType!}`}
          </GridRow>
        </div>
      </section>
    </section>
  );
};
export { LnbCompoent };
