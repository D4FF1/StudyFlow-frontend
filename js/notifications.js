window.StudyFlowNotifications = {
  unread(items) { return items.filter(item => !item.read); },
  markRead(items, index) { if (items[index]) items[index].read = true; return items; },
  markAllRead(items) { items.forEach(item => { item.read = true; }); return items; }
};