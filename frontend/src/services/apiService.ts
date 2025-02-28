import axios from "axios";
import { API_URL } from "../config/constants";
import { ClaimsType } from "../schemas/claimsSchema";

export const sendApprovedClaims = async (claims: ClaimsType[]) => {
    try {
        const response = await axios.post(`${API_URL}/claims/approve`, { claims }, { headers: { "Content-Type": "application/json" } });
        return response.data;
    } catch (error) {
        console.error("Error sending approved claims:", error);
        throw error;
    }
};

export const fetchMrfFiles = async () => {
    try {
        const response = await axios.get(`${API_URL}/claims/mrf-files`);
        return response.data.mrfFiles;
    } catch (err) {
        console.error("Error fetching MRF files:", err);
        throw err;
    }
};
