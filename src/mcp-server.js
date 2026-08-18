#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createHealthServer } from "./create-health-server.js";

const server = createHealthServer();
const transport = new StdioServerTransport();

await server.connect(transport);
