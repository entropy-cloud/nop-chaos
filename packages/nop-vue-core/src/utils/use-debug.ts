import { ref } from 'vue'

const debug = ref<boolean>(false)

export const useDebug = {
    getDebug: () => debug.value,
    setDebug(value: boolean) {
        debug.value = value
    }
}