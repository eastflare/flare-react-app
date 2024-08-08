import { rest, MockedRequest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";
import { sessionData } from "./mock-data/session";
import message_ko from "locales/message_ko.json";
import message_en from "locales/message_en.json";
import message_pl from "locales/message_pl.json";
import message_zhC from "locales/message_zhC.json";
import message_zhT from "locales/message_zhT.json";

const returnMessage = (req: MockedRequest) => {
  if (req.url.search.indexOf("=") > -1) {
    const langCd = req.url.search.split("=")[1];

    switch (langCd) {
      case "en":
        return message_en;
      case "pl":
        return message_pl;
      case "zhC":
        return message_zhC;
      case "zhT":
        return message_zhT;
      default:
        return message_ko;
    }
  }
};

export const basicHandlers = [
  rest.get("/api/v1/sample", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: {},
      })
    );
  }),
  rest.post("/api/v1/dev/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: "Y",
        statusCode: "SUCCESS",
        data: sessionData,
      })
    );
  }),
  rest.get("/api/v1/session", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: "Y",
        statusCode: "SUCCESS",
        data: sessionData,
      })
    );
  }),
  rest.get("/api/v1/translated-messages", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: returnMessage(req),
      })
    );
  }),
  rest.post("/api/v1/log/menu-access", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put("/api/v1/session/langCd", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const basicHandlerUrls = [/^\/api\/v1\/sample$/, /^\/api\/v1\/dev\/login$/, /^\/api\/v1\/session$/, /^\/api\/v1\/translated-messages$/, /^\/api\/v1\/log\/menu-access$/, /^\/api\/v1\/session\/langCd$/];
