import { BaseRecord, BaseResource } from 'admin-bro';
import { ExporterType } from './export/parsers/exporter.type';
import { jsonExporter } from './export/parsers/json.exporter';
import { jsonImporter } from './import/parsers/json.importer';
import { csvExporter } from './export/parsers/csv.exporter';
import { xmlExporter } from './export/parsers/xml.exporter';
import { csvImporter } from './import/parsers/csv.importer';
import { xmlImporter } from './import/parsers/xml.importer';

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
