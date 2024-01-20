import {
  EndEventConfig, ServiceTaskConfig, StartEventConfig, UserTaskConfig,
} from '@logicflow/extension/es/bpmn/constant'
import { getBpmnId } from '@logicflow/extension/es/bpmn/getBpmnId'
import type { GraphData } from '../../../core'
import { lfJson2Xml } from './json2xml.js'
import { lfXml2Json } from './xml2json.js'

type NodeConfig = {
  id: string
  properties?: Record<string, unknown>
  text?: {
    x: number
    y: number
    value: string
  }
  type: string
  x: number
  y: number
}

type Process = {
  text: string
  id: string
  description: string
}

type EdgeConfig = {
  id: string
  sourceNodeId: string
  targetNodeId: string
  type: string
  startPoint?: {
    x: number
    y: number
  }
  endPoint?: {
    x: number
    y: number
  }
  text?: {
    x: number
    y: number
    value: string
  }
  pointsList?: Point[]
  properties: Record<string, unknown>
}

enum BpmnElements {
  START = 'bpmn:startEvent',
  END = 'bpmn:endEvent',
  GATEWAY = 'bpmn:parallelGateway',
  USER = 'bpmn:userTask',
  SYSTEM = 'bpmn:serviceTask',
  FLOW = 'bpmn:sequenceFlow',
  EGATEWAY = 'bpmn:exclusiveGateway',
  IGATEWAY = 'bpmn:inclusiveGateway',
  EVGATEWAY = 'bpmn:eventBasedGateway',
}

type Point = {
  x: number
  y: number
}

const defaultAttrs = ['-name', '-id', 'bpmn:incoming', 'bpmn:outgoing', '-sourceRef', '-targetRef']

/**
 * 将普通json转换为xmljson
 * xmljson中properity会以“-”开头
 * 如果没有“-”表示为子节点
 */
function toXmlJson(json: any) {
  const xmlJson: any = {}
  Object.entries(json).forEach(([key, value]) => {
    if (typeof value !== 'object') {
      if (key.indexOf('-') === 0) { // 如果本来就是“-”开头的了，那就不处理了。
        xmlJson[key] = value
      }
      else {
        xmlJson[`-${key}`] = value
      }
    }
    else {
      xmlJson[key] = toXmlJson(value)
    }
  })
  return xmlJson
}

/**
 * 将xmlJson转换为普通的json，在内部使用。
 */
function toNormalJson(xmlJson: any) {
  const json: any = {}
  Object.entries(xmlJson).forEach(([key, value]) => {
    const keyRe = key // .replace('bpmn:', '')
    // keyRe = keyRe.replace('camunda:', '')
    if (typeof value === 'string') {
      if (key.indexOf('-') === 0) { // 如果本来就是“-”开头的了，那就不处理了。
        json[keyRe.substring(1)] = value
      }
      else {
        json[keyRe] = value
      }
    }
    else if (typeof value === 'object') {
      json[keyRe] = toNormalJson(value)
    }
    else {
      json[keyRe] = value
    }
  })
  return json
}

/**
 * 设置bpmn process信息
 * 目标格式请参考examples/bpmn.json
 * bpmn因为是默认基于xml格式的，其特点与json存在差异。
 * 1) 如果是xml的属性，json中属性用'-'开头
 * 2）如果只有一个子元素，json中表示为正常属性
 * 3）如果是多个子元素，json中使用数组存储
 */
