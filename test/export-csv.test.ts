import AdminJS from 'adminjs';
import importExportFeature from '../src';
import mongoose from 'mongoose';
import MongooseAdapter from '@adminjs/mongoose';
global.window = {} as any;
import { ApiClient } from 'adminjs';
import express from 'express';
import AdminJSExpress from '@adminjs/express';
import axios from 'axios';

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model('User', userSchema);
AdminJS.registerAdapter(MongooseAdapter);

class API extends ApiClient {
  constructor() {
    super();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.client = axios.create({
      baseURL: 'localhost:3000',
    });
  }
}

describe('CSV Export', () => {
  it.skip('should assert true is ok', async function() {
    const adminJs = new AdminJS({
      resources: [
        {
          resource: User,
          options: {
            navigation: {
              icon: 'User',
              name: 'Users',
            },
          },
          features: [importExportFeature()],
        },
      ],
    });

    const router = AdminJSExpress.buildRouter(adminJs);
    const app = express();
    app.use(adminJs.options.rootPath, router);
    app.listen(3000);
    const apiClient = new API();
    const data = await apiClient.resourceAction({
      method: 'POST',
      actionName: 'export',
      data: {},
      resourceId: 'User',
    });
  });
});
