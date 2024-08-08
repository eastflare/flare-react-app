import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

let mockTemplates = [
  {
    aprTplId: "SEC-FORM-0069",
    intgAprTpCd: "TYPE3",
    aprTplNm: "비정형 품의 요청2",
    sortOrd: 1,
    aprTplDesc: "비정형 품의서2",
    useYn: "Y",
    prsDesc:
      '<html xml:lang="ko" lang="ko">\r\n<head>\r\n<title>?？？紐⑹？？?？？</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n<style type="text/css"> body{font-family :Malgun Gothic; color : #000000; font-size : 10pt;  margin : 0 0 0 3px;} p,li{line-height:1.2; margin-top:0; margin-bottom:0;}\r\n</style>\r\n</head>\r\n<body>\r\n<p>?？？濡？??？??？ㅻ?....</p>\r\n</body>\r\n</html>',
    wcstUseYn: "Y",
    wcstDesc:
      '<html xml:lang="ko" lang="ko">\r\n<head>\r\n<title>?？？紐⑹？？?？？</title>\r\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n<style type="text/css"> body{font-family :Malgun Gothic; color : #000000; font-size : 10pt;  margin : 0 0 0 3px;} p,li{line-height:1.2; margin-top:0; margin-bottom:0;}\r\n</style>\r\n</head>\r\n<body>\r\n<p>?？？?？？?？？ ?？?？?...</p>\r\n<p>?？?？？?？？ ?？?？?？？?？？..</p>\r\n</body>\r\n</html>',
    notfUseYn: "Y",
    ntdkId: 1,
    mgrUseYn: "Y",
  },
  {
    aprTplId: "SEC-FORM-0070",
    intgAprTpCd: "TYPE3",
    aprTplNm: "테스트",
    sortOrd: 2,
    aprTplDesc: "설명",
    useYn: "N",
    prsDesc: null,
    wcstUseYn: "N",
    wcstDesc: null,
    notfUseYn: "Y",
    ntdkId: 0,
    mgrUseYn: "Y",
  },
  {
    aprTplId: "SEC-FORM-0071",
    intgAprTpCd: "TYPE3",
    aprTplNm: "160630",
    sortOrd: 10,
    aprTplDesc: "양식설명",
    useYn: "N",
    prsDesc: null,
    wcstUseYn: "Y",
    wcstDesc: null,
    notfUseYn: "Y",
    ntdkId: 0,
    mgrUseYn: "Y",
  },
];

export const approvalTemplateHandlers = [
  rest.get("/api/v1/approval/templates", async (req, res, ctx) => {
    const searchParams = await req.url.searchParams;
    const paramAprTplNm = searchParams.get("aprTplNm");

    let filteredTemplates = mockTemplates;
    if (paramAprTplNm) {
      filteredTemplates = filteredTemplates.filter(template => template.aprTplNm.includes(paramAprTplNm));
    }

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredTemplates,
      })
    );
  }),
  rest.post("/api/v1/approval/template", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    mockTemplates = [...mockTemplates, requestBody];
    cudResult.insertedRows++;

    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: cudResult,
      })
    );
  }),
  rest.put("/api/v1/approval/template", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    mockTemplates = mockTemplates.map(template => (template.aprTplId === requestBody.aprTplId ? requestBody : template));

    cudResult.updatedRows++;

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

export const approvalTemplateHandlerUrls = [/^\/api\/v1\/approval\/templates$/, /^\/api\/v1\/approval\/template$/, /^\/api\/v1\/approval\/template\/([^/]+)$/];
