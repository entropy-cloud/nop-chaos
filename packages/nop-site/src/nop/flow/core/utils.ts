import { importModule} from '/@/nop/api'
import type { PropertiesPanelConfig, ModelType } from '@nop-chaos/nop-logicflow'

import AmisPage from '/@/nop/amis/AmisPage.vue'

export async function loadModel(modelLibUrl:string, onChange: (data:any)=> void){
	const lib :any =  await importModule(modelLibUrl);

	function makeComponent(schema:any){
		return defineComponent({
			props: {
				data: Object
			},

			setup(props:any){
				return ()=> h(AmisPage, {schema:schema, data: props.data,onOk: onChange})
			}
		})
	}
	
	const panels:any = {}
	for(let name in lib.propertyPanels){
		panels[name] = makeComponent(lib.propertyPanels[name])
	}

	return {
		toolbar: lib.toolbar as any,
		model: lib.model as ModelType,
		propertiesPanelConfig: panels as PropertiesPanelConfig
	}

}