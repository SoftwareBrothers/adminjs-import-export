import AdminBro from 'admin-bro';

export const bundleExportComponents = (): { EXPORT_COMPONENT: string } => {
  const EXPORT_COMPONENT = AdminBro.bundle(
    '../../../src/export/components/ExportComponent'
  );

  return { EXPORT_COMPONENT };
};
