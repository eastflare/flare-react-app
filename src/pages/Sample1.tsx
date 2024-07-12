import { usePageContext } from "contexts/cmn/PageContext";
import { useEffect, useState } from "react";

const Sample1 = () => {
  const [input, setInput] = useState("");
  const { params, callback } = usePageContext();

  useEffect(() => {
    console.log("Sample1-->" + params);
  }, []);

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
    </div>
  );
};

export default Sample1;
