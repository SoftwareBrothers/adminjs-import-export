import csv from 'csvtojson';
import { Importer } from '../../parsers';
import { BaseRecord } from 'admin-bro';

export const csvImporter: Importer = async (csvString, resource) => {
  const records = await csv().fromString(csvString);

  const importedRecords = (await Promise.all(
    records.map(record => resource.create(record))
  )) as BaseRecord[];

  return importedRecords;
};
