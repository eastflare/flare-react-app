//Ref: https://dev.to/rajeshroyal/reactjs-disable-consolelog-in-production-and-staging-3l38

export const PrintDebug = (function () {
  let savedConsole = console;

  /**
   * @param {boolean} showDebug
   * @param {boolean | undefined} suppressAll
   */

  return function ({
    isPrintLog,
    isPrintInfoWarnError = false,
  }: {
    isPrintLog: boolean;
    isPrintInfoWarnError?: boolean;
  }) {
    if (isPrintLog) {
      console = savedConsole;
    } else {
      console = { ...console, log: function () {} };
      if (isPrintInfoWarnError) {
        console.info = savedConsole.info;
        console.warn = savedConsole.warn;
        console.error = savedConsole.error;
      } else {
        console.info = function () {};
        console.warn = function () {};
        console.error = function () {};
      }
    }
  };
})();
