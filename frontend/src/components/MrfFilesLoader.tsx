import { Loader, Notification } from "@mantine/core";

interface MrfFilesLoaderProps {
    loading: boolean;
    error: string | null;
}

const MrfFilesLoader: React.FC<MrfFilesLoaderProps> = ({ loading, error }) => {
    return (
        <>
            {loading && <Loader size="lg" />}
            {error && (
                <Notification title="Error" color="red" mb="md">
                    {error}
                </Notification>
            )}
        </>
    );
};

export default MrfFilesLoader;
