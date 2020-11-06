import { BaseRecord } from 'admin-bro';
import { parse } from 'json2csv';

export const csvExportParser = (records: BaseRecord[]): string => {
  return parse(records.map(r => r.params));
};
