import { Parsers } from './parsers';
import { getRecords } from './utils';
import { ActionHandler, ActionResponse } from 'adminjs';
import { formatRecords } from './formater.handler';
import { Column } from './formater.type';

export const exportHandlerFactory = (columns?: Column[]) => {
  const exportHandler: ActionHandler<ActionResponse> = async (
    request,
    response,
    context
  ) => {
    const parser = Parsers[request.query?.type ?? 'json'].export;

    const records = await getRecords(context);
    const parsedData = parser(
      columns ? formatRecords(records, columns) : records
    );

    return {
      exportedData: parsedData,
    };
  };

  return exportHandler;
};
