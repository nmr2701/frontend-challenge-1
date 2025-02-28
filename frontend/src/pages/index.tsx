import React from "react";
import FileUpload from "~/components/FileUpload";
import ClaimsTable from "~/components/ClaimsTable";


export default function MainPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-sm text-gray-400 text-center">
        <h1 className="text-lg font-bold mb-4">Claims Data Upload</h1>
        <FileUpload />
        <div className="mt-6 w-full">
          <ClaimsTable />
        </div>
    </div>
  );
}
