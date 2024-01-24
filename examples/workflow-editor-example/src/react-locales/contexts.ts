import { createContext } from "react"
import {ILocalesManager} from "@nop-chaos/locales"

export const LocalesContext = createContext<ILocalesManager | undefined>(undefined)