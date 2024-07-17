export type TGuardFunc<T extends string> = (input: string) => input is T;

export interface IEnv {
  nodeEnv: TNodeEnv;
}

export const NodeEnvKey = ["loc", "dev", "prd"] as const;

export type TNodeEnv = (typeof NodeEnvKey)[number];

export function isTNodeEnv(input: string): input is TNodeEnv {
  return NodeEnvKey.includes(input as TNodeEnv);
}
