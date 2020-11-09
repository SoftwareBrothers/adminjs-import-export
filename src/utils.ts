import { BaseRecord, BaseResource } from 'admin-bro';
import { Importer } from './parsers';
import { jsonImporter } from './modules/json/json.importer';
import { csvImporter } from './modules/csv/csv.importer';
import { xmlImporter } from './modules/xml/xml.importer';
import { ExporterType } from './exporter.type';
import format from 'date-fns/format';

export const saveRecords = async (
  records: Record<string, any>[],
  resource: BaseResource
): Promise<BaseRecord[]> => {
  return Promise.all(
    records.map(async record => {
      try {
        return await resource.create(record);
      } catch (e) {
        console.error(e);
        return e;
      }
    })
  );
};

export const getImporterByFileName = (fileName: string): Importer => {
  if (fileName.includes('.json')) {
    return jsonImporter;
  }
  if (fileName.includes('.csv')) {
    return csvImporter;
  }
  if (fileName.includes('.xml')) {
    return xmlImporter;
  }
  throw new Error('No parser found');
};
