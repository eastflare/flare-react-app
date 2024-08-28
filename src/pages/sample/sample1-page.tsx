import { BlueButton } from "components/buttons/CustomButton";
import { usePageContext } from "contexts/PageContext";
import usePageNavigate from "hooks/layout/usePageNavigate";
import { useEffect, useState } from "react";

const Sample1Page = () => {
  const [input, setInput] = useState("");
  const { params, callback, close } = usePageContext();
  const { openModal } = usePageNavigate();

  useEffect(() => {
    console.log("Sample1-->" + params);
  }, []);

  const handleClick1 = () => {
    openModal(
      "/sample/my-modal1",
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
    <div>
      <h2>Sample1</h2>
      <p>Sample1</p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
      <BlueButton
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault;
          callback(1, "sample1에서 콜백보냄");
        }}
      >
        콜백
      </BlueButton>
      <BlueButton
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault;
          close();
        }}
      >
        닫기
      </BlueButton>
      <BlueButton onClick={handleClick1}>전선배</BlueButton>
    </div>
  );
};

export default Sample1Page;
