const demoUtils = window.StudyFlowUtils;
const demoWeek = demoUtils.startOfWeek();

function demoDate(offset) {
  return demoUtils.dateKey(demoUtils.addDays(demoWeek, offset));
}

function demoStudySession(id, taskId, subject, daysAgo, duration, hour) {
  const startedAt = new Date();
  startedAt.setDate(startedAt.getDate() - daysAgo);
  startedAt.setHours(hour, 0, 0, 0);
  const endedAt = new Date(startedAt.getTime() + duration * 60000);
  return {
    id,
    taskId,
    subject,
    startedAt: startedAt.toISOString(),
    endedAt: endedAt.toISOString(),
    duration,
    completed: true
  };
}

window.StudyFlowDemoData = {
  plannerSessions: [
    { id: 'demo-laravel', date: demoDate(0), title: 'Laravel practice', subject: 'Web Development', start: '09:00', end: '09:45' },
    { id: 'demo-networking', date: demoDate(1), title: 'Networking', subject: 'Networking', start: '10:00', end: '10:45' },
    { id: 'demo-math', date: demoDate(3), title: 'Math review', subject: 'Mathematics', start: '15:30', end: '16:20' },
    { id: 'demo-focus', date: demoDate(4), title: 'Deep focus', subject: 'Cybersecurity', start: '19:00', end: '19:45' }
  ],
  studySessions: [
    demoStudySession('demo-study-1', 1, 'Web Development', 0, 45, 19),
    demoStudySession('demo-study-2', 2, 'Networking', 2, 30, 18),
    demoStudySession('demo-study-3', 3, 'Web Development', 3, 40, 20),
    demoStudySession('demo-study-4', 4, 'Cybersecurity', 5, 35, 19)
  ],
  clone(value) {
    return JSON.parse(JSON.stringify(value));
  }
};
