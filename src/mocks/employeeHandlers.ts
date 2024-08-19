import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "@/models/common/RestApi";

const mockEmployees = [
  {
    userId: "developer",
    empNo: "1111",
    empNm: "개발자1",
    empEngNm: null,
    empCngNm: null,
    deptCd: "70040623",
    deptNm: "업무지원팀(과천／마곡P)",
    deptEngNm: null,
    deptCngNm: null,
    copCd: "B100",
    jtiCd: null,
    jtiNm: "사원",
    jtiEngNm: null,
    jtiCngNm: null,
    jpsCd: "GE0",
    jpsNm: "사원",
    jpsEngNm: null,
    jpsCngNm: null,
    inoStatCd: null,
    jcomDt: null,
    rsgnDt: null,
    upprEmpNo: null,
    upprUserId: null,
    onduRegnCd: null,
    onduRegnNm: null,
    ssoDtplNm: null,
    ofcTano: null,
    ofcPhn: null,
    ofcEtnPhn: null,
    docAuthCd: null,
    emlSvrDmnIfoNm: null,
    inoDivsCd: null,
    empHphn: null,
    ctryCd: null,
    useYn: "Y",
    userInfo: "개발자1(developer/사원/업무지원팀)",
  },
];

export const employeeHandlers = [
  rest.get("/api/v1/employee", (req, res, ctx) => {
    const targetDeptCd = req.url.searchParams.get("deptCd");
    if (targetDeptCd === "70040623") {
      return res(
        ctx.status(200),
        ctx.json({
          successOrNot: SuccessOrNot.Y,
          statusCode: StatusCode.SUCCESS,
          data: mockEmployees,
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: [],
      })
    );
  }),
];

export const employeeHandlerUrls = [/^\/api\/v1\/employee$/];
