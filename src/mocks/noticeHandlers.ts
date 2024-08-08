import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

let mockNotices = [
  {
    bbmNo: "16",
    rank: "14",
    bbsTpCd: "NOTI",
    bbsTpNm: "공지",
    bbmTitNm: "공지사항 타이틀",
    bbmCtn: "<p>공지사항 내용</p>\n<p><br></p>",
    atchFileExist: "0",
    atchFileGrId: "",
    dataInsUserId: "developer",
    dataInsUserInfo: "개발자1(developer/사원/업무지원팀)",
    poupEndDtm: "2024-01-31 16:16:16",
    poupStDtm: "2024-01-17 19:19:19",
    ptupEndDt: "20240124",
    ptupTgtCopCd: "C100",
    ptupTgtCopNm: "㈜LG화학",
    dataInsDtm: "2024-01-17",
    bbmVwct: "0",
    poupEpsNuseDdn: 2,
    dataInsUser: {
      userId: "developer",
      empNo: "1111",
      empNm: "개발자1",
      deptNm: "업무지원팀",
      jtiNm: null,
      jpsNm: "사원",
      ofcTanoPhn: null,
      email: "developer@lgensol.com",
    },
    dataUpdUser: {
      userId: "developer",
      empNo: "1111",
      empNm: "개발자1",
      deptNm: "업무지원팀",
      jtiNm: null,
      jpsNm: "사원",
      ofcTanoPhn: null,
      email: "developer@lgensol.com",
    },
  },
];

export const noticeHandlers = [
  rest.get("/api/v1/notice/post/:bbmNo", (req, res, ctx) => {
    const targetBbmNo = req.params.bbmNo;
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: mockNotices.find(notice => notice.bbmNo === targetBbmNo),
      })
    );
  }),
  rest.get("/api/v1/notice/post", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: mockNotices,
      })
    );
  }),
  rest.get("/api/v1/notice/posts", (req, res, ctx) => {
    const targetBbmTitNm = req.url.searchParams.get("bbmTitNm");
    const targetBbmCtn = req.url.searchParams.get("bbmCtn");
    const targetPageSize = Number.parseInt(req.url.searchParams.get("pageSize") ?? "10");
    const targetStart = Number.parseInt(req.url.searchParams.get("start") ?? "0");

    let resultNotice = mockNotices;
    if (targetBbmTitNm) {
      resultNotice = resultNotice.filter(notice => notice.bbmTitNm.includes(targetBbmTitNm));
    }
    if (targetBbmCtn) {
      resultNotice = resultNotice.filter(notice => notice.bbmCtn.includes(targetBbmCtn));
    }

    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: {
          totalCount: resultNotice.length,
          list: resultNotice.slice(targetStart, targetStart + targetPageSize),
        },
      })
    );
  }),
  rest.patch("/api/v1/notice/post", async (req, res, ctx) => {
    const requestBody = await req.json();
    mockNotices = mockNotices.filter(notice => notice.bbmNo !== requestBody);

    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: { deletedRows: 1 },
      })
    );
  }),
  rest.put("/api/v1/notice/post", async (req, res, ctx) => {
    const requestBody = await req.json();
    mockNotices.map(notice => (notice.bbmNo === requestBody.bbmNo ? requestBody : notice));

    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: { updatedRows: 1 },
      })
    );
  }),
  rest.post("/api/v1/notice/post", async (req, res, ctx) => {
    const requestBody = await req.json();
    mockNotices = [...mockNotices, requestBody];

    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: { insertedRows: 1 },
      })
    );
  }),
];

export const noticeHandlerUrls = [/^\/api\/v1\/notice\/post$/, /^\/api\/v1\/notice\/posts$/, /^\/api\/v1\/notice\/post\/([^/]+)$/];
