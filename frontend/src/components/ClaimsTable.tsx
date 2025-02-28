import { AgGridReact } from 'ag-grid-react';
import { claimsStore } from '~/stores/globalStore'; 
import { observer } from 'mobx-react-lite';
import { ClaimsType } from '../schemas/claimsSchema';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import { sendApprovedClaims } from '~/services/apiService';

const ClaimsTable = observer(() => {


    const claimsData = claimsStore.claims;
    const [columnDefs, setColumnDefs] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

        useEffect(() => { 
            if (claimsData.length > 0) {
                const newColumnDefs = Object.keys(claimsData[0]).map(key => ({
                    headerName: key,
                    field: key as keyof ClaimsType,
                    editable: true,
                    
                    valueParser: (params: any) => {
                        if (typeof claimsData[0][key] === 'number') {
                            return Number(params.newValue);
                        }
                        if (claimsData[0][key] instanceof Date) {
                            return new Date(params.newValue);
                        }
                        return params.newValue;
                    },
                    valueFormatter: (params) => {
                        if (params.value instanceof Date) {
                            return params.value.toISOString().split('T')[0]; // Format to YYYY-MM-DD
                        }
                        return params.value; // Return original value if not a date
                    },
                }));
                setColumnDefs(newColumnDefs); 
        } else {
            setColumnDefs([]);
        }
    }, [claimsData]); // Dependency array to trigger effect on claimsData change

    const handleApprove = async () => {
        try {
            setIsSubmitting(true);
            await sendApprovedClaims(claimsData);
            claimsStore.setClaims([]);
        } catch (error) {
            console.error('Error approving claims:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex flex-col gap-4">
            {claimsData.length > 0 && (
                <div className="flex">
                    <Button
                        onClick={handleApprove}
                        loading={isSubmitting}
                        color="royalGreen.2"
                        className="hover:bg-royalGreen-7 transition-colors"
                    >
                        Approve Claims
                    </Button>
                </div>
            )}
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
                {claimsData.length > 0 ? (
                    <AgGridReact
                        rowData={claimsData}
                        columnDefs={columnDefs}
                        modules={[ClientSideRowModelModule]}
                    />
                ) : (
                    <p>No claims data available.</p>
                )}
            </div>
        </div>
    );
});

export default ClaimsTable;