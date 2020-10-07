mergeInto(LibraryManager.library, {
  sendToWindow: function(ptr) {
    const string = UTF8ToString(ptr);
    const data = JSON.parse(string);
    if (data === undefined || data === null) {
      return;
    }
    try {
      const event = new window.CustomEvent("updateFromSandbox", { detail: data });
      window.dispatchEvent(event);
    } catch (error) {}
  },
  setTimeout: function(ptr, millisecs) {
    const code = UTF8ToString(ptr);
    if (typeof window.setTimeOut !== "undefined") {
      return window.setTimeOut(code, millisecs);
    }
  },
  clearTimeout: function(id) {
    if (typeof window.clearTimeOut !== "undefined") {
      return window.clearTimeOut(id);
    }
  },
  setInterval: function(ptr, millisecs) {
    const code = UTF8ToString(ptr);
    if (typeof window.setInterval !== "undefined") {
      return window.setInterval(code, millisecs);
    }
  },
  clearInterval: function(id) {
    if (typeof window.clearInterval !== "undefined") {
      return window.clearInterval(id);
    }
  },
  crackURL: function(id) {
    if (typeof window.crackURL !== "undefined") {
      return window.crackURL(id);
    }
  },
  debugMe: function(ptr) {
    const string = UTF8ToString(ptr);
    console.log("DEBUGME", string);
  }
});
