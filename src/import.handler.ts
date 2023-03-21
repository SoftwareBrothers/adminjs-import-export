import { ActionHandler, ActionResponse } from 'adminjs';
import fs from 'fs';
import util from 'util';

import { getFileFromRequest, getImporterByFileName } from './utils.js';

const readFile = util.promisify(fs.readFile);

export const importHandler: ActionHandler<ActionResponse> = async (
  request,
  response,
  context
) => {
  const file = getFileFromRequest(request);
  const importer = getImporterByFileName(file.name);

  const fileContent = await readFile(file.path);
  await importer(fileContent.toString(), context.resource);

  return {};
};
