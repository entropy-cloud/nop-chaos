export declare const UserApis: {
    SiteMapApi__getSiteMap: typeof SiteMapApi__getSiteMap;
    LoginApi__login: typeof LoginApi__login;
    LoginApi__getLoginUserInfo: typeof LoginApi__getLoginUserInfo;
    LoginApi__logout: typeof LoginApi__logout;
    LoginApi__generateVerifyCode: typeof LoginApi__generateVerifyCode;
};
declare function SiteMapApi__getSiteMap(): Promise<any>;
export type LoginRequest = {
    loginType: number;
    principalId: string;
    principalSecret: string;
    verifyCode?: string;
    verifySecret?: string;
};
declare function LoginApi__login(req: LoginRequest): Promise<any>;
declare function LoginApi__getLoginUserInfo(): Promise<any>;
declare function LoginApi__logout(): Promise<any>;
declare function LoginApi__generateVerifyCode(verifySecret: string): Promise<any>;
export {};
