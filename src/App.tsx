import React, { useState, useEffect } from 'react';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import ExportButton from './components/ExportButton';
import FilterBar from './components/FilterBar';
import { getApplications, saveApplications } from './utils/storage';
import { JobApplication } from './types';


export interface JobApplication {
  id: string;
  company: string;
  position: string;
  link: string;
  dateApplied: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  notes: string;
}

const App: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    const storedApps = getApplications();
    setApplications(storedApps);
  }, []);

  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  const addApplication = (app: JobApplication) => {
    setApplications([...applications, app]);
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const updateApplication = (updatedApp: JobApplication) => {
    setApplications(applications.map(app => (app.id === updatedApp.id ? updatedApp : app)));
  };

  const filteredApplications = filterStatus === 'All'
    ? applications
    : applications.filter(app => app.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Job Application Tracker</h1>

        <ApplicationForm addApplication={addApplication} />
        <FilterBar setFilterStatus={setFilterStatus} />
        <ApplicationList 
          applications={filteredApplications} 
          deleteApplication={deleteApplication} 
          updateApplication={updateApplication} 
        />
        <ExportButton applications={applications} />
      </div>
    </div>
  );
};

export default App;
