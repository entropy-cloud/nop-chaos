export * from './xui'
export * from './utils'

import { registerModule } from '@nop-chaos/nop-core'

import * as Vue from 'vue'

registerModule("vue", Vue)