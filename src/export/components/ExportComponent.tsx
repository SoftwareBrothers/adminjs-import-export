import React, { FC, useState } from 'react';
import { ActionProps, ApiClient, useNotice } from 'admin-bro';
import { Box, Button, Loader, Text } from '@admin-bro/design-system';
import { saveAs } from 'file-saver';
import format from 'date-fns/format';
import { Parsers, ParserType } from '../parsers/parser.type';

const mimeTypes: Record<ParserType, string> = {
  json: 'application/json',
  csv: 'text/csv',
  xml: 'text/xml',
};

const getFileName = extension =>
  `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;

const ExportComponent: FC<ActionProps> = ({ resource }) => {
  const [isFetching, setFetching] = useState<boolean>();
  const sendNotice = useNotice();

  if (isFetching) {
    return <Loader />;
  }

  const exportData = async (type: ParserType) => {
    setFetching(true);
    try {
      const {
        data: { exportedData },
      } = await new ApiClient().resourceAction({
        method: 'post',
        resourceId: resource.id,
        actionName: 'export',
        params: {
          type,
        },
      });

      const blob = new Blob([exportedData], { type: mimeTypes[type] });
      saveAs(blob, getFileName(type));
      sendNotice({ message: 'Exported successfully', type: 'success' });
    } catch (e) {
      sendNotice({ message: e.message, type: 'error' });
    }
    setFetching(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Text variant="lg">Choose export format:</Text>
      </Box>
      <Box display="flex" justifyContent="center">
        {Parsers.map(parserType => (
          <Box key={parserType} m={2}>
            <Button
              onClick={() => exportData(parserType)}
              disabled={isFetching}
            >
              {isFetching && <Loader />} {parserType.toUpperCase()}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExportComponent;
