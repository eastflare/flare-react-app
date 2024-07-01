import useGoPage from 'hooks/cmn/useGoPage';
import { modals } from 'components/cmn/Layout/Modals';
import { useEffect, useState } from 'react';
import { PageProps } from 'models/cmn/page';
import useToast from 'hooks/cmn/useToast';

const MyModal = ({ onClose, callback }: PageProps) => {
  const { goModal } = useGoPage();
  const [text, setText] = useState('');
  const {myToast} = useToast();

  useEffect(() => {
    console.log('요시키 렌더링');
    return () => {
      console.log('요시키 다이');
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

  const openYoshiki = () => {
    goModal(modals.myModal1, {
      foo: 'bar',
    });
  };

  return (
    <>
      <h1>송XX</h1>
      <input type='text' value={text} onChange={onChange} />
      <h2>이력 : </h2>
      <ul>
        <li>매찾사 회원</li>
      </ul>
      <h2>별명 : </h2>
      <ul>
        <li>(구)요시키상</li>
        <li>(현)송심당 (대전거주)</li>
        <li>(향후)Sam송(미국출장시)</li>
      </ul>
      <div>
        <button onClick={openYoshiki}>요시키 에서 전선배</button>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </>
  );
};

export default MyModal;
