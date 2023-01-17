// 如果存放在localStorage中的数据需要升级，这里的版本号需要增加。
// 从localStorage中读取缓存数据时会检查版本号，如果版本不一致，会调用configUpgrade函数来升级，缺省会丢弃原有配置
export const globalVersion = 'v3';

export function configUpgrade(configName:string, version:number, prevVersion: number, config: any):any {
  return undefined
}
