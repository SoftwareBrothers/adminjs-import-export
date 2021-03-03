import AdminBro from 'admin-bro';
import importExportFeature from '../src';
import mongoose from 'mongoose';
import MongooseAdapter from '@admin-bro/mongoose';
global.window = {} as any;
import { ApiClient } from 'admin-bro';
import express from 'express';
import AdminBroExpress from 'admin-bro-expressjs';
import axios from 'axios';

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model('User', userSchema);
AdminBro.registerAdapter(MongooseAdapter);

class API extends ApiClient {
  constructor() {
    super();
    // @ts-ignore
    this.client = axios.create({
      baseURL: 'localhost:3000',
    });
  }
}

describe('CSV Export', () => {
  it.skip('should assert true is ok', async function () {
    const adminBro = new AdminBro({
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

    const router = await AdminBroExpress.buildRouter(adminBro);
    const app = express();
    app.use(adminBro.options.rootPath, router);
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
