import { useEffect, useState } from "react";
import useToast from "hooks/cmn/useToast";
import usePageNavigate from "hooks/cmn/usePageNavigate";
import { usePageContext } from "contexts/cmn/PageContext";
import { BlueButton } from "components/buttons/CustomButton";
import { useCommonModal } from "@/hooks/useCommonModal";

const MyModal2Page = () => {
  const { openModal, openModeless } = usePageNavigate();
  const { callback, close } = usePageContext();
  const [text, setText] = useState("");
  const { myToast } = useToast();
  const { openCommonModal } = useCommonModal();

  useEffect(() => {
    console.log("요시키 렌더링");
    return () => {
      console.log("요시키 다이");
    };
  }, []);

  const handleClickSubmit = () => {
    callback();
    myToast("saved");
    close();
  };

  const handleClickCancel = () => {
    openCommonModal({
      modalType: "confirm",
      content: "팝업 창을 닫겠습니까?",
      yesCallback: async () => {
        close();
      },
      noCallback: () => {
        return false;
      },
    });
  };

  const handleClickAlert = () => {
    alert("요시키요시키요시키");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const openJeonSenbbai = () => {
    openModeless(
      "RAP_POUP_003",
      {
        foo: "bar",
        callback: () => {
          alert("전선배 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
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
        <BlueButton onClick={openJeonSenbbai} onGotPointerCapture={openJeonSenbbai}>
          요시키 에서 전선배
        </BlueButton>
        <BlueButton onClick={handleClickSubmit} onGotPointerCapture={handleClickSubmit}>
          확인
        </BlueButton>
        <BlueButton onClick={handleClickCancel} onGotPointerCapture={handleClickCancel}>
          취소
        </BlueButton>
        <BlueButton onClick={handleClickAlert} onGotPointerCapture={handleClickAlert}>
          얼럿창
        </BlueButton>
      </div>
    </>
  );
};

export default MyModal2Page;
