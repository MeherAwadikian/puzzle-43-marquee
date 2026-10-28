# Puzzle #43 — infinite auto-scrolling marquee (pauses on hover)

Brief (Task Forge puzzle tracker): infinite auto-scrolling marquee, pauses on hover — none/generic.

Two seamless, continuously-scrolling rows (opposite directions, different
speeds) that pause when you hover them. Three files, no dependencies.

## The real engineering: a seamless loop

A marquee that visibly jumps at the wrap point is the common failure. This one
loops with no jump:

- The track holds **two identical copies** of the content (the original group
  + a JS-cloned, `aria-hidden` duplicate so screen readers don't read it
  twice).
- CSS animates the track `translateX(0) → translateX(-50%)`. Because the track
  is exactly 2× one group's width, shifting by half lands the second copy
  precisely where the first began — the reset is invisible.
- **Pause-on-hover** is pure CSS: `.marquee:hover .marquee-track {
  animation-play-state: paused }`.
- Respects `prefers-reduced-motion` (animation off, row becomes a normal
  scroll container).

## Verified live (automated + real-cursor, in a browser)

Driven via claude-in-chrome — **8/8 checks**:

```
✓ each row duplicated to 2 groups
✓ cloned group is aria-hidden (not double-read)
✓ animation running by default
✓ track actually moving (transform changes over time)
✓ CSS hover-pause rule present
✓ prefers-reduced-motion handled
✓ track ≈ 2× group width → 1.999  (proves the -50% loop is seamless)
✓ real hover pauses ONLY the hovered row (play-state=[paused, running];
  hovered row's transform froze, other row kept moving)
```

The last check used a real mouse hover (synthetic events can't trigger CSS
`:hover`), confirming the hovered row freezes while the other keeps scrolling.

## Deploy

`wrangler.jsonc` included (static Worker). Public deploy pending the same
one-time `wrangler login` as puzzles #35/#39/#40. Works from any static host.
