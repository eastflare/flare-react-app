import { BlueButton, BlueLineButton, GreyButton, GreyLineButton } from "components/buttons/CustomButton";
import { Env } from "config/env";
import usePageNavigate from "hooks/layout/usePageNavigate";
import { useEffect, useState } from "react";
import { PopupTypeCode } from "stores/usePageMapStore";

const HomePage = () => {
  const { openPage, openDetail, openModal, openModeless, openWindow, openDialog } = usePageNavigate();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    const env = Env.getInstance();
    // console.log("메인페이지 입니다.");
    // console.log("환경변수는...?", env.isCurrentNodeEnv("prd"));
    // console.log("MDI...?", env.isMdi);
    // console.log("TAB_SIZE...?", env.maxPageTabSize);
    // console.log("iswindow...?", env.isWindow);
  }, []);

  const handleClickMatthew = () => {
    openModeless(`/sample/matthew`, {
      foo: "bar",
      callback: () => {
        alert("매튜 뭐하는 사람인가요?");
      },
    });
  };

  const handleClickGrid = () => {
    openPage("/sample/grid", {
      foo: "bar",
      callback: () => {
        alert("그리드 뭐하는 사람인가요?");
      },
    });
  };

  const handleClickJscho128 = () => {
    const id = "jscho";
    const name = "조XX";

    //우리페이지가 남의 링크, Iframe ->
    openModal(`/sample/sample5/${id}/${name}`, {
      id: "jscho128",
      name: "조XX",
      callback: () => {
        alert("조XX 뭐하는 사람인가요?");
      },
    });
  };

  const handleClick = () => {
    openModal(
      `/sample/my-modal`,
      {
        callback: () => {
          alert("월급루팡 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 400 }
    );
  };

  const handleClickLupang = () => {
    openPage(`/sample/my-modal`, {
      callback: () => {
        alert("월급루팡 뭐하는 사람인가요?");
      },
    });
  };

  const handleClick1 = () => {
    openModal(`/sample/my-modal1`, {
      foo: "bar",
      callback: () => {
        alert("전선배 뭐하는 사람인가요?");
      },
    });
  };

  const handleClick1Dialog = () => {
    openDialog(
      `/sample/my-modal1`,
      {
        foo: "bar",
        callback: () => {
          alert("전선배 뭐하는 사람인가요?");
        },
      },
      { width: 800, height: 600 }
    );
  };

  const handleClick2 = () => {
    openModal(`/sample/my-modal2`, {
      foo: "bar",
      callback: () => {
        alert("요시키 뭐하는 사람인가요?");
      },
    });
  };
  const handleClick3 = () => {
    openWindow(`/sample/my-modal3`, {
      foo: "bar",
      callback: (a: string, b: string, c: string) => {
        setInput1(a + b + c);
      },
    });
  };

  const handleClickJp = () => {
    openModal(`/sample/my-modal3`, {
      foo: "bar",
      callback: (a: string, b: string, c: string) => {
        setInput1(a + b + c);
      },
    });
  };

  const handleClick4 = () => {
    openWindow(
      `/sample/my-modal3`,
      {
        foo: "bar",
        callback: (c: string) => {
          setInput2(c);
        },
      },
      { width: 800, height: 600, popupType: PopupTypeCode.TAB }
    );
  };
  const handleClick5 = () => {
    openPage(`/sample/my-modal3`, {
      foo: "bar",
      callback: (a: string, b: string) => {
        alert("Facker 뭐하는 사람인가요?");
        setInput1(a + b);
      },
    });
  };
  const handleClick6 = () => {
    openPage(`/sample/my-modal3`, {
      foo: "bar",
      callback: (c: string) => {
        alert("국민사기꾼 뭐하는 사람인가요?");
        setInput2(c);
      },
    });
  };
  const handleClick7 = () => {
    openPage(`/sample/my-modal2`, {
      foo: "bar",
      callback: (c: string) => {
        alert("요시키 뭐하는 사람인가요?");
        setInput2(c);
      },
    });
  };
  const handleClick8 = () => {
    openDetail(`/sample/my-modal1`, {
      foo: "bar",
      callback: (c: string) => {
        alert("전선배 뭐하는 사람인가요?");
        setInput1(c);
      },
    });
  };
  const handleClickDeviceDetect = () => {
    openModal(`/sample/device-detect`, {
      foo: "bar",
      callback: (deviceType: string) => {
        alert("현재화면은 " + deviceType + "입니다.");
      },
    });
  };

  const handleClickDeviceDetectDialog = () => {
    openDialog(`/sample/device-detect`, {
      foo: "bar",
      callback: (deviceType: string) => {
        alert("현재화면은 " + deviceType + "입니다.");
      },
    });
  };

  return (
    <>
      카공족1 Callback :
      <input type='text' value={input1} onChange={e => setInput1(e.target.value)} />
      <br />
      <br />
      카공족2 Callback :
      <input type='text' value={input2} onChange={e => setInput2(e.target.value)} />
      <br />
      <br />
      <GreyButton onClick={handleClickDeviceDetect}>DeviceDetect</GreyButton>
      <GreyLineButton onClick={handleClickDeviceDetectDialog}>DeviceDetect-Dialog</GreyLineButton>
      <br />
      <br />
      <GreyButton onClick={handleClickMatthew}>Matthew</GreyButton>
      <BlueLineButton onClick={handleClickGrid}>grid</BlueLineButton>
      <br />
      <br />
      <GreyButton onClick={handleClickJscho128}>조XX</GreyButton>
      <br />
      <br />
      <GreyButton onClick={handleClick}>월급루팡</GreyButton>
      <BlueLineButton onClick={handleClickLupang}>월급루팡상세</BlueLineButton>
      <br />
      <br />
      <GreyButton onClick={handleClick1}>전선배</GreyButton>
      <GreyLineButton onClick={handleClick1Dialog}>전선배-Dialog</GreyLineButton>
      <BlueLineButton onClick={handleClick8}>전선배상세1</BlueLineButton>
      <br />
      <br />
      <GreyButton onClick={handleClick2}>요시키상</GreyButton>
      <BlueLineButton onClick={handleClick7}>요시키상세1</BlueLineButton>
      <br />
      <br />
      <GreyButton onClick={handleClickJp}>카공족</GreyButton>
      <BlueButton onClick={handleClick3}>카공족1</BlueButton>
      <BlueButton onClick={handleClick4}>카공족2</BlueButton>
      <BlueLineButton onClick={handleClick5}>카공족상세1</BlueLineButton>
      <BlueLineButton onClick={handleClick6}>카공족상세2</BlueLineButton>
    </>
  );
};

export default HomePage;
