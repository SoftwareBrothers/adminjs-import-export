import { BaseRecord, BaseResource } from 'adminjs';

import { ExporterType } from './exporter.type.js';
import { jsonExporter } from './modules/json/json.exporter.js';
import { jsonImporter } from './modules/json/json.importer.js';
import { csvExporter } from './modules/csv/csv.exporter.js';
import { xmlExporter } from './modules/xml/xml.exporter.js';
import { csvImporter } from './modules/csv/csv.importer.js';
import { xmlImporter } from './modules/xml/xml.importer.js';
import { ImportExportFeatureOptions } from './importExportFeature.js';

export type Exporter = (
  records: BaseRecord[],
  options: ImportExportFeatureOptions
) => string;

export type Importer = (
  records: string,
  resource: BaseResource,
  options: ImportExportFeatureOptions
) => Promise<BaseRecord[]>;

export const Parsers: Record<
  ExporterType,
  { export: Exporter; import: Importer }
> = {
  json: { export: jsonExporter, import: jsonImporter },
  csv: { export: csvExporter, import: csvImporter },
  xml: { export: xmlExporter, import: xmlImporter },
};
