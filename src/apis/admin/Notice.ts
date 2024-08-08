import { NoticeCondition, NoticePost, NoticePostDetail, NoticePostRequest, NoticePostUpdateRequest } from "models/admin/Notice";
import { PaginationResponse } from "models/common/Pagination";
import { CommonRequest, CommonResponse, DmlResponse, Method, ServiceName } from "models/common/RestApi";
import { callApi } from "utils/ApiUtil";

export const findNoticePosts = async (noticeCondition?: NoticeCondition) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/notice/posts",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    queryParams: new URLSearchParams({ ...noticeCondition }),
  };
  const response: CommonResponse<PaginationResponse<NoticePost>> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as PaginationResponse<NoticePost>;
};

export const findNoticePost = async (bbmNo: string) => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/notice/post/${bbmNo}",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<NoticePostDetail> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as NoticePostDetail;
};

export const findNoticePopupPost = async () => {
  const request: CommonRequest = {
    method: Method.GET,
    url: "/v1/notice/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
  };
  const response: CommonResponse<NoticePostDetail[]> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as NoticePostDetail[];
};

export const createNotice = async (notice: NoticePostRequest) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/notice/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: notice,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const createNoticeOld = async (notice: NoticePostDetail) => {
  const request: CommonRequest = {
    method: Method.POST,
    url: "/v1/notice/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: notice,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const modifyNotice = async (notice: NoticePostUpdateRequest) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: "/v1/notice/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: notice,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const modifyNoticeOld = async (notice: NoticePostDetail) => {
  const request: CommonRequest = {
    method: Method.PUT,
    url: "/v1/notice/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: notice,
  };

  const response: CommonResponse<DmlResponse> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};

export const deleteNotice = async (bbmNo: string) => {
  const request: CommonRequest = {
    method: Method.PATCH,
    url: "/v1/notice/post",
    serviceName: ServiceName.YOUR_BACK_END_SERVICE_NAME,
    bodyParams: new Number(bbmNo),
  };

  const response: CommonResponse<any> = await callApi(request);

  return (response.successOrNot === "Y" ? response.data : null) as DmlResponse;
};
