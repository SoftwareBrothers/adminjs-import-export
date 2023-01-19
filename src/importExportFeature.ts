import { buildFeature, FeatureType } from 'adminjs';
import { bundleComponents } from './components/bundleComponents';
import { postActionHandler } from './utils';
import { exportHandler } from './export.handler';
import { importHandler } from './import.handler';
import { Config } from './config.type';
import { CONFIG_DEFAULT } from './config.default';

const { EXPORT_COMPONENT, IMPORT_COMPONENT } = bundleComponents();

const importExportFeature = (config: Config = CONFIG_DEFAULT): FeatureType => {
  const actions = {};
  if (config.export?.isVisible)
    actions['export'] = {
      handler: postActionHandler(exportHandler),
      component: EXPORT_COMPONENT,
      actionType: 'resource',
    };
  if (config.export?.isVisible)
    actions['import'] = {
      handler: postActionHandler(importHandler),
      component: IMPORT_COMPONENT,
      actionType: 'resource',
    };

  return buildFeature({
    actions,
  });
};

export default importExportFeature;
