import { buildFeature, FeatureType } from 'adminjs';

import { bundleComponents } from './components/bundleComponents.js';
import { postActionHandler } from './utils.js';
import { exportHandler } from './export.handler.js';
import { importHandler } from './import.handler.js';

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
