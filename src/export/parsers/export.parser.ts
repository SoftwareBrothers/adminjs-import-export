import { BaseRecord } from 'admin-bro';
import { jsonExportParser } from './json-export.parser';
import { csvExportParser } from './csv-export.parser';
import { ParserType } from './parser.type';

export type Parser = (records: BaseRecord[]) => string;

export const Parsers: Record<ParserType, Parser> = {
  json: jsonExportParser,
  csv: csvExportParser,
};
