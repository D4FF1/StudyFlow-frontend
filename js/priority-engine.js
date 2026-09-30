window.StudyFlowPriorityEngine = {
  factors(task) {
    const daysUntil = window.StudyFlowUtils?.daysUntilDeadline(task.due);
    const deadline = daysUntil === null
      ? 0
      : daysUntil < 0 ? 38
        : daysUntil === 0 ? 34
          : daysUntil === 1 ? 28
            : daysUntil <= 3 ? 20
              : daysUntil <= 7 ? 12 : 4;
    const importance = { High: 25, Medium: 16, Low: 8 }[task.priority] || 0;
    const difficulty = Math.min(Math.max(Number(task.difficulty) || 1, 1), 5) * 2;
    const progress = Math.round((100 - Math.min(Math.max(Number(task.progress) || 0, 0), 100)) * 0.12);
    const duration = (Number(task.estimate) || 45) <= 45 ? 8 : (Number(task.estimate) || 45) <= 90 ? 5 : 2;
    return { deadline, importance, difficulty, progress, duration };
  },
  score(task) {
    const factors = this.factors(task);
    return Math.min(100, Object.values(factors).reduce((total, value) => total + value, 0));
  },
  reasons(task) {
    const daysUntil = window.StudyFlowUtils?.daysUntilDeadline(task.due);
    const reasons = [];
    if (daysUntil !== null && daysUntil < 0) reasons.push('Overdue');
    else if (daysUntil === 0) reasons.push('Due today');
    else if (daysUntil !== null && daysUntil <= 2) reasons.push('Due soon');
    if (task.priority === 'High') reasons.push('High importance');
    if ((Number(task.progress) || 0) < 40) reasons.push('Low completion progress');
    if ((Number(task.estimate) || 45) <= 45) reasons.push('Fits a focused study block');
    if (!reasons.length) reasons.push('A balanced match for your current workload');
    return reasons;
  },
  recommend(tasks) {
    const candidates = tasks.filter(task => !task.done).slice().sort((a, b) => this.score(b) - this.score(a));
    const task = candidates[0] || null;
    return task
      ? { task, score: this.score(task), factors: this.factors(task), reasons: this.reasons(task) }
      : { task: null, score: 0, factors: {}, reasons: [] };
  }
};