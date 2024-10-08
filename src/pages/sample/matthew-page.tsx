import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useToast from "hooks/cmn/useToast";
import { usePageContext } from "contexts/PageContext";
import { BlueButton } from "components/buttons/CustomButton";

const MatthewDiv = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("Matthew.png");
  background-size: contain;
  background-repeat: no-repeat;
`;

const MatthewPage = () => {
  const [text, setText] = useState("");
  const { myToast } = useToast();
  const { callback, close } = usePageContext();

  useEffect(() => {
    console.log("매튜 렌더링");

    return () => {
      console.log("매튜 다이");
    };
  }, []);

  const handleClickSubmit = () => {
    callback?.();
    myToast("saved");
    close();
  };

  const handleClickCancel = () => {
    close();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <MatthewDiv>
      <h1>매튜</h1>
      <input type='text' value={text} onChange={onChange} />
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
        <BlueButton onClick={handleClickSubmit} onGotPointerCapture={handleClickSubmit}>
          확인
        </BlueButton>
        <BlueButton onClick={handleClickCancel} onGotPointerCapture={handleClickCancel}>
          취소
        </BlueButton>
      </div>
    </MatthewDiv>
  );
};

export default MatthewPage;
