import { MrfType } from "../schemas/mrfSchema";

export const downloadFile = (file: MrfType) => {
    try {
        const json = JSON.stringify(file);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file.plan_id}_${file.last_updated_on}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
