import { useEffect, useState } from "react";
import { Title, Container } from "@mantine/core";
import { MrfType } from "~/schemas/mrfSchema";
import { fetchMrfFiles } from "~/services/apiService";
import MrfFilesList from "../components/MrfFilesList";
import MrfFilesLoader from "../components/MrfFilesLoader";

export default function MrfFilesPage() {
    const [mrfFiles, setMrfFiles] = useState<MrfType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMrfFiles()
            .then((files) => {
                setMrfFiles(files);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <Container fluid style={{ textAlign: "center", padding: "20px" }}>
            <Title order={1} fw={500} c="royalGreen.3" mb="md">
                MRF Files
            </Title>
            <MrfFilesLoader loading={loading} error={error} />
            <MrfFilesList mrfFiles={mrfFiles} setError={setError} loading={loading} />
        </Container>
    );
}
