# Site Generator Speed — a fast makefun-site drop-in

An entry for the make.fun bounty
[site-generator-speed-01](https://make.fun/bounty/site-generator-speed-01-run-20261122):
a dependency-free `solve.js` whose `run(input)` returns exactly the output tree
makefun-site 1.0.0 builds for a site — byte for byte — in a fraction of the CPU time.

[![make.fun bounty](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/btcrugpul/sitegen-speed/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/btcrugpul/sitegen-speed/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)

How it is faster: templates are compiled once into plain JavaScript functions
instead of being tree-walked per page, Markdown is lexed and rendered in a
single pass over the lines, and the slug and HTML-escape helpers carry fast
paths for plain-ASCII text. `main.ts` is the harness driver: it reads
`/input/cases.json` and writes `/output/answers.json`.
