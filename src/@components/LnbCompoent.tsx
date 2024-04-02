import axios from 'axios';
import { useRef } from 'react';
import { ImageBox } from './ImageBox';

const LnbCompoent = () => {
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
    <section className={'w-1/4 grid-rows-4 grid p-4 border gap-4'}>
      <div className={'row-span-1 border p-2'}>
          차주멤버십
      </div>
      <div className={'row-span-1 border p-2'}>
          관측동의여부
      </div>
      <div className={'row-span-1 border p-2'}>
        평균초과시간
      </div>
      <div className={'row-span-1 border p-2'}>
        전기차 여부
      </div>
    </section>
  );
};
export { LnbCompoent };
