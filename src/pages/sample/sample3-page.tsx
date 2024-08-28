import { BlueButton } from "components/buttons/CustomButton";
import { usePageContext } from "contexts/PageContext";
import { useEffect, useState } from "react";

const Sample3Page = () => {
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
      <BlueButton
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault;
          callback(3, "sample3에서 콜백보냄");
        }}
      >
        콜백
      </BlueButton>
    </div>
  );
};

export default Sample3Page;
