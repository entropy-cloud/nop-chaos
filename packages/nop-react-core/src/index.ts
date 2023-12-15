import { createContext } from 'react'
import { RenderContext } from '@nop-chaos/nop-core'

export const RenderContextKey = createContext<RenderContext | null>(null)