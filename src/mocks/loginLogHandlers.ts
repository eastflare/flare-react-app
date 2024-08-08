import { rest } from 'msw';
import { StatusCode, SuccessOrNot } from 'models/common/RestApi';

const mockLogs = [
  {
    contDtm: '2024-01-15 14:26:27',
    contIp: '0:0:0:0:0:0:0:1',
    contLogId: '1',
    contUserId: 'developer',
    deptNm: '테스트부서',
    empNm: '개발자1',
  },
  {
    contDtm: '2024-01-16 10:30:25',
    contIp: '0:0:0:0:0:0:0:1',
    contLogId: '2',
    contUserId: 'CM0',
    deptNm: '부서명',
    empNm: '개발자2',
  },
  {
    contDtm: '2024-01-19 10:30:25',
    contIp: '0:0:0:0:0:0:0:1',
    contLogId: '3',
    contUserId: 'leesrho',
    deptNm: null,
    empNm: '개발자12',
  },
  {
    contDtm: '2024-01-20 10:30:25',
    contIp: '0:0:0:0:0:0:0:1',
    contLogId: '4',
    contUserId: 'testid',
    deptNm: null,
    empNm: '개발자29',
  },
  {
    contDtm: '2024-01-22 10:30:25',
    contIp: '0:0:0:0:0:0:0:1',
    contLogId: '5',
    contUserId: 'developer',
    deptNm: null,
    empNm: '개발자',
  },
  {
    contDtm: '2024-01-25 10:30:25',
    contIp: '0:0:0:0:0:0:0:1',
    contLogId: '6',
    contUserId: 'developer',
    deptNm: '엔솔',
    empNm: '개발자',
  },
];

export const loginLogHandlers = [
  rest.get('/api/v1/admin/login-log', async (req, res, ctx) => {
    const searchParams = await req.url.searchParams;
    const paramContDmtFr = searchParams.get('contDtmFr');
    const paramContDmtTo = searchParams.get('contDtmTo');
    const paramSearchItem = searchParams.get('searchItem');
    const paramStart = searchParams.get('start') ? searchParams.get('start') : '0';
    const paramPageSize = searchParams.get('pageSize') ? searchParams.get('pageSize') : '10';

    let filteredLogs = mockLogs;
    if (paramContDmtFr) {
      filteredLogs = filteredLogs.filter(
        (log) => log.contDtm.substring(0, 10).replaceAll('-', '') >= paramContDmtFr
      );
    }
    if (paramContDmtTo) {
      filteredLogs = filteredLogs.filter(
        (log) => log.contDtm.substring(0, 10).replaceAll('-', '') < = paramContDmtTo
      );
    }
    if (paramSearchItem) {
      const userIdFilteredLogs = filteredLogs.filter((log) =>
        log.contUserId.includes(paramSearchItem)
      );
      const userNmFilteredLogs = filteredLogs.filter((log) => log.empNm.includes(paramSearchItem));
      filteredLogs = Array.from(new Set(userIdFilteredLogs.concat(userNmFilteredLogs)));
    }
    if (paramStart != null && parseInt(paramStart) <  filteredLogs.length) {
      if (paramPageSize != null && parseInt(paramPageSize) > filteredLogs.length) {
        filteredLogs.slice(parseInt(paramStart), parseInt(paramPageSize));
      }
    }
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: {
          totalCount: filteredLogs.length,
          list: filteredLogs,
        },
      })
    );
  }),
  rest.post('/api/v1/login/list/excel-download', async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const loginLogHandlerUrls = [
  /^\/api\/v1\/admin\/login-log$/,
  /^\/api\/v1\/login\/list\/excel-download$/,
];