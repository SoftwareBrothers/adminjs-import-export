import { BaseRecord } from 'admin-bro';
import { parse } from 'json2csv';

export const csvExporter = (records: BaseRecord[]): string => {
  return parse(records.map(r => r.params));
};
