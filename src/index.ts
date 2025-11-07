import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const package_json = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../package.json"),
    "utf-8",
  ),
);

const { name, version, description } = package_json;

const server = new McpServer({
  name: name,
  version: version,
  description: description,
  capabilities: {
    resources: {},
    tools: {},
  },
});
