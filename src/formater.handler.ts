import { BaseRecord } from 'adminjs';
import { Column } from './formater.type';

const formatKey = (record: BaseRecord, column: Column) => {
  if (!column.key) return null;
  return column.callback
    ? column.callback(record.params[column.key])
    : record.params[column.key];
};

const formatConcatKeys = (record: BaseRecord, column: Column) => {
  if (!column.concat?.keys) return null;
  return column.concat.keys
    .map(key => record.params[key])
    .join(column.concat.separator);
};

const formatConcatKey = (record: BaseRecord, column: Column) => {
  if (!column.concat?.key) return null;
  let index = 0;
  const array: string[] = [];
  while (!!record.params[`${column.concat.key}.${index}`]) {
    array.push(record.params[`${column.concat.key}.${index}`]);
    index++;
  }
  return array.join(column.concat.separator);
};

export const formatRecords = (records: BaseRecord[], columns: Column[]) => {
  const formattedRecords = records.map(record => {
    const formattedParams = {};
    columns.forEach(column => {
      if (column.key) formattedParams[column.name] = formatKey(record, column);
      if (column.value) formattedParams[column.name] = column.value;
      if (column.concat?.keys)
        formattedParams[column.name] = formatConcatKeys(record, column);
      if (column.concat?.key)
        formattedParams[column.name] = formatConcatKey(record, column);
    });

    return { params: formattedParams };
  });

  return formattedRecords;
};
