import React, { FC, useState } from 'react';
import { ActionProps, ApiClient, useNotice } from 'admin-bro';
import { Box, Button, Loader, Text } from '@admin-bro/design-system';
import { saveAs } from 'file-saver';
import { Exporters, ExporterType } from '../exporter.type';
import format from 'date-fns/format';

export const mimeTypes: Record<ExporterType, string> = {
  json: 'application/json',
  csv: 'text/csv',
  xml: 'text/xml',
};

export const getExportedFileName = (extension: string) =>
  `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;

const ExportComponent: FC<ActionProps> = ({ resource }) => {
  const [isFetching, setFetching] = useState<boolean>();
  const sendNotice = useNotice();

  const exportData = async (type: ExporterType) => {
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
      saveAs(blob, getExportedFileName(type));
      sendNotice({ message: 'Exported successfully', type: 'success' });
    } catch (e) {
      sendNotice({ message: e.message, type: 'error' });
    }
    setFetching(false);
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Text variant="lg">Choose export format:</Text>
      </Box>
      <Box display="flex" justifyContent="center">
        {Exporters.map(parserType => (
          <Box key={parserType} m={2}>
            <Button
              onClick={() => exportData(parserType)}
              disabled={isFetching}
            >
              {parserType.toUpperCase()}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExportComponent;
