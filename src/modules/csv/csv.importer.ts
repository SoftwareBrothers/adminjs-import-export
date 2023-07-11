import csv from 'csvtojson';

import { Importer } from '../../parsers.js';
import { saveRecords } from '../../utils.js';
import { emptyValuesTransformer } from '../transformers/empty-values.transformer.js';

export const csvImporter: Importer = async (csvString, resource, options) => {
  const importProperties = options?.properties?.import?.csv;

  const records = await csv().fromString(csvString);

  const transformedRecords = records.map(record =>
    emptyValuesTransformer(record, 'import', importProperties)
  );

  return saveRecords(transformedRecords, resource, options);
};
