import { rest } from 'msw';
import { StatusCode, SuccessOrNot } from 'models/common/RestApi';

const mockLogs = [
  {
    ifLogDtm: '2024-01-15 14:26:27',
    ifLogSeq: '1',
    ifNm: 'Interface1',
    ifDivsCd: 'CLIENT',
    ifTrmtValCtn: '송신내용',
    ifRestValCtn: '수신내용',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    ifLogDtm: '2024-01-16 10:30:25',
    ifLogSeq: '2',
    ifNm: 'Interface2',
    ifDivsCd: 'SERVICE',
    ifTrmtValCtn: '송신내용1',
    ifRestValCtn: '수신내용2',
    dataInsUserId: 'CM0',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    ifLogDtm: '2024-01-19 10:30:25',
    ifLogSeq: '3',
    ifNm: 'Interface3',
    ifDivsCd: 'SERVICE',
    ifTrmtValCtn: '송신내용3',
    ifRestValCtn: '수신내용4',
    dataInsUserId: 'leesrho',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    ifLogDtm: '2024-01-20 10:30:25',
    ifLogSeq: '4',
    ifNm: 'Interface4',
    ifDivsCd: 'CLIENT',
    ifTrmtValCtn: '송신내용13',
    ifRestValCtn: '수신내용41',
    dataInsUserId: 'testid',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    ifLogDtm: '2024-01-22 10:30:25',
    ifLogSeq: '5',
    ifNm: 'Interface5',
    ifDivsCd: 'SERVICE',
    ifTrmtValCtn: '송신내용23',
    ifRestValCtn: '수신내용45',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    ifLogDtm: '2024-01-25 10:30:25',
    ifLogSeq: '6',
    ifNm: 'Interface6',
    ifDivsCd: 'CLIENT',
    ifTrmtValCtn: '송신내용123',
    ifRestValCtn: '수신내용456',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
];

export const ifLogHandlers = [
  rest.get('/api/v1/admin/if-log', async (req, res, ctx) => {
    const searchParams = await req.url.searchParams;
    const paramIfLogDtmFr = searchParams.get('ifLogDtmFr');
    const paramIfLogDtmTo = searchParams.get('ifLogDtmTo');
    const paramSearchItem = searchParams.get('searchItem');
    const paramStart = searchParams.get('start') ? searchParams.get('start') : '0';
    const paramPageSize = searchParams.get('pageSize') ? searchParams.get('pageSize') : '10';

    let filteredLogs = mockLogs;
    if (paramIfLogDtmFr) {
      filteredLogs = filteredLogs.filter(
        (log) => log.ifLogDtm.substring(0, 10).replaceAll('-', '') >= paramIfLogDtmFr
      );
    }
    if (paramIfLogDtmTo) {
      filteredLogs = filteredLogs.filter(
        (log) => log.ifLogDtm.substring(0, 10).replaceAll('-', '') <= paramIfLogDtmTo
      );
    }
    if (paramSearchItem) {
      filteredLogs = filteredLogs.filter((log) => log.ifTrmtValCtn.includes(paramSearchItem));
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
  rest.post('/api/v1/if/list/excel-download', async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const ifLogHandlerUrls = [/^\/api\/v1\/admin\/if-log$/, /^\/api\/v1\/if\/list\/excel-download$/];