import { rest } from 'msw';
import { StatusCode, SuccessOrNot } from 'models/common/RestApi';

const mockLogs = [
  {
    sedDtm: '2024-01-15 14:26:27',
    emlSndoSeq: '1',
    emlLogSeq: '1',
    sedEmal: 'system@system.com',
    emlTpCd: 'A',
    emlTrnmStatCd: 'SUCCESS',
    emlRcvrLstCtn: '1@a.com,2@b.com,3@c.com,4@d.com',
    emlTrnmRltCtn: '전송결과내용',
    emlBdyCtn: '본문 내용1',
    aprReqId: '결재요청 ID',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    sedDtm: '2024-01-16 10:30:25',
    emlSndoSeq: '2',
    emlLogSeq: '4',
    sedEmal: 'system@system.com',
    emlTpCd: 'AC',
    emlTrnmStatCd: 'SUCCESS',
    emlRcvrLstCtn: '2@b.com,3@c.com,4@d.com',
    emlTrnmRltCtn: '전송결과내용',
    emlBdyCtn: '본문 내용12',
    aprReqId: '결재요청 ID',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    sedDtm: '2024-01-19 10:30:25',
    emlSndoSeq: '3',
    emlLogSeq: '3',
    sedEmal: 'system@system.com',
    emlTpCd: 'BC',
    emlTrnmStatCd: 'SUCCESS',
    emlRcvrLstCtn: '1@a.com,2@b.com,4@d.com',
    emlTrnmRltCtn: '전송결과내용',
    emlBdyCtn: '본문 내용',
    aprReqId: '결재요청 ID',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    sedDtm: '2024-01-20 10:30:25',
    emlSndoSeq: '4',
    emlLogSeq: '2',
    sedEmal: 'system@system.com',
    emlTpCd: 'ABC',
    emlTrnmStatCd: 'FAIL',
    emlRcvrLstCtn: '1@a.com,2@b.com',
    emlTrnmRltCtn: '전송결과내용',
    emlBdyCtn: '본문 내용2',
    aprReqId: '결재요청 ID',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    sedDtm: '2024-01-22 10:30:25',
    emlSndoSeq: '5',
    emlLogSeq: '6',
    sedEmal: 'system@system.com',
    emlTpCd: 'A',
    emlTrnmStatCd: 'SUCCESS',
    emlRcvrLstCtn: '2@b.com,3@c.com',
    emlTrnmRltCtn: '전송결과내용',
    emlBdyCtn: '본문 내용21',
    aprReqId: '결재요청 ID',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
  {
    sedDtm: '2024-01-25 10:30:25',
    emlSndoSeq: '6',
    emlLogSeq: '5',
    sedEmal: 'system@system.com',
    emlTpCd: 'B',
    emlTrnmStatCd: 'SUCCESS',
    emlRcvrLstCtn: '1@a.com',
    emlTrnmRltCtn: '전송결과내용',
    emlBdyCtn: '본문 내용3',
    aprReqId: '결재요청 ID',
    dataInsUserId: 'developer',
    dataInsUserIp: '0:0:0:0:0:0:0:1',
  },
];

export const emailLogHandlers = [
  rest.get('/api/v1/admin/email-log', async (req, res, ctx) => {
    const searchParams = await req.url.searchParams;
    const paramSedDtmFr = searchParams.get('sedDtmFr');
    const paramSedDtmTo = searchParams.get('sedDtmTo');
    const paramSearchItem = searchParams.get('searchItem');
    const paramSearchEmlTpCd = searchParams.get('searchEmlTpCd');
    const paramStart = searchParams.get('start') ? searchParams.get('start') : '0';
    const paramPageSize = searchParams.get('pageSize') ? searchParams.get('pageSize') : '10';

    let filteredLogs = mockLogs;
    if (paramSedDtmFr) {
      filteredLogs = filteredLogs.filter(
        (log) => log.sedDtm.substring(0, 10).replaceAll('-', '') >= paramSedDtmFr
      );
    }
    if (paramSedDtmTo) {
      filteredLogs = filteredLogs.filter(
        (log) => log.sedDtm.substring(0, 10).replaceAll('-', '') <= paramSedDtmTo
      );
    }
    if (paramSearchItem) {
      filteredLogs = filteredLogs.filter((log) => log.emlBdyCtn.includes(paramSearchItem));
    }
    if (paramSearchEmlTpCd) {
      filteredLogs = filteredLogs.filter((log) => log.emlTpCd === paramSearchEmlTpCd);
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
  rest.post('/api/v1/email/list/excel-download', async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const emailLogHandlerUrls = [
  /^\/api\/v1\/admin\/email-log$/,
  /^\/api\/v1\/email\/list\/excel-download$/,
];