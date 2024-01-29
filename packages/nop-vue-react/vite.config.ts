import { definePackageConfig } from '@nop-chaos/vite-config';

import vue from '@vitejs/plugin-vue'

export default definePackageConfig({
    overrides:{
        plugins:[
              // 自定义插件  
            vue()
        ]
    }
});
