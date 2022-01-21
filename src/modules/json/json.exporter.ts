import { BaseRecord } from 'adminjs';

export const jsonExporter = (records: BaseRecord[]): string => {
  return JSON.stringify(records.map(r => r.params));
};
