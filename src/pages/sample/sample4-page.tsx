import { BlueButton } from "components/buttons/CustomButton";
import { usePageContext } from "contexts/cmn/PageContext";
import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";

const Sample4Page = () => {
  const [input, setInput] = useState("");
  const { params, callback } = usePageContext();

  useEffect(() => {
    console.log("sample4 파람즈->", params);
  }, [params]);

  return (
    <div>
      <h2>Sample4 : ID를 pathVariable로 수신함</h2>
      <p>id: {params.id} </p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
      <BlueButton
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault;
          callback(4, "sample4에서 콜백보냄");
        }}
      >
        콜백
      </BlueButton>
    </div>
  );
};

export default Sample4Page;
