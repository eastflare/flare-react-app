import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "@/models/common/RestApi";

let mockNotificationGroups = [
  {
    ntdkId: "1",
    ntdkNm: "테스트 통보처",
    ntdkDesc: "테스트 통보처",
    ntdkDivsCd: null,
    aprNotfUserId: null,
    sortOrd: null,
    useYn: "Y",
  },
  {
    ntdkId: "2",
    ntdkNm: "테스트",
    ntdkDesc: "설명",
    ntdkDivsCd: null,
    aprNotfUserId: null,
    sortOrd: null,
    useYn: "Y",
  },
  {
    ntdkId: "3",
    ntdkNm: "테스트22",
    ntdkDesc: "22",
    ntdkDivsCd: null,
    aprNotfUserId: null,
    sortOrd: null,
    useYn: "Y",
  },
];

const mockApprovalGroups = [
  {
    aprLnDivsCd: "INFR",
    aprRuleId: "",
    aprRuleNm: "",
    aprLnAddPmitYn: "",
    aprRferAddPsblYn: "",
    aprLnRstbPmitYn: "",
    aprLnDuplPmitYn: "",
    aprExcTgtId: "",
    mstNtdkId: "1",
    aprLnId: "",
    aprTpDivsCd: "",
    prlYn: "",
    aprLnSnb: 0,
    aprLnSeq: 0,
    aprLnRoleCd: "",
    basDeptCd: "",
    basUserId: "",
    aprLnChgPsblYn: "",
    aprLnDelPsblYn: "",
    userId: "gylee",
    userInfo: "개발자10(gylee/사원/업무지원팀)",
    empNo: "1010",
    empNm: "개발자10",
    empEngNm: null,
    empCngNm: null,
    deptCd: "70040623",
    deptNm: null,
    deptEngNm: null,
    deptCngNm: null,
    copCd: "B100",
    jtiCd: null,
    jtiNm: null,
    jtiEngNm: null,
    jtiCngNm: null,
    jpsCd: "GE0",
    jpsNm: "사원",
    jpsEngNm: null,
    jpsCngNm: null,
    upprEmpNo: "1111",
    onduRegnCd: null,
    onduRegnNm: null,
    ctryCd: null,
    useYn: "Y",
    aprDlgtNo: "",
    aprDlgtUserId: "",
    aprDlgtUserEmpNm: "",
    aprDlgtUserJtiNm: "",
    aprDlgtUserDeptNm: "",
    aprDlgtUserInfo: "",
    aprDeleUserId: "",
    aprDeleEmpName: "",
    aprDeleJtiNm: "",
    aprDeleDeptNm: "",
    aprDeleUserInfo: "",
    aprDlgtStDt: "",
    aprDlgtEndDt: "",
  },
  {
    aprLnDivsCd: "INFR",
    aprRuleId: "",
    aprRuleNm: "",
    aprLnAddPmitYn: "",
    aprRferAddPsblYn: "",
    aprLnRstbPmitYn: "",
    aprLnDuplPmitYn: "",
    aprExcTgtId: "",
    mstNtdkId: "1",
    aprLnId: "",
    aprTpDivsCd: "",
    prlYn: "",
    aprLnSnb: 0,
    aprLnSeq: 0,
    aprLnRoleCd: "",
    basDeptCd: "",
    basUserId: "",
    aprLnChgPsblYn: "",
    aprLnDelPsblYn: "",
    userId: "alexkoo",
    userInfo: "개발자7(alexkoo/사원/업무지원팀)",
    empNo: "77",
    empNm: "개발자7",
    empEngNm: null,
    empCngNm: null,
    deptCd: "70040623",
    deptNm: null,
    deptEngNm: null,
    deptCngNm: null,
    copCd: "B100",
    jtiCd: null,
    jtiNm: null,
    jtiEngNm: null,
    jtiCngNm: null,
    jpsCd: "GE0",
    jpsNm: "사원",
    jpsEngNm: null,
    jpsCngNm: null,
    upprEmpNo: "1111",
    onduRegnCd: null,
    onduRegnNm: null,
    ctryCd: null,
    useYn: "Y",
    aprDlgtNo: "",
    aprDlgtUserId: "",
    aprDlgtUserEmpNm: "",
    aprDlgtUserJtiNm: "",
    aprDlgtUserDeptNm: "",
    aprDlgtUserInfo: "",
    aprDeleUserId: "",
    aprDeleEmpName: "",
    aprDeleJtiNm: "",
    aprDeleDeptNm: "",
    aprDeleUserInfo: "",
    aprDlgtStDt: "",
    aprDlgtEndDt: "",
  },
  {
    aprLnDivsCd: "INFR",
    aprRuleId: "",
    aprRuleNm: "",
    aprLnAddPmitYn: "",
    aprRferAddPsblYn: "",
    aprLnRstbPmitYn: "",
    aprLnDuplPmitYn: "",
    aprExcTgtId: "",
    mstNtdkId: "2",
    aprLnId: "",
    aprTpDivsCd: "",
    prlYn: "",
    aprLnSnb: 0,
    aprLnSeq: 0,
    aprLnRoleCd: "",
    basDeptCd: "",
    basUserId: "",
    aprLnChgPsblYn: "",
    aprLnDelPsblYn: "",
    userId: "ksso",
    userInfo: "개발자6(ksso/사원/업무지원팀)",
    empNo: "66",
    empNm: "개발자6",
    empEngNm: null,
    empCngNm: null,
    deptCd: "70040623",
    deptNm: null,
    deptEngNm: null,
    deptCngNm: null,
    copCd: "B100",
    jtiCd: null,
    jtiNm: null,
    jtiEngNm: null,
    jtiCngNm: null,
    jpsCd: "GE0",
    jpsNm: "사원",
    jpsEngNm: null,
    jpsCngNm: null,
    upprEmpNo: "1111",
    onduRegnCd: null,
    onduRegnNm: null,
    ctryCd: null,
    useYn: "Y",
    aprDlgtNo: "",
    aprDlgtUserId: "",
    aprDlgtUserEmpNm: "",
    aprDlgtUserJtiNm: "",
    aprDlgtUserDeptNm: "",
    aprDlgtUserInfo: "",
    aprDeleUserId: "",
    aprDeleEmpName: "",
    aprDeleJtiNm: "",
    aprDeleDeptNm: "",
    aprDeleUserInfo: "",
    aprDlgtStDt: "",
    aprDlgtEndDt: "",
  },
  {
    aprLnDivsCd: "INFR",
    aprRuleId: "",
    aprRuleNm: "",
    aprLnAddPmitYn: "",
    aprRferAddPsblYn: "",
    aprLnRstbPmitYn: "",
    aprLnDuplPmitYn: "",
    aprExcTgtId: "",
    mstNtdkId: "2",
    aprLnId: "",
    aprTpDivsCd: "",
    prlYn: "",
    aprLnSnb: 0,
    aprLnSeq: 0,
    aprLnRoleCd: "",
    basDeptCd: "",
    basUserId: "",
    aprLnChgPsblYn: "",
    aprLnDelPsblYn: "",
    userId: "leejhmj",
    userInfo: "개발자9(leejhmj/사원/업무지원팀)",
    empNo: "99",
    empNm: "개발자9",
    empEngNm: null,
    empCngNm: null,
    deptCd: "70040623",
    deptNm: null,
    deptEngNm: null,
    deptCngNm: null,
    copCd: "B100",
    jtiCd: null,
    jtiNm: null,
    jtiEngNm: null,
    jtiCngNm: null,
    jpsCd: "GE0",
    jpsNm: "사원",
    jpsEngNm: null,
    jpsCngNm: null,
    upprEmpNo: "1111",
    onduRegnCd: null,
    onduRegnNm: null,
    ctryCd: null,
    useYn: "Y",
    aprDlgtNo: "",
    aprDlgtUserId: "",
    aprDlgtUserEmpNm: "",
    aprDlgtUserJtiNm: "",
    aprDlgtUserDeptNm: "",
    aprDlgtUserInfo: "",
    aprDeleUserId: "",
    aprDeleEmpName: "",
    aprDeleJtiNm: "",
    aprDeleDeptNm: "",
    aprDeleUserInfo: "",
    aprDlgtStDt: "",
    aprDlgtEndDt: "",
  },
  {
    aprLnDivsCd: "INFR",
    aprRuleId: "",
    aprRuleNm: "",
    aprLnAddPmitYn: "",
    aprRferAddPsblYn: "",
    aprLnRstbPmitYn: "",
    aprLnDuplPmitYn: "",
    aprExcTgtId: "",
    mstNtdkId: "3",
    aprLnId: "",
    aprTpDivsCd: "",
    prlYn: "",
    aprLnSnb: 0,
    aprLnSeq: 0,
    aprLnRoleCd: "",
    basDeptCd: "",
    basUserId: "",
    aprLnChgPsblYn: "",
    aprLnDelPsblYn: "",
    userId: "tihwang",
    userInfo: "개발자11(tihwang/사원/업무지원팀)",
    empNo: "11111",
    empNm: "개발자11",
    empEngNm: null,
    empCngNm: null,
    deptCd: "70040623",
    deptNm: null,
    deptEngNm: null,
    deptCngNm: null,
    copCd: "B100",
    jtiCd: null,
    jtiNm: null,
    jtiEngNm: null,
    jtiCngNm: null,
    jpsCd: "GE0",
    jpsNm: "사원",
    jpsEngNm: null,
    jpsCngNm: null,
    upprEmpNo: "1111",
    onduRegnCd: null,
    onduRegnNm: null,
    ctryCd: null,
    useYn: "Y",
    aprDlgtNo: "",
    aprDlgtUserId: "",
    aprDlgtUserEmpNm: "",
    aprDlgtUserJtiNm: "",
    aprDlgtUserDeptNm: "",
    aprDlgtUserInfo: "",
    aprDeleUserId: "",
    aprDeleEmpName: "",
    aprDeleJtiNm: "",
    aprDeleDeptNm: "",
    aprDeleUserInfo: "",
    aprDlgtStDt: "",
    aprDlgtEndDt: "",
  },
];

