import { Importer } from '../../parsers';
import xml2js from 'xml2js';
import { BaseRecord } from 'admin-bro';

export const xmlImporter: Importer = async (xmlString, resource) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  const {
    records: { record },
  } = await parser.parseStringPromise(xmlString);

  const importedRecords = (await Promise.all(
    record.map(record => resource.create(record))
  )) as BaseRecord[];

  return importedRecords;
};
