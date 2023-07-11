import { Importer } from '../../parsers.js';
import { saveRecords } from '../../utils.js';
import { ImportExportFeatureOptions } from '../../importExportFeature.js';

export const jsonImporter: Importer = async (
  jsonString,
  resource,
  options: ImportExportFeatureOptions
) => {
  const records = JSON.parse(jsonString);

  return saveRecords(records, resource, options);
};
