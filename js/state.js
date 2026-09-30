window.StudyFlowState = (() => {
  let current = null;

  function initialize(defaults) {
    const saved = window.StudyFlowStorage.read({});
    current = { ...defaults, ...saved };
    return current;
  }

  function get() {
    return current;
  }

  function update(patch) {
    current = { ...current, ...patch };
    return current;
  }

  function persist() {
    return window.StudyFlowStorage.write(current);
  }

  return { initialize, get, update, persist };
})();
