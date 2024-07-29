import { useEffect, useState } from "react";
import useToast from "hooks/cmn/useToast";
import usePageNavigate from "hooks/cmn/usePageNavigate";
import { usePageContext } from "contexts/cmn/PageContext";
import { BlueButton } from "components/buttons/CustomButton";

const MyModal = () => {
  const { openModeless } = usePageNavigate();
  const { callback, close } = usePageContext();
  const [text, setText] = useState("");
  const { myToast } = useToast();

  useEffect(() => {
    console.log("전선배 렌더링");

    return () => {
      console.log("전선배 다이");
    };
  }, []);

  const handleClickSubmit = () => {
    callback();
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

  const openYoshiki = () => {
    openModeless(
      "/MyModal2",
      {
        foo: "bar",
        callback: () => {
          alert("매튜 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };

  return (
    <>
      <h1>전선배</h1>
      <input type='text' value={text} onChange={onChange} />
      <h2>이력 : </h2>
      <ul>
        <li>NPDM 수행</li>
        <li>생건PLM 수행예정</li>
      </ul>
      <h2>특기사항 : </h2>
      <ul>
        <li>매찾사 회원으로 의심됨</li>
        <li>전선배는 부업도 열심히 합니다.</li>
        <li>전선배는 재택만 합니다.</li>
        <li>PLM (WBS, BOM, ECR, ECO) 전문가</li>
        <li>베트남 전문가(BRSE)</li>
        <li>Copilot 영업사원</li>
        <li>Endless Effort</li>
      </ul>
      <div>
        <BlueButton onClick={openYoshiki} onGotPointerCapture={openYoshiki}>
          요시키상
        </BlueButton>
        <BlueButton onClick={handleClickSubmit} onGotPointerCapture={handleClickSubmit}>
          확인
        </BlueButton>
        <BlueButton onClick={handleClickCancel} onGotPointerCapture={handleClickCancel}>
          취소
        </BlueButton>
      </div>
    </>
  );
};

export default MyModal;
