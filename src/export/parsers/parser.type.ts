export const Parsers = ['csv', 'json'] as const;

export type ParserType = typeof Parsers[number];
