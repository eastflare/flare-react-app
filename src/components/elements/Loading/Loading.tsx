import React from "react";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

export interface ILoadingProps {
  /**
   * text message
   */
  message?: string;
  /**
   * message에 적용할 fontSize 및 color 스타일
   */
  messageStyle?: Pick<React.CSSProperties, "fontSize" | "color">;
  /**
   * wheel icon을 끌지 여부
   */
  noIcon?: boolean;
  /**
   * small: 20, medium: 40, large: 60, extra: 80
   */
  iconSize?: "small" | "medium" | "large" | "extra" | number;
  /**
   * wheel icon의 color
   */
  iconColor?: React.CSSProperties["stroke"];
  /**
   * background color
   */
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

const iconLengthDef = {
  small: 20,
  medium: 40,
  large: 60,
  extra: 80,
};

function Loading(props: ILoadingProps) {
  const { message, messageStyle, noIcon = false, iconSize = "medium", iconColor, backgroundColor } = props;

  const iconLength = typeof iconSize === "number" ? iconSize : iconLengthDef[iconSize];

  return (
    <StyledLoading backgroundColor={backgroundColor} iconLength={iconLength} iconColor={iconColor}>
      {!noIcon && <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "none" }} />}
      {message && <StyledMessage messageStyle={messageStyle}>{message} </StyledMessage>}
    </StyledLoading>
  );
}

const StyledLoading = styled.div<{
  backgroundColor?: React.CSSProperties["backgroundColor"];
  iconLength: number;
  iconColor?: React.CSSProperties["stroke"];
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 8px;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.backgroundColor ?? "rgba(0, 0, 0, 0.2)"};
  transition: all 0.25s;
  & > div > div > svg {
    background: transparent !important;
    width: ${props => props.iconLength}px;
    height: ${props => props.iconLength}px;
    & > circle {
      stroke: ${props => props.iconColor ?? "#e15b64"};
    }
  }
`;

const StyledMessage = styled.div<{
  messageStyle?: ILoadingProps["messageStyle"];
}>`
  text-align: center;
  font-size: ${props => props.messageStyle?.fontSize ?? "14px"};
  color: ${props => props.messageStyle?.color ?? "rgba(0,0,0,0.75)"};
`;

export default Loading;
