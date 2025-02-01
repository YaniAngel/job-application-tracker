// utils/storage.ts

// Function to retrieve applications from localStorage
export const getApplications = () => {
    const data = localStorage.getItem('jobApplications');
    return data ? JSON.parse(data) : [];  // Return parsed data or an empty array if no data exists
  };
  
  // Function to save applications to localStorage
  export const saveApplications = (applications: any[]) => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));  // Convert applications array to JSON and save
  };
  
  // Function to clear all applications from localStorage
  export const clearApplications = () => {
    localStorage.removeItem('jobApplications');  // Remove the jobApplications key from localStorage
  };
  