import toast from "hooks/cmn/useToast";
import { useEffect, useState } from "react";

interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

const MyModal = ({ onSubmit, onClose }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("매튜 렌더링");

    return () => {
      console.log("매튜 다이");
    };
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
      <h1>매튜</h1>
      <input type="text" value={text} onChange={onChange} />
      <h2>이력 : </h2>
      <ul>
        <li>빌드센터 출신</li>
        <li>AM 강사</li>
      </ul>
      <h2>특기사항 : </h2>
        <ul>
            <li>React 전문가</li>
            <li>디지몬세상을 구함</li>
            <li>선택받은 아이</li>
        </ul>
      <div>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </>
  );
};

export default MyModal;
