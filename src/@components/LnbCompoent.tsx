import axios from 'axios';
import { useEffect, useState } from 'react';
import { useChargeStore } from '../@store/charge.store';
import { useSelectIndexStore } from '../@store/selectIndex.store';
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

  return (
    <section className={'w-1/2 grid p-4 border grid-rows-5 bg-gray-100 gap-4 font-medium'}>
      <section className="grid grid-rows-2 row-span-1 gap-2 bg-white rounded-2xl p-4">
        {/*충전소 상태*/}
        <GridRow title={'전체 혼잡도'}>{convertCongestion(congestion)}</GridRow>
        <GridRow title={'충전소 상태'}>급송 충전기 평균 오버타임 52분 / 완속 충전기 평균 오버타임 9시간</GridRow>
      </section>
      <section className="grid grid-rows-5 row-span-4 bg-white rounded-2xl">
        <div className={'row-span-1 grid grid-rows-4  p-2'}>
          <div className={'grid row-span-1 text-lg font-extrabold items-center px-4 py-4'}>충전기별 상태</div>
          <div className="grid row-span-3 grid-cols-4 p-4 gap-2">
            <Button item={chargeList[0]} index={0} />
            <Button item={chargeList[1]} index={1} />
            <Button item={chargeList[2]} index={2} />
            <Button item={chargeList[3]} index={3} />
          </div>
        </div>

        <div className="row-span-5 grid grid-rows-[3] row-span-3 p-4 gap-2">
          {/* 하나라도 있으면 상태:충전중 아니면 상태:비어있음 상태:비전기차 주차 */}
          <GridRow title={'충전기상태'}>
            {checkBoolean() ? '' : convertCharge(chargeList[selectIndex!].chargerStatus)}
          </GridRow>
          {/*  */}
          <GridRow title={'충전상태'}>
            {checkBoolean() ? '' : convertCharger(chargeList[selectIndex!].chargeStatus)}
          </GridRow>
          <GridRow title={'충전 잔여시간'}>{checkBoolean() ? '' : chargeList[selectIndex!].time}</GridRow>
          <GridRow title={'멤버쉽 동의 여부'}>
            <div className={'inline-block rounded-2xl border'}>
              <button
                className={`rounded-2xl w-20 h-10 ${chargeList[selectIndex!]?.memberShip ? 'bg-blue-500 text-white border-blue-500' : ''}`}
              >
                동의
              </button>
              <button
                className={`rounded-2xl w-20 h-10 ${!chargeList[selectIndex!]?.memberShip ? 'bg-blue-500 text-white border-blue-500' : ''}`}
              >
                미동의
              </button>
            </div>
          </GridRow>
          <GridRow title={'오버타임'}>
            {checkBoolean()
              ? ''
              : convertOverTime(chargeList[selectIndex!]?.chargeStatus!, chargeList[selectIndex!]?.overTime!)}
          </GridRow>
          <GridRow title={'차번 및 차종'}>
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