const mockDivisions = [
  {
    ntdkDivsCd: "DEF",
    ntdkDivsNm: "기본",
  },
  {
    ntdkDivsCd: "CMN",
    ntdkDivsNm: "임직원",
  },
  {
    ntdkDivsCd: "PTN",
    ntdkDivsNm: "협력사",
  },
];

let mockUsers = [
  {
    aprNotfUserId: "gylee",
    empNm: "개발자10",
    deptNm: "업무지원팀",
    jtiNm: null,
    ofcPhn: null,
    emlSvrDmnIfoNm: null,
    ntdkSeq: "1",
    ntdkDivsCd: "KC",
    ntdkId: "1",
    sortOrd: null,
    useYn: "Y",
  },
  {
    aprNotfUserId: "alexkoo",
    empNm: "개발자7",
    deptNm: "업무지원팀",
    jtiNm: null,
    ofcPhn: null,
    emlSvrDmnIfoNm: null,
    ntdkSeq: "2",
    ntdkDivsCd: "CM",
    ntdkId: "1",
    sortOrd: null,
    useYn: "Y",
  },
  {
    aprNotfUserId: "ksso",
    empNm: "개발자6",
    deptNm: "업무지원팀",
    jtiNm: null,
    ofcPhn: null,
    emlSvrDmnIfoNm: null,
    ntdkSeq: "1",
    ntdkDivsCd: "NJ",
    ntdkId: "2",
    sortOrd: null,
    useYn: "Y",
  },
  {
    aprNotfUserId: "leejhmj",
    empNm: "개발자9",
    deptNm: "업무지원팀",
    jtiNm: null,
    ofcPhn: null,
    emlSvrDmnIfoNm: null,
    ntdkSeq: "2",
    ntdkDivsCd: "YS",
    ntdkId: "2",
    sortOrd: null,
    useYn: "Y",
  },
  {
    aprNotfUserId: "tihwang",
    empNm: "개발자11",
    deptNm: "업무지원팀",
    jtiNm: null,
    ofcPhn: null,
    emlSvrDmnIfoNm: null,
    ntdkSeq: "1",
    ntdkDivsCd: "CM",
    ntdkId: "3",
    sortOrd: null,
    useYn: "Y",
  },
  {
    aprNotfUserId: "alexkoo",
    empNm: "개발자7",
    deptNm: "업무지원팀",
    jtiNm: null,
    ofcPhn: null,
    emlSvrDmnIfoNm: null,
    ntdkSeq: "1",
    ntdkDivsCd: "CM",
    ntdkId: "4",
    sortOrd: null,
    useYn: "Y",
  },
  {
    aprNotfUserId: "jongyokim",
    empNm: "개발자8",
    deptNm: "업무지원팀",
    jtiNm: null,
    ofcPhn: null,
    emlSvrDmnIfoNm: null,
    ntdkSeq: "2",
    ntdkDivsCd: "HQ",
    ntdkId: "4",
    sortOrd: null,
    useYn: "Y",
  },
];

