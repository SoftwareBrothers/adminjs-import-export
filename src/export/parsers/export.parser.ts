import { BaseRecord } from 'admin-bro';
import { jsonExportParser } from './json-export.parser';

export type Parser = (records: BaseRecord[]) => string;

export const Parsers = {
  json: jsonExportParser,
};
