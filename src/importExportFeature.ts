import { buildFeature, FeatureType, ComponentLoader } from 'adminjs';
import { postActionHandler } from './utils';
import { exportHandler } from './export.handler';
import { importHandler } from './import.handler';
import { bundleComponent } from './bundle-component';

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
      },
      import: {
        handler: postActionHandler(importHandler),
        component: importComponent,
        actionType: 'resource',
      },
    },
  });
};

export default importExportFeature;
