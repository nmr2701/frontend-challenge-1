import { AgGridReact } from "ag-grid-react";
import { claimsStore } from "~/stores/globalStore";
import { observer } from "mobx-react-lite";
import { ClaimsType } from "../schemas/claimsSchema";
import {  AllCommunityModule, ClientSideRowModelModule } from "ag-grid-community";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@mantine/core";
import { sendApprovedClaims } from "~/services/apiService";
import { useNavigate } from "react-router-dom";
import { validateClaims } from "~/utils/validateClaims";


const ClaimsTable = observer(() => {
    const claimsData = claimsStore.claims;
    const [columnDefs, setColumnDefs] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const gridRef = useRef(null);


    const navigate = useNavigate();

    // Define column definitions based on the first claim in the list
    useEffect(() => {
        if (claimsData.length > 0) {
            const newColumnDefs = [
                {
                    checkboxSelection: true,
                    headerCheckboxSelection: true,
                    width: 80,
                },
                ...Object.keys(claimsData[0]).map((key) => ({
                headerName: key,
                field: key as keyof ClaimsType,
                editable: true,
                type: typeof claimsData[0][key],
                
            })),
            ];
            setColumnDefs(newColumnDefs);
        } else {
            setColumnDefs([]);
        }
    }, [claimsData]); 



    const handleApprove = async () => {
        try {
            setIsSubmitting(true);

            // Validate claims data before submitting as data may have been edited
            const errors = validateClaims(claimsData);
            if (errors.length > 0) {
                setValidationErrors(errors);
                setIsSubmitting(false);
                return;
            }

            await sendApprovedClaims(claimsData);
            claimsStore.setClaims([]);
            navigate("/mrf-files");
        } catch (error) {
            console.error("Error approving claims:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onRemoveSelected = useCallback(() => {
        const selectedData = gridRef.current!.api.getSelectedRows();
        gridRef.current!.api.applyTransaction({
            remove: selectedData, 
        })!;

        const selectedDataIds = selectedData.map((data: ClaimsType) => data.claimId);

        claimsStore.setClaims(claimsData.filter((claim) => !selectedDataIds.includes(claim.claimId)));

    }, [claimsData]);


    return (
        <div className="flex flex-col gap-4">
            {validationErrors.length > 0 && (
                <div className="bg-red-100 text-red-600 p-4 rounded">
                    <h3 className="font-bold">Validation Errors:</h3>
                    <ul className="list-disc list-inside">
                        {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {claimsData.length > 0 && (
                <div className="flex">
                    <Button onClick={handleApprove} loading={isSubmitting} color="royalGreen.2" className="hover:bg-royalGreen-7 transition-colors">
                        Approve Claims
                    </Button>
                    <Button onClick={onRemoveSelected} color="red" className="hover:bg-red-7 transition-colors">
                        Remove Selected
                    </Button>
                </div>
            )}
            <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                {claimsData.length > 0 ? <AgGridReact
                    rowData={claimsData}
                    columnDefs={columnDefs}
                    modules={[ClientSideRowModelModule, AllCommunityModule]}
                    rowSelection={"multiple"}
                    ref={gridRef}

                /> : <p>No claims data available.</p>}
            </div>
        </div>
    );
});

export default ClaimsTable;
