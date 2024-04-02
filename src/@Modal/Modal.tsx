const Modal = () => {
  return (
    <div className={'w-full h-full absolute left-0 top-0'}>
      {/*background*/}
      <div className={'w-full h-full bg-black opacity-70 grid'}>
        <div
          className={
            'w-80 h-40 rounded-2xl bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] grid justify-center items-center align-middle'
          }
        >
          <div className={'grid justify-center items-center align-middle'}>
            <div className="loading-spinner"></div>
          </div>
          <div className={'font-bold text-xl text-black text-center'}>
            <p>이미지 처리중입니다.</p>
            <p>잠시만 기다려주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export { Modal };
