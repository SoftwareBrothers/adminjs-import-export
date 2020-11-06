export const Parsers = ['csv', 'json', 'xml'] as const;

export type ParserType = typeof Parsers[number];
