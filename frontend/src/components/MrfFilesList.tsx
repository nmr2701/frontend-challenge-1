import { Grid, Text } from "@mantine/core";
import { MrfType } from "~/schemas/mrfSchema";
import MrfFileCard from "./MrfFileCard";

interface MrfFilesListProps {
    mrfFiles: MrfType[];
    setError: (error: string | null) => void;
    loading: boolean;
}

const MrfFilesList: React.FC<MrfFilesListProps> = ({ mrfFiles, setError, loading }) => {
    return (
        <>
            {mrfFiles.length > 0 ? (
                <Grid>
                    {mrfFiles.map((file: MrfType, index) => (
                        <MrfFileCard key={index} file={file} setError={setError} />
                    ))}
                </Grid>
            ) : (
                !loading && <Text c="text-gray-500">No MRF files available.</Text>
            )}
        </>
    );
};

export default MrfFilesList;