export const notificationHandlers = [
  rest.get("/api/v1/notificationGroups", async (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const paramNtdkNm = searchParams.get("ntdkNm");

    let filteredNotificationGroups = mockNotificationGroups;
    if (paramNtdkNm) {
      filteredNotificationGroups = filteredNotificationGroups.filter(group => group.ntdkNm.includes(paramNtdkNm));
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredNotificationGroups,
      })
    );
  }),
  rest.get("/api/v1/notificationGroup/:ntdkId/approvals", async (req, res, ctx) => {
    const paramNtdkId = req.params.ntdkId;

    let filteredNotificationGroups = mockApprovalGroups;
    if (paramNtdkId) {
      filteredNotificationGroups = filteredNotificationGroups.filter(group => group.mstNtdkId === paramNtdkId);
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredNotificationGroups,
      })
    );
  }),
  rest.get("/api/v1/notificationGroup/divisions", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: mockDivisions,
      })
    );
  }),
  rest.get("/api/v1/notificationGroup/:ntdkId/users", async (req, res, ctx) => {
    const paramNtdkId = req.params.ntdkId;

    let filteredUsers = mockUsers;
    if (paramNtdkId) {
      filteredUsers = filteredUsers.filter(user => user.ntdkId === paramNtdkId);
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredUsers,
      })
    );
  }),
  rest.post("/api/v1/notificationGroups", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    requestBody.map((item: any) => {
      if (item.crudKey === "C") {
        mockNotificationGroups = [
          ...mockNotificationGroups,
          {
            ntdkId: item.ntdkId,
            ntdkNm: item.ntdkNm,
            ntdkDesc: item.ntdkDesc,
            ntdkDivsCd: item.ntdkDivsCd,
            aprNotfUserId: item.aprNotfUserId,
            sortOrd: item.sortOrd,
            useYn: item.useYn,
          },
        ];
        cudResult.insertedRows++;
      } else if (item.crudKey === "U") {
        mockNotificationGroups = mockNotificationGroups.map(group =>
          group.ntdkId === item.ntdkId
            ? {
                ...group,
                ntdkNm: item.ntdkNm,
                ntdkDesc: item.ntdkDesc,
              }
            : group
        );
        cudResult.updatedRows++;
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
  rest.put("/api/v1/notificationGroup/:ntdkId", async (req, res, ctx) => {
    const paramNtdkId = req.params.ntdkId;

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    if (paramNtdkId) {
      mockNotificationGroups = mockNotificationGroups.filter(group => group.ntdkId !== paramNtdkId);
      mockUsers = mockUsers.filter(user => user.ntdkId !== paramNtdkId);
      cudResult.deletedRows++;
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
  rest.post("/api/v1/notificationGroup/users", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    requestBody.map((item: any) => {
      if (item.crudKey === "C") {
        mockUsers = [
          ...mockUsers,
          {
            empNm: item.empNm,
            deptNm: item.deptNm,
            jtiNm: item.jtiNm,
            ofcPhn: item.ofcPhn,
            emlSvrDmnIfoNm: item.emlSvrDmnIfoNm,
            ntdkId: item.ntdkId,
            ntdkSeq: item.ntdkSeq,
            ntdkDivsCd: item.ntdkDivsCd,
            aprNotfUserId: item.aprNotfUserId,
            sortOrd: item.sortOrd,
            useYn: "Y",
          },
        ];
        cudResult.insertedRows++;
      } else if (item.crudKey === "U") {
        mockUsers = mockUsers.map(user =>
          user.ntdkId === item.ntdkId && user.ntdkSeq === item.ntdkSeq
            ? {
                ...user,
                aprNotfUserId: item.aprNotfUserId,
                ntdkDivsCd: item.ntdkDivsCd,
                empNm: item.empNm,
                deptNm: item.deptNm,
                jtiNm: item.jtiNm,
                ofcPhn: item.ofcPhn,
                emlSvrDmnIfoNm: item.emlSvrDmnIfoNm,
              }
            : user
        );
        cudResult.updatedRows++;
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

export const notificationHandlerUrls = [
  /^\/api\/v1\/notificationGroups$/,
  /^\/api\/v1\/notificationGroup\/([\d]+)\/approvals$/,
  /^\/api\/v1\/notificationGroup\/divisions$/,
  /^\/api\/v1\/notificationGroup\/([\d]+)\/users$/,
  /^\/api\/v1\/notificationGroup\/([\d]+)$/,
  /^\/api\/v1\/notificationGroup\/users$/,
];
