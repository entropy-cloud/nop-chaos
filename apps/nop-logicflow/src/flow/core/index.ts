import type { PointTuple, TextConfig } from '@logicflow/core'
import LogicFlow from '@logicflow/core'
import { throttle } from 'lodash-es'
import { addListener } from 'resize-detector'
import type { Ref } from 'vue'
import { computed, inject, nextTick, onActivated, onDeactivated, onMounted, provide, reactive, ref, shallowReactive, watch } from 'vue'
import ProcessNode from './ProcessNode'
import type { GraphData, GraphModelData, ModelType, ModelerContext, PropertiesPanelConfig, PropertiesPanelContext, PropertiesPanelData, PropertiesPanelView, ViewerContext } from './types'

const selectIcon = 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0icHJlZml4X19wcmVmaXhfX2ljb24iIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48cGF0aCBkPSJNNTk4LjE4NyA5NTUuNzMzaC0uNDQ0YTE3LjExOCAxNy4xMTggMCAwMS0xNS4yNC0xMC4zMjVMNDc2Ljg2IDY5OS43MzNoLTUwLjE5M2ExNy4wNjcgMTcuMDY3IDAgMTEwLTM0LjEzM2gzNS41MzJMMzI1LjY2NiAzNDguMDc1YTE3LjA2NyAxNy4wNjcgMCAwMTIyLjQwOS0yMi40MDlMNjY1LjYgNDYyLjJ2LTM1LjUzMmExNy4wNjcgMTcuMDY3IDAgMTEzNC4xMzMgMHY1MC4xNTlsMjQ1LjY0IDEwNC44MDZhMTcuMDg0IDE3LjA4NCAwIDAxLjkyMiAzMC45NzZMNzk2LjgxIDY4Ny4zNmwxNTMuOTI0IDE1My45MjRhMTcuMDUgMTcuMDUgMCAwMTAgMjQuMTMzTDg2NS40IDk1MC43NWExNy4wNSAxNy4wNSAwIDAxLTI0LjEzMiAwTDY4Ny40MTEgNzk2Ljg5NGwtNzMuOTMzIDE0OS4zNWExNy4wNjcgMTcuMDY3IDAgMDEtMTUuMjkxIDkuNDl6bTg0LjQ4LTIwNC44YTE3LjA2NyAxNy4wNjcgMCAwMTEyLjA2NiA1bDE1OC42IDE1OC42MDEgNjEuMjAxLTYxLjItMTU4LjYtMTU4LjYwMWExNy4wMTUgMTcuMDE1IDAgMDE0LjQzNy0yNy4zMjRsMTM3LjY3Ny02OC44My0yMjIuMDM3LTk0LjczNy0uMTAzLS4wMzQtMzAxLjk3Ny0xMjkuODc3IDEyOS44NiAzMDEuOTk0LjAzNC4wNjkgOTUuNDU0IDIyMi4wMiA2OC4wOTYtMTM3LjU3NWExNy4wNjcgMTcuMDY3IDAgMDExNS4yOTItOS41MDZ6bS0zNDEuMzM0LTUxLjJIMjU2YTE3LjA2NyAxNy4wNjcgMCAxMTAtMzQuMTMzaDg1LjMzM2ExNy4wNjcgMTcuMDY3IDAgMTEwIDM0LjEzM3ptLTE3MC42NjYgMEg4NS4zMzNhMTcuMDY3IDE3LjA2NyAwIDAxLTE3LjA2Ni0xNy4wNjZ2LTg1LjMzNGExNy4wNjcgMTcuMDY3IDAgMTEzNC4xMzMgMFY2NjUuNmg2OC4yNjdhMTcuMDY3IDE3LjA2NyAwIDExMCAzNC4xMzN6TTg1LjMzMyA1MjkuMDY3QTE3LjA2NyAxNy4wNjcgMCAwMTY4LjI2NyA1MTJ2LTg1LjMzM2ExNy4wNjcgMTcuMDY3IDAgMDEzNC4xMzMgMFY1MTJhMTcuMDY3IDE3LjA2NyAwIDAxLTE3LjA2NyAxNy4wNjd6TTY4Mi42NjcgMzU4LjRhMTcuMDY3IDE3LjA2NyAwIDAxLTE3LjA2Ny0xNy4wNjdWMjU2YTE3LjA2NyAxNy4wNjcgMCAxMTM0LjEzMyAwdjg1LjMzM2ExNy4wNjcgMTcuMDY3IDAgMDEtMTcuMDY2IDE3LjA2N3ptLTU5Ny4zMzQgMGExNy4wNjcgMTcuMDY3IDAgMDEtMTcuMDY2LTE3LjA2N1YyNTZhMTcuMDY3IDE3LjA2NyAwIDAxMzQuMTMzIDB2ODUuMzMzQTE3LjA2NyAxNy4wNjcgMCAwMTg1LjMzMyAzNTguNHptNTk3LjMzNC0xNzAuNjY3YTE3LjA2NyAxNy4wNjcgMCAwMS0xNy4wNjctMTcuMDY2VjEwMi40aC02OC4yNjdhMTcuMDY3IDE3LjA2NyAwIDExMC0zNC4xMzNoODUuMzM0YTE3LjA2NyAxNy4wNjcgMCAwMTE3LjA2NiAxNy4wNjZ2ODUuMzM0YTE3LjA2NyAxNy4wNjcgMCAwMS0xNy4wNjYgMTcuMDY2em0tNTk3LjMzNCAwYTE3LjA2NyAxNy4wNjcgMCAwMS0xNy4wNjYtMTcuMDY2Vjg1LjMzM2ExNy4wNjcgMTcuMDY3IDAgMDExNy4wNjYtMTcuMDY2aDg1LjMzNGExNy4wNjcgMTcuMDY3IDAgMDEwIDM0LjEzM0gxMDIuNHY2OC4yNjdhMTcuMDY3IDE3LjA2NyAwIDAxLTE3LjA2NyAxNy4wNjZ6TTUxMiAxMDIuNGgtODUuMzMzYTE3LjA2NyAxNy4wNjcgMCAwMTAtMzQuMTMzSDUxMmExNy4wNjcgMTcuMDY3IDAgMTEwIDM0LjEzM3ptLTE3MC42NjcgMEgyNTZhMTcuMDY3IDE3LjA2NyAwIDAxMC0zNC4xMzNoODUuMzMzYTE3LjA2NyAxNy4wNjcgMCAwMTAgMzQuMTMzeiIvPjwvc3ZnPg=='
const ProcessNodeType = '_ProcessNode_'

