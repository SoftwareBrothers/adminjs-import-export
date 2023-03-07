import { Parsers } from './parsers.js';
import { getRecords } from './utils.js';
import { ActionHandler, ActionResponse } from 'adminjs';

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
