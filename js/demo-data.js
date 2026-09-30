window.StudyFlowDemoData = {
  plannerSessions: [
    { id: 'demo-laravel', date: '2024-09-30', title: 'Laravel practice', subject: 'Web Development', start: '09:00', end: '09:45' },
    { id: 'demo-networking', date: '2024-10-01', title: 'Networking', subject: 'Networking', start: '10:00', end: '10:45' },
    { id: 'demo-math', date: '2024-10-03', title: 'Math review', subject: 'Mathematics', start: '15:30', end: '16:20' },
    { id: 'demo-focus', date: '2024-10-04', title: 'Deep focus', subject: 'Cybersecurity', start: '19:00', end: '19:45' }
  ],
  clone(value) {
    return JSON.parse(JSON.stringify(value));
  }
};
