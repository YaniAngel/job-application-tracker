// src/types.ts

export interface JobApplication {
    id: string;
    company: string;
    position: string;
    link: string;
    dateApplied: string;
    status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
    notes: string;
  }
  