import React, { FC, useState } from 'react';
import { useNotice, ActionProps, ApiClient } from 'admin-bro';
import { Box, Button, Loader } from '@admin-bro/design-system';
import { Parsers } from '../parsers/export.parser';
import { saveAs } from 'file-saver';
import format from 'date-fns/format';

const mimeTypes: Record<keyof typeof Parsers, string> = {
  json: 'application/json',
};

const getFileName = extension =>
  `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`;

const ExportComponent: FC<ActionProps> = ({ resource }) => {
  const [isFetching, setFetching] = useState<boolean>();
  const sendNotice = useNotice();

  if (isFetching) {
    return <Loader />;
  }

  const exportData = async (type: keyof typeof Parsers) => {
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
      <Button onClick={() => exportData('json')} disabled={isFetching}>
        {isFetching && <Loader />} JSON
      </Button>
    </Box>
  );
};

export default ExportComponent;
