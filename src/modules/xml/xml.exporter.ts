import xml from 'xml';
import { Exporter } from '../../parsers.js';

export const xmlExporter: Exporter = (records, options) => {
  const data = records.map(record => ({
    record: Object.entries(record.params).map(([key, value]) => ({
      [key]: value,
    })),
  }));

  return xml(
    { records: data },
    {
      indent: '\t',
      declaration: true,
    }
  );
};
