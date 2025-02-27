import { useState } from 'react';
import { FileInput, Notification } from '@mantine/core';
import { parseClaimsCSV } from '~/utils/CSVParser';
import { claimsStore } from '~/stores/globlalStore';


const FileUpload = () => {
    const [error, setError] = useState<string | null>(null);


    const handleFileChange = (file: File) => {
        const validFileTypes = 'text/csv'; // Only allow CSV files
        if (validFileTypes.includes(file.type)) {
            setError(null);

            parseClaimsCSV(file).then(({ data, name }) => {
                claimsStore.setClaims(data);
                claimsStore.setSelectedFileName(name);
                setError(null);

            }).catch((error) => {
                setError(`Error parsing file: ${error}`);
            });

            
        } else {
            setError('Invalid file format. Please upload a CSV file.');
        }
    };


    return (
    <div>
        <FileInput onChange={handleFileChange} multiple={false} />
        {error && (
            <Notification
                title="Error"
                color="red"
                onClose={() => setError(null)}
            >
                {error}
            </Notification>
        )}
    </div>
    );
};

export default FileUpload;