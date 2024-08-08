import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

let mockApis = [
  {
    apiId: "postApiUrls",
    apiNm: "api 수정",
    apiRoles: ["CMN"],
    apiUrl: "/api/v1/apiUrls",
    dataInsDtm: "2024.01.11 00:00:00",
    dataInsUserName: "개발자1",
    dataUpdDtm: "2024.01.11 00:00:00",
    dataUpdUserName: "개발자1",
    httpMthdCd: "POST",
    useYn: "Y",
  },
  {
    apiId: "getApiUrls",
    apiNm: "api 조회",
    apiUrl: "/api/v1/apiUrls",
    httpMthdCd: "GET",
    apiRoles: ["CMN"],
    useYn: "Y",
    dataInsUserName: "개발자1",
    dataInsDtm: "2024.01.11 00:00:00",
    dataUpdUserName: "개발자1",
    dataUpdDtm: "2024.01.11 00:00:00",
  },
  {
    apiId: "getBbsPosts",
    apiNm: "게시물 목록 조회",
    apiUrl: "/api/v1/bbs/posts",
    httpMthdCd: "GET",
    apiRoles: ["CMN"],
    useYn: "Y",
    dataInsUserName: "개발자1",
    dataInsDtm: "2024.01.11 00:00:00",
    dataUpdUserName: "개발자1",
    dataUpdDtm: "2024.01.11 00:00:00",
  },
  {
    apiId: "getBbsPost",
    apiNm: "게시글 상세 조회",
    apiUrl: "/api/v1/bbs/post",
    httpMthdCd: "GET",
    apiRoles: ["CMN"],
    useYn: "Y",
    dataInsUserName: "개발자1",
    dataInsDtm: "2024.01.11 00:00:00",
    dataUpdUserName: "개발자1",
    dataUpdDtm: "2024.01.11 00:00:00",
  },
  {
    apiId: "postBbsPost",
    apiNm: "게시글 생성",
    apiUrl: "/api/v1/bbs/post",
    httpMthdCd: "POST",
    apiRoles: ["CMN"],
    useYn: "Y",
    dataInsUserName: "개발자1",
    dataInsDtm: "2024.01.11 00:00:00",
    dataUpdUserName: "개발자1",
    dataUpdDtm: "2024.01.11 00:00:00",
  },
  {
    apiId: "putBbsPost",
    apiNm: "게시글 수정",
    apiUrl: "/api/v1/bbs/post",
    httpMthdCd: "PUT",
    apiRoles: ["CMN"],
    useYn: "Y",
    dataInsUserName: "개발자1",
    dataInsDtm: "2024.01.11 00:00:00",
    dataUpdUserName: "개발자1",
    dataUpdDtm: "2024.01.11 00:00:00",
  },
  {
    apiId: "deleteBbsPost",
    apiNm: "게시글 삭제",
    apiUrl: "/api/v1/bbs/post",
    httpMthdCd: "DELETE",
    apiRoles: ["CMN"],
    useYn: "Y",
    dataInsUserName: "개발자1",
    dataInsDtm: "2024.01.11 00:00:00",
    dataUpdUserName: "개발자1",
    dataUpdDtm: "2024.01.11 00:00:00",
  },
];

export const apiHandlers = [
  rest.get("/api/v1/apiUrls", async (req, res, ctx) => {
    const searchParams = await req.url.searchParams;
    const paramApiNm = searchParams.get("apiNm");
    const paramApiUrl = searchParams.get("apiUrl");
    const paramUseYn = searchParams.get("useYn");

    let filteredApis = mockApis;
    if (paramApiNm) {
      filteredApis = filteredApis.filter(api => api.apiNm.includes(paramApiNm));
    }
    if (paramApiUrl) {
      filteredApis = filteredApis.filter(api => api.apiUrl.includes(paramApiUrl));
    }
    if (paramUseYn) {
      filteredApis = filteredApis.filter(api => api.useYn === paramUseYn);
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredApis,
      })
    );
  }),
  rest.post("/api/v1/apiUrls", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    requestBody.map(item => {
      if (item.crudKey === "C") {
        mockApis = [
          ...mockApis,
          {
            apiId: item.apiId,
            apiNm: item.apiNm,
            apiUrl: item.apiUrl,
            httpMthdCd: item.httpMthdCd,
            apiRoles: item.apiRoles,
            useYn: item.useYn,
            dataInsUserName: "개발자1",
            dataInsDtm: "2024.01.11 00:00:00",
            dataUpdUserName: "개발자1",
            dataUpdDtm: "2024.01.11 00:00:00",
          },
        ];
        cudResult.insertedRows++;
      } else if (item.crudKey === "U") {
        mockApis = mockApis.map(api =>
          api.apiId === item.apiId
            ? {
                ...api,
                apiNm: item.apiNm,
                apiUrl: item.apiUrl,
                httpMthdCd: item.httpMthdCd,
                apiRoles: item.apiRoles,
                useYn: item.useYn,
              }
            : api
        );
        cudResult.updatedRows++;
      } else if (item.crudKey === "D") {
        mockApis = mockApis.filter(api => api.apiId !== item.apiId);
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

export const apiHandlerUrls = [/^\/api\/v1\/apiUrls$/];
