import { Parsers } from './parsers';
import { getRecords } from './utils';
import { ActionHandler, ActionResponse } from 'admin-bro';

export const exportHandler: ActionHandler<ActionResponse> = async (
  request,
  response,
  context
) => {
  const parser = Parsers[request.query?.type ?? 'json'].export;

  const records = await getRecords(context);
  const parsedData = parser(records);

  return {
    exportedData: parsedData,
  };
};
