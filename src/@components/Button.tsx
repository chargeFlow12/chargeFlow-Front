import {motion} from 'framer-motion';
import {useState} from 'react'
import {ChargeItem} from '../@types/type';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCar} from '@fortawesome/free-solid-svg-icons';
import {useSelectIndexStore} from '../@store/selectIndex.store';
import {ChargerStatus} from "../@types/enum";

type ButtonProps={
    item:ChargeItem;
    index:number;
}

export const Button=({item,index}:ButtonProps)=>{

    const [onPress,setOnPress]=useState<boolean>(false);
    const [tempPress,setPress]=useState<boolean>(false);
    const [selectIndex,setSelectIndex]=useSelectIndexStore((state)=>[state.selectIndex,state.setSelectIndex])

    const onMouseDown=()=>{
        setOnPress(true);
    }
    const onMouseUp=()=>{
        setOnPress(false);
    }

    const onMouseClick=()=>{
        selectIndex===index?setSelectIndex(undefined):setSelectIndex(index)
        
    }
    return (
        <motion.div
            className={`text-center grid border shadow-lg  cursor-pointer rounded-2xl grid-rows-3`}
            onClick={onMouseClick}
            animate={{
              boxShadow: `${selectIndex===index ? `inset 3px 5px rgba(0, 0, 0, 0.2)` : `inset 0px 0px rgba(0, 0, 0, 0.2)`}`,
            }}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            whileTap={{boxShadow:`
            ${onPress?`inset 5px 7px rgba(0, 0, 0, 0.2)`:
            selectIndex===index?`inset 3px 5px rgba(0, 0, 0, 0.2)`
            :`inset 0px 0px rgba(0, 0, 0, 0.2)`}
            `}}
          >
            <div className={'flex gap-3 items-center text-3xl justify-center row-span-2'}>
                <FontAwesomeIcon icon={faCar} size={'2xs'} />
                <div>
                    <div className={`rounded-full w-5 h-5 ${item.active ? item.chargerStatus===ChargerStatus.CHARGING? 'bg-green-500':'bg-red-500' : 'bg-black'} `} />
                </div>
            </div>
            <div className={`row-span-1 text-xl font-bold ${item.active ? item.chargerStatus===ChargerStatus.CHARGING? 'text-green-500':'text-red-500' : 'text-black'}`}>
                {item.active ? item.chargerStatus===ChargerStatus.CHARGING? '충전중':'충전상태 아님' : '비어있음'}
            </div>


          </motion.div>
    )

}