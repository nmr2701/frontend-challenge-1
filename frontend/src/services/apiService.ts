import axios from 'axios';
import { API_URL } from '../config/constants';
import { ClaimsType } from '../schemas/claimsSchema';


export const sendApprovedClaims = async (claims: ClaimsType[]) => {
    try {
        const response = await axios.post(`${API_URL}/claims/approve`,
            { claims },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending approved claims:', error);
        throw error;
    }
};

