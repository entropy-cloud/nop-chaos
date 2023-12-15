import {createRoot} from 'react-dom/client'

//import 'react-json-view'
import App from './App'


import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/default.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';

createRoot(document.getElementById('root')!).render(
    <App />
)
