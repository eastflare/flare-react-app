import { modals } from "components/cmn/Layout/Modals";
import { usePageContext } from "contexts/cmn/PageContext";
import usePageNavigate from "hooks/cmn/usePageNavigate";
import { useEffect, useState } from "react";

const Sample1 = () => {
  const [input, setInput] = useState("");
  const { params, callback, close } = usePageContext();
  const { openModal } = usePageNavigate();

  useEffect(() => {
    console.log("Sample1-->" + params);
  }, []);

  const handleClick1 = () => {
    openModal(
      modals.myModal1,
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
      <button
        type='button'
        onClick={e => {
          e.preventDefault;
          callback(1, "sample1에서 콜백보냄");
        }}
      >
        콜백
      </button>
      <button
        type='button'
        onClick={e => {
          e.preventDefault;
          close();
        }}
      >
        닫기
      </button>
      <button onClick={handleClick1}>전선배</button>
    </div>
  );
};

export default Sample1;
