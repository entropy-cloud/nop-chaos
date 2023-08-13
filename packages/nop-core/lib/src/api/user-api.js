import { useAdapter } from '../adapter';
import { ajaxRequest, useDebug } from '../core';
const { supportDebug, debug } = useDebug();
const { useAuthToken } = useAdapter();
export const UserApis = {
    SiteMapApi__getSiteMap,
    LoginApi__login,
    LoginApi__getLoginUserInfo,
    LoginApi__logout,
    LoginApi__generateVerifyCode
};
function SiteMapApi__getSiteMap() {
    return ajaxRequest({
        url: '/r/SiteMapApi__getSiteMap',
        data: {
            siteId: 'main'
        }
    }).then(data => {
        supportDebug.value = data.supportDebug;
        debug.value = data.supportDebug;
        return data;
    });
}
;
function LoginApi__login(req) {
    return ajaxRequest({
        url: `/r/LoginApi__login?@selection=token:accessToken`,
        data: req,
        // 登录页面发现异常时会自己弹出错误提示信息，这里禁用ajaxRequest内部的提示框
        silent: true
    });
}
function LoginApi__getLoginUserInfo() {
    return ajaxRequest({
        url: '@query:LoginApi__getLoginUserInfo/username:userName,realname:nickName',
        data: {
            accessToken: useAuthToken()
        }
    });
}
function LoginApi__logout() {
    return ajaxRequest({
        url: '@mutation:LoginApi__logout',
        data: {
            accessToken: useAuthToken()
        }
    });
}
function LoginApi__generateVerifyCode(verifySecret) {
    return ajaxRequest({
        url: '/r/LoginApi__generateVerifyCode',
        method: 'get',
        data: {
            verifySecret
        }
    });
}
