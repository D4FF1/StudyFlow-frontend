window.StudyFlowNavigation = {
  routes: ['dashboard', 'tasks', 'subjects', 'goals', 'planner', 'focus', 'analytics', 'notifications', 'settings'],
  go(route) {
    if (this.routes.includes(route) && typeof window.go === 'function') window.go(route);
  }
};