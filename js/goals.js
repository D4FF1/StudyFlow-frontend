window.StudyFlowGoals = {
  progress(goal) { return Math.round(goal.milestones.filter(milestone => milestone[1]).length / Math.max(goal.milestones.length, 1) * 100); },
  toggleMilestone(goal, index) { goal.milestones[index][1] = !goal.milestones[index][1]; goal.progress = this.progress(goal); return goal; }
};