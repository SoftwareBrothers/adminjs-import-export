import { ValidationError, buildFeature, FeatureType, Filter } from 'admin-bro';
import { bundleExportComponents } from './export/components/bundleExportComponents';
import { Parsers } from './parsers';
import { bundleImportComponents } from './import/components/bundleImportComponents';
import fs from 'fs';
import util from 'util';
import { jsonImporter } from './import/parsers/json.importer';

const readFile = util.promisify(fs.readFile);

const { EXPORT_COMPONENT } = bundleExportComponents();
const { IMPORT_COMPONENT } = bundleImportComponents();

const feature = (): FeatureType => {
  return buildFeature({
    actions: {
      export: {
        handler: async (request, response, context) => {
          if (request.method === 'post') {
            const parser = Parsers[request.query?.type ?? 'json'].export;
            const records = await context.resource.find(
              new Filter({}, context.resource),
              {
                limit: Number.MAX_SAFE_INTEGER,
              }
            );
            const parsedData = parser(records);

            return {
              exportedData: parsedData,
            };
          }
          return {};
        },
        component: EXPORT_COMPONENT,
        actionType: 'resource',
      },
      import: {
        handler: async (request, response, context) => {
          if (request.method === 'post') {
            const filePath = request.payload?.file.path;

            if (!filePath) {
              throw new ValidationError({
                file: { message: 'No file uploaded' },
              });
            }

            const file = await readFile(filePath);
            await jsonImporter(file.toString(), context.resource);
          }
          return {};
        },
        component: IMPORT_COMPONENT,
        actionType: 'resource',
      },
    },
  });
};

export default feature;
