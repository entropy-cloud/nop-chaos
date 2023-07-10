import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {RenderOptions, RendererProps, render as renderAmis} from 'amis'

import page from './demo.page'
import { RootRenderProps } from 'amis-core/lib/Root'

import "@nop-chaos/nop-amis-ext"

function App() {
  const options: RenderOptions = {

  }

  const props: RootRenderProps = {

  }

  return (
    <>
      {renderAmis(page as any, props, options)}
    </>
  )
}

export default App
