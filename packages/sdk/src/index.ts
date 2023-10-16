export * from './lib'

import '@nop-chaos/nop-amis-vue/lib/style.css'

import './fix.css'

import * as SdkLib from './lib'

SdkLib.registerModule("@nop-chaos/sdk", SdkLib)