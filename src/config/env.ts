import { IEnv, TNodeEnv, isTNodeEnv } from "./env.types";
import { readEnv } from "./env.util";
import isArray from "lodash-es/isArray";

export class Env {
  private static instance: Env;

  readonly nodeEnv: TNodeEnv;

  private constructor(env: IEnv) {
    const { nodeEnv } = env;

    this.nodeEnv = nodeEnv;
  }

  static async configure() {
    if (Env.instance) return Env.instance;

    const nodeEnv = readEnv({
      envKey: "VITE_NODE_ENV",
      typeGuard: isTNodeEnv,
      typeLabel: "TNodeEnv",
    }) as TNodeEnv;

    const env = new Env({
      nodeEnv,
    });

    Env.instance = env;
    return env;
  }

  static getInstance() {
    if (!Env.instance) {
      throw new Error("Env class is not configured!!");
    }

    return Env.instance;
  }

  printReactEnv() {
    console.log("[Env] react env", this);
  }

  isCurrentNodeEnv(...param: TNodeEnv[]) {
    if (isArray(param)) {
      return param.includes(this.nodeEnv);
    } else {
      return this.nodeEnv === param;
    }
  }
}
