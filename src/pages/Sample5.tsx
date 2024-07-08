import { useState } from "react";
import { useParams } from "react-router-dom";

const Sample5 = () => {
  const [input, setInput] = useState("");
  const { id, name } = useParams();
  return (
    <div>
      <h2>Sample5 : ID, Name을 pathVariable로 수신함</h2>
      <p>id: {id} </p>
      <p>name: {name} </p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
    </div>
  );
};

export default Sample5;
