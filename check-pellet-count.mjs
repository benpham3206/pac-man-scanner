import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("./pacman3d.html", import.meta.url), "utf8");
const start = source.indexOf("scene.add(pellet);");
const end = source.indexOf("\n                scene.add(wallInstanced);", start);

assert.ok(start >= 0 && end > start, "maze pellet setup is present");

const setup = source.slice(start, end);
const meshRegistrations = setup.match(/pelletMeshes\.push\(pellet\);/g) ?? [];
const countIncrements = setup.match(/pelletCount\+\+;/g) ?? [];

assert.equal(meshRegistrations.length, 1, "each maze pellet is added to pelletMeshes once");
assert.equal(countIncrements.length, 1, "each maze pellet increments pelletCount once");

process.stdout.write("PASS: each maze pellet is registered and counted once.\n");
