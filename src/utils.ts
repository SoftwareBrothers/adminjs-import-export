import {
  ActionContext,
  ActionHandler,
  ActionRequest,
  ActionResponse,
  BaseRecord,
  BaseResource,
  Filter,
  ValidationError,
} from 'admin-bro';
import { Importer } from './parsers';
import { jsonImporter } from './modules/json/json.importer';
import { csvImporter } from './modules/csv/csv.importer';
import { xmlImporter } from './modules/xml/xml.importer';

export const saveRecords = async (
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

export const postActionHandler = (
  handler: ActionHandler<ActionResponse>
): ActionHandler<ActionResponse> => async (request, response, context) => {
  if (request.method !== 'post') {
    return {};
  }

  return handler(request, response, context);
};

export const getFileFromRequest = (request: ActionRequest): File => {
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
  return context.resource.find(new Filter({}, context.resource), {
    limit: Number.MAX_SAFE_INTEGER,
  });
};
