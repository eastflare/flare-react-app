import { TGuardFunc } from "./env.types";

export function readEnv<T extends string>({
  envKey,
  typeGuard,
  typeLabel,
  defaultEnv,
}: {
  envKey: string;
  typeGuard?: TGuardFunc<T>;
  typeLabel?: string;
  defaultEnv?: T;
}){
  const envInput = import.meta.env[envKey] ?? defaultEnv;
  if(!envInput){
    throw new Error('[Env] ${envKey} 환경변수가 지정되지 않았습니다');
  }
  if(typeGuard && typeLabel){
    if(!typeGuard(envInput)){
      console.error('Wrong envInput', envInput);
      throw new Error('[Env] ${envKey} 환경변수가 ${typeLabel} 형식이어야 합니다');
    }
    return envInput as T;
  }else{
    return envInput as T;
  }
}
