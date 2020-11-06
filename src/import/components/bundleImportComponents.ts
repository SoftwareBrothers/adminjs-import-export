import AdminBro from 'admin-bro';

export const bundleImportComponents = (): { IMPORT_COMPONENT: string } => {
  const IMPORT_COMPONENT = AdminBro.bundle(
    '../../../src/import/components/ImportComponent'
  );

  return { IMPORT_COMPONENT };
};