function download(filename: string, text: string) {
  const element = document.createElement('a')
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`)
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

function createViewer(modelType: ModelType): ViewerContext {
  const viewer: ViewerContext = {

    modelType,

    // graphData: reactive({
    //   id: '',
    //   type: model.name,
    //   text: '',
    //   properties: {},
    // }),

    // _getProcessNode(): NodeConfig | undefined {
    //   const pnode = viewer.lf?.graphModel.nodes[0]
    //   if (pnode?.type === ProcessNodeType)
    //     return pnode
    //   else
    //     return undefined
    // },

    setDataObject(graphData: GraphData): void {
      const history = viewer.lf?.history
      if (history) {
        history.undos = []
        history.redos = []
      }
      const pnode = {
        id: graphData?.id || '',
        text: {
          value: graphData?.text || '',
          x: 0,
          y: 0,
        },
        properties: graphData?.properties || {},
        type: ProcessNodeType,
        x: 0,
        y: 0,
      }
      graphData.nodes.unshift(pnode)
      viewer.lf?.renderRawData(graphData)
      // const g = viewer.graphData
      // g.id = graphData?.id || ''
      // g.text = graphData?.text || ''
      // g.properties = graphData?.properties || g.properties
    },

    setData(graphData: string, adapterKey = 'default'): void {
      let graph: GraphData | undefined
      if (adapterKey.startsWith('json')) {
        graph = JSON.parse(graphData)
      }
      else if (modelType.adapters) {
        const adapter = modelType.adapters[adapterKey]
        if (adapter)
          graph = adapter.in(graphData)
      }
      if (graph)
        this.setDataObject(graph)
      else
        console.error('无法识别的数据格式', adapterKey, graphData) // TODO 友好的提示界面
    },

    getDataObject(): GraphData | undefined {
      const rawData = viewer.lf?.getGraphRawData() // getGraphRawData()已进行了deepClone
      const pnode = rawData?.nodes[0]
      if (pnode?.type === ProcessNodeType) {
        rawData?.nodes.shift()
        let text = ''
        if (pnode.text as TextConfig)
          text = (pnode.text as TextConfig).value

        const data0: GraphModelData = {
          id: pnode.id || '',
          text,
          properties: pnode.properties || {},
        }
        return Object.assign(data0, rawData)
      }
      else {
        console.log(`未找到类型为 ${ProcessNodeType} 的节点`)
        const data0: GraphModelData = {
          id: '',
          text: '',
          properties: {},
        }
        return Object.assign(data0, rawData)
      }
    },

    getData(adapterKey = 'default'): string {
      const data = viewer.getDataObject()
      if (adapterKey === 'json.mini')
        return JSON.stringify(data)
      if (modelType.adapters) {
        const adapter = modelType.adapters[adapterKey]
        if (adapter)
          return adapter.out(data)
      }
      return JSON.stringify(data, null, 2)
    },

    // export
    exportData(filename: string = modelType.name, adapterKey = 'json.mini') {
      const text = viewer.getData(adapterKey)
      download(filename, text ? text.toString() : '')
    },

    exportPng(filename: string = modelType.name, backgroundColor?: string) {
      if (filename && !filename.endsWith('.png'))
        filename += '.png'

      viewer.lf?.getSnapshot(filename, backgroundColor)
    },

    // miniMap
    showMiniMap: ref(false),
    toggleMiniMap() {
      const miniMap = viewer.lf?.extension.miniMap
      const showMiniMap = viewer.showMiniMap
      showMiniMap.value = !showMiniMap.value
      showMiniMap.value ? miniMap.show() : miniMap.hide()
    },
    // zoom
    getCenter(): PointTuple {
      const gm = viewer.lf?.graphModel
      const x = gm ? gm.width / 2 : 0
      const y = gm ? gm.height / 2 : 0
      return [x, y]
    },
    scale: reactive({
      value: 1,
      percentage: computed(() => {
        const p: number = viewer.scale.value
        return `${Number(p * 100).toFixed()}%`
      }),
    }),
    zoomOut() {
      viewer.lf?.zoom(false, viewer.getCenter())
    },
    zoomIn() {
      viewer.lf?.zoom(true, viewer.getCenter())
    },
    resetZoom() {
      viewer.lf?.resetZoom()
      viewer.lf?.resetTranslate()
    },
    fitView(offset: number) {
      viewer.lf?.fitView(offset)
    },

  }
  return viewer
}

// logicflow
function initLogicFlow(logicflowOptions: any, viewer: ViewerContext): void {
  const container = logicflowOptions?.container
  const modelType = viewer.modelType
  if (!container) {
    console.log('error container is null')
    throw new Error('container is null')
  }

  function containerResize() {
    if (container && viewer.lf) {
      const { width, height } = container.getBoundingClientRect()
      viewer.lf.resize(width - 8, height - 8)
    }
  }

  // TODO: 默认插件
  // const plugins = [
  //   DndPanel, InsertNodeInPolyline, Menu, MiniMap, SelectionSelect, Snapshot
  // ]
  if (modelType.plugins) {
    if (!logicflowOptions.plugins)
      logicflowOptions.plugins = []
    logicflowOptions.plugins.push(...modelType.plugins)
  }

  viewer.lf = new LogicFlow(logicflowOptions)

  if (modelType.theme)
    viewer.lf?.setTheme(modelType.theme)

  viewer.lf?.register(ProcessNode)

  modelType.nodeTypes.forEach((node) => {
    viewer.lf?.register(node)
  })
  modelType.edgeTypes?.forEach((edge) => {
    viewer.lf?.register(edge)
  })
  viewer.lf?.setDefaultEdgeType(modelType.defaultEdgeType)
  viewer.lf?.setZoomMaxSize(5)

  if (modelType.init)
    modelType.init(viewer.lf)

  // if (model.newData)
  //   viewer.setDataObject(model.newData)

  viewer.scale.value = viewer.lf?.getTransform().SCALE_X || 1

  viewer.lf?.on('graph:transform', (data) => {
    if (data.type === 'zoom' || data.type === 'resetZoom')
      viewer.scale.value = data.transform.SCALE_X
  })

  // 探测 container 大小改变
  addListener(container,
    // 防抖 debounce/节流 throttle，避免多次触发
    throttle(async () => {
      await nextTick()
      containerResize()
    }, 500),
  )
}

/**
 * 使用看图工具
 * 注意：对该函数返回值中的 lf 属性，请不要解构后使用
 */
export function useViewer(modelType: ModelType, el: Ref<HTMLElement | undefined>, logicflowOptions?: any): ViewerContext {
  const viewer = createViewer(modelType)

  onMounted(() => {
    if (!el.value) {
      console.log('error container is null')
      return
    }
    const _logicflow_options = {
      ...logicflowOptions,
      container: el.value,
      isSilentMode: true,
    }
    initLogicFlow(_logicflow_options, viewer)
  })

  return viewer
}

/**
 * 使用建模工具
 * 注意：对该函数返回值中的 lf 属性，请不要解构后使用
 */
export function useModeler(model: ModelType, propertiesPanelConfig: PropertiesPanelConfig, el: Ref<HTMLElement | undefined>, logicflowOptions?: any): ModelerContext {
  const modeler = createViewer(model)

  const _ctx = shallowReactive<PropertiesPanelContext>({
    modeler,
  })
  provide('properties_panel_context', _ctx) // 提供属性面板上下文

  // propertiesPanel
  const propertiesPanel = shallowReactive<PropertiesPanelView>({
    collapsed: !propertiesPanelConfig,
    disabled: !propertiesPanelConfig,
    toggleCollapsed: () => {
      propertiesPanel.collapsed = !propertiesPanel.collapsed
    },
  })

  // modified
  const modified = ref(false)
  const setModified = (val: boolean) => {
    modified.value = val
  }
  // undo, redo
  const undoDisable = ref(true)
  const redoDisable = ref(true)
  const setUndoState = ({ undoAble, redoAble }: { undoAble: boolean; redoAble: boolean }) => {
    undoDisable.value = !undoAble
    redoDisable.value = !redoAble
  }
  const undo = () => {
    modeler.lf?.undo()
  }
  const redo = () => {
    modeler.lf?.redo()
  }

  const _initModeler = () => {
    _ctx.lf = modeler.lf
    modeler.lf?.setPatternItems([
      {
        label: '框选',
        icon: selectIcon,
        callback: () => {
          modeler.lf?.extension.selectionSelect.openSelectionSelect()
          modeler.lf?.once('selection:selected', () => {
            modeler.lf?.extension.selectionSelect.closeSelectionSelect()
          })
        },
      },
      ...model.nodeTypes,
    ])

    modeler.lf?.on('graph:rendered', () => {
      // 加载新数据后重置 Modified 标识
      setModified(false)
    })

    modeler.lf?.on('history:change', ({ data }: any) => {
      setUndoState(data)
      setModified(true)
      // 处理 propertiesPanel 数据更新
      if (_ctx.selectedModel) {
        const _id = _ctx.selectedModel.id
        _ctx.selectedModel = modeler.lf?.getModelById(_id)
      }
    })

    if (propertiesPanelConfig) {
      modeler.lf?.on('node:click,edge:click,blank:click',
        async ({ data }: any) => {
          if (data) {
            if (_ctx.selectedModel?.id === data.id)
              return
            propertiesPanel.component = propertiesPanelConfig[data.type] || propertiesPanelConfig.default
            await nextTick() // 为了确保先激活 Panel 再改变数据，此处 nextTick() 的位置不要随便调整
            _ctx.selectedModel = modeler.lf?.getModelById(data.id)
          }
          else {
            propertiesPanel.component = propertiesPanelConfig.top
            await nextTick() // 为了确保先激活 Panel 再改变数据，此处 nextTick() 的位置不要随便调整
            const pnode = modeler.lf?.graphModel.nodes[0]
            if (pnode?.type === ProcessNodeType)
              _ctx.selectedModel = pnode
            else
              _ctx.selectedModel = undefined
          }
        })
      propertiesPanel.component = propertiesPanelConfig.top
    }
  }

  onMounted(() => {
    if (!el.value) {
      console.log('error container is null')
      return
    }
    const _logicflow_options = {
      ...logicflowOptions,
      container: el.value,
    }
    initLogicFlow(_logicflow_options, modeler)
    _initModeler()
  })

  return Object.assign(modeler, {
    modified, undoDisable, redoDisable, undo, redo, propertiesPanel,
  })
}

/**
 * 使用属性面板要操作的数据对象，用于扩展实现属性面板组件
 * 注意：该函数返回响应式对象，请不要解构后使用
 */
export function usePropertiesPanelData(onDataChange = async (_data: any) => { }): PropertiesPanelData {
  const ctx = inject<PropertiesPanelContext>('properties_panel_context') // 注入属性面板上下文

  // if (ctx && isTop) {
  //   return ctx.modeler.graphData // 如果是顶层，直接返回图数据
  // }

  const activated = ref(false)
  const element = reactive<PropertiesPanelData>({
    id: '',
    type: '',
    text: '',
    properties: {},
  })
  const changedId = () => {
    // TODO: 引入校验规则，检查 id 是否合法，并且便于 Form 表单中使用
    const oldId = ctx?.selectedModel?.id
    if (!oldId)
      return
    let newId = element.id
    if (ctx?.selectedModel?.BaseType === 'node')
      newId = ctx?.lf?.changeNodeId<string>(oldId, newId) || ''
    else if (ctx?.selectedModel?.BaseType === 'edge')
      newId = ctx?.lf?.changeEdgeId(oldId, newId) || ''
    if (!newId || newId === '') {
      // 修改失败，重新加载数据
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      loadData()
    }
  }
  const _stopHandles: any[] = []
  let _subscribedTextEvent = false
  const _textUpdateCallback = (data: { id: string }) => {
    if (!activated.value)
      return
    if (data?.id === element.id) {
      // console.log('update text', data, ctx?.selectedModel?.text?.value)
      element.text = ctx?.selectedModel?.text?.value || ''
      onDataChange(element)
    }
  }
  const loadData = () => {
    if (_subscribedTextEvent)
      ctx?.lf?.off('text:update', _textUpdateCallback)

    _stopHandles.forEach(h => h())
    _stopHandles.length = 0

    if (ctx?.selectedModel) {
      element.id = ctx.selectedModel.id
      element.type = ctx.selectedModel.type
      element.text = ctx.selectedModel.text?.value
      element.properties = ctx.selectedModel.properties
      ctx?.lf?.on('text:update', _textUpdateCallback)
      _subscribedTextEvent = true
    }
    else {
      element.id = ''
      element.type = ''
      element.text = ''
      element.properties = {}
    }
    _stopHandles.push(
      // Vue3 当前版本 watch 方法 oldVal 传值不正确
      watch(
        () => element.id,
        (_newVal, _oldVal) => {
          // console.log('id changed:', _oldVal, '->', _newVal)
          changedId()
        }),
      watch(
        () => element.text,
        (_newVal, _oldVal) => {
          // console.log('text changed:', _oldVal, '->', _newVal)
          ctx?.selectedModel?.updateText(_newVal)
        }),
    )
    // console.log('load data:', element)
    onDataChange(element)
  }

  watch(() => ctx?.selectedModel, (_newVal, _oldVal) => {
    if (!activated.value)
      return
    // console.log('selectedModel:', _oldVal?.id, '->', _newVal?.id)
    loadData()
  })

  onActivated(() => {
    activated.value = true
  })

  onDeactivated(() => {
    activated.value = false
  })

  return element
}

export * from './types'
