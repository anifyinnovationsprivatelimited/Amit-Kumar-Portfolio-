import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const buildCommand =
  process.platform === "win32"
    ? { command: "cmd.exe", args: ["/d", "/s", "/c", "npm run build"] }
    : { command: "npm", args: ["run", "build"] };

console.log("Starting Vercel production build...");

function hasLocalSiteUrl() {
  return [".env.local", ".env"].some((file) => {
    if (!existsSync(file)) {
      return false;
    }

    return /^(SITE_URL|NEXT_PUBLIC_SITE_URL)=.+/m.test(readFileSync(file, "utf8"));
  });
}

if (!process.env.SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL && !process.env.VERCEL_URL && !hasLocalSiteUrl()) {
  console.log(
    "Notice: SITE_URL is not set. Vercel will still build, but metadata, robots, and sitemap will use the default fallback URL.",
  );
}

const build = spawnSync(buildCommand.command, buildCommand.args, {
  stdio: "inherit",
  shell: false,
});

if (build.error) {
  console.error(build.error.message);
  process.exit(1);
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

console.log("Vercel production build completed.");
