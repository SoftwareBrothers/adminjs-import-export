import { Column } from './formater.type';

export interface Options {
  export?: {
    isVisible?: boolean;
    columns?: Column[];
  };
  import?: {
    isVisible?: boolean;
  };
}
