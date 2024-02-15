import { createContext, useContext } from 'react'
import {UseBoundStore, create, StoreApi} from 'zustand'

export type MapStoreType = {
    value: Record<string,any>
    setValue(value:Record<string,any>):void
}

export function createMapStore():UseBoundStore<StoreApi<MapStoreType>>{
    return create((set)=>{
        return {
            value : {},
            setValue(value:Record<string,any){
                set(value)
            }
        }
    })
}


export const MapStoreContextType =
  createContext<MapStoreType | null>(null);

export function useMapStore(): MapStoreType|null {
  return useContext(MapStoreContextType);
}