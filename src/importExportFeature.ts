import { buildFeature, FeatureType, ComponentLoader } from 'adminjs';

import { postActionHandler } from './utils.js';
import { exportHandler } from './export.handler.js';
import { importHandler } from './import.handler.js';
import { bundleComponent } from './bundle-component.js';

type ImportExportFeatureOptions = {
  /**
   * Your ComponentLoader instance. It is required for the feature to add it's components.
   */
  componentLoader: ComponentLoader;
};

const importExportFeature = (
  options: ImportExportFeatureOptions
): FeatureType => {
  const { componentLoader } = options;
  const importComponent = bundleComponent(componentLoader, 'ImportComponent');
  const exportComponent = bundleComponent(componentLoader, 'ExportComponent');

  return buildFeature({
    actions: {
      export: {
        handler: postActionHandler(exportHandler),
        component: exportComponent,
        actionType: 'resource',
        showFilter: true,
      },
      import: {
        handler: postActionHandler(importHandler),
        component: importComponent,
        actionType: 'resource',
        showFilter: true,
      },
    },
  });
};

export default importExportFeature;
