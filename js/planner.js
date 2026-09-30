window.StudyFlowPlanner = {
  duration(session) {
    const [startHour, startMinute] = session.start.split(':').map(Number);
    const [endHour, endMinute] = session.end.split(':').map(Number);
    return endHour * 60 + endMinute - (startHour * 60 + startMinute);
  },
  validate(session) {
    if (!session.title || !session.date || !session.start || !session.end) return 'Add a title, date, start time, and end time.';
    if (session.end <= session.start) return 'End time must be later than start time.';
    return '';
  }
};