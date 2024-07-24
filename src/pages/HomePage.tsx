import { modals } from "components/cmn/Layout/Modals";
import { Env } from "config/env";
import usePageNavigate from "hooks/cmn/usePageNavigate";
import { useEffect, useState } from "react";
import { OpenPopupTypeCode } from "store/pageMapStore";

const HomePage = () => {
  const { openPage, openModal, openModeless, openWindow } = usePageNavigate();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    const env = Env.getInstance();
    console.log("메인페이지 입니다.");
    console.log("환경변수는...?", env?.isCurrentNodeEnv("prd"));
  }, []);

  const handleClickMatthew = () => {
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
    openModeless(
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
    openWindow(
      "/MyModal3",
      {
        foo: "bar",
        callback: (a: string, b: string, c: string) => {
          setInput1(a + b + c);
        },
      },
      { width: 800, height: 600 }
    );
  };
  const handleClick4 = () => {
    openWindow(
      "/MyModal3",
      {
        foo: "bar",
        callback: (c: string) => {
          setInput2(c);
        },
      },
      { width: 800, height: 600, popupType: OpenPopupTypeCode.TAB }
    );
  };
  const handleClick5 = () => {
    openPage("/MyModal3", {
      foo: "bar",
      callback: (a: string, b: string) => {
        alert("Facker 뭐하는 사람인가요?");
        setInput1(a + b);
      },
    });
  };
  const handleClick6 = () => {
    openPage("/MyModal3", {
      foo: "bar",
      callback: (c: string) => {
        alert("국민사기꾼 뭐하는 사람인가요?");
        setInput2(c);
      },
    });
  };
  const handleClick7 = () => {
    openPage("/MyModal2", {
      foo: "bar",
      callback: (c: string) => {
        alert("요시키 뭐하는 사람인가요?");
        setInput2(c);
      },
    });
  };
  const handleClick8 = () => {
    openPage("/MyModal1", {
      foo: "bar",
      callback: (c: string) => {
        alert("전선배 뭐하는 사람인가요?");
        setInput1(c);
      },
    });
  };

  return (
    <>
      카공족1 Callback :
      <input type='text' value={input1} onChange={e => setInput1(e.target.value)} />
      <br />
      카공족2 Callback :
      <input type='text' value={input2} onChange={e => setInput2(e.target.value)} />
      <br />
      <button onClick={handleClickMatthew}>Matthew</button>
      <button onClick={handleClick}>월급루팡</button>
      <button onClick={handleClick1}>전선배</button>
      <button onClick={handleClick8}>전선배상세1</button>
      <button onClick={handleClick2}>요시키상</button>
      <button onClick={handleClick7}>요시키상세1</button>
      <button onClick={handleClick3}>카공족1</button>
      <button onClick={handleClick4}>카공족2</button>
      <button onClick={handleClick5}>카공족상세1</button>
      <button onClick={handleClick6}>카공족상세2</button>
    </>
  );
};

export default HomePage;
