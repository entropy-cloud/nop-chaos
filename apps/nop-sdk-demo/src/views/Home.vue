<template>
<div style="display:flex;">
<div style="width:200px">
    <a-menu mode="vertical" theme="dark">
        <a-sub-menu v-for="menu in appStore.getSitemap.resources" :key="menu.id" :title="menu.displayName">
            <a-menu-item v-for="link in menu.children || []" :key="link.id" @click="navigate(link.routePath)">
                {{ link.displayName }}
            </a-menu-item>
        </a-sub-menu>
    </a-menu>
</div>
<router-view />
</div>	
</template>
  
<script lang="ts">
import { Menu, MenuItem, SubMenu } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store/app';

export default defineComponent({
    components: {
        AMenu: Menu,
        AMenuItem: MenuItem,
        ASubMenu: SubMenu
    },
    setup() {
        const router = useRouter();
        const appStore = useAppStore()

        const navigate = (url: string) => {
            router.push(url);
        };

        return {
            appStore,
            navigate,
        };
    },
});
</script>