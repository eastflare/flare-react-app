import { useState } from "react";
import { useParams } from "react-router-dom";

const Sample4 = () => {
  const [input, setInput] = useState("");
  const { id } = useParams();
  return (
    <div>
      <h2>Sample4 : ID를 pathVariable로 수신함</h2>
      <p>id: {id} </p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
    </div>
  );
};

export default Sample4;
