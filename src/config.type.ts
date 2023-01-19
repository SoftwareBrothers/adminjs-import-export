import { Column } from "./formater.type";

export interface Config {
  export?: {
    isVisible?: boolean;
    columns?: Column[]
  },
  import?: {
    isVisible?: boolean;
  }
}