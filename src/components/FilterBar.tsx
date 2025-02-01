// components/FilterBar.tsx
import React from 'react';

// Define the props interface for FilterBar
interface FilterBarProps {
  setFilterStatus: (status: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setFilterStatus }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      {/* Button to show all applications */}
      <button
        onClick={() => setFilterStatus('All')}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        All
      </button>

      {/* Button to filter applications by 'Applied' status */}
      <button
        onClick={() => setFilterStatus('Applied')}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Applied
      </button>

      {/* Button to filter applications by 'Interviewing' status */}
      <button
        onClick={() => setFilterStatus('Interviewing')}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
      >
        Interviewing
      </button>

      {/* Button to filter applications by 'Offer' status */}
      <button
        onClick={() => setFilterStatus('Offer')}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Offer
      </button>

      {/* Button to filter applications by 'Rejected' status */}
      <button
        onClick={() => setFilterStatus('Rejected')}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Rejected
      </button>
    </div>
  );
};

export default FilterBar;
