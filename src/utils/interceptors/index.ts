import axios, { AxiosResponse } from "axios";
import { IResponse } from "../../types";

const baseURL = "http://localhost:3000/";
const myInterceptors = axios.create({
  timeout: 10000,
});

// 请求拦截器
myInterceptors.interceptors.request.use((config) => {
  // 无token请求白名单
  const whiteList = ["login", "register"];
  // 拼接请求路径
  if (!config.url?.startsWith("http")) {
    config.url = baseURL + config.url;
  }

  // 携带token
  config.headers.token = localStorage.getItem("user-token") || "";
  // 是否在白名单内
  if (!whiteList.includes(config.url)) {
    // 是否携带token
    if (!config.headers.token) {
      return Promise.reject(config);
    }
  }
  return config;
});

// 响应拦截
myInterceptors.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    // message.warning(err);
    Promise.reject(err);
  }
);

// 请求
export async function myHttp<T = any>(url: string, data?: any) {
  const res = await myInterceptors.post<null, AxiosResponse<IResponse<T>>>(
    url,
    data
  );
  return res.data;
}
