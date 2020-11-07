import csv from 'csvtojson';
import { Importer } from '../../parsers';
import { saveRecords } from '../../utils';

export const csvImporter: Importer = async (csvString, resource) => {
  const records = await csv().fromString(csvString);

  return saveRecords(records, resource);
};
