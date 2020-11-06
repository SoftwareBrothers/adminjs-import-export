import { BaseRecord } from 'admin-bro';
import xml from 'xml';

export const xmlExporter = (records: BaseRecord[]): string => {
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
