import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "@/models/common/RestApi";

interface MockDepartment {
  deptCd: string;
  copCd: string;
  deptNm: string;
  deptEngNm: string | null;
  deptCngNm: string | null;
  temLdrUserId: string | null;
  upprDeptCd: string | null;
  useYn: string;
}

const mockDepartments: MockDepartment[] = [
  {
    deptCd: "58093132",
    copCd: "B100",
    deptNm: "A사업부",
    deptEngNm: "Advanced Automotive Battery Division",
    deptCngNm: "A사업부",
    temLdrUserId: null,
    upprDeptCd: "58174290",
    useYn: "Y",
  },
  {
    deptCd: "58690999",
    copCd: "B100",
    deptNm: "고문실",
    deptEngNm: "Advisors",
    deptCngNm: "고문실",
    temLdrUserId: null,
    upprDeptCd: "58174290",
    useYn: "Y",
  },
  {
    deptCd: "70020762",
    copCd: "B100",
    deptNm: "경영지원센터",
    deptEngNm: "Business Support Center",
    deptCngNm: "경영지원센터",
    temLdrUserId: null,
    upprDeptCd: "58174290",
    useYn: "Y",
  },
];

export const departmentsHandlers = [
  rest.get("/api/v1/departments", (req, res, ctx) => {
    const targetSearchItem = req.url.searchParams.get("searchItem");

    if (targetSearchItem) {
      const resultDepartments: MockDepartment[] = [];
      mockDepartments.map(department => {
        if (
          department.deptCd.includes(targetSearchItem) ||
          department.deptNm.includes(targetSearchItem) ||
          (department.deptEngNm && department.deptEngNm.includes(targetSearchItem)) ||
          (department.deptCngNm && department.deptCngNm.includes(targetSearchItem))
        ) {
          resultDepartments.push(department);
        }
      });

      return res(
        ctx.status(200),
        ctx.json({
          successOrNot: SuccessOrNot.Y,
          statusCode: StatusCode.SUCCESS,
          data: { departmentList: resultDepartments, userDeptCd: "70040623" },
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        successOrNot: SuccessOrNot.Y,
        statusCode: StatusCode.SUCCESS,
        data: { departmentList: mockDepartments, userDeptCd: "70040623" },
      })
    );
  }),
];

export const departmentsHandlerUrls = [/^\/api\/v1\/departments$/];
