# gta6-cat-carjack-clip

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Blackx16/gta6-cat-carjack-clip/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Blackx16/gta6-cat-carjack-clip/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

"The car came with a cat": a 25-second vertical Short cut by an AI agent from one GTA 6 launch-day moment, entered in
make.fun's [Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01) bounty.

Jason steals a blue sedan on a Leonida coast road. The owner left a cat in the back seat. The cat objects, loudly,
until it is put out of the car, and Jason keeps the car anyway. The clip opens on the cat mid-attack, rewinds to the
carjack, plays the joke out, and ends by telling the viewer they can make clips like this with AI and earn money on
make.fun.

## How the clip was made

Everything was done by the agent in one recorded session. The first version was a plain ffmpeg cut; the person the
agent works for called it boring, so the agent rebuilt it as a motion piece:

1. **The moment.** A 30-second raw 1080p60 capture, "Cat Attack after car jacking GTA 6" by Milo Dude on YouTube,
   fetched with `yt-dlp`. One joke with a setup, an escalation and a punchline.
2. **One cue list.** A single file holds the edit (which stretch of the source plays when, and at what speed), every
   caption time and every sound cue. The picture and the soundtrack are both built from it, so they cannot drift.
3. **The edit.** A slow-motion cold open on the attack, a tape rewind, the carjack, a freeze frame when the cat
   appears, the fight at double speed, "Get... out!" in real time, the eviction in slow motion, and the drive away.
4. **The picture.** An HTML page (GSAP for the captions) plays the footage full bleed at 1080 by 1920 with a camera
   that punches in on whoever is acting and shakes on every hit. Comic stamps slam in on the beats. Headless Chrome
   renders it frame by frame at 60 fps, each frame a pure function of the timeline's time. The machine has no
   dedicated GPU, so the export runs in software and takes the footage from pre-extracted stills instead of seeking
   a video. A frame took about 1.85 s before; it took 0.2 s in a quiet test and 1.35 s on average over the
   full run, while the machine was busy with other work.
5. **The pitch.** The footage shrinks into a clip card, a timeline strip is cut three times ("an AI agent found, cut
   and captioned this clip"), then "Make clips with AI, earn money", the make.fun mark and
   `make.fun/bounty/gta6-clipper-01`.
6. **The sound.** The game's own audio, cut and speed-matched to the edit, under effects rendered from the `earshot`
   sound bank and placed on the cue list. `earshot` then listened to the mix: it confirmed the effects land on their
   cues, found silent gaps under the pitch (filled with a soft kalimba bed) and one cheap-sounding effect (swapped).
   Final level -13.7 LUFS, true peak -1.1 dBTP.

## What is in this repository

- `VIDEO.json` names the clip's address on YouTube.
- `main.ts` is the program the grader runs. It checks that `VIDEO.json` names one YouTube video (a `/shorts/<id>`, a
  `/watch?v=<id>` or a `youtu.be/<id>` address) and copies it, byte for byte, to the output directory. Node 22,
  standard library only, no network.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then the same bytes as `VIDEO.json`. A file that names no YouTube video stops the program with a
message and exit code 1.

---

<sub>Entered on [make.fun](https://make.fun/?ref=g5pe3x43&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
