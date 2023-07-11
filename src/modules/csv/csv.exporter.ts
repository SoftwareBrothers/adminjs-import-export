import { parse } from 'json2csv';
import { Exporter } from '../../parsers.js';
import { emptyValuesTransformer } from '../transformers/empty-values.transformer.js';

export const csvExporter: Exporter = (records, options) => {
  return parse(
    records.map(record =>
      emptyValuesTransformer(
        record.params,
        'export',
        options?.properties?.export?.csv
      )
    )
  );
};
