import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import MrfFilesPage from "./pages/MrfFiles";

const router = createBrowserRouter([
    {
        element: <BasicLayout />,
        children: [
            {
                path: "/",
                element: <MainPage />,
            },
            {
                path: "/mrf-files",
                element: <MrfFilesPage />,
            },
        ],
        errorElement: <NotFoundPage />,
    },
]);

export default router;
