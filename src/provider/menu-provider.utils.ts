import { createMenuAccessLog } from "apis/admin/Log";

function createAccessLog(menuId: string) {
  createMenuAccessLog(menuId);
}

function createAccessLogByPath(path: string) {
  createMenuAccessLog(path);
}

export { createAccessLog, createAccessLogByPath };
