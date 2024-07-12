import { usePageContext } from "contexts/cmn/PageContext";
import { useState } from "react";

const Sample5 = () => {
  const [input, setInput] = useState("");
  const { params, callback } = usePageContext();
  return (
    <div>
      <h2>Sample5 : ID, Name을 pathVariable로 수신함</h2>
      <p>id: {params.id} </p>
      <p>name: {params.name} </p>
      <p>message: {params.message} </p>
      <p>message2: {params.message2} </p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
      <button
        type='button'
        onClick={e => {
          e.preventDefault;
          callback(5, "sample5에서 콜백보냄");
        }}
      >
        콜백
      </button>
    </div>
  );
};

export default Sample5;
