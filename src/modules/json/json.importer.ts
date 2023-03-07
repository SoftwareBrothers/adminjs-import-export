import { Importer } from '../../parsers.js';
import { saveRecords } from '../../utils.js';

export const jsonImporter: Importer = async (jsonString, resource) => {
  const records = JSON.parse(jsonString);

  return saveRecords(records, resource);
};
