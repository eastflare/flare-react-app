import { BlueButton } from "components/buttons/CustomButton";
import { usePageContext } from "contexts/cmn/PageContext";
import { useEffect, useState } from "react";

const Sample2Page = () => {
  const [input, setInput] = useState("");
  const { params, callback } = usePageContext();

  useEffect(() => {
    console.log("Sample2-->" + params);
  }, []);

  return (
    <div>
      <h2>Sample2</h2>
      <p>Sample2</p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
      <BlueButton
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault;
          callback(2, "sample2에서 콜백보냄");
        }}
      >
        콜백
      </BlueButton>
    </div>
  );
};

export default Sample2Page;
