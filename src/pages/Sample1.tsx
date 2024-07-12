import { usePageContext } from "contexts/cmn/PageContext";
import { useEffect, useState } from "react";

const Sample1 = () => {
  const [input, setInput] = useState("");
  const { aaa } = usePageContext();

  useEffect(() => {
    console.log("Sample1-->" + aaa);
  }, []);

  return (
    <div>
      <h2>Sample1</h2>
      <p>Sample1</p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
    </div>
  );
};

export default Sample1;
