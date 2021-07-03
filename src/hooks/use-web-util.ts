export function waitForEl(selector, callback) {
  var interval = setInterval(function () {
    var el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
  }, 100);
}
export function querySelectorAllClick(selector, event) {
  document.querySelectorAll(selector).forEach((e) => e.on("click", event(e)));
}
export function trimmedText(selector) {
  return document.querySelector(selector)?.text()?.trim() ?? null;
}
