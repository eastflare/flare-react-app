export type TGuardFunc<T extends string> = (input: string) => input is T;

export interface IEnv {
  nodeEnv: TNodeEnv;
  isMdi: boolean;
  loginPageAccessKey: string;
  maxPageTabSize: number;
}

export const NodeEnvKey = ["loc", "dev", "prd"] as const;

export type TNodeEnv = (typeof NodeEnvKey)[number];

export type TBooleanString = "true" | "false";

export function isTNodeEnv(input: string): input is TNodeEnv {
  return NodeEnvKey.includes(input as TNodeEnv);
}
