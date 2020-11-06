import { buildFeature, FeatureType, Filter } from 'admin-bro';
import { Parsers } from './export/parsers/export.parser';
import { bundleComponents } from './export/components/bundleComponents';

const { EXPORT_COMPONENT } = bundleComponents();

const feature = (): FeatureType => {
  return buildFeature({
    actions: {
      export: {
        handler: async (request, response, context) => {
          if (request.method === 'post') {
            const parser = Parsers[request.query?.type ?? 'json'];
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
      import: {},
    },
  });
};

export default feature;
