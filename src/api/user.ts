import HttpClient from "@/utils/http";

const baseURL = "api/services/app/SafetyQualityStandardization";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return Promise.resolve({
    success: true,
    data: {
      username: "admin",
      // 一个用户可能有多个角色
      roles: ["admin"],
      accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
      refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
      expires: "2030/10/30 00:00:00"
    }
  });
  // return http.request<UserResult>("post", "/login", { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return Promise.resolve({
    success: true,
    data: {
      accessToken: "eyJhbGciOiJIUzUxMiJ9.newAdmin",
      refreshToken: "eyJhbGciOiJIUzUxMiJ9.newAdminRefresh",
      // `expires`选择这种日期格式是为了方便调试，后端直接设置时间戳或许更方便（每次都应该递增）。如果后端返回的是时间戳格式，前端开发请来到这个目录`src/utils/auth.ts`，把第`38`行的代码换成expires = data.expires即可。
      expires: "2030/10/30 23:59:59"
    }
  });
};
