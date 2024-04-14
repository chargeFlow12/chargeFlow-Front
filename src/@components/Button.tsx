import { motion } from 'framer-motion';
import {useState} from 'react'
import { ChargeItem } from '../@types/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { useSelectIndexStore } from '../@store/selectIndex.store';

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
            className={`text-3xl text-center flex gap-3 items-center border shadow-lg justify-center cursor-pointer`}
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
            <FontAwesomeIcon icon={faCar} size={'2xs'} />
            <div>
              <div className={`rounded-full w-5 h-5 ${item.active ? 'bg-green-500' : 'bg-red-500'} `} />
            </div>
          </motion.div>
    )

}