function convertLf2ProcessData(bpmnProcessData: any, data: any) {
  const nodeMap = new Map()
  data.nodes.forEach((node: NodeConfig) => {
    const processNode: any = {
      '-id': node.id, // 如果是xml的属性，json中属性用'-'开头
    }
    if (node.text?.value)
      processNode['-name'] = node.text.value

    if (node.properties) {
      const properties = toXmlJson(node.properties)
      Object.assign(processNode, properties)
    }
    nodeMap.set(node.id, processNode)

    if (!bpmnProcessData[node.type]) {
      bpmnProcessData[node.type] = processNode // 如果只有一个子元素，json中表示为正常属性
    }
    else if (Array.isArray(bpmnProcessData[node.type])) { // 如果是多个子元素，json中使用数组存储
      bpmnProcessData[node.type].push(processNode)
    }
    else { // 如果是多个子元素，json中使用数组存储
      bpmnProcessData[node.type] = [
        bpmnProcessData[node.type],
        processNode,
      ]
    }
  })
  const sequenceFlow = data.edges.map((edge: EdgeConfig) => {
    const targetNode = nodeMap.get(edge.targetNodeId)
    // @see https://github.com/didi/LogicFlow/issues/325
    // 需要保证incomming在outgoing之前
    if (!targetNode['bpmn:incoming']) {
      if (targetNode['bpmn:outgoing']) {
        const out = targetNode['bpmn:outgoing']
        delete targetNode['bpmn:outgoing']
        targetNode['bpmn:incoming'] = edge.id
        targetNode['bpmn:outgoing'] = out
      }
      else {
        targetNode['bpmn:incoming'] = edge.id
      }
    }
    else if (Array.isArray(targetNode['bpmn:incoming'])) {
      targetNode['bpmn:incoming'].push(edge.id)
    }
    else {
      targetNode['bpmn:incoming'] = [
        targetNode['bpmn:incoming'],
        edge.id,
      ]
    }
    const sourceNode = nodeMap.get(edge.sourceNodeId)
    if (!sourceNode['bpmn:outgoing']) {
      sourceNode['bpmn:outgoing'] = edge.id
    }
    else if (Array.isArray(sourceNode['bpmn:outgoing'])) {
      sourceNode['bpmn:outgoing'].push(edge.id)
    }
    else { // 字符串转数组
      sourceNode['bpmn:outgoing'] = [
        sourceNode['bpmn:outgoing'],
        edge.id,
      ]
    }
    const edgeConfig: any = {
      '-id': edge.id,
      '-sourceRef': edge.sourceNodeId,
      '-targetRef': edge.targetNodeId,
    }
    if (edge.text?.value)
      edgeConfig['-name'] = edge.text.value

    if (edge.properties) {
      const properties = toXmlJson(edge.properties)
      Object.assign(edgeConfig, properties)
    }
    return edgeConfig
  })
  bpmnProcessData[BpmnElements.FLOW] = sequenceFlow
}

/**
 * adapterOut 设置bpmn diagram信息
 */
function convertLf2DiagramData(bpmnDiagramData: any, data: any) {
  bpmnDiagramData['bpmndi:BPMNEdge'] = data.edges.map((edge: EdgeConfig) => {
    const edgeId = edge.id
    const pointsList = edge.pointsList?.map(({ x, y }) => ({ '-x': x, '-y': y }))
    const diagramData: any = {
      '-id': `${edgeId}_di`,
      '-bpmnElement': edgeId,
      'di:waypoint': pointsList,
    }
    if (edge.text?.value) {
      diagramData['bpmndi:BPMNLabel'] = {
        'dc:Bounds': {
          '-x': edge.text.x - (edge.text.value.length * 10) / 2,
          '-y': edge.text.y - 7,
          '-width': edge.text.value.length * 10,
          '-height': 14,
        },
      }
    }
    return diagramData
  })
  bpmnDiagramData['bpmndi:BPMNShape'] = data.nodes.map((node: NodeConfig) => {
    const nodeId = node.id
    let width = 100
    let height = 80
    let { x, y } = node
    // bpmn坐标是基于左上角，LogicFlow基于中心点，此处处理一下。
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const shapeConfig = BpmnAdapter.shapeConfigMap.get(node.type)
    if (shapeConfig) {
      width = shapeConfig.width
      height = shapeConfig.height
    }
    x -= width / 2
    y -= height / 2
    const diagramData: any = {
      '-id': `${nodeId}_di`,
      '-bpmnElement': nodeId,
      'dc:Bounds': {
        '-x': x,
        '-y': y,
        '-width': width,
        '-height': height,
      },
    }
    if (node.text?.value) {
      diagramData['bpmndi:BPMNLabel'] = {
        'dc:Bounds': {
          '-x': node.text.x - (node.text.value.length * 10) / 2,
          '-y': node.text.y - 7,
          '-width': node.text.value.length * 10,
          '-height': 14,
        },
      }
    }
    return diagramData
  })
}

/**
 * 将bpmn数据转换为LogicFlow内部能识别数据
 */
function convertBpmn2LfData(bpmnData: any): GraphData {
  let nodes: any[] = []
  let edges: EdgeConfig[] = []
  let id = ''
  // const type = 'bpmn'
  let text = ''
  const properties = { 'bpmn:extensionElements': {}, 'isExecutable': false, 'description': '' }
  const definitions = bpmnData['bpmn:definitions']
  if (definitions) {
    const process = definitions['bpmn:process']
    id = process['-id']
    text = process['-name']
    properties['bpmn:extensionElements'] = process['bpmn:extensionElements']
    properties.isExecutable = process['-isExecutable']
    properties.description = process['bpmn:documentation']
    Object.keys(process).forEach((key) => {
      if (key === 'bpmn:extensionElements') // TODO 添加 bpmn:extensionElements 处理逻辑
        return
      if (key === 'bpmn:documentation') // TODO 添加 bpmn:extensionElements 处理逻辑
        return
      if (key.indexOf('bpmn:') === 0) {
        const value = process[key]
        if (key === BpmnElements.FLOW) {
          const bpmnEdges = definitions['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane']['bpmndi:BPMNEdge']
          edges = getLfEdges(value, bpmnEdges)
        }
        else {
          const shapes = definitions['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane']['bpmndi:BPMNShape']
          nodes = nodes.concat(getLfNodes(value, shapes, key))
        }
      }
    })
  }
  return {
    id,
    // type,
    text,
    properties,
    nodes,
    edges,
  }
}
function getLfNodes(value: any[], shapes: any[], key: string) {
  const nodes = []
  if (Array.isArray(value)) { // 数组
    value.forEach((val) => {
      let shapeValue
      if (Array.isArray(shapes))
        shapeValue = shapes.find(shape => shape['-bpmnElement'] === val['-id'])

      else
        shapeValue = shapes

      const node = getNodeConfig(shapeValue, key, val)
      nodes.push(node)
    })
  }
  else {
    let shapeValue
    if (Array.isArray(shapes))
      shapeValue = shapes.find(shape => shape['-bpmnElement'] === value['-id'])

    else
      shapeValue = shapes

    const node = getNodeConfig(shapeValue, key, value)
    nodes.push(node)
  }
  return nodes
}

