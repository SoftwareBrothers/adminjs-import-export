import { Importer } from '../../parsers';
import { saveRecords } from '../../utils';

export const jsonImporter: Importer = async (jsonString, resource) => {
  const records = JSON.parse(jsonString);

  return saveRecords(records, resource);
};
