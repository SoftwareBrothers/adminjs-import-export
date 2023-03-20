import { ResourceWithOptions } from 'adminjs';
import { User } from './user.entity';
import importExportFeature from '../../../../../src/index';

export const createUserResource = (): ResourceWithOptions => ({
  resource: User,
  options: {
    navigation: {
      icon: 'User',
      name: 'Users',
    },
  },
  features: [importExportFeature()],
});
