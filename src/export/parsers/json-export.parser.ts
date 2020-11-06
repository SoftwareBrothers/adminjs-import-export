import { BaseRecord } from 'admin-bro';

export const jsonExportParser = (records: BaseRecord[]): string => {
  return JSON.stringify(records.map(r => r.params));
};
