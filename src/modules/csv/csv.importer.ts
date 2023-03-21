import csv from 'csvtojson';

import { Importer } from '../../parsers.js';
import { saveRecords } from '../../utils.js';

export const csvImporter: Importer = async (csvString, resource) => {
  const records = await csv().fromString(csvString);

  return saveRecords(records, resource);
};
