import AdminBro from 'admin-bro';

export const bundleComponents = (): {
  EXPORT_COMPONENT: string;
  IMPORT_COMPONENT: string;
} => {
  const EXPORT_COMPONENT = AdminBro.bundle(
    '../../src/components/ExportComponent'
  );
  const IMPORT_COMPONENT = AdminBro.bundle(
    '../../src/components/ImportComponent'
  );

  return { EXPORT_COMPONENT, IMPORT_COMPONENT };
};
