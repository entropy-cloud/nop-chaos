/**
 * 实现与外部框架的适配
 */

import { router } from '/@/router'
import { store } from '/@/store'

export * from './auth'

export * from './ajax'
export * from './i18n'
export * from './cache'

export * from './debug'

export {isDevMode} from '/@/utils/env'

export * from './resolve'

export {
    store, router
}