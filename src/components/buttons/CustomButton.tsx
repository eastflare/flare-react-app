import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { css } from "@emotion/react";
import { BgColor, FontColor } from "ui/theme/Color";

interface ButtonOptions {
  loading?: boolean;
}

const _BlueButton = styled(Button)`
  padding: 10px 14px;
  height: 36px;
  margin: 0 3px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  background-color: #1f7795;
  line-height: 15px;

  &:hover {
    background-color: #135678;
  }
  &:active,
  &:focus {
    background-color: #3ec2cf;
  }
  &:disabled {
    background-color: #a5c8d4;
    color: #fff;
  }
  svg {
    margin-right: 5px;
    font-size: 1.125rem;
  }
`;

export const BlueButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & ButtonOptions) => {
  return (
    <_BlueButton
      {...props}
      onClick={e => {
        const currentTarget = e.currentTarget;
        currentTarget.setAttribute(`disabled`, `true`);
        props.onClick?.();
        setTimeout(() => currentTarget.removeAttribute(`disabled`), 1000);
      }}
    >
      {props.children}
    </_BlueButton>
  );
};

const _GreyButton = styled(Button)`
  padding: 10px 14px;
  height: 36px;
  margin: 0 3px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  background-color: ${BgColor.Gray700};
  &:hover {
    background-color: ${FontColor.Gray400};
  }
  &:disabled {
    background-color: ${FontColor.Gray600};
    color: #fff;
  }
`;

export const GreyButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & ButtonOptions) => {
  return (
    <_GreyButton
      {...props}
      onClick={e => {
        const currentTarget = e.currentTarget;
        currentTarget.setAttribute(`disabled`, `true`);
        props.onClick?.();
        setTimeout(() => currentTarget.removeAttribute(`disabled`), 1000);
      }}
    >
      {props.children}
    </_GreyButton>
  );
};

const _BlueLineButton = styled(Button)`
  padding: 10px 14px;
  height: 36px;
  margin: 0 3px;
  border-radius: 3px;
  color: #3ec2cf;
  font-size: 13px;
  border: 1px solid #3ec2cf;
  background-color: #fff;
  &:hover {
    border-color: #3ab3bf;
  }

  &.smallIcon {
    width: 25px;
    height: 25px;
    min-width: auto;
    padding: 0;
  }
`;

export const BlueLineButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & ButtonOptions) => {
  return (
    <_BlueLineButton
      {...props}
      onClick={e => {
        const currentTarget = e.currentTarget;
        currentTarget.setAttribute(`disabled`, `true`);
        props.onClick();
        setTimeout(() => currentTarget.removeAttribute(`disabled`), 1000);
      }}
    >
      {props.children}
    </_BlueLineButton>
  );
};

const _GreyLineButton = styled(Button)`
  padding: 10px 14px;
  height: 36px;
  margin: 0 3px;
  color: #666;
  font-size: 13px;
  line-height: 15px;
  border-radius: 3px;
  border: solid 1px #b9bcbb;
  background-color: #fff;

  &:hover {
    border-color: #d5d5d5;
  }

  &.small {
    min-width: auto;
    padding: 6px 8px;
    height: 28px;
    font-size: 12px;
  }

  &.medium {
    padding: 6px 8px;
    height: 32px;
    font-size: 12px;
  }

  &.alignTop {
    vertical-align: top;
  }
  svg {
    margin-right: 5px;
    font-size: 1.125rem;
  }

  &.marginLR0 {
    margin-left: 0;
    margin-riht: 0;
  }

  &.marginTB3 {
    margin-top: 3px;
    margin-bottom: 3px;
  }
`;

export const GreyLineButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & ButtonOptions) => {
  return (
    <_GreyLineButton
      {...props}
      onClick={e => {
        const currentTarget = e.currentTarget;
        currentTarget.setAttribute(`disabled`, `true`);
        props.onClick();
        setTimeout(() => currentTarget.removeAttribute(`disabled`), 1000);
      }}
    >
      {props.children}
    </_GreyLineButton>
  );
};

const _IconButton = styled(Button)`
  min-width: auto;
  padding: 0;
  margin: 0 5px;
  color: #666;

  &:hover {
    background-color: transparent;
  }

  &.buttonHelp {
    vertical-align: sub;
    svg {
      fill: ${BgColor.Gray700};
    }
  }

  & + & {
    margin-left: 0;
  }
`;

export const IconButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & ButtonOptions) => {
  return (
    <_IconButton
      {...props}
      onClick={e => {
        const currentTarget = e.currentTarget;
        currentTarget.setAttribute(`disabled`, `true`);
        props.onClick();
        setTimeout(() => currentTarget.removeAttribute(`disabled`), 1000);
      }}
    >
      {props.children}
    </_IconButton>
  );
};

const _IconLineButton = styled(Button)`
  width: 25px;
  height: 25px;
  min-width: auto;
  padding: 0;
  margin: 0 3px;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  color: #666;

  &:hover {
    background-color: transparent;
  }

  &.blueLine {
    border-color: #3ec2cf;
    color: #3ec2cf;
  }

  &.large {
    width: 32px;
    height: 32px;
  }

  .xs {
    font-size: 15px;
  }
`;

export const IconLineButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & ButtonOptions) => {
  return (
    <_IconLineButton
      {...props}
      onClick={e => {
        const currentTarget = e.currentTarget;
        currentTarget.setAttribute(`disabled`, `true`);
        props.onClick();
        setTimeout(() => currentTarget.removeAttribute(`disabled`), 1000);
      }}
    >
      {props.children}
    </_IconLineButton>
  );
};

const _BlueIconLineButton = styled(Button)`
  width: 25px;
  height: 25px;
  min-width: auto;
  padding: 0;
  margin: 0 3px;
  border: 1px solid #3ec2cf;
  color: #3ec2cf;
  border-radius: 3px;
  &:hover {
    background-color: transparent;
  }
  .xs {
    font-size: 15px;
  }
`;

export const BlueIconLineButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & ButtonOptions) => {
  return (
    <_BlueIconLineButton
      {...props}
      onClick={e => {
        const currentTarget = e.currentTarget;
        currentTarget.setAttribute(`disabled`, `true`);
        props.onClick();
        setTimeout(() => currentTarget.removeAttribute(`disabled`), 1000);
      }}
    >
      {props.children}
    </_BlueIconLineButton>
  );
};

export const ic = {
  icon: css`
    margin-right: 5px;
  `,
};

export const bt = {
  label: css`
    display: inline-block;
    padding: 8px 14px;
    height: 32px;
    margin: 0 3px;
    color: #666;
    font-size: 13px;
    border-radius: 3px;
    border: solid 1px #b9bcbb;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
    line-height: 1.2;
  `,
};

export const UnfilledButton = styled(Button)`
  padding: 10px;
  height: 36px;
  min-width: 56px;
  margin: 0 3px;
  color: #666;
  font-size: 13px;
  line-height: 15px;
  border: 0;
  border-radius: 3px;

  &:hover {
    background-color: #f1f4f3;
  }

  &:active,
  &:focus {
    color: #1f1f1f;
    background-color: #dde0df;
  }

  &:disabled {
    opacity: 0.5;
  }

  &.small {
    height: 20px;
  }
`;
