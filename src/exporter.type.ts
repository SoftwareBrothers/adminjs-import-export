export const Exporters = ['csv', 'json', 'xml'] as const;

export type ExporterType = typeof Exporters[number];
