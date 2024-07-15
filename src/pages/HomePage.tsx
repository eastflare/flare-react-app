import { modals } from "components/cmn/Layout/Modals";
import usePageNavigate from "hooks/cmn/usePageNavigate";
import { useEffect, useState } from "react";

const HomePage = () => {
  //const { goModal } = useGoPage();
  const { openModal } = usePageNavigate();
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("메인페이지 입니다.");
  }, []);

  const handleClickMatthew = () => {
    openModal(modals.matthew, {
      foo: "bar",
      callback: () => {
        alert("매튜 뭐하는 사람인가요?");
      },
    });
  };

  const handleClick = () => {
    openModal(modals.myModal, {
      foo: "bar",
      callback: () => {
        alert("루팡 뭐하는 사람인가요?");
      },
    });
  };

  const handleClick1 = () => {
    openModal(modals.myModal1, {
      foo: "bar",
      callback: () => {
        alert("전선배 뭐하는 사람인가요?");
      },
    });
  };
  const handleClick2 = () => {
    openModal(modals.myModal2, {
      foo: "bar",
      callback: () => {
        alert("요시키 뭐하는 사람인가요?");
      },
    });
  };
  const handleClick3 = () => {
    openModal(modals.myModal3, {
      foo: "bar",
      callback: () => {
        alert("김주팔 뭐하는 사람인가요?");
      },
    });
  };

  return (
    <>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleClickMatthew}>Matthew</button>
      <button onClick={handleClick}>월급루팡</button>
      <button onClick={handleClick1}>전선배</button>
      <button onClick={handleClick2}>요시키상</button>
      <button onClick={handleClick3}>카공족</button>
    </>
  );
};

export default HomePage;
