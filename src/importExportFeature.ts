import * as _ from 'lodash';
import { buildFeature, FeatureType } from 'adminjs';
import { bundleComponents } from './components/bundleComponents';
import { postActionHandler } from './utils';
import { exportHandlerFactory } from './export.handler';
import { importHandler } from './import.handler';
import { Options } from './options.type';
import { defaultOptions } from './options.default';

const { EXPORT_COMPONENT, IMPORT_COMPONENT } = bundleComponents();

const importExportFeature = (options: Options): FeatureType => {
  const appOptions = _.merge({}, defaultOptions, options);
  const actions = {};
  if (appOptions.export?.isVisible)
    actions['export'] = {
      handler: postActionHandler(
        exportHandlerFactory(appOptions.export.columns)
      ),
      component: EXPORT_COMPONENT,
      actionType: 'resource',
    };
  if (appOptions.import?.isVisible)
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
