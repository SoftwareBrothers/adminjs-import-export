import { ActionHandler, ActionResponse } from 'admin-bro';

export const createExportHandler = parser => {
  const exportHandler: ActionHandler<ActionResponse> = (
    request,
    response,
    context
  ) => {
    return response;
  };

  return exportHandler;
};
