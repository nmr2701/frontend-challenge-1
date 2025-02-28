import { useState } from 'react';
import { FileInput, Notification, Title , Group } from '@mantine/core'; // Added Text and Group
import { parseClaimsCSV } from '~/utils/CSVParser';
import { claimsStore } from '~/stores/globalStore';



const FileUpload = () => {
    const [error, setError] = useState<string | null>(null);


    const handleFileChange = (file: File) => {
        const validFileTypes = 'text/csv'; // Only allow CSV files
        if (validFileTypes.includes(file.type)) {
            setError(null);

            parseClaimsCSV(file).then(({ data, name, errors }) => {
                if (errors.length > 0) {
                    setError(`Errors parsing file: ${errors.join('\n')}`);
                    return;
                }

                claimsStore.setClaims(data);
                claimsStore.setSelectedFileName(name);

            }).catch((error) => {
                setError(`Error parsing file: ${error}`);
            });

            
        } else {
            setError('Invalid file format. Please upload a CSV file.');
        }
    };


    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}> {/* Added styling */}
            <Group style={{ margin: '20px 0' }}> {/* Centered the FileInput */}
                <Title order={3} fw={500} c="royalGreen.3"> {/* Added title styling */}
                    Upload Your CSV File
                </Title>
                <FileInput
                    onChange={handleFileChange}
                    multiple={false}
                    placeholder="No file selected"
                />
            </Group>
            {error && (
                <Notification
                    title="Error"
                    color="red"
                    onClose={() => setError(null)}
                    styles={{ 
                        root: { 
                            backgroundColor: '#ffdddd', // Light red background for error
                        },
                    }}
                >
                    {error}
                </Notification>
            )}
    </div>
    );
};

export default FileUpload;