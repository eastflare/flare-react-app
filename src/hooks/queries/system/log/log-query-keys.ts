import { MenuLogRequest } from "@/models/system/MenuLog";
import { LoginLogRequest } from "@/models/system/LoginLog";
import { IfLogRequest } from "@/models/system/IfLog";
import { EmailLogRequest } from "@/models/system/EmailLog";
export const LogQueryKeys = {
  key: ["log"] as const,
  menuLogs: (condition: MenuLogRequest) => [...LogQueryKeys.key, "menuLogs", condition] as const,
  LoginLogs: (condition: LoginLogRequest) => [...LogQueryKeys.key, "LoginLogs", condition] as const,
  IfLogs: (condition: IfLogRequest) => [...LogQueryKeys.key, "IfLogs", condition] as const,
  EmailLogs: (condition: EmailLogRequest) => [...LogQueryKeys.key, "EmailLogs", condition] as const,
};
