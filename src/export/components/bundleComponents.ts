import AdminBro from 'admin-bro';

export const bundleComponents = () => {
  const EXPORT_COMPONENT = AdminBro.bundle(
    '../../../src/export/components/ExportComponent'
  );

  return { EXPORT_COMPONENT };
};
