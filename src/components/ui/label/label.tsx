import { BoxProps } from "@mui/material/Box";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
  depth?: LabelDepth;
  labelText?: string;
  tooltipIcon?: boolean;
  tooltipTitle?: string;
  children?: React.ReactNode;
}
export type LabelProps = Props & Omit<BoxProps, keyof Props>;
export type LabelDepth = "default" | "sub";
export declare const Label: ({ isRequired, labelText, depth, tooltipIcon, tooltipTitle, children, textAlign, sx, ...rest }: LabelProps) => import("react/jsx-runtime").JSX.Element;
export default Label;
