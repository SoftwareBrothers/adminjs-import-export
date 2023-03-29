import path from 'path';

import type { ComponentLoader } from 'adminjs';

// const dirname = __dirname;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const bundleComponent = (
  loader: ComponentLoader,
  componentName: string
) => {
  const componentPath = path.join(__dirname, `../components/${componentName}`);
  return loader.add(componentName, componentPath);
};
