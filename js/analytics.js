window.StudyFlowAnalytics = {
  completionRate(tasks) {
    return tasks.length ? Math.round(tasks.filter(task => task.done).length / tasks.length * 100) : 0;
  },
  completed(tasks) { return tasks.filter(task => task.done).length; },
  topSubject(tasks) {
    const counts = tasks.reduce((result, task) => { result[task.subject] = (result[task.subject] || 0) + 1; return result; }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No subject yet';
  }
};