import { RxDragLocalesManager } from "@nop-chaos/locales/src";
import { useLocalesManager } from "./useLocalesManager";

export function useRxDragLocalesManager(){
  return useLocalesManager() as RxDragLocalesManager
}