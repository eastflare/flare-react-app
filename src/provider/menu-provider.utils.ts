import { createMenuAccessLog } from "apis/system/Log";

function createAccessLog(menuId: string) {
  createMenuAccessLog(menuId);
}

function createAccessLogByPath(path: string) {
  createMenuAccessLog(path);
}

export { createAccessLog, createAccessLogByPath };
