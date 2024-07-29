import { TBooleanString, TGuardFunc } from "./env.types";

export function isBooleanString(input: string): input is TBooleanString {
  return input.toLowerCase() === "true" || input.toLowerCase() === "false";
}

export function isNumberString(input: string): input is string {
  return !isNaN(Number(input));
}

export function readEnv<T extends string>({ envKey, typeGuard, typeLabel, defaultEnv }: { envKey: string; typeGuard?: TGuardFunc<T>; typeLabel?: string; defaultEnv?: T }) {
  const envInput = import.meta.env[envKey] ?? defaultEnv;
  if (!envInput) {
    throw new Error("[Env] ${envKey} 환경변수가 지정되지 않았습니다");
  }
  if (typeGuard && typeLabel) {
    if (!typeGuard(envInput)) {
      console.error("Wrong envInput", envInput);
      throw new Error("[Env] ${envKey} 환경변수가 ${typeLabel} 형식이어야 합니다");
    }
    return envInput as T;
  } else {
    return envInput as T;
  }
}

export function readNumberEnv({ envKey }: { envKey: string }) {
  return readEnv({ envKey, typeGuard: isNumberString, typeLabel: "number" });
}

export function parseNumber(input: string) {
  return Number(input);
}

export function readBooleanEnv({ envKey, defaultEnv }: { envKey: string; defaultEnv?: TBooleanString }) {
  return readEnv({ envKey, typeGuard: isBooleanString, typeLabel: "boolean", defaultEnv });
}

export function parseBoolean(input: string) {
  return input.toLowerCase() === "true";
}
