window.StudyFlowPriorityEngine = {
  score(task) {
    const deadline = task.due === 'Today' ? 40 : task.due === 'Tomorrow' ? 27 : 12;
    const importance = { High: 30, Medium: 18, Low: 8 }[task.priority] || 0;
    return deadline + importance + Math.round((task.progress || 0) * 0.15) + ((task.difficulty || 1) * 3) - Math.min((task.estimate || 0) / 20, 5);
  },
  recommend(tasks) {
    const candidates = tasks.filter(task => !task.done).slice().sort((a, b) => this.score(b) - this.score(a));
    const task = candidates[0] || tasks[0];
    return task ? { task, score: Math.round(this.score(task)) } : { task: null, score: 0 };
  }
};