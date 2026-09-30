window.StudyFlowTasks = {
  create(task) { return window.state?.tasks.push(task); },
  find(id) { return window.state?.tasks.find(task => task.id === id); },
  complete(id) { const task = this.find(id); if (task) task.done = true; return task; },
  reopen(id) { const task = this.find(id); if (task) task.done = false; return task; },
  search(tasks, query) { return tasks.filter(task => `${task.title} ${task.subject}`.toLowerCase().includes(query.toLowerCase())); }
};