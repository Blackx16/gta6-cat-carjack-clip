// Entry for make.fun's gta6-clipper-01 bounty: "the car came with a cat".
// The entry itself is a YouTube Short cut from a GTA 6 launch-day moment; this program only hands the grader the
// address of that video. It reads VIDEO.json from the repository, makes sure it really names one YouTube video,
// and writes the very same bytes to the output directory. Standard library only, no network, no clock.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function stop(why: string): never {
  console.error(`gta6-cat-carjack-clip: ${why}`);
  process.exit(1);
}

// A YouTube video id is 11 characters from A-Z, a-z, 0-9, "-" and "_".
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

// Returns the id a YouTube address names, or null when it names none.
function youtubeId(address: string): string | null {
  let url: URL;
  try {
    url = new URL(address);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.replace(/^(www\.|m\.)/, '');
  let id = '';
  if (host === 'youtube.com' && url.pathname.startsWith('/shorts/')) {
    id = url.pathname.slice('/shorts/'.length).split('/')[0];
  } else if (host === 'youtube.com' && url.pathname === '/watch') {
    id = url.searchParams.get('v') ?? '';
  } else if (host === 'youtu.be') {
    // The Share button's short address: https://youtu.be/<id>, sometimes with ?si=... after it.
    id = url.pathname.slice(1).split('/')[0];
  }
  return VIDEO_ID.test(id) ? id : null;
}

const source = join(botDir, 'VIDEO.json');
let bytes: Buffer;
try {
  bytes = readFileSync(source);
} catch (err) {
  stop(`cannot read ${source}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(bytes.toString('utf8'));
} catch (err) {
  stop(`VIDEO.json is not JSON: ${(err as Error).message}`);
}

const address = (parsed as { url?: unknown } | null)?.url;
if (typeof address !== 'string') stop('VIDEO.json must be {"url": "<the clip on YouTube>"}');
if (youtubeId(address) === null) stop(`VIDEO.json names no YouTube video: ${address}`);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), bytes);
