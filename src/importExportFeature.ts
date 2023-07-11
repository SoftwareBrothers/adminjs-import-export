import { buildFeature, FeatureType, ComponentLoader } from 'adminjs';

import { postActionHandler } from './utils.js';
import { exportHandler } from './export.handler.js';
import { importHandler } from './import.handler.js';
import { bundleComponent } from './bundle-component.js';

export type ImportExportFeatureOptions = {
  /**
   * Your ComponentLoader instance. It is required for the feature to add its components.
   */
  componentLoader: ComponentLoader;

  /**
   * Names of the properties used by the feature
   */
  properties?: {
    /**
     * Optional export configuration
     */
    export?: {
      /**
       * CSV export configuration
       */
      csv?: {
        /**
         * In CSV export, convert `null` to this (default: '')
         */
        nullValue?: string;
        /**
         * In CSV export, convert `undefined` to this (default: '')
         */
        undefinedValue?: string;
      };
    };

    import?: {
      csv: {
        /**
         * In CSV import, convert this string to `undefined`
         */
        undefinedValue?: string;

        /**
         * In CSV import, convert this string to `null`
         */
        nullValue?: string;
      };

      /**
       * During import, upsert records by ID rather than create
       */
      upsertById: boolean;
    };
  };
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
        handler: postActionHandler(exportHandler(options)),
        component: exportComponent,
        actionType: 'resource',
      },
      import: {
        handler: postActionHandler(importHandler(options)),
        component: importComponent,
        actionType: 'resource',
      },
    },
  });
};

export default importExportFeature;
