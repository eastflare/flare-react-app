import { modals } from "components/cmn/Layout/Modals";
import usePageNavigate from "hooks/cmn/usePageNavigate";
import { useEffect, useState } from "react";

const HomePage = () => {
  //const { goModal } = useGoPage();
  const { openModal, openModeless, openWindow } = usePageNavigate();
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("메인페이지 입니다.");
  }, []);

  const handleClickMatthew = () => {
    console.log("모달빨간줄.....", modals.matthew);
    openModeless(
      modals.matthew,
      {
        foo: "bar",
        callback: () => {
          alert("매튜 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };

  const handleClick = () => {
    openModal(
      modals.myModal,
      {
        foo: "bar",
        callback: () => {
          alert("매튜 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };

  const handleClick1 = () => {
    openModal(
      modals.myModal1,
      {
        foo: "bar",
        callback: () => {
          alert("매튜 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };
  const handleClick2 = () => {
    openModal(
      modals.myModal2,
      {
        foo: "bar",
        callback: () => {
          alert("매튜 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };
  const handleClick3 = () => {
    console.log(modals.myModal3);
    openWindow(
      "/Sample1",
      modals.myModal3,
      {
        foo: "bar",
        callback: () => {
          alert("매튜 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
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
