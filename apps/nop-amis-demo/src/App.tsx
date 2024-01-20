import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AmisDemo from './AmisDemo'
import FlowDemo from './FlowDemo'
import FlowBuilderDemo from './FlowBuilderDemo'

//import '@nop-chaos/nop-amis-ext/lib/style.css'
import '@nop-chaos/nop-flow-builder/lib/style.css'
import '@nop-chaos/nop-graph-designer/lib/style.css'

function App() {
  return (
    <div style={{height:"calc(100vh-30px)"}}>
      <div>
        <a href="/a">AMIS</a> <a href="/b">Flow</a>  <a href="/c">FlowBuilder</a>
      </div>
      
      <Router>
        <Routes>
          <Route path="/a" element={<AmisDemo />}>
          </Route>
          <Route path="/b" element={<FlowDemo />}>
          </Route>
          <Route path="/c" element={<FlowBuilderDemo/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;