import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Sample6 = () => {
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams();
  // URL의 'query' 매개변수를 읽기
  const message = searchParams.get("message");

  return (
    <div>
      <h2>Sample6 : useSearchParams 로 message 파라메터를 받음 </h2>
      <p>메세지 : {message} </p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
    </div>
  );
};

export default Sample6;
