import { getFileFromRequest, getImporterByFileName } from './utils';
import { ActionHandler, ActionResponse } from 'adminjs';
import util from 'util';
import fs from 'fs';

const readFile = util.promisify(fs.readFile);

export const importHandler: ActionHandler<ActionResponse> = async (
  request,
  response,
  context
) => {
  const file = getFileFromRequest(request);
  if (file.name !== null) {
    const importer = getImporterByFileName(file.name);
    const fileContent = await readFile(file.path);
    await importer(fileContent.toString(), context.resource);
  }

  return {};
};
