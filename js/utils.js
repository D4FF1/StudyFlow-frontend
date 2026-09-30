function localDate(value) {
  if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  if (isoDate) return new Date(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3]));
  return new Date(value);
}

function dateKey(date = new Date()) {
  const value = localDate(date);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
}

function addDays(date, amount) {
  const value = localDate(date);
  value.setDate(value.getDate() + amount);
  return value;
}

function startOfWeek(date = new Date(), offset = 0) {
  const value = localDate(date);
  value.setDate(value.getDate() - ((value.getDay() + 6) % 7) + offset * 7);
  return value;
}

function deadlineDate(value, today = new Date()) {
  if (!value) return null;
  if (value === 'Today') return localDate(today);
  if (value === 'Tomorrow') return addDays(today, 1);

  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
  if (isoDate) return localDate(value);

  const legacyDate = /(?:\w{3},?\s+)?([A-Za-z]{3})\s+(\d{1,2})(?:,\s*(\d{4}))?/.exec(String(value));
  if (!legacyDate) return null;
  const month = new Date(`${legacyDate[1]} 1, 2000`).getMonth();
  if (Number.isNaN(month)) return null;
  let year = Number(legacyDate[3]) || localDate(today).getFullYear();
  let parsed = new Date(year, month, Number(legacyDate[2]));
  if (!legacyDate[3] && dateKey(parsed) < dateKey(today)) parsed = new Date(year + 1, month, Number(legacyDate[2]));
  return parsed;
}

window.StudyFlowUtils = {
  clone(value) {
    return JSON.parse(JSON.stringify(value));
  },
  formatMinutes(minutes) {
    return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`;
  },
  formatTimer(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  },
  dateKey,
  addDays,
  startOfWeek,
  daysUntilDeadline(value, today = new Date()) {
    const deadline = deadlineDate(value, today);
    if (!deadline) return null;
    const difference = Date.UTC(deadline.getFullYear(), deadline.getMonth(), deadline.getDate())
      - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.round(difference / 86400000);
  },
  formatDate(value, options = { weekday: 'long', month: 'long', day: 'numeric' }) {
    return new Intl.DateTimeFormat(undefined, options).format(localDate(value));
  },
  formatDeadline(value, today = new Date()) {
    const days = this.daysUntilDeadline(value, today);
    if (days === null) return 'No deadline';
    if (days < 0) return `${Math.abs(days)} day${days === -1 ? '' : 's'} overdue`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return this.formatDate(deadlineDate(value, today), { weekday: 'short', month: 'short', day: 'numeric' });
  },
  weekDates(date = new Date(), offset = 0) {
    const start = startOfWeek(date, offset);
    return Array.from({ length: 7 }, (_, index) => addDays(start, index));
  },
  escape(value) {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }
};
