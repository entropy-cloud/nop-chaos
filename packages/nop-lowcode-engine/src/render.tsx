import ReactRenderer from '@alilc/lowcode-react-renderer';
import { Button } from '@alifd/next';

const components:any = {
  Button,
};

export function renderLowCode(schema:any){
    return <ReactRenderer
            schema={schema}
        components={components}
    />
}