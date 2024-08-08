import { rest } from "msw";
import { StatusCode, SuccessOrNot } from "models/common/RestApi";

let mockMessages = [
  {
    crudKey: null,
    msgCtn: "com.code.APR_PSG_STAT_CD.SAVE",
    langCd: "en",
    msgTxtCtn: "임시저장(en)",
    rmk: "임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_PSG_STAT_CD.SAVE",
    langCd: "ko",
    msgTxtCtn: "임시저장",
    rmk: "임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_PSG_STAT_CD.SAVE",
    langCd: "pl",
    msgTxtCtn: "임시저장(pl)",
    rmk: "임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_PSG_STAT_CD.SAVE",
    langCd: "zhC",
    msgTxtCtn: "임시저장(zhC)",
    rmk: "임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_PSG_STAT_CD.SAVE",
    langCd: "zhT",
    msgTxtCtn: "임시저장(zhT)",
    rmk: "임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_REQ_PROG_STAT_CD.TMP",
    langCd: "en",
    msgTxtCtn: "임시저장(en)",
    rmk: "결재문서상태코드 : 임시저장 : 결재문서 임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_REQ_PROG_STAT_CD.TMP",
    langCd: "ko",
    msgTxtCtn: "임시저장",
    rmk: "결재문서상태코드 : 임시저장 : 결재문서 임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_REQ_PROG_STAT_CD.TMP",
    langCd: "pl",
    msgTxtCtn: "임시저장(pl)",
    rmk: "결재문서상태코드 : 임시저장 : 결재문서 임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_REQ_PROG_STAT_CD.TMP",
    langCd: "zhC",
    msgTxtCtn: "임시저장(zhC)",
    rmk: "결재문서상태코드 : 임시저장 : 결재문서 임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.APR_REQ_PROG_STAT_CD.TMP",
    langCd: "zhT",
    msgTxtCtn: "임시저장(zhT)",
    rmk: "결재문서상태코드 : 임시저장 : 결재문서 임시저장",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD",
    langCd: "en",
    msgTxtCtn: "첨부파일저장위치구분코드(en)",
    rmk: "첨부파일저장위치구분코드",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD",
    langCd: "ko",
    msgTxtCtn: "첨부파일저장위치구분코드",
    rmk: "첨부파일저장위치구분코드",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD",
    langCd: "pl",
    msgTxtCtn: "첨부파일저장위치구분코드(pl)",
    rmk: "첨부파일저장위치구분코드",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD",
    langCd: "zhC",
    msgTxtCtn: "첨부파일저장위치구분코드(zhC)",
    rmk: "첨부파일저장위치구분코드",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD",
    langCd: "zhT",
    msgTxtCtn: "첨부파일저장위치구분코드(zhT)",
    rmk: "첨부파일저장위치구분코드",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD.ONSITE",
    langCd: "en",
    msgTxtCtn: "시스템저장소(en)",
    rmk: "시스템저장소",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD.ONSITE",
    langCd: "ko",
    msgTxtCtn: "시스템저장소",
    rmk: "시스템저장소",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD.ONSITE",
    langCd: "pl",
    msgTxtCtn: "시스템저장소(pl)",
    rmk: "시스템저장소",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD.ONSITE",
    langCd: "zhC",
    msgTxtCtn: "시스템저장소(zhC)",
    rmk: "시스템저장소",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
  {
    crudKey: null,
    msgCtn: "com.code.ATCH_FILE_SAVE_LOC_DIVS_CD.ONSITE",
    langCd: "zhT",
    msgTxtCtn: "시스템저장소(zhT)",
    rmk: "시스템저장소",
    optValCtn1: null,
    optValCtn2: null,
    optValCtn3: null,
    useYn: "Y",
    dataInsUserId: "FW_DEFAULT",
    dataInsUserIp: null,
    dataInsDtm: null,
    dataUpdUserId: null,
    dataUpdUserIp: null,
    dataUpdDtm: null,
  },
];

export const messageHandlers = [
  rest.get("/api/v1/message", async (req, res, ctx) => {
    const searchParams = await req.url.searchParams;
    const paramMsgCtn = searchParams.get("msgCtn");
    const paramMsgTxtCtn = searchParams.get("msgTxtCtn");
    const paramUseYn = searchParams.get("useYn");

    let filteredMessages = mockMessages;
    if (paramMsgCtn) {
      filteredMessages = filteredMessages.filter(msg => msg.msgCtn.includes(paramMsgCtn));
    }
    if (paramMsgTxtCtn) {
      filteredMessages = filteredMessages.filter(msg => msg.msgTxtCtn.includes(paramMsgTxtCtn));
    }
    if (paramUseYn) {
      filteredMessages = filteredMessages.filter(msg => msg.useYn.includes(paramUseYn));
    }
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: filteredMessages,
      })
    );
  }),
  rest.post("/api/v1/messages", async (req, res, ctx) => {
    const requestBody = await req.json();

    const cudResult = {
      insertedRows: 0,
      updatedRows: 0,
      deletedRows: 0,
    };

    requestBody.map((item: any) => {
      if (item.crudKey === "C") {
        mockMessages = [
          ...mockMessages,
          {
            crudKey: null,
            msgCtn: item.msgCtn,
            langCd: item.langCd,
            msgTxtCtn: item.msgTxtCtn,
            rmk: item.rmk,
            optValCtn1: null,
            optValCtn2: null,
            optValCtn3: null,
            useYn: item.useYn,
            dataInsUserId: "Mock Service",
            dataInsUserIp: null,
            dataInsDtm: null,
            dataUpdUserId: null,
            dataUpdUserIp: null,
            dataUpdDtm: null,
          },
        ];
        cudResult.insertedRows++;
      } else if (item.crudKey === "U") {
        mockMessages = mockMessages.map(msg => (msg.msgCtn === item.msgCtn && msg.langCd === item.langCd ? { ...msg, msgTxtCtn: item.msgTxtCtn, rmk: item.rmk, useYn: item.useYn } : msg));
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
  rest.get("/api/v1/messageMsgCtn", async (req, res, ctx) => {
    const paramMsgCtn = await req.url.searchParams.get("msgCtn");
    if (paramMsgCtn) {
      // 상세정보
      return res(
        ctx.status(200),
        ctx.json({
          statusCode: StatusCode.SUCCESS,
          successOrNot: SuccessOrNot.Y,
          data: mockMessages.filter(msg => msg.msgCtn === paramMsgCtn),
        })
      );
    } else {
      // 신규등록
      return res(
        ctx.status(200),
        ctx.json({
          statusCode: StatusCode.SUCCESS,
          successOrNot: SuccessOrNot.Y,
          data: [],
        })
      );
    }
  }),
  rest.post("/api/v1/reloadMessageCache", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: mockMessages.length,
      })
    );
  }),
  rest.get("/api/v1/translated-messages/deploy", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: StatusCode.SUCCESS,
        successOrNot: SuccessOrNot.Y,
        data: true,
      })
    );
  }),
];

export const messageHandlerUrls = [/^\/api\/v1\/message$/, /^\/api\/v1\/messages$/, /^\/api\/v1\/messageMsgCtn$/, /^\/api\/v1\/reloadMessageCache$/, /^\/api\/v1\/translated-messages\/deploy$/];
