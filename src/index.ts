import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync, readdirSync, statSync, Dirent } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import toml from "toml";
import { z } from "zod";

interface CargoToml {
  dependencies?: Record<string, string | { version?: string; path?: string }>;
}

interface ExampleNode {
  name: string;
  path: string;
  children?: ExampleNode[];
  isFile: boolean;
}

function getBevyVersion(): string | null {
  const cargoPath = join(process.cwd(), "Cargo.toml");
  const cargoToml: CargoToml = toml.parse(readFileSync(cargoPath, "utf-8"));
  const dep = cargoToml.dependencies?.bevy;

  if (typeof dep === "string") return dep.replace(/["^~]/g, "");
  if (typeof dep === "object" && dep.path) return dep.path;
  if (typeof dep === "object" && dep.version)
    return dep.version.replace(/["^~]/g, "");
  return null;
}

function findBevySourceDir(bevyVersion: string | null): string | null {
  if (!bevyVersion) return null;

  if (bevyVersion.startsWith(".")) {
    return join(process.cwd(), bevyVersion);
  }

  const cargoSrc = join(homedir(), ".cargo/registry/src");
  const registries: string[] = readdirSync(cargoSrc);
  for (const reg of registries) {
    const bevyDir = join(cargoSrc, reg, `bevy-${bevyVersion}`);
    try {
      if (statSync(bevyDir).isDirectory()) return bevyDir;
    } catch {}
  }
  return null;
}

function buildExampleTree(dir: string): ExampleNode[] {
  const entries: Dirent[] = readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() || e.name.endsWith(".rs"))
    .map((e) => {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        return {
          name: e.name,
          path: p,
          isFile: false,
          children: buildExampleTree(p),
        };
      } else {
        return { name: e.name, path: p, isFile: true };
      }
    });
}

function readExampleFile(filePath: string, maxLines = 200): string {
  try {
    const content = readFileSync(filePath, "utf-8");
    return content.split("\n").slice(0, maxLines).join("\n");
  } catch (e: any) {
    return `Error reading file: ${e.message}`;
  }
}

const package_json = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../package.json"),
    "utf-8",
  ),
);
const { name, version, description } = package_json;

const server = new McpServer({
  name,
  version,
  description,
  capabilities: {
    resources: {
      subscribe: true,
      listChanged: true,
    },
  },
});

server.registerTool(
  "bevy-examples",
  {
    description: "Bevy example file tree",
  },
  () => {
    const ver = getBevyVersion();
    const srcDir = findBevySourceDir(ver);
    if (!srcDir) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ version: ver ?? "unknown", tree: [] }),
          },
        ],
      };
    }
    const examplesDir = join(srcDir, "examples");
    const tree = buildExampleTree(examplesDir);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ version: ver ?? "unknown", tree }),
        },
      ],
    };
  },
);

server.registerTool(
  "bevy-example-read",
  {
    description: "Read a specific Bevy example file",
    inputSchema: { path: z.string().nonempty().describe("path") },
  },
  ({ path }) => ({
    content: [
      {
        type: "text",
        text: `\`\`\`rust\n${readExampleFile(path)}\n\`\`\``,
      },
    ],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
