// The harness driver: node /bot/main.ts (node22) reads every case from /input/cases.json (a JSON array of
// {id, input}), answers each one with run() from solve.js, and writes /output/answers.json, a JSON array of
// the answers in the cases' order. Outside a container MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in
// for /input and /output. The solving itself lives in solve.js; this file only moves the JSON.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// The house baseline runs with V8's incremental marking off, set before solve.js is imported so all of its
// work runs under it; the rules allow an entry the same tuning, and a compiled-template renderer allocates
// many short-lived strings, so take it.
setFlagsFromString('--no-incremental-marking');

/** solve.js, imported by its URL (a .js module carries no types) and typed by its contract. */
const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as { run: (input: unknown) => unknown };

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as { id: string; input: unknown }[];
const answers: unknown[] = [];
for (const c of cases) answers.push(run(c.input));
writeFileSync(join(OUTPUT_DIR, 'answers.json'), JSON.stringify(answers));
