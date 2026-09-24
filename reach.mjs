
import fs from "fs";
import path from "path";

const norm = (p) => p.split(path.sep).join("/");
const SRC = "src";
const all = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = norm(path.join(d, e.name));
    e.isDirectory() ? walk(p) : all.push(p);
  }
})(SRC);

const exts = ["", ".js", ".vue", ".css", "/index.js"];
const resolve = (from, spec) => {
  if (!spec.startsWith(".") && !spec.startsWith("@/")) return null;
  const base = spec.startsWith("@/")
    ? path.join(SRC, spec.slice(2))
    : path.join(path.dirname(from), spec);
  for (const e of exts) {
    const c = norm(base + e);
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
};

const RE = [
  /import\s+[^'"]*from\s*["']([^"']+)["']/g,
  /import\s*["']([^"']+)["']/g,
  /require\(\s*["']([^"']+)["']\s*\)/g,
  /url\(\s*["']?([^"')]+)["']?\s*\)/g,
  /(?:src|href)=["']([^"']+\.(?:svg|png|jpe?g|webp|gif))["']/g,
];

const seen = new Set();
const queue = ["src/main.js"];
while (queue.length) {
  const f = queue.pop();
  if (seen.has(f)) continue;
  seen.add(f);
  let txt;
  try { txt = fs.readFileSync(f, "utf8"); } catch { continue; }
  for (const re of RE) {
    for (const m of txt.matchAll(re)) {
      const r = resolve(f, m[1]);
      if (r && !seen.has(r)) queue.push(r);
    }
  }
}

const dead = all.filter((f) => !seen.has(f));
console.log("total " + all.length + " | hidup " + seen.size + " | mati " + dead.length);
console.log("\n--- HIDUP ---");
[...seen].sort().forEach((f) => console.log("  " + f));
console.log("\n--- MATI ---");
dead.forEach((f) => console.log("  " + f));
fs.writeFileSync("dead.txt", dead.join("\n"));
