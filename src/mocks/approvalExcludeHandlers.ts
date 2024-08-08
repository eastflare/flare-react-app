import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

const mockExcludes = [
  {
    aprExcTgtId: "1",
    aprExcNm: "결재라인임원제외",
    dataInsUserId: "monovolt23",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "monovolt23",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
  {
    aprExcTgtId: "2",
    aprExcNm: "테스트 결재라인 제외",
    dataInsUserId: "monovolt23",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "monovolt23",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
  {
    aprExcTgtId: "3",
    aprExcNm: "빼고 결재",
    dataInsUserId: "monovolt23",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "monovolt23",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
];

const mockExcludeDetails = [
  {
    aprExcTgtId: "1",
    aprExcSeq: 1,
    aprExcDivsCd: "JPS",
    aprExcUserId: "2000",
    aprExcUserInfo: "2000::부문담당",
    dataInsUserId: "kyyun",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "kyyun",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
  {
    aprExcTgtId: "1",
    aprExcSeq: 2,
    aprExcDivsCd: "JTI",
    aprExcUserId: "0130",
    aprExcUserInfo: "0130::상무",
    dataInsUserId: "kyyun",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "kyyun",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
  {
    aprExcTgtId: "1",
    aprExcSeq: 3,
    aprExcDivsCd: "EMP",
    aprExcUserId: null,
    aprExcUserInfo: null,
    dataInsUserId: "kyyun",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "kyyun",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
  {
    aprExcTgtId: "2",
    aprExcSeq: 1,
    aprExcDivsCd: "JPS",
    aprExcUserId: "2000",
    aprExcUserInfo: "2000::부문담당",
    dataInsUserId: "developer",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "developer",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
  {
    aprExcTgtId: "2",
    aprExcSeq: 2,
    aprExcDivsCd: "JTI",
    aprExcUserId: "0130",
    aprExcUserInfo: "0130::상무",
    dataInsUserId: "developer",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "developer",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
  {
    aprExcTgtId: "2",
    aprExcSeq: 3,
    aprExcDivsCd: "EMP",
    aprExcUserId: null,
    aprExcUserInfo: null,
    dataInsUserId: "developer",
    dataInsUserIp: "1.1.1.1",
    dataInsDtm: "2023-04-03",
    dataUpdUserId: "developer",
    dataUpdUserIp: "1.1.1.1",
    dataUpdDtm: "2023-04-03",
  },
];

export const approvalExcludeHandlers = [
  rest.get("/api/v1/approval/excludes", async (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const paramAprExcNm = searchParams.get("aprExcNm");

    let filteredExcludes = mockExcludes;
    if (paramAprExcNm) {
      filteredExcludes = filteredExcludes.filter(exclude => exclude.aprExcNm.includes(paramAprExcNm));
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredExcludes,
      })
    );
  }),
  rest.get("/api/v1/approval/exclude/:aprExcTgtId/details", async (req, res, ctx) => {
    const paramAprExcTgtId = req.params.aprExcTgtId;

    let filteredExcludes = mockExcludeDetails;
    if (paramAprExcTgtId) {
      filteredExcludes = filteredExcludes.filter(exclude => exclude.aprExcTgtId === paramAprExcTgtId);
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredExcludes,
      })
    );
  }),
  rest.post("/api/v1/approval/exclude", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete("/api/v1/approval/exclude/:aprExcTgtId", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const approvalExcludeHandlerUrls = [/^\/api\/v1\/approval\/excludes$/, /^\/api\/v1\/approval\/exclude$/, /^\/api\/v1\/approval\/exclude\/([^/]+)\/details$/, /^\/api\/v1\/approval\/exclude\/([^/]+)$/];
