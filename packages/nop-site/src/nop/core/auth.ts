import { useUserStore } from '/@/store/modules/user'
import { intersection } from 'lodash-es';
import type { RoleEnum } from '/@/enums/roleEnum';
import { getToken ,getTenantId as _getTenantId} from '/@/utils/auth';

export function isUserInRole(role: string) {
  const userStore = useUserStore()
  let roles = role.split(',')
  if (roles.length == 1) {
    return userStore.getRoleList?.includes(role as RoleEnum);
  }
  return (intersection(roles, userStore.getRoleList) as RoleEnum[]).length > 0;
}

export function getCurrentUser() {
  const userInfo = useUserStore().getUserInfo
  return {
    userName: userInfo.username,
    realName: userInfo.realname,
    avatar:   userInfo.avatar,
    tenantId: userInfo.tenantid
  }
}

export function getTenantId(){
  return _getTenantId()
}

export function setAuthToken(token:string){
  useUserStore().setToken(token)
}

export function getAuthToken(){
  return getToken()
}