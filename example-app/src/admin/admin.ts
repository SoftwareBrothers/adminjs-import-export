import mongoose from 'mongoose';
import AdminJSExpress from '@adminjs/express';
import * as MongooseAdapter from '@adminjs/mongoose';
import AdminJS, { ComponentLoader } from 'adminjs';
import { Express } from 'express';

import { createUserResource } from './resources/user/user.resource.js';

const setupAdmin = async (app: Express): Promise<void> => {
  await mongoose.connect('mongodb://localhost:27017/adminjs-import-export');

  const componentLoader = new ComponentLoader();

  AdminJS.registerAdapter({
    Database: MongooseAdapter.Database,
    Resource: MongooseAdapter.Resource,
  });

  const adminJs = new AdminJS({
    componentLoader,
    resources: [createUserResource(componentLoader)],
  });

  const router = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
};

export default setupAdmin;
