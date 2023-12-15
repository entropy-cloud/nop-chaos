import { useNavigate } from 'react-router-dom'

import FlowBuilder from '@nop-chaos/nop-flow-builder'

function FlowDemo() {
  const navigate = useNavigate();
  return (
    <FlowBuilder/>
  );
}

export default FlowDemo;