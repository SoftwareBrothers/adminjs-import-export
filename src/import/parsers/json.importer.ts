import { Importer } from '../../parsers';
import { BaseRecord } from 'admin-bro';

export const jsonImporter: Importer = async (jsonString, resource) => {
  const records = JSON.parse(jsonString);

  const importedRecords = (await Promise.all(
    records.map(record => resource.create(record))
  )) as BaseRecord[];

  return importedRecords;
};
