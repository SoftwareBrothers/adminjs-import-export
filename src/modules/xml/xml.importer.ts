import { Importer } from '../../parsers';
import xml2js from 'xml2js';
import { saveRecords } from '../../utils';

export const xmlImporter: Importer = async (xmlString, resource) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  const {
    records: { record },
  } = await parser.parseStringPromise(xmlString);

  return saveRecords(record, resource);
};
