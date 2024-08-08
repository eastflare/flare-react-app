import { setupWorker } from "msw";
import { basicHandlers, basicHandlerUrls } from "mocks/handlers";
import { roleHandlers, roleHandlerUrls } from "mocks/roleHandlers";
import { employeeHandlers, employeeHandlerUrls } from "./employeeHandlers";
import { departmentsHandlers, departmentsHandlerUrls } from "./departmentHandlers";
import { messageHandlers, messageHandlerUrls } from "mocks/messageHandlers";
import { codeHandlers, codeHandlerUrls } from "mocks/codeHandlers";
import { menuHandlers, menuHandlerUrls } from "mocks/menuHandlers";
import { menuLogHandlers, menuLogHandlerUrls } from "mocks/menuLogHandlers";
import { loginLogHandlers, loginLogHandlerUrls } from "mocks/loginLogHandlers";
import { ifLogHandlers, ifLogHandlerUrls } from "mocks/ifLogHandlers";
import { emailLogHandlers, emailLogHandlerUrls } from "mocks/emailLogHandlers";
import { apiHandlers, apiHandlerUrls } from "mocks/apiHandlers";
import { approvalTemplateHandlers, approvalTemplateHandlerUrls } from "mocks/approvalTemplateHandlers";
import { noticeHandlers, noticeHandlerUrls } from "./noticeHandlers";
import { notificationHandlers, notificationHandlerUrls } from "mocks/notificationHandlers";
import { approvalLineHandlers, approvalLineHandlerUrls } from "mocks/approvalLineHandlers";
import { approvalExcludeHandlers, approvalExcludeHandlerUrls } from "mocks/approvalExcludeHandlers";

export const worker = setupWorker(
  ...basicHandlers,
  ...roleHandlers,
  ...employeeHandlers,
  ...departmentsHandlers,
  ...messageHandlers,
  ...codeHandlers,
  ...menuHandlers,
  ...menuLogHandlers,
  ...loginLogHandlers,
  ...ifLogHandlers,
  ...emailLogHandlers,
  ...approvalTemplateHandlers,
  ...apiHandlers,
  ...noticeHandlers,
  ...notificationHandlers,
  ...approvalLineHandlers,
  ...approvalExcludeHandlers
);
export const handlerUrls = [
  ...basicHandlerUrls,
  ...roleHandlerUrls,
  ...employeeHandlerUrls,
  ...departmentsHandlerUrls,
  ...messageHandlerUrls,
  ...codeHandlerUrls,
  ...menuHandlerUrls,
  ...menuLogHandlerUrls,
  ...loginLogHandlerUrls,
  ...ifLogHandlerUrls,
  ...emailLogHandlerUrls,
  ...approvalTemplateHandlerUrls,
  ...apiHandlerUrls,
  ...noticeHandlerUrls,
  ...notificationHandlerUrls,
  ...approvalLineHandlerUrls,
  ...approvalExcludeHandlerUrls,
];
