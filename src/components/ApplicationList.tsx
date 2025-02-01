import React, { useState } from 'react';
import { JobApplication } from '../App';
import { v4 as uuidv4 } from 'uuid';

// Define the props interface for the ApplicationForm component
interface ApplicationFormProps {
  addApplication: (app: JobApplication) => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ addApplication }) => {
  // State hooks for form fields
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [link, setLink] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [status, setStatus] = useState<'Applied' | 'Interviewing' | 'Offer' | 'Rejected'>('Applied');
  const [notes, setNotes] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: JobApplication = {
      id: uuidv4(),  // Generate a unique ID for the application
      company,
      position,
      link,
      dateApplied,
      status,
      notes,
    };
    addApplication(newApplication);  // Add the new application to the list
    clearForm();  // Clear form fields after submission
  };

  // Function to reset form fields
  const clearForm = () => {
    setCompany('');
    setPosition('');
    setLink('');
    setDateApplied('');
    setStatus('Applied');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* Input fields for Company Name and Position Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Company Name" 
          value={company} 
          onChange={(e) => setCompany(e.target.value)} 
          required
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <input 
          type="text" 
          placeholder="Position Title" 
          value={position} 
          onChange={(e) => setPosition(e.target.value)} 
          required
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Input field for Job Offer Link */}
      <input 
        type="url" 
        placeholder="Job Offer Link" 
        value={link} 
        onChange={(e) => setLink(e.target.value)} 
        className="p-2 border border-gray-300 rounded-lg w-full"
      />

      {/* Input fields for Date Applied and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="date" 
          value={dateApplied} 
          onChange={(e) => setDateApplied(e.target.value)} 
          required
          className="p-2 border border-gray-300 rounded-lg w-full"
        />

        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value as JobApplication['status'])} 
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Textarea for Notes */}
      <textarea 
        placeholder="Notes" 
        value={notes} 
        onChange={(e) => setNotes(e.target.value)} 
        className="p-2 border border-gray-300 rounded-lg w-full"
        rows={3}
      />

      {/* Submit button to add the application */}
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Application
      </button>
    </form>
  );
};

export default ApplicationForm; 

// ApplicationList Component to display job applications
interface ApplicationListProps {
  applications: JobApplication[];
  deleteApplication: (id: string) => void;
  updateApplication: (app: JobApplication) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, deleteApplication, updateApplication }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      {/* Table to display applications */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Company</th>
            <th className="px-4 py-2 border-b">Position</th>
            <th className="px-4 py-2 border-b">Date Applied</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="text-center">
              <td className="px-4 py-2 border-b">{app.company}</td>
              <td className="px-4 py-2 border-b">{app.position}</td>
              <td className="px-4 py-2 border-b">{app.dateApplied}</td>
              <td className="px-4 py-2 border-b">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                  app.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' :
                  app.status === 'Offer' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status}
                </span>
              </td>
              <td className="px-4 py-2 border-b space-x-2">
                {/* Button to delete the application */}
                <button 
                  onClick={() => deleteApplication(app.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                {/* Button to edit the application (placeholder) */}
                <button 
                  onClick={() => updateApplication(app)} 
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ApplicationList };
