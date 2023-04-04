import type { ComponentLoader, ResourceWithOptions } from 'adminjs';

import importExportFeature from '../../../../../src/index.js';

import { User } from './user.entity.js';

export const createUserResource = (
  componentLoader: ComponentLoader
): ResourceWithOptions => ({
  resource: User,
  options: {
    navigation: {
      icon: 'User',
      name: 'Users',
    },
  },
  features: [
    importExportFeature({
      componentLoader,
    }),
  ],
});
