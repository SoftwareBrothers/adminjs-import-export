import { Exporter } from '../../parsers.js';

export const jsonExporter: Exporter = (records, options) => {
  return JSON.stringify(records.map(r => r.params));
};
