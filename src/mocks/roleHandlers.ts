import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

let mockRoles = [
  { roleCd: "CMN", roleNm: "일반 사용자", roleDesc: "일반 사용자", useYn: "Y" },
  { roleCd: "PTN", roleNm: "협력업체", roleDesc: "협력업체", useYn: "Y" },
  { roleCd: "ADM", roleNm: "시스템 관리자", roleDesc: "시스템 관리자", useYn: "Y" },
];

const mockRoleDepartments = [
  {
    roleCd: "PTN",
    depts: [
      {
        deptCd: "ICR",
        copCd: "C100",
        deptNm: "A부서",
        deptEngNm: "A DEPT",
        deptCngNm: "A부서",
        temLdrUserId: "??",
        upprDeptCd: "IC",
        useYn: "Y",
      },
      {
        deptCd: "YY05",
        copCd: "C100",
        deptNm: "인사담당",
        deptEngNm: "HR",
        deptCngNm: "인사담당",
        temLdrUserId: null,
        upprDeptCd: "IB",
        useYn: "Y",
      },
    ],
  },
  {
    roleCd: "CMN",
    depts: [
      {
        deptCd: "ICR",
        copCd: "C100",
        deptNm: "A부서",
        deptEngNm: "A DEPT",
        deptCngNm: "A부서",
        temLdrUserId: null,
        upprDeptCd: "IC",
        useYn: "Y",
      },
      {
        deptCd: "YY06",
        copCd: "C100",
        deptNm: "인재개발담당",
        deptEngNm: "인재개발담당",
        deptCngNm: "인재개발담당",
        temLdrUserId: null,
        upprDeptCd: "IB",
        useYn: "Y",
      },
    ],
  },
  {
    roleCd: "ADM",
    depts: [
      {
        deptCd: "FB",
        copCd: "C100",
        deptNm: "정도경영 TFT",
        deptEngNm: "ICORP",
        deptCngNm: "정도경영 TFT",
        temLdrUserId: null,
        upprDeptCd: "IB",
        useYn: "Y",
      },
      {
        deptCd: "ICR",
        copCd: "C100",
        deptNm: "A부서",
        deptEngNm: "A DEPT",
        deptCngNm: "A부서",
        temLdrUserId: null,
        upprDeptCd: "IC",
        useYn: "Y",
      },
    ],
  },
];

