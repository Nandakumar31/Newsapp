export function debounce(fn, delay = 400) {
  let timeout;

  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