function getNodeConfig(shapeValue: any, type: string, processValue: any) {
  let x = Number(shapeValue['dc:Bounds']['-x'])
  let y = Number(shapeValue['dc:Bounds']['-y'])
  const name = processValue['-name']
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const shapeConfig = BpmnAdapter.shapeConfigMap.get(type)
  if (shapeConfig) {
    x += shapeConfig.width / 2
    y += shapeConfig.height / 2
  }
  let properties: { [x: string]: unknown } = {}
  // 判断是否存在额外的属性，将额外的属性放到properties中
  Object.entries(processValue).forEach(([key, value]) => {
    if (!defaultAttrs.includes(key)) {
      if (!properties)
        properties = {}
      if (key === 'bpmn:extensionElements') {
        // properties[key] = value
        properties['bpmn:extensionElements'] = value// getProperties(value)
      }
      else { properties[key] = value }
    }
  })
  // if (properties)
  //   properties = toNormalJson(properties)

  let text
  if (name) {
    text = {
      x,
      y,
      value: name,
    }
    // 自定义文本位置
    if (shapeValue['bpmndi:BPMNLabel'] && shapeValue['bpmndi:BPMNLabel']['dc:Bounds']) {
      const textBounds = shapeValue['bpmndi:BPMNLabel']['dc:Bounds']
      text.x = Number(textBounds['-x']) + Number(textBounds['-width']) / 2
      text.y = Number(textBounds['-y']) + Number(textBounds['-height']) / 2
    }
  }
  // properties.shapeId = shapeValue['-id']
  const nodeConfig: NodeConfig = {
    id: shapeValue['-bpmnElement'],
    type,
    x,
    y,
    properties,
  }
  if (text)
    nodeConfig.text = text
  return nodeConfig
}

function getLfEdges(value: any[], bpmnEdges: any[]) {
  const edges = []
  if (Array.isArray(value)) {
    value.forEach((val) => {
      let edgeValue
      if (Array.isArray(bpmnEdges))
        edgeValue = bpmnEdges.find(edge => edge['-bpmnElement'] === val['-id'])

      else
        edgeValue = bpmnEdges

      edges.push(getEdgeConfig(edgeValue, val))
    })
  }
  else {
    let edgeValue
    if (Array.isArray(bpmnEdges))
      edgeValue = bpmnEdges.find(edge => edge['-bpmnElement'] === value['-id'])

    else
      edgeValue = bpmnEdges

    edges.push(getEdgeConfig(edgeValue, value))
  }
  return edges
}

function getEdgeConfig(edgeValue: any, processValue: any) {
  let text
  const textVal = processValue['-name']
  if (textVal) {
    const textBounds = edgeValue['bpmndi:BPMNLabel']['dc:Bounds']
    // 如果边文本换行，则其偏移量应该是最长一行的位置
    let textLength = 0
    textVal.split('\n').forEach((textSpan: string) => {
      if (textLength < textSpan.length)
        textLength = textSpan.length
    })

    text = {
      value: textVal,
      x: Number(textBounds['-x']) + (textLength * 10) / 2,
      y: Number(textBounds['-y']) + 7,
    }
  }
  let properties: { [x: string]: unknown } = {}
  // 判断是否存在额外的属性，将额外的属性放到properties中
  Object.entries(processValue).forEach(([key, value]) => {
    if (!defaultAttrs.includes(key)) {
      if (!properties)
        properties = {}
      properties[key] = value
    }
  })
  if (properties)
    properties = toNormalJson(properties)

  const edge: EdgeConfig = {
    id: processValue['-id'],
    type: BpmnElements.FLOW,
    pointsList: edgeValue['di:waypoint'].map((point: { [x: string]: any }) => ({
      x: Number(point['-x']),
      y: Number(point['-y']),
    })),
    sourceNodeId: processValue['-sourceRef'],
    targetNodeId: processValue['-targetRef'],
    properties,
  }
  if (text)
    edge.text = text

  return edge
}

