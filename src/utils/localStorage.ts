export function storage() {
  const prefix = "eaftrack";
  function name(name) {
    return [prefix, name].join("_");
  }
  function set(name, value) {
    localStorage.setItem(
      name(name),
      JSON.stringify({
        value: value,
      })
    );
  }
  function remove(name) {
    localStorage.removeItem(name(name));
  }
  function clear() {
    localStorage.clear();
  }
  function get(name) {
    let val = JSON.parse(localStorage.getItem(name(name)) ?? "{}");
    return val?.value;
  }
}
