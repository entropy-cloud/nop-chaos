import StartEvent from '@logicflow/extension/es/bpmn/events/StartEvent'
import SequenceFlow from '@logicflow/extension/es/bpmn/flow/SequenceFlow'
import type { GraphData, ModelType } from '../../core'
import { adapterXmlIn, adapterXmlOut } from './adapter'
import { userTaskIcon } from './icons'
import newData from './newdata.json'

import UserTask from './nodes/UserTask'
import { theme } from './theme'

const key = 'bpmn'

export default <ModelType>{
  name: key,
  label: 'BPMN 模型',
  defaultEdgeType: SequenceFlow.type,
  theme,
  adapters: {
    default: {
      label: 'BPMN',
      extension: 'xml',
      in(src: string): GraphData {
        return {
          ...adapterXmlIn(src),
        }
      },
      out(data) {
        return adapterXmlOut(data)
      },
    },
  },
  nodeTypes: [
    
    {
      ...UserTask,
      label: '用户任务',
      icon: userTaskIcon,
    },
    
  ],
  edgeTypes: [
    SequenceFlow,
  ],
  newData,
}