const BpmnAdapter = {
  shapeConfigMap: new Map(),
  setCustomShape(key: any, val: any) {
    this.shapeConfigMap.set(key, val)
  },
  adapterOut(data?: GraphData) {
    const bpmnProcessData = {
      '-id': data?.id || `Process_${getBpmnId()}`,
      '-name': data?.text,
      '-isExecutable': data?.properties.isExecutable || 'false',
      'bpmn:documentation': data?.properties.description || '',
      'bpmn:extensionElements': data?.properties['bpmn:extensionElements'] || {},
    }
    convertLf2ProcessData(bpmnProcessData, data)
    const bpmnDiagramData = {
      '-id': 'BPMNPlane_1',
      '-bpmnElement': bpmnProcessData['-id'],
    }
    convertLf2DiagramData(bpmnDiagramData, data)
    const bpmnData = {
      'bpmn:definitions': {
        '-id': `Definitions_${getBpmnId()}`,
        '-xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '-xmlns:bpmn': 'http://www.omg.org/spec/BPMN/20100524/MODEL',
        '-xmlns:bpmndi': 'http://www.omg.org/spec/BPMN/20100524/DI',
        '-xmlns:dc': 'http://www.omg.org/spec/DD/20100524/DC',
        '-xmlns:di': 'http://www.omg.org/spec/DD/20100524/DI',
        '-targetNamespace': 'http://bpmn.io/schema/bpmn',
        '-xmlns:camunda': 'http://camunda.org/schema/1.0/bpmn',
        '-xmlns:modeler': 'http://camunda.org/schema/modeler/1.0',
        // '-exporter': 'bpmn-js (https://demo.bpmn.io)',
        // '-exporterVersion': '7.3.0',
        'bpmn:process': bpmnProcessData,
        'bpmndi:BPMNDiagram': {
          '-id': 'BPMNDiagram_1',
          'bpmndi:BPMNPlane': bpmnDiagramData,
        },
      },
    }
    return bpmnData
  },
  adapterIn(bpmnData: string): GraphData {
    const after = convertBpmn2LfData(bpmnData)
    return after
  },
}

BpmnAdapter.shapeConfigMap.set(BpmnElements.START, {
  width: StartEventConfig.width,
  height: StartEventConfig.height,
})
BpmnAdapter.shapeConfigMap.set(BpmnElements.END, {
  width: EndEventConfig.width,
  height: EndEventConfig.height,
})
BpmnAdapter.shapeConfigMap.set(BpmnElements.GATEWAY, {
  width: 50, // ExclusiveGatewayConfig.width,
  height: 50, // ExclusiveGatewayConfig.height,
})
BpmnAdapter.shapeConfigMap.set(BpmnElements.EGATEWAY, {
  width: 50, // ExclusiveGatewayConfig.width,
  height: 50, // ExclusiveGatewayConfig.height,
})
BpmnAdapter.shapeConfigMap.set(BpmnElements.IGATEWAY, {
  width: 50, // ExclusiveGatewayConfig.width,
  height: 50, // ExclusiveGatewayConfig.height,
})
BpmnAdapter.shapeConfigMap.set(BpmnElements.EVGATEWAY, {
  width: 50, // ExclusiveGatewayConfig.width,
  height: 50, // ExclusiveGatewayConfig.height,
})
BpmnAdapter.shapeConfigMap.set(BpmnElements.SYSTEM, {
  width: ServiceTaskConfig.width,
  height: ServiceTaskConfig.height,
})
BpmnAdapter.shapeConfigMap.set(BpmnElements.USER, {
  width: UserTaskConfig.width,
  height: UserTaskConfig.height,
})

export function adapterXmlIn(bpmnData: string): GraphData {
  const json: string = lfXml2Json(bpmnData)
  console.log('bpmnData- data-', json)
  return BpmnAdapter.adapterIn(json)
}
export function adapterXmlOut(data?: GraphData): string {
  const outData = BpmnAdapter.adapterOut(data)
  return lfJson2Xml(outData)
}

export function getGraphData(bpmnData: string): Process {
  const json: string = lfXml2Json(bpmnData)
  return getProcess(json)
}

/**
 * 将bpmn数据转换为LogicFlow内部能识别数据
 */
function getProcess(bpmnData: any): Process {
  let text = ''
  let id = ''
  let description = ''
  const definitions = bpmnData['bpmn:definitions']
  if (definitions) {
    const process = definitions['bpmn:process']
    id = process['-id']
    text = process['-name']
    description = process['bpmn:documentation']
  }
  return {
    id,
    // type,
    text,
    description,
  }
}
