import axios from 'axios';
import { useRef, useState } from 'react';
import { useLoadingStore } from '../@store/loading.store';

type data = {
  resultText: string;
  resultType: string;
};

const ImageBox = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState<data>();
  const [image, setImage] = useState<any>();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const triggerFileInput = () => {
    // fileInputRef를 통해 input 요소의 클릭 이벤트를 프로그래밍 방식으로 트리거
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (e: any) => {
    try {
      const file = e.target?.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        setLoading(true);
        const res = await axios.post('http://localhost:8000/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.data) {
          setInfo({
            resultText: res.data.resultText,
            resultType: res.data.resultType,
          });
          const reader = new FileReader();
          reader.onload = function (e) {
            setImage(e?.target?.result!); // 파일 읽기 작업이 성공적으로 완료되면 이미지 소스를 업데이트
          };
          reader.readAsDataURL(file);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={'w-full h-full border'}>
      <div className={'h-3/4 grid text-center items-center cursor-pointer'} onClick={triggerFileInput}>
        {image ? <img className={'object-cover max-w-full max-h-full'} src={image} alt={'sample'} /> : <>이미지선택</>}
        <input ref={fileInputRef} className={'hidden'} type={'file'} onChange={handleFileChange} />
      </div>
      <div className={'h-1/4 text-red-500'}>
        {info && (
          <>
            <span>{info.resultText}</span>
            <span>{info.resultType}</span>
          </>
        )}
      </div>
    </div>
  );
};

export { ImageBox };
