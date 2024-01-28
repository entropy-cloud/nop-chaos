import { createContext } from 'react'
import { RenderContext, registerModule } from '@nop-chaos/nop-core'

import * as React from 'react'
import * as ReactDom from 'react-dom'

export const RenderContextKey = createContext<RenderContext | null>(null)

registerModule('react', React)
registerModule('react-dom', ReactDom)