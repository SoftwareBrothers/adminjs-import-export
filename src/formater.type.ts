export interface Format {
  name: string;
  key?: string;
  callback?: (value: string) => string;
  value?: string;
  concat?: {
    key?: string;
    keys?: string[];
    separator: string;
  };
}