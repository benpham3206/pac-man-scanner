import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const sourcePath = process.argv[2] ?? new URL("./pacman3d.html", import.meta.url);
const source = readFileSync(sourcePath, "utf8");
const mazeMatch = source.match(/const maze = (\[[\s\S]*?\n\s{12}\]);/);
const cellSizeMatch = source.match(/const cellSize = (\d+);/);
const registrationStart = source.indexOf("scene.add(pellet);");
const registrationEnd = source.indexOf("\n                        }", registrationStart);
const collectionStart = source.indexOf("pelletMeshes.forEach(p => {");
const collectionEnd = source.indexOf("\n\n                    // Ghost AI", collectionStart);
const beginMatch = source.match(/onClick=\{(\(\) => setGameState\('playing'\))\}/);
const runOptions = { timeout: 100, contextCodeGeneration: { strings: false, wasm: false } };

assert.ok(mazeMatch, "maze definition is present");
assert.ok(cellSizeMatch, "cell size is present");
assert.ok(registrationStart >= 0 && registrationEnd > registrationStart, "pellet registration is present");
assert.ok(collectionStart >= 0 && collectionEnd > collectionStart, "pellet collection and win check are present");
assert.ok(beginMatch, "BEGIN starts the game");

const maze = JSON.parse(mazeMatch[1]);
const cellSize = Number(cellSizeMatch[1]);
const pellets = [];
const pelletMeshes = [];
const colliders = [];
const scene = { remove() {} };
const registrationBody = source.slice(registrationStart + "scene.add(pellet);".length, registrationEnd);
const registerPellet = new vm.Script(`(function () { let pelletCount = 0; ${registrationBody}; return pelletCount; })()`);
let pelletCount = 0;

for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
        if (maze[row][col] !== 2 && maze[row][col] !== 3) continue;

        const pellet = {
            position: {
                x: col * cellSize - (maze[0].length * cellSize) / 2,
                y: 1.2,
                z: row * cellSize - (maze.length * cellSize) / 2
            },
            userData: {
                id: `${row}-${col}`,
                points: maze[row][col] === 3 ? 50 : 10,
                isPower: maze[row][col] === 3,
                collected: false
            }
        };
        pellets.push(pellet);
        pelletCount += registerPellet.runInNewContext(
            { pellet, scene, colliders, pelletMeshes },
            runOptions
        );
    }
}

const collectionStep = source.slice(collectionStart, collectionEnd);
const collectionScript = new vm.Script(`(function () { ${collectionStep} }).call(this);`);
const context = {
    pelletMeshes,
    pelletCount,
    camera: { position: { x: 0, z: 0 } },
    state: { score: 0, pelletsCollected: 0 },
    gameState: "menu",
    setScore() {},
    setPelletsCollected() {},
    gameDataRef: {
        current: {
            collectedPellets: new Set(),
            playerPos: { x: 0, z: 0 },
            playerRotation: 0
        }
    },
    fadeOutPellet() {},
    colliders,
    scene,
    ghosts: [],
    playPowerPelletSound() {},
    playPelletSound() {},
    document: { pointerLockElement: null },
    setGameState: next => { context.gameState = next; }
};

const begin = new vm.Script(beginMatch[1]).runInNewContext(
    { setGameState: next => { context.gameState = next; } },
    runOptions
);
begin();
assert.equal(context.gameState, "playing");

for (const pellet of pellets) {
    context.camera.position.x = pellet.position.x;
    context.camera.position.z = pellet.position.z;
    collectionScript.runInNewContext(context, runOptions);
}

assert.equal(context.state.pelletsCollected, pellets.length);
assert.equal(context.gameState, "win", "collecting every maze pellet shows the win screen");
assert.equal(pelletCount, pellets.length, "each maze pellet contributes once to the win target");

process.stdout.write(
    `PASS: BEGIN -> collect ${pellets.length} unique maze pellets; ` +
    `counter ${context.state.pelletsCollected}/${pelletCount}; gameState=${context.gameState}.\n`
);
