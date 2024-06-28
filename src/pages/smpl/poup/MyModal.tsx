import toast from "hooks/cmn/useToast";
import { useEffect, useState } from "react";

interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

const MyModal = ({ onSubmit, onClose }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("최루팡 렌더링가링가링......");

    return () => { console.log("최루팡 다이"); };
  }, []);

  const handleClickSubmit = () => {
    onSubmit();
  };

  const handleClickCancel = () => {
    toast("saved"); 
    onClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <>
      <h1>최XX</h1>
      <input type="text" value={text} onChange={onChange} />
      <h2>이력 : </h2>
      <ul>
        <li>도토리 받고 개발 전문</li>
        <li>알고리즘 전문가</li>
      </ul>
      <h2>별명 : </h2>
      <ul>
        <li>개NullNull</li>
        <li>월급루팡</li>
      </ul>
      <div>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </>
  );
};

export default MyModal;