const mockRoleEmployees = [
  {
    roleCd: "CMN",
    employeeList: [
      {
        userId: "741710",
        empNo: "2144",
        empNm: "개발자44",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "201232",
        empNo: "2131",
        empNm: "개발자31",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "201270",
        empNo: "2139",
        empNm: "개발자39",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "202545",
        empNo: "1515",
        empNm: "개발자15",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
    ],
  },
  {
    roleCd: "PTN",
    employeeList: [
      {
        userId: "741710",
        empNo: "2144",
        empNm: "개발자44",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "leesrho",
        empNo: "1212",
        empNm: "개발자12",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "masewonj",
        empNo: "2130",
        empNm: "개발자30",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "parkyoungs",
        empNo: "2127",
        empNm: "개발자27",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "rimmy",
        empNo: "2146",
        empNm: "개발자46",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "sewpark",
        empNo: "2125",
        empNm: "개발자25",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
    ],
  },
  {
    roleCd: "ADM",
    employeeList: [
      {
        userId: "200896",
        empNo: "2137",
        empNm: "개발자37",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "200996",
        empNo: "2134",
        empNm: "개발자34",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "600795",
        empNo: "2141",
        empNm: "개발자41",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "602069",
        empNo: "2133",
        empNm: "개발자33",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "605517",
        empNo: "2145",
        empNm: "개발자45",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "616974",
        empNo: "2140",
        empNm: "개발자40",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "618597",
        empNo: "1414",
        empNm: "개발자14",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "621459",
        empNo: "2136",
        empNm: "개발자36",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "710753",
        empNo: "1717",
        empNm: "���발자17",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "717464",
        empNo: "2138",
        empNm: "개발자38",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "720432",
        empNo: "2121",
        empNm: "개발자21",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "724376",
        empNo: "1818",
        empNm: "개발자18",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "727448",
        empNo: "2135",
        empNm: "개발자35",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "727694",
        empNo: "2132",
        empNm: "개발자32",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "731283",
        empNo: "2142",
        empNm: "개발자42",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "741714",
        empNo: "2143",
        empNm: "개발자43",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "742517",
        empNo: "2123",
        empNm: "개발자23",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "742716",
        empNo: "1616",
        empNm: "개발자16",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "742938",
        empNo: "2122",
        empNm: "개발자22",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "743774",
        empNo: "1313",
        empNm: "개발자13",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "743776",
        empNo: "2020",
        empNm: "개발자20",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "743778",
        empNo: "1919",
        empNm: "개발자19",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "aaronkim",
        empNo: "2128",
        empNm: "개발자28",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "blingsurio",
        empNo: "2126",
        empNm: "개발자26",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "chbaeson_es",
        empNo: "2124",
        empNm: "개발자24",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "kyyun",
        empNo: "55",
        empNm: "개발자5",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
      {
        userId: "testid",
        empNo: "2129",
        empNm: "개발자29",
        deptCd: null,
        deptNm: null,
        copCd: "C100",
        jtiCd: null,
        jtiNm: null,
        jpsCd: null,
        jpsNm: null,
        emlSvrDmnIfoNm: null,
        officeNumber: null,
      },
    ],
  },
];

export const roleHandlers = [
  rest.get("/api/v1/roles", (req, res, ctx) => {
    const targetRoleNm = req.url.searchParams.get("roleNm");
    if (targetRoleNm) {
      return res(
        ctx.status(200),
        ctx.json({
          successOrNot: SuccessOrNot.Y,
          statusCode: StatusCode.SUCCESS,
          data: mockRoles.filter(role => role.roleNm.includes(targetRoleNm)),
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: mockRoles,
      })
    );
  }),
  rest.post("/api/v1/roles", async (req, res, ctx) => {
    const requestBody = await req.json();
    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };
    requestBody.map((item: any) => {
      if (item.crudKey === "C") {
        mockRoles = [...mockRoles, { roleCd: item.roleCd, roleNm: item.roleNm, roleDesc: item.roleDesc, useYn: item.useYn }];
        cudResult.insertedRows++;
      } else if (item.crudKey === "D") {
        mockRoles = mockRoles.filter(role => role.roleCd !== item.roleCd);
        cudResult.deletedRows++;
      } else if (item.crudKey === "U") {
        mockRoles = mockRoles.map(role => (role.roleCd === item.roleCd ? { ...role, roleNm: item.roleNm, roleDesc: item.roleDesc, useYn: item.useYn } : role));
        cudResult.updatedRows++;
      }
    });
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: cudResult,
      })
    );
  }),
  rest.get("/api/v1/role/:roleCd/departments", (req, res, ctx) => {
    const targetRoleCd = req.params.roleCd;

    if (targetRoleCd) {
      return res(
        ctx.status(200),
        ctx.json({
          successOrNot: SuccessOrNot.Y,
          statusCode: StatusCode.SUCCESS,
          data: mockRoleDepartments.filter(role => role.roleCd === targetRoleCd)[0].depts,
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: mockRoleDepartments,
      })
    );
  }),
  rest.post("/api/v1/role/:roleCd/departments", async (req, res, ctx) => {
    const targetRoleCd = req.params.roleCd;
    const requestBody = await req.json();
    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    requestBody.deptCdList.map((deptCd: any) => {
      mockRoleDepartments.map(mockRoleDept => {
        if (mockRoleDept.roleCd === targetRoleCd) {
          mockRoleDept.depts = [
            ...mockRoleDept.depts,
            {
              deptCd: deptCd,
              copCd: "B100",
              deptNm: "테스트부서_${deptCd}",
              deptEngNm: "Advisors",
              deptCngNm: "테스트부서_${deptCd}",
              temLdrUserId: "07001766",
              upprDeptCd: "58174290",
              useYn: "Y",
            },
          ];
        }

        cudResult.insertedRows++;
      });
    });
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: cudResult,
      })
    );
  }),
  rest.delete("/api/v1/role/:roleCd/departments", async (req, res, ctx) => {
    const targetRoleCd = req.params.roleCd;
    const targetDeptCdList = req.url.searchParams.getAll("deptCdList");

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    mockRoleDepartments.map(mockRoleDept => {
      if (mockRoleDept.roleCd === targetRoleCd) {
        targetDeptCdList.map(target => {
          mockRoleDept.depts = mockRoleDept.depts.filter(dept => dept.deptCd !== target);
          cudResult.deletedRows++;
        });
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: cudResult,
      })
    );
  }),
  rest.get("/api/v1/role/:roleCd/employees", (req, res, ctx) => {
    const targetRoleCd = req.params.roleCd;

    if (targetRoleCd) {
      return res(
        ctx.status(200),
        ctx.json({
          successOrNot: SuccessOrNot.Y,
          statusCode: StatusCode.SUCCESS,
          data: mockRoleEmployees.filter(role => role.roleCd === targetRoleCd)[0].employeeList,
        })
      );
    }
  }),
  rest.post("/api/v1/role/:roleCd/employees", async (req, res, ctx) => {
    const targetRoleCd = req.params.roleCd;
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    mockRoleEmployees.map(roleEmployee => {
      if (roleEmployee.roleCd === targetRoleCd) {
        requestBody.userIdList.map((userId: any) => {
          roleEmployee.employeeList = [
            ...roleEmployee.employeeList,
            {
              userId: userId,
              empNo: userId,
              empNm: "추가된 개발자_${userId}",
              deptCd: null,
              deptNm: null,
              copCd: "C100",
              jtiCd: null,
              jtiNm: null,
              jpsCd: null,
              jpsNm: null,
              emlSvrDmnIfoNm: null,
              officeNumber: null,
            },
          ];
          cudResult.insertedRows++;
        });
      }
    });
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: cudResult,
      })
    );
  }),
  rest.delete("/api/v1/role/:roleCd/employees", async (req, res, ctx) => {
    const targetRoleCd = req.params.roleCd;
    const targetUserIdList = req.url.searchParams.get("userIdList")?.split(",");

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    mockRoleEmployees.map(roleEmployee => {
      if (roleEmployee.roleCd === targetRoleCd) {
        targetUserIdList?.map(userId => {
          roleEmployee.employeeList = roleEmployee.employeeList.filter(emp => emp.userId !== userId);
          cudResult.deletedRows++;
        });
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: cudResult,
      })
    );
  }),
];

export const roleHandlerUrls = [/^\/api\/v1\/roles$/, /^\/api\/v1\/role\/([^/]+)\/departments$/, /^\/api\/v1\/role\/([^/]+)\/employees$/];
