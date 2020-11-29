import { buildFeature, FeatureType } from 'admin-bro';
import { bundleComponents } from './components/bundleComponents';
import { postActionHandler } from './utils';
import { exportHandler } from './export.handler';
import { importHandler } from './import.handler';

const { EXPORT_COMPONENT, IMPORT_COMPONENT } = bundleComponents();

const importExportFeature = (): FeatureType => {
  return buildFeature({
    actions: {
      export: {
        handler: postActionHandler(exportHandler),
        component: EXPORT_COMPONENT,
        actionType: 'resource',
      },
      import: {
        handler: postActionHandler(importHandler),
        component: IMPORT_COMPONENT,
        actionType: 'resource',
      },
    },
  });
};

export default importExportFeature;
