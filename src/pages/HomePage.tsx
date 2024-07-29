import { BlueButton, BlueLineButton, GreyButton, GreyLineButton } from "components/buttons/CustomButton";
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
      "/Matthew",
      {
        foo: "bar",
        callback: () => {
          alert("매튜 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };

  const handleClickJscho128 = () => {
    openModal(
      "/sample5/jscho128/조XX",
      {
        foo: "bar",
        callback: () => {
          alert("조XX 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };

  const handleClick = () => {
    openModeless(
      "/MyModal",
      {
        foo: "bar",
        callback: () => {
          alert("전선배 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };

  const handleClick1 = () => {
    openModal(
      "/MyModal1",
      {
        foo: "bar",
        callback: () => {
          alert("월급루팡 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };
  const handleClick2 = () => {
    openModal(
      "/MyModal2",
      {
        foo: "bar",
        callback: () => {
          alert("요시키 뭐하는 사람인가요?");
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
      <BlueButton onClick={handleClickMatthew}>Matthew</BlueButton>
      <GreyButton onClick={handleClickJscho128}>조XX</GreyButton>
      <BlueLineButton onClick={handleClick}>월급루팡</BlueLineButton>
      <GreyLineButton onClick={handleClick1}>전선배</GreyLineButton>
      <BlueButton onClick={handleClick8}>전선배상세1</BlueButton>
      <GreyButton onClick={handleClick2}>요시키상</GreyButton>
      <BlueLineButton onClick={handleClick7}>요시키상세1</BlueLineButton>
      <GreyLineButton onClick={handleClick3}>카공족1</GreyLineButton>
      <BlueButton onClick={handleClick4}>카공족2</BlueButton>
      <GreyButton onClick={handleClick5}>카공족상세1</GreyButton>
      <BlueLineButton onClick={handleClick6}>카공족상세2</BlueLineButton>
    </>
  );
};

export default HomePage;
