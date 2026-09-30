window.StudyFlowAnalytics = {
  studyMinutes(sessions) {
    return sessions.reduce((total, session) => total + (session.completed ? Math.max(0, Number(session.duration) || 0) : 0), 0);
  },
  completionRate(tasks) {
    return tasks.length ? Math.round(tasks.filter(task => task.done).length / tasks.length * 100) : 0;
  },
  completed(tasks) { return tasks.filter(task => task.done).length; },
  upcomingDeadlines(tasks, utils = window.StudyFlowUtils) {
    return tasks.filter(task => {
      if (task.done) return false;
      const days = utils.daysUntilDeadline(task.due);
      return days !== null && days >= 0 && days <= 7;
    }).length;
  },
  lastSevenDays(sessions, today = new Date(), utils = window.StudyFlowUtils) {
    return Array.from({ length: 7 }, (_, index) => utils.addDays(today, index - 6)).map(date => {
      const key = utils.dateKey(date);
      const minutes = sessions.reduce((total, session) => {
        if (!session.completed || !session.startedAt) return total;
        const sessionDate = new Date(session.startedAt);
        return utils.dateKey(sessionDate) === key ? total + (Number(session.duration) || 0) : total;
      }, 0);
      return { date, key, minutes };
    });
  },
  topSubject(sessions) {
    const counts = sessions.reduce((result, session) => {
      if (session.completed && session.subject) result[session.subject] = (result[session.subject] || 0) + (Number(session.duration) || 0);
      return result;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No study data';
  },
  bestFocusWindow(sessions) {
    const counts = sessions.reduce((result, session) => {
      if (!session.completed || !session.startedAt) return result;
      const hour = new Date(session.startedAt).getHours();
      result[hour] = (result[hour] || 0) + (Number(session.duration) || 0);
      return result;
    }, {});
    const hour = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    return hour === undefined ? 'No study data' : `${String(Number(hour)).padStart(2, '0')}:00-${String((Number(hour) + 1) % 24).padStart(2, '0')}:00`;
  },
  studyStreak(sessions, today = new Date(), utils = window.StudyFlowUtils) {
    const studyDays = new Set(sessions.filter(session => session.completed && session.startedAt && Number(session.duration) > 0)
      .map(session => utils.dateKey(new Date(session.startedAt))));
    let streak = 0;
    let date = today;
    while (studyDays.has(utils.dateKey(date))) {
      streak += 1;
      date = utils.addDays(date, -1);
    }
    return streak;
  }
};