import { rest } from 'msw';
import { StatusCode, SuccessOrNot } from 'models/common/RestApi';

const mockLogs = [
  {
    acesLogId: '1',
    contDtm: '2024-01-14 10:30:25',
    mnuId: '000024',
    mnuNm: '메시지관리',
    contUserId: 'developer',
    empNm: '개발자1',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '2',
    contDtm: '2024-01-16 10:30:25',
    mnuId: '000136',
    mnuNm: '메뉴접근로그',
    contUserId: 'CM0',
    empNm: '개발자2',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '3',
    contDtm: '2024-01-19 10:30:25',
    mnuId: '000035',
    mnuNm: '결재라인관리',
    contUserId: 'leesrho',
    empNm: '개발자12',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '4',
    contDtm: '2024-01-20 10:30:25',
    mnuId: '000027',
    mnuNm: '역할관리',
    contUserId: 'testid',
    empNm: '개발자29',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '5',
    contDtm: '2024-01-22 10:30:25',
    mnuId: '000033',
    mnuNm: '시스템관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '6',
    contDtm: '2024-01-25 10:30:25',
    mnuId: '000026',
    mnuNm: 'API관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '7',
    contDtm: '2024-01-14 10:30:25',
    mnuId: '000024',
    mnuNm: '메시지관리',
    contUserId: 'developer',
    empNm: '개발자1',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '8',
    contDtm: '2024-01-16 10:30:25',
    mnuId: '000136',
    mnuNm: '메뉴접근로그',
    contUserId: 'CM0',
    empNm: '개발자2',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '9',
    contDtm: '2024-01-19 10:30:25',
    mnuId: '000035',
    mnuNm: '결재라인관리',
    contUserId: 'leesrho',
    empNm: '개발자12',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '10',
    contDtm: '2024-01-20 10:30:25',
    mnuId: '000027',
    mnuNm: '역할관리',
    contUserId: 'testid',
    empNm: '개발자29',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '11',
    contDtm: '2024-01-22 10:30:25',
    mnuId: '000033',
    mnuNm: '시스템관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '12',
    contDtm: '2024-01-25 10:30:25',
    mnuId: '000026',
    mnuNm: 'API관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '13',
    contDtm: '2024-01-14 10:30:25',
    mnuId: '000024',
    mnuNm: '메시지관리',
    contUserId: 'developer',
    empNm: '개발자1',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '14',
    contDtm: '2024-01-16 10:30:25',
    mnuId: '000136',
    mnuNm: '메뉴접근로그',
    contUserId: 'CM0',
    empNm: '개발자2',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '15',
    contDtm: '2024-01-19 10:30:25',
    mnuId: '000035',
    mnuNm: '결재라인관리',
    contUserId: 'leesrho',
    empNm: '개발자12',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '16',
    contDtm: '2024-01-20 10:30:25',
    mnuId: '000027',
    mnuNm: '역할관리',
    contUserId: 'testid',
    empNm: '개발자29',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '17',
    contDtm: '2024-01-22 10:30:25',
    mnuId: '000033',
    mnuNm: '시스템관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '18',
    contDtm: '2024-01-25 10:30:25',
    mnuId: '000026',
    mnuNm: 'API관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '19',
    contDtm: '2024-01-14 10:30:25',
    mnuId: '000024',
    mnuNm: '메시지관리',
    contUserId: 'developer',
    empNm: '개발자1',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '20',
    contDtm: '2024-01-16 10:30:25',
    mnuId: '000136',
    mnuNm: '메뉴접근로그',
    contUserId: 'CM0',
    empNm: '개발자2',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '21',
    contDtm: '2024-01-19 10:30:25',
    mnuId: '000035',
    mnuNm: '결재라인관리',
    contUserId: 'leesrho',
    empNm: '개발자12',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '22',
    contDtm: '2024-01-20 10:30:25',
    mnuId: '000027',
    mnuNm: '역할관리',
    contUserId: 'testid',
    empNm: '개발자29',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '23',
    contDtm: '2024-01-22 10:30:25',
    mnuId: '000033',
    mnuNm: '시스템관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
  {
    acesLogId: '24',
    contDtm: '2024-01-25 10:30:25',
    mnuId: '000026',
    mnuNm: 'API관리',
    contUserId: 'developer',
    empNm: '개발자',
    contIp: '0:0:0:0:0:0:0:1',
    dataInsUserId: 'developer',
  },
];

export const menuLogHandlers = [
  rest.get('/api/v1/admin/menu-log', async (req, res, ctx) => {
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
        (log) => log.contDtm.substring(0, 10).replaceAll('-', '') <= paramContDmtTo
      );
    }
    if (paramSearchItem) {
      const userIdFilteredLogs = filteredLogs.filter((log) =>
        log.contUserId.includes(paramSearchItem)
      );
      const userNmFilteredLogs = filteredLogs.filter((log) => log.empNm.includes(paramSearchItem));
      filteredLogs = Array.from(new Set(userIdFilteredLogs.concat(userNmFilteredLogs)));
    }
    const paginationTotalCount = filteredLogs.length;
    let isPagination = false;
    if (paramStart != null && parseInt(paramStart) <  filteredLogs.length) {
      if (paramPageSize != null && parseInt(paramPageSize) <  filteredLogs.length) {
        const start = parseInt(paramStart);
        const end = parseInt(paramStart) + parseInt(paramPageSize);
        filteredLogs = filteredLogs.slice(start, end);
        isPagination = true;
      }
    }
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: {
          totalCount: isPagination ? paginationTotalCount : filteredLogs.length,
          list: filteredLogs,
        },
      })
    );
  }),
  rest.post('/api/v1/menu/list/excel-download', async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const menuLogHandlerUrls = [/^\/api\/v1\/admin\/menu-log$/, /^\/api\/v1\/menu\/list\/excel-download$/];