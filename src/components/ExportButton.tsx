import React from 'react';
import { JobApplication } from '../types';
import { exportToCSV, exportToJSON } from '../utils/export';

// Define the props interface for ExportButton
interface ExportButtonProps {
  applications: JobApplication[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ applications }) => {
  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => exportToCSV(applications)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Export as CSV
      </button>
      <button
        onClick={() => exportToJSON(applications)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Export as JSON
      </button>
    </div>
  );
};

export default ExportButton;
