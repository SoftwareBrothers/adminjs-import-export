import AdminJS from 'adminjs';

export const bundleComponents = (): {
  EXPORT_COMPONENT: string;
  IMPORT_COMPONENT: string;
} => {
  const EXPORT_COMPONENT = AdminJS.bundle(
    '../../src/components/ExportComponent.js'
  );
  const IMPORT_COMPONENT = AdminJS.bundle(
    '../../src/components/ImportComponent.js'
  );

  return { EXPORT_COMPONENT, IMPORT_COMPONENT };
};
