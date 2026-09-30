window.StudyFlowPlanner = {
  duration(session) {
    const [startHour, startMinute] = session.start.split(':').map(Number);
    const [endHour, endMinute] = session.end.split(':').map(Number);
    return endHour * 60 + endMinute - (startHour * 60 + startMinute);
  },
  validate(session, sessions = []) {
    if (!session.title || !session.date || !session.start || !session.end) return 'Add a title, date, start time, and end time.';
    if (session.end <= session.start) return 'End time must be later than start time.';
    if (session.start < '08:00' || session.end > '20:00') return 'Choose a time between 08:00 and 20:00.';
    if (sessions.some(existing => existing.id !== session.id && existing.date === session.date && session.start < existing.end && session.end > existing.start)) {
      return 'This session overlaps another study session.';
    }
    return '';
  }
};