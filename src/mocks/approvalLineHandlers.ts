import { getUserInfo } from "./../apis/common/Employee";
import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

let mockApprovalRules = [
  {
    aprRuleId: "AR-001",
    aprRuleNm: "비정형 품의 요청2",
    aprLnAddPmitYn: "Y",
    aprRferAddPsblYn: "Y",
    aprLnRstbPmitYn: "Y",
    aprLnDuplPmitYn: "Y",
    aprExcTgtId: null,
    mstNtdkId: "1",
  },
  {
    aprRuleId: "AR-002",
    aprRuleNm: "테스트",
    aprLnAddPmitYn: "Y",
    aprRferAddPsblYn: "Y",
    aprLnRstbPmitYn: "Y",
    aprLnDuplPmitYn: "Y",
    aprExcTgtId: "1",
    mstNtdkId: "1",
  },
  {
    aprRuleId: "AR-003",
    aprRuleNm: "160630",
    aprLnAddPmitYn: "Y",
    aprRferAddPsblYn: "Y",
    aprLnRstbPmitYn: "Y",
    aprLnDuplPmitYn: "Y",
    aprExcTgtId: null,
    mstNtdkId: "1",
  },
];

let mockApprovalRuleDetails = [
  {
    aprRuleId: "AR-001",
    aprLnId: "ARL-035",
    aprTpDivsCd: "APV",
    prlYn: "Y",
    aprLnSnb: "1",
    aprLnSeq: "1",
    aprLnRoleCd: "USER",
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-001",
    aprLnId: "ARL-036",
    aprTpDivsCd: "REF",
    prlYn: "Y",
    aprLnSnb: "2",
    aprLnSeq: "2",
    aprLnRoleCd: null,
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-001",
    aprLnId: "ARL-037",
    aprTpDivsCd: "REF",
    prlYn: "Y",
    aprLnSnb: "2",
    aprLnSeq: "3",
    aprLnRoleCd: null,
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-001",
    aprLnId: "ARL-038",
    aprTpDivsCd: "CHR",
    prlYn: "N",
    aprLnSnb: "2.00000",
    aprLnSeq: "4",
    aprLnRoleCd: null,
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-002",
    aprLnId: "ARL-028",
    aprTpDivsCd: "APV",
    prlYn: null,
    aprLnSnb: "1.00000",
    aprLnSeq: "1",
    aprLnRoleCd: "USER",
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-002",
    aprLnId: "ARL-029",
    aprTpDivsCd: "REF",
    prlYn: null,
    aprLnSnb: "2.00000",
    aprLnSeq: "2",
    aprLnRoleCd: null,
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-002",
    aprLnId: "ARL-030",
    aprTpDivsCd: "CHR",
    prlYn: null,
    aprLnSnb: "2.00000",
    aprLnSeq: "3",
    aprLnRoleCd: null,
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-003",
    aprLnId: "ARL-031",
    aprTpDivsCd: "APV",
    prlYn: null,
    aprLnSnb: "1.00000",
    aprLnSeq: "1",
    aprLnRoleCd: "TEAM",
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-003",
    aprLnId: "ARL-032",
    aprTpDivsCd: "AGR",
    prlYn: null,
    aprLnSnb: "2.00000",
    aprLnSeq: "2",
    aprLnRoleCd: "GROP",
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-003",
    aprLnId: "ARL-033",
    aprTpDivsCd: "REF",
    prlYn: null,
    aprLnSnb: "3.00000",
    aprLnSeq: "3",
    aprLnRoleCd: null,
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
  {
    aprRuleId: "AR-003",
    aprLnId: "ARL-034",
    aprTpDivsCd: "CHR",
    prlYn: null,
    aprLnSnb: "3.00000",
    aprLnSeq: "4",
    aprLnRoleCd: null,
    deptCd: null,
    deptNm: null,
    userId: "developer",
    userInfo: "개발자1(developer/사원/업무지원팀(과천／마곡P))",
    aprLnChgPsblYn: "N",
    aprLnDelPsblYn: "N",
  },
];

export const approvalLineHandlers = [
  rest.get("/api/v1/approval/rules", async (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const paramRuleId = searchParams.get("aprRuleId");
    const paramRuleNm = searchParams.get("searchRuleNm");

    let filteredApprovalRules = mockApprovalRules;
    if (paramRuleId) {
      filteredApprovalRules = filteredApprovalRules.filter(rule => rule.aprRuleId === paramRuleId);
    }
    if (paramRuleNm) {
      filteredApprovalRules = filteredApprovalRules.filter(rule => rule.aprRuleNm.includes(paramRuleNm));
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredApprovalRules,
      })
    );
  }),
  rest.get("/api/v1/approval/rule/:aprRuleId/details", async (req, res, ctx) => {
    const paramRuleId = req.params.aprRuleId;

    let filteredApprovalRules = mockApprovalRuleDetails;
    if (paramRuleId) {
      filteredApprovalRules = filteredApprovalRules.filter(rule => rule.aprRuleId === paramRuleId);
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredApprovalRules,
      })
    );
  }),
  rest.get("/api/v1/approval/rule", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/v1/approval/rule/details", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/api/v1/approval/rule", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    if (requestBody) {
      mockApprovalRules = mockApprovalRules.map(rule =>
        rule.aprRuleId === requestBody.aprRuleId
          ? {
              ...rule,
              aprRuleNm: requestBody.aprRuleNm,
              aprLnAddPmitYn: requestBody.aprLnAddPmitYn,
              aprRferAddPsblYn: requestBody.aprRferAddPsblYn,
              aprLnRstbPmitYn: requestBody.aprLnRstbPmitYn,
              aprLnDuplPmitYn: requestBody.aprLnDuplPmitYn,
              aprExcTgtId: requestBody.aprExcTgtId,
              mstNtdkId: requestBody.mstNtdkId,
            }
          : rule
      );
      cudResult.updatedRows++;
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: cudResult,
      })
    );
  }),
  rest.post("/api/v1/approval/rule/details", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    requestBody.map((item: any) => {
      if (item.crudKey === "C") {
        mockApprovalRuleDetails = [
          ...mockApprovalRuleDetails,
          {
            aprRuleId: item.aprRuleId,
            aprLnId: item.aprLnId,
            aprLnChgPsblYn: item.aprLnChgPsblYn,
            aprLnDelPsblYn: item.aprLnDelPsblYn,
            aprLnRoleCd: item.aprLnRoleCd,
            aprLnSeq: item.aprLnSeq,
            aprLnSnb: item.aprLnSnb,
            aprTpDivsCd: item.aprTpDivsCd,
            deptCd: item.deptCd,
            deptNm: item.deptNm,
            prlYn: item.prlYn,
            userId: item.userId,
            userInfo: item.userInfo,
          },
        ];
        cudResult.insertedRows++;
      } else if (item.crudKey === "U") {
        mockApprovalRuleDetails = mockApprovalRuleDetails.map(detail =>
          detail.aprRuleId === item.aprRuleId && detail.aprLnId === item.aprLnId
            ? {
                ...detail,
                aprLnChgPsblYn: item.aprLnChgPsblYn,
                aprLnDelPsblYn: item.aprLnDelPsblYn,
                aprLnRoleCd: item.aprLnRoleCd,
                aprLnSeq: item.aprLnSeq,
                aprLnSnb: item.aprLnSnb,
                aprTpDivsCd: item.aprTpDivsCd,
                deptCd: item.deptCd,
                deptNm: item.deptNm,
                prlYn: item.prlYn,
                userId: item.userId,
                userInfo: item.userInfo,
              }
            : detail
        );
        cudResult.updatedRows++;
      } else if (item.crudKey === "D") {
        mockApprovalRuleDetails = mockApprovalRuleDetails.filter(detail => detail.aprLnId !== item.aprLnId || detail.aprRuleId !== item.aprRuleId);
        cudResult.deletedRows++;
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: cudResult,
      })
    );
  }),
];

export const approvalLineHandlerUrls = [/^\/api\/v1\/approval\/rules$/, /^\/api\/v1\/approval\/rule$/, /^\/api\/v1\/approval\/rule\/details$/, /^\/api\/v1\/approval\/rule\/([^/]+)\/details$/];
