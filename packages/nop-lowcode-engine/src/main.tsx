import ReactDOM from 'react-dom/client'
import './index.css'

import { renderLowCode } from './render'

const schema = {
  componentName: 'Page',
  props: {},
  children: [
    {
      componentName: 'Button',
      props: {
        type: 'primary',
        style: {
          color: '#2077ff'
        },
      },
      children: '确定',
    },
  ],
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    {renderLowCode(schema)}
  </div>,
)
