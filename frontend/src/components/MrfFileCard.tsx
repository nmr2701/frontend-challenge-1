import { Grid, Text, Card } from "@mantine/core";
import { MrfType } from "~/schemas/mrfSchema";
import { downloadFile } from "~/utils/downloadFiles";

interface MrfFileCardProps {
    file: MrfType;
    setError: (error: string | null) => void;
}

const MrfFileCard: React.FC<MrfFileCardProps> = ({ file, setError }) => {
    return (
        <Grid.Col span={4} style={{ marginBottom: "20px" }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text
                    fw={500}
                    size="lg"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        const result = downloadFile(file);
                        if (!result.success) {
                            setError(result.error);
                        }
                    }}
                >
                    {file.plan_id}_{file.last_updated_on}
                </Text>
            </Card>
        </Grid.Col>
    );
};

export default MrfFileCard;
