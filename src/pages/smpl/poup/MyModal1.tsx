import { modals } from 'components/cmn/Layout/Modals';
import { useEffect, useState } from 'react';
import useGoPage from 'hooks/cmn/useGoPage';
import { PageProps } from 'models/cmn/page';

const MyModal = ({ onClose, callback }: PageProps) => {
  const { goModal } = useGoPage();
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('전선배 렌더링');

    return () => {
      console.log('전선배 다이');
    };
  }, []);

  const handleClickSubmit = () => {
    callback?.();
  };

  const handleClickCancel = () => {
    onClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const openYoshiki = () => {
    goModal(modals.myModal2, {
      onSubmit: () => {
        alert('요시키상 어제 송심당에서 저녁먹음');
      },
      foo: 'bar',
    });
  };

  return (
    <>
      <h1>전선배</h1>
      <input type='text' value={text} onChange={onChange} />
      <h2>이력 : </h2>
      <ul>
        <li>NPDM 수행</li>
      </ul>
      <h2>특기사항 : </h2>
      <ul>
        <li>BRSE</li>
        <li>PLM (WBS, BOM, ECR, ECO) 전문가</li>
        <li>베트남 전문가</li>
      </ul>
      <div>
        <button onClick={openYoshiki}>요시키상</button>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </>
  );
};

export default MyModal;
