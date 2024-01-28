export * from './react-page'

import { registerModule } from '@nop-chaos/nop-core'

import * as React from 'react'
import * as ReactDom from 'react-dom'

registerModule("react", React)
registerModule("react-dom", ReactDom)