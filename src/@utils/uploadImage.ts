import axios from 'axios';

export const TempUploadImage = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  // FormData 객체 생성 및 이미지 추가
  const formData = new FormData();
  formData.append('image', blob, 'image.jpg');
  // const formData = new FormData();
  // formData.append('image', image,'ee');

  const res = await axios.post('http://localhost:8000/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (res.data) {
    return {
      ...res.data,
      url: response.url,
    };
  } else {
    return null;
  }
};
