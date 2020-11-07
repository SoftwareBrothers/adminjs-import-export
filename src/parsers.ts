import { BaseRecord, BaseResource } from 'admin-bro';
import { ExporterType } from './exporter.type';
import { jsonExporter } from './modules/json/json.exporter';
import { jsonImporter } from './modules/json/json.importer';
import { csvExporter } from './modules/csv/csv.exporter';
import { xmlExporter } from './modules/xml/xml.exporter';
import { csvImporter } from './modules/csv/csv.importer';
import { xmlImporter } from './modules/xml/xml.importer';

export type Exporter = (records: BaseRecord[]) => string;

export type Importer = (
  records: string,
  resource: BaseResource
) => Promise<BaseRecord[]>;

export const Parsers: Record<
  ExporterType,
  { export: Exporter; import: Importer }
> = {
  json: { export: jsonExporter, import: jsonImporter },
  csv: { export: csvExporter, import: csvImporter },
  xml: { export: xmlExporter, import: xmlImporter },
};
