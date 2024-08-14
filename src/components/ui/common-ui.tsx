import { ReactNode } from "react";

// Spacer 정의
type SpacerProps = {
  type?: "v" | "h";
  size?: string;
};

export const Spacer = ({ type, size }: SpacerProps) => {
  let height = "0";
  let width = "0";
  let display = "inline-block";

  switch (type) {
    case "v":
      height = "100%";
      width = "${size}px";
      display = "inline-block";
      break;
    case "h":
      width = "100%";
      height = "${size}px";
      display = "block";
      break;
  }

  return <div style={{ height: height, width: width, display: display }}></div>;
};

type ButtonGroupProps = {
  children?: ReactNode;
};

export const ButtonGroup = ({ children }: ButtonGroupProps) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        gap: "4px",
      }}
    >
      {children}
    </div>
  );
};

type DialogContentContainerProps = {
  children?: ReactNode;
};

export const DialogContentContainer = ({ children }: DialogContentContainerProps) => {
  return (
    <div
      style={{
        overflowY: "auto",
        margin: "0px -24px -24px 0px",
      }}
    >
      {children}
    </div>
  );
};

type DialogContentProps = {
  children?: ReactNode;
};

export const DialogContent = ({ children }: DialogContentProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingRight: "24px",
        fontSize: "13px",
        fontFamily: "Spoqa Han Sans Neo",
        lineHeight: "19.5px",
      }}
    >
      {children}
    </div>
  );
};
