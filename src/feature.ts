import { buildFeature, FeatureType } from 'admin-bro';
import { Parsers } from './parsers';
import fs from 'fs';
import util from 'util';
import { bundleComponents } from './components/bundleComponents';
import {
  getFileFromRequest,
  getImporterByFileName,
  getRecords,
  postActionHandler,
} from './utils';

const readFile = util.promisify(fs.readFile);

const { EXPORT_COMPONENT, IMPORT_COMPONENT } = bundleComponents();

const feature = (): FeatureType => {
  return buildFeature({
    actions: {
      export: {
        handler: postActionHandler(async (request, response, context) => {
          const parser = Parsers[request.query?.type ?? 'json'].export;

          const records = await getRecords(context);
          const parsedData = parser(records);

          return {
            exportedData: parsedData,
          };
        }),
        component: EXPORT_COMPONENT,
        actionType: 'resource',
      },
      import: {
        handler: postActionHandler(async (request, response, context) => {
          const file = getFileFromRequest(request);
          const importer = getImporterByFileName(file.name);

          const fileContent = await readFile(file.name);
          await importer(fileContent.toString(), context.resource);

          return {};
        }),
        component: IMPORT_COMPONENT,
        actionType: 'resource',
      },
    },
  });
};

export default feature;
