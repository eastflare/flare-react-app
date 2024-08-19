import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { handlerUrls } from "mocks/worker";

import { CommonRequest, CommonResponse, Method, ServiceName, StatusCode, SuccessOrNot } from "@/models/common/RestApi";
import useSessionStore from "stores/useSessionStore";

axios.defaults.withCredentials = true;
const getInstance = (request: CommonRequest): AxiosInstance => {
  let baseURL = "";
  if (process.env.MSW_ENABLE === "N" || !handlerUrls.some(regex => regex instanceof RegExp && regex.test(request.url))) {
    switch (request.serviceName) {
      case ServiceName.YOUR_BACK_END_SERVICE_NAME:
        const isSsl = window.location.protocol === "https:";
        baseURL = isSsl ? `${process.env.SSL_BASE_URL}` : `${process.env.API_BASE_URL}`;
        break;
      default:
    }
  }

  let config = {};
  switch (request.method) {
    case Method.GET:
      config = {
        baseURL: baseURL,
        //timeout: 6000,
        headers: request?.headers || {
          Accept: "application/json",
        },
        params: request?.queryParams || {},
        responseType: request?.responseType || "json",
      };
      break;
    case Method.DELETE:
      config = {
        baseURL: baseURL,
        timeout: 2000,
        headers: request?.headers || {
          Accept: "application/json",
        },
        params: request?.queryParams || {},
        responseType: request?.responseType || "json",
      };
      break;
    case Method.POST:
    case Method.PUT:
    case Method.PATCH:
      config = {
        baseURL: baseURL,
        timeout: 90000,
        headers: request?.headers || {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        responseType: request?.responseType || "json",
      };
      break;
    default:
  }

  const instance = axios.create(config);

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers["x-language"] = useSessionStore.getState().langCd;
      config.headers["accept-language"] = useSessionStore.getState().langCd;
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response: any): Promise<any> => {
      if (response.data instanceof Blob) {
        const commonFileResponse: CommonResponse<Blob> = {
          successOrNot: SuccessOrNot.Y,
          statusCode: StatusCode.SUCCESS,
          data: new Blob([response?.data]),
        };

        return commonFileResponse;
      }

      const commonResponse: CommonResponse = response.data as CommonResponse;

      if (commonResponse.statusCode && commonResponse.statusCode === StatusCode.SESSION_EXPIRE) {
        sessionStorage.clear();
        window.location.assign("/"); // TODO: 서버확인 후 수정필요
      } else if (commonResponse.statusCode && commonResponse.statusCode === StatusCode.NOT_AUTHORIZED_EXCEPTION) {
        window.location.assign("/*");
      }
      return commonResponse;
    },

    async (error: any): Promise<any> => {
      const errorResponse: CommonResponse = {
        successOrNot: SuccessOrNot.N,
        statusCode: StatusCode.UNKNOWN_ERROR,
        data: {},
      };

      if (error.code === "ECONNABORTED") {
        errorResponse.statusCode = StatusCode.TIMEOUT;
        console.log(error.message);
      }

      return errorResponse;
    }
  );
  return instance;
};

export const callApi = async (apiRequest: CommonRequest): Promise<CommonResponse> => {
  let response: CommonResponse = {
    successOrNot: SuccessOrNot.N,
    statusCode: StatusCode.BAD_REQUEST_ERROR,
    data: {},
  };

  apiRequest.url = `/api${apiRequest.url}`;

  switch (apiRequest.method) {
    case Method.GET:
      response = await getInstance(apiRequest).get(apiRequest.url);
      break;
    case Method.POST:
      response = await getInstance(apiRequest).post(apiRequest.url, apiRequest.bodyParams || {});
      break;
    case Method.PUT:
      response = await getInstance(apiRequest).put(apiRequest.url, apiRequest.bodyParams || {});
      break;
    case Method.DELETE:
      response = await getInstance(apiRequest).delete(apiRequest.url);
      break;
    case Method.PATCH:
      response = await getInstance(apiRequest).patch(apiRequest.url, apiRequest.bodyParams || {});
      break;
    default:
      break;
  }
  return response;
};
