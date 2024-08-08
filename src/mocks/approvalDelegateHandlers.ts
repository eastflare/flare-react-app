import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

let mockDelegates = [
  {
    aprDlgtNo: "3",
    aprDlgtUserId: "leesrho",
    aprDlgtUserDisplay: "개발자12(leesrho)",
    dlgtUserDept: null,
    aprDeleUserId: "rimmy",
    aprDeleUserDisplay: "개발자46(rimmy)",
    deleUserDept: null,
    aprDlgtStDt: "20240101",
    aprDlgtEndDt: "20240131",
    status: "위임중",
    useYn: "Y",
    dataInsUserId: "developer",
    dataInsDtm: "2024.01.23 00:00:00",
  },
  {
    aprDlgtNo: "2",
    aprDlgtUserId: "alexkoo",
    aprDlgtUserDisplay: "개발자7(alexkoo)",
    dlgtUserDept: null,
    aprDeleUserId: "jongyokim",
    aprDeleUserDisplay: "개발자8(jongyokim)",
    deleUserDept: null,
    aprDlgtStDt: "20240101",
    aprDlgtEndDt: "20240131",
    status: "위임중",
    useYn: "Y",
    dataInsUserId: "developer",
    dataInsDtm: "2024.01.23 00:00:00",
  },
  {
    aprDlgtNo: "1",
    aprDlgtUserId: "developer",
    aprDlgtUserDisplay: "개발자1(developer)",
    dlgtUserDept: null,
    aprDeleUserId: "monovolt23",
    aprDeleUserDisplay: "개발자4(monovolt23)",
    deleUserDept: null,
    aprDlgtStDt: "20240101",
    aprDlgtEndDt: "20240131",
    status: "위임중",
    useYn: "Y",
    dataInsUserId: "developer",
    dataInsDtm: "2024.01.23 00:00:00",
  },
];

export const approvalTemplateHandlers = [
  rest.get("/api/v1/approval/delegates", async (req, res, ctx) => {
    const searchParams = await req.url.searchParams;
    const paramAprDlgtUserId = searchParams.get("aprDlgtUserId");
    const paramStatusFlag = searchParams.get("statusFlag");

    let filteredDelegates = mockDelegates;
    if (paramAprDlgtUserId) {
      filteredDelegates = filteredDelegates.filter(template => template.aprDlgtUserId === paramAprDlgtUserId);
    }

    if (paramStatusFlag) {
      filteredDelegates = filteredDelegates.filter(delegate => delegate.status === paramStatusFlag);
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredDelegates,
      })
    );
  }),
  rest.post("/api/v1/approval/delegate", async (req, res, ctx) => {
    const requestBody = await req.json();
    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    requestBody.map((item: any) => {
      if (item.crudKey === "C") {
        mockDelegates = [
          ...mockDelegates,
          {
            aprDlgtNo: item.aprDlgtNo,
            aprDlgtUserId: item.aprDlgtUserId,
            aprDlgtUserDisplay: item.aprDlgtUserDisplay,
            dlgtUserDept: item.dlgtUserDept,
            aprDeleUserId: item.aprDeleUserId,
            aprDeleUserDisplay: item.aprDeleUserDisplay,
            deleUserDept: item.deleUserDept,
            aprDlgtStDt: item.aprDlgtStDt,
            aprDlgtEndDt: item.aprDlgtEndDt,
            status: item.status,
            useYn: item.useYn,
            dataInsUserId: "developer",
            dataInsDtm: "2024.01.24 00:00:00",
          },
        ];
        cudResult.insertedRows++;
      } else if (item.crudKey === "U") {
        mockDelegates = mockDelegates.map(delegate =>
          delegate.aprDlgtNo === item.aprDlgtNo
            ? {
                ...item,
                dataInsUserId: "developer",
                dataInsDtm: "2024.01.24 00:00:00",
              }
            : delegate
        );
        cudResult.updatedRows++;
      } else if (item.crudKey === "D") {
        mockDelegates = mockDelegates.filter(delegate => delegate.aprDlgtNo !== item.aprDlgtNo);
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

export const approvalDelegateHandlerUrls = [/^\/api\/v1\/approval\/delegates$/];
