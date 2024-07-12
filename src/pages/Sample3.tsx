import { usePageContext } from "contexts/cmn/PageContext";
import { useEffect, useState } from "react";

const Sample3 = () => {
  const [input, setInput] = useState("");
  const { params, callback } = usePageContext();

  useEffect(() => {
    console.log("Sample2-->" + params);
  }, []);

  return (
    <div>
      <h2>Sample3</h2>
      <p>Sample3</p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
      <button
        type='button'
        onClick={e => {
          e.preventDefault;
          callback(3, "sample3에서 콜백보냄");
        }}
      >
        콜백
      </button>
    </div>
  );
};

export default Sample3;
