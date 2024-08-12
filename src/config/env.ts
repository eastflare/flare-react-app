import { DeviceTypeCode, IEnv, TNodeEnv, isTNodeEnv } from "./env.types";
import { readEnv, parseBoolean, readBooleanEnv, readNumberEnv, parseNumber } from "./env.util";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import isArray from "lodash-es/isArray";
import { sha256 } from "utils/rapUtil";
import extractor from "utils/extractorUtil";

export class Env {
  private static instance: Env;

  readonly nodeEnv: TNodeEnv;
  readonly isMdi: boolean;
  readonly loginPageAccessKey: string; //string예시
  readonly maxPageTabSize: number;
  readonly isWindow: boolean;
  readonly deviceTypeCode: DeviceTypeCode;

  private constructor(env: IEnv) {
    const { nodeEnv, isMdi, loginPageAccessKey, maxPageTabSize, isWindow, deviceTypeCode } = env;
    this.nodeEnv = nodeEnv;
    this.isMdi = isMdi;
    this.loginPageAccessKey = loginPageAccessKey;
    this.maxPageTabSize = maxPageTabSize;
    this.isWindow = isWindow;
    this.deviceTypeCode = deviceTypeCode;
  }

  static async configure() {
    if (Env.instance) return Env.instance;

    const nodeEnv = readEnv({
      envKey: "NODE_ENV",
      typeGuard: isTNodeEnv,
      typeLabel: "TNodeEnv",
    }) as TNodeEnv;

    const isMdi = parseBoolean(
      readBooleanEnv({
        envKey: "IS_MDI",
        defaultEnv: "true",
      })
    );

    const loginPageAccessKey = await Env.generateLoginPageAccessKey();

    const maxPageTabSize = parseNumber(
      readNumberEnv({
        envKey: "MAX_PAGE_TAP_SIZE",
      })
    );

    const isWindow = await Env.getIsWindow();
    const deviceTypeCode = await Env.getDeviceTypeCode();
    const env = new Env({
      nodeEnv,
      isMdi,
      loginPageAccessKey,
      maxPageTabSize,
      isWindow,
      deviceTypeCode,
    });

    Env.instance = env;
    return env;
  }

  static async generateLoginPageAccessKey() {
    const dateYMD = new Date().toISOString().substring(0, 10);
    return await sha256("gap_login_page_access_key_" + dateYMD);
  }

  static async getIsWindow() {
    if (extractor.getQueryParameterValue("openTypeCode") === "WINDOW") {
      return true;
    } else {
      return false;
    }
  }

  static async getDeviceTypeCode() {
    if (isMobile) {
      return DeviceTypeCode.MOBILE;
    } else if (isTablet) {
      return DeviceTypeCode.TABLET;
    } else {
      return DeviceTypeCode.DESKTOP;
    }
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
