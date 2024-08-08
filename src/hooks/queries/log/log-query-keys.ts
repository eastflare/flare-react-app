import { MenuLogRequest } from "@/models/admin/MenuLog";
import { LoginLogRequest } from "@/models/admin/LoginLog";
import { IfLogRequest } from "@/models/admin/IfLog";
import { EmailLogRequest } from "@/models/admin/EmailLog";
export const LogQueryKeys = {
  key: ["log"] as const,
  menuLogs: (condition: MenuLogRequest) => [...LogQueryKeys.key, "menuLogs", condition] as const,
  LoginLogs: (condition: LoginLogRequest) => [...LogQueryKeys.key, "LoginLogs", condition] as const,
  IfLogs: (condition: IfLogRequest) => [...LogQueryKeys.key, "IfLogs", condition] as const,
  EmailLogs: (condition: EmailLogRequest) => [...LogQueryKeys.key, "EmailLogs", condition] as const,
};
