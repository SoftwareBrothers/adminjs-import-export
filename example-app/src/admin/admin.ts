import AdminJSExpress from '@adminjs/express';
import MongooseAdapter from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import { Express } from 'express';
import { createUserResource } from './resources/user/user.resource';
import mongoose from 'mongoose';

const setupAdmin = async (app: Express): Promise<void> => {
  await mongoose.connect('mongodb://localhost:27017/adminjs-import-export', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  AdminJS.registerAdapter(MongooseAdapter);
  const adminJs = new AdminJS({
    resources: [createUserResource()],
  });

  const router = await AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
};

export default setupAdmin;
