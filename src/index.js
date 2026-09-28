
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function validate(value, rules = {}) {
  const errors = [];
  const s = value == null ? "" : String(value);
  if (rules.required && !s) errors.push("required");
  if (rules.min != null && s.length < rules.min) errors.push("min");
  if (rules.max != null && s.length > rules.max) errors.push("max");
  if (rules.pattern && !new RegExp(rules.pattern).test(s)) errors.push("pattern");
  return { ok: errors.length === 0, errors, value: s };
}
function run(argv) {
  const value = argv[0] || "ok";
  const min = Number(argv[1] || 1);
  return JSON.stringify(validate(value, { required: true, min }), null, 2);
}

module.exports = { readInput, validate, run };
