import { BaseRecord } from 'admin-bro';
import xml from 'xml';

export const xmlExporter = (records: BaseRecord[]): string => {
  const data = records.map(record => ({
    item: Object.entries(record.params).map(([key, value]) => ({
      [key]: value,
    })),
  }));

  return xml(
    { items: data },
    {
      indent: '\t',
      declaration: true,
    }
  );
};
