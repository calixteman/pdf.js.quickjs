mergeInto(LibraryManager.library, {
  sendToWindow: function(ptr) {
    const string = UTF8ToString(ptr);
    const data = window.JSON.parse(string);
    if (data === undefined || data === null) {
      return;
    }
    const event = new window.CustomEvent("updateFromSandbox", { detail: data });
    window.dispatchEvent(event);
  },
  $timeout__postset: "timeout();",
  $timeout: function() {
    class Timeout {
      constructor() {
        this.ids = new Set();
      }

      set(ptr, millisecs) {
        const string = UTF8ToString(ptr);
        const id = window.setTimeout(() => {
          const cString = stringToNewUTF8(string);
          _eval(cString);
          _free(cString);
        }, millisecs);
        this.ids.add(id);
        return id;
      }

      clear(id) {
        if (this.ids.has(id)) {
          window.clearTimeout(id);
          this.ids.delete(id);
        }
      }
    }

    const inst = new Timeout();
    _setTimeout = inst.set.bind(inst);
    _clearTimeout = inst.clear.bind(inst);
  },
  setTimeout: function() {},
  setTimeout__deps: ["$timeout", "$stringToNewUTF8"],
  clearTimeout: function() {},
  clearTimeout__deps: ["$timeout"],
  $interval__postset: "interval();",
  $interval: function() {
    class Interval {
      constructor() {
        this.ids = new Set();
      }

      set(ptr, millisecs) {
        const string = UTF8ToString(ptr);
        const id = window.setInterval(() => {
          const cString = stringToNewUTF8(string);
          _eval(cString);
          _free(cString);
        }, millisecs);
        this.ids.add(id);
        return id;
      }

      clear(id) {
        if (this.ids.has(id)) {
          window.clearInterval(id);
          this.ids.delete(id);
        }
      }
    }

    const inst = new Interval();
    _setInterval = inst.set.bind(inst);
    _clearInterval = inst.clear.bind(inst);
  },
  setInterval: function() {},
  setInterval__deps: ["$interval", "$stringToNewUTF8"],
  clearInterval: function() {},
  clearInterval__deps: ["$interval"],
  crackURL: function(ptr) {
    let result;
    try {
      const url = new window.URL(UTF8ToString(ptr));
      result = window.JSON.stringify({
        "cScheme": url.protocol,
        "cUser": "",
        "cPassword": "",
        "cHost": url.hostname,
        "cPort": url.port,
        "cPath": url.pathname,
        "cParameters": url.search,
        "cFragments": url.frag,
      });
    } catch (error) {
      result = error.message;
    }
    return stringToNewUTF8(result);
  },
  crackURL__deps: ["$stringToNewUTF8"],
  debugMe: function(ptr) {
    const string = UTF8ToString(ptr);
    let data;
    try {
      data = window.JSON.parse(string);
    } catch (_) {
      data = string;
    }
    window.console.log("DEBUGME", data);
  }
});
