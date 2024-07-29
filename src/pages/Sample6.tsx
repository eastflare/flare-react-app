import { BlueButton } from "components/buttons/CustomButton";
import { usePageContext } from "contexts/cmn/PageContext";
import { useEffect, useState } from "react";

const Sample6 = () => {
  const [input, setInput] = useState("");
  //const [searchParams] = useSearchParams();
  // URL의 'query' 매개변수를 읽기
  // let message2 = searchParams.get("message");
  // const location = useLocation();
  // const message = location.state?.message;
  const { params, callback } = usePageContext();

  useEffect(() => {
    console.log("sample6 파람즈->", params);
  }, [params]);

  return (
    <div>
      <h2>Sample6 : useSearchParams 로 message 파라메터를 받음 </h2>
      <p>메세지 : {params.message} </p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
      <BlueButton
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault;
          callback("스트링", "sample6에서 콜백보냄");
        }}
      >
        콜백
      </BlueButton>
    </div>
  );
};

export default Sample6;
