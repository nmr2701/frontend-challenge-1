import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import MrfFilesPage from "./pages/mrfFilesPage";
import LoginPage from "./pages/loginPage";
import { observer } from "mobx-react-lite";
import { authStore } from "~/stores/globalStore";
import { ReactNode } from "react";
import { useEffect, useState } from "react";

const ProtectedRoute = observer(({ element }: { element: ReactNode }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return authStore.isAuthenticated ? element : <LoginPage />;
});

const router = createBrowserRouter([
    {
        element: <BasicLayout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute element={<MainPage />} />,
            },
            {
                path: "/mrf-files",
                element: <MrfFilesPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            }
        ],
        errorElement: <NotFoundPage />,
    },
]);

export default router;
