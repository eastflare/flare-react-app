import { BlueButton } from "components/buttons/CustomButton";
import { usePageContext } from "contexts/PageContext";
import { useState } from "react";

const Sample5Page = () => {
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
      <BlueButton
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault;
          callback(5, "sample5에서 콜백보냄");
        }}
      >
        콜백
      </BlueButton>
    </div>
  );
};

export default Sample5Page;
