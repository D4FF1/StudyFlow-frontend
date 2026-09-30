window.StudyFlowFocus = {
  timerKey: 'studyflow-timer',
  read() { return window.StudyFlowStorage.readTimer(); },
  clear() { window.StudyFlowStorage.clearTimer(); }
};