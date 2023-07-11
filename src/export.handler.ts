import { ActionHandler, ActionResponse } from 'adminjs';

import { Parsers } from './parsers.js';
import { getRecords } from './utils.js';
import { ImportExportFeatureOptions } from './importExportFeature.js';

export const exportHandler: (
  options: ImportExportFeatureOptions
) => ActionHandler<ActionResponse> =
  options => async (request, response, context) => {
    const parser = Parsers[request.query?.type ?? 'json'].export;

    const records = await getRecords(context);
    const parsedData = parser(records, options);

    return {
      exportedData: parsedData,
    };
};
