import useToast from 'hooks/cmn/useToast';
import { PageProps } from 'models/cmn/page';
import { useEffect, useState } from 'react';

const MyModal = ({ onClose, callback }: PageProps) => {
  const [text, setText] = useState('');
  const { myToast } = useToast();

  useEffect(() => {
    console.log('국민사기꾼 렌더링');
    return () => {
      console.log('국민사기꾼 다이');
    };
  }, []);

  const handleClickSubmit = () => {
    callback?.();
    myToast('saved');
    onClose();
  };

  const handleClickCancel = () => {
    onClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <>
      <h1>김XX</h1>
      <input type='text' value={text} onChange={onChange} />
      <h2>별명 : </h2>
      <ul>
        <li>초특급 개발자</li>
        <li>김주팔</li>
        <li>을사코딩</li>
        <li>국민사기꾼</li>
        <li>KJH(거절한다)</li>
      </ul>
      <h2>준비물 : </h2>
      <ul>
        <li>180Cm 이상의 책상</li>
        <li>의자 5개 이상</li>
        <li>컵8개 이상</li>
      </ul>
      <div>
        <button
          onClick={handleClickSubmit}
          onGotPointerCapture={handleClickSubmit}
        >
          확인
        </button>
        <button
          onClick={handleClickCancel}
          onGotPointerCapture={handleClickCancel}
        >
          취소
        </button>
      </div>
    </>
  );
};

export default MyModal;
