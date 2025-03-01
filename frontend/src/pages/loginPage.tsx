import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Button, Title, Notification } from "@mantine/core";
import { authStore } from "~/stores/globalStore";
import { observer } from "mobx-react-lite";

const LoginPage = observer(() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.isAuthenticated) {
            navigate("/");
        }
    }, [navigate, authStore.isAuthenticated]);

    const handleLogin = () => {
        if (username === "admin" && password === "1234") {
            authStore.login();
            navigate("/");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Title order={2}>Login</Title>
            <TextInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                required
            />
            <TextInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
            />
            <Button onClick={handleLogin} className="mt-4">Login</Button>
            {error && <Notification title="Error" color="red" className="mt-4">{error}</Notification>}
        </div>
    );
});

export default LoginPage;