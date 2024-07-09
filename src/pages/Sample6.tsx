import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const Sample6 = () => {
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams();
  // URL의 'query' 매개변수를 읽기
  let message2 = searchParams.get("message");
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div>
      <h2>Sample6 : useSearchParams 로 message 파라메터를 받음 </h2>
      <p>메세지 : {message2 || message || ""} </p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
    </div>
  );
};

export default Sample6;
