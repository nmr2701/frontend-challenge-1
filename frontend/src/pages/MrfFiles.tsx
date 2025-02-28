import { useEffect, useState } from 'react';
import { Notification } from '@mantine/core';
import { API_URL } from '../config/constants';
import axios from 'axios';

export default function MrfFilesPage() {
  const [mrfFiles, setMrfFiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMrfFiles = async () => {
      try {
        const response = await axios.get(`${API_URL}/claims/mrf-files`);
        setMrfFiles(response.data.mrfFiles);
        console.log(response.data.mrfFiles);
      } catch (err) {
        setError('Failed to fetch MRF files');
        console.error(err);
      }
    };

    fetchMrfFiles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">MRF Files</h1>
      {error && (
        <Notification title="Error" color="red">
          {error}
        </Notification>
      )}
        
    </div>
  );
};

