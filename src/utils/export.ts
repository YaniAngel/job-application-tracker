import { JobApplication } from '../types';
import { unparse } from 'papaparse';

export const exportToCSV = (applications: JobApplication[]) => {
  const csv = unparse(applications);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'job_applications.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (applications: JobApplication[]) => {
  const json = JSON.stringify(applications, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'job_applications.json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
