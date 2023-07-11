import {
  ActionContext,
  ActionHandler,
  ActionRequest,
  ActionResponse,
  BaseRecord,
  BaseResource,
  Filter,
  ValidationError,
} from 'adminjs';

import { csvImporter } from './modules/csv/csv.importer.js';
import { jsonImporter } from './modules/json/json.importer.js';
import { xmlImporter } from './modules/xml/xml.importer.js';
import { Importer } from './parsers.js';
import { ImportExportFeatureOptions } from './importExportFeature.js';

export const saveRecords = async (
  records: Record<string, any>[],
  resource: BaseResource,
  options?: ImportExportFeatureOptions
): Promise<BaseRecord[]> => {
  if (!options?.properties?.import?.upsertById) {
    return createRecords(records, resource);
  }
  return upsertRecords(records, resource);
};

const createRecords = async (
  records: Record<string, any>[],
  resource: BaseResource
): Promise<BaseRecord[]> => {
  return Promise.all(
    records.map(async record => {
      try {
        return await resource.create(record);
      } catch (e) {
        console.error(e);
        return e;
      }
    })
  );
};

const upsertRecords = async (
  records: Record<string, any>[],
  resource: BaseResource
): Promise<BaseRecord[]> => {
  debugger;
  const idFieldName =
    resource
      .properties()
      .find(property => property.isId())
      ?.name?.() || 'id';
  const ids = records.map(records => records[idFieldName]).filter(Boolean);
  const existingRecords = await resource.findMany(ids);
  const knownIds = new Set(
    existingRecords.map(record => record.params[idFieldName])
  );
  return Promise.all(
    records.map(async record => {
      debugger;
      try {
        const recordId = record[idFieldName];
        if (knownIds.has(recordId)) {
          return resource.update(recordId, record);
        }

        return resource.create(record);
      } catch (e) {
        console.error(e);
        return e;
      }
    })
  );
};

export const getImporterByFileName = (fileName: string): Importer => {
  if (fileName.includes('.json')) {
    return jsonImporter;
  }
  if (fileName.includes('.csv')) {
    return csvImporter;
  }
  if (fileName.includes('.xml')) {
    return xmlImporter;
  }
  throw new Error('No parser found');
};

export const postActionHandler =
  (handler: ActionHandler<ActionResponse>): ActionHandler<ActionResponse> =>
  async (request, response, context) => {
    if (request.method !== 'post') {
      return {};
    }

    return handler(request, response, context);
  };

export const getFileFromRequest = (request: ActionRequest) => {
  const file = request.payload?.file;

  if (!file?.path) {
    throw new ValidationError({
      file: { message: 'No file uploaded' },
    });
  }

  return file;
};

export const getRecords = async (
  context: ActionContext
): Promise<BaseRecord[]> => {
  const idProperty = context.resource
    .properties()
    .find(p => p.isId())
    ?.name?.();
  const titleProperty = context.resource.decorate().titleProperty()?.name?.();

  return context.resource.find(new Filter({}, context.resource), {
    limit: Number.MAX_SAFE_INTEGER,
    sort: {
      sortBy: idProperty ?? titleProperty,
      direction: 'asc',
    },
  });
};
