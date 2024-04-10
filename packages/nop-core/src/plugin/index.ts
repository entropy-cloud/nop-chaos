import { VDomType } from "../renderer/types";

export type Plugin = {
  install(): void;

  uninstall(): void;

  renderInMainPage?: () => VDomType 
};
