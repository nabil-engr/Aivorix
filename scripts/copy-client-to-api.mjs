import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "client/aivorix-web/dist/aivorix-web/browser");
const dst = path.join(root, "server/Aivorix.Api/wwwroot");
if (!fs.existsSync(src))
  throw new Error("Angular browser output not found: " + src);
fs.rmSync(dst, { recursive: true, force: true });
fs.mkdirSync(dst, { recursive: true });
fs.cpSync(src, dst, { recursive: true });
console.log("Copied Angular browser build to API wwwroot");
