import { BaseRecord } from 'adminjs';
import { parse } from 'json2csv';

export const csvExporter = (records: BaseRecord[]): string => {
  return parse(records.map(r => r.params));
};
