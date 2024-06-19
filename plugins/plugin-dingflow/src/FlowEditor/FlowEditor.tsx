import { VComponentType, importModule } from '@nop-chaos/sdk';
import { memo, useState } from 'react';
import { ConfigRoot } from './ConfigRoot';
import { FlowEditorScope, FlowEditorScopeProps } from './FlowEditorScope';
import { ThemeRoot } from './ThemeRoot';

import { styled } from 'styled-components';
import { ReactComponentScopeComponent } from '../../../../packages/nop-react-core/src';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width:100%; // 必须设定宽度，否则canvas不会显示滚动条
`;


type FlowEditorProps = FlowEditorScopeProps & {
  componentLib:string,
  storeLib?: string
}

type ResolveResult = { 
   components?: Record<string,VComponentType>,
   initStateCreator?: (set:any,get:any)=>any,
}

export const FlowEditor = memo((props: FlowEditorProps) => {
  const [resolved, setResolved] = useState<ResolveResult|null>(null)

  if(!resolved){
    const materialModule = importModule(props.componentLib || '')
    const storeModule = importModule(props.storeLib || '')

    // 加载自定义组件库和store库
    Promise.all([materialModule,storeModule]).then(([materialLib,storeLib])=>{
      const data = {components: props.flowEditorComponents, initStateCreator:props.initStateCreator}
      const components = materialLib?.components || materialLib?.defaults
      if(components ){
        data.components = components
      }
      if(storeLib?.initStateCreator){
        data.initStateCreator = storeLib.initStateCreator
      }
      setResolved(data)
    });
  }

  return (
    <EditorContainer>
      <ConfigRoot>
        <ThemeRoot>
          {resolved  && <ReactComponentScopeComponent components={resolved.components}>
             <FlowEditorScope {...props} {...resolved} />
             </ReactComponentScopeComponent>
         }
          {!resolved && "Loading..."}
        </ThemeRoot>
      </ConfigRoot>
    </EditorContainer>
  );
});
