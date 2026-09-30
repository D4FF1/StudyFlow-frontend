window.StudyFlowStorage = (() => {
  const key = 'studyflow-v1';

  function read(fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function clear() {
    localStorage.removeItem(key);
    localStorage.removeItem('studyflow-timer');
  }

  function readTimer() {
    try { return JSON.parse(localStorage.getItem('studyflow-timer')); } catch (error) { return null; }
  }

  function writeTimer(value) {
    try { localStorage.setItem('studyflow-timer', JSON.stringify(value)); return true; } catch (error) { return false; }
  }

  function clearTimer() {
    localStorage.removeItem('studyflow-timer');
  }

  return { key, read, write, clear, readTimer, writeTimer, clearTimer };
})();
