// Seamless infinite marquee.
//
// The CSS animates the track from translateX(0) to translateX(-50%). For that
// to loop with NO visible jump, the track must contain exactly two identical
// copies of the content (so the second copy occupies the first copy's starting
// position at the moment the animation resets). Rather than hand-duplicate the
// markup, this script clones each row's [data-marquee-content] group once and
// marks the clone aria-hidden (so screen readers don't read it twice).
//
// Pause-on-hover is pure CSS (.marquee:hover .marquee-track { animation-play-state: paused }).
// This JS only sets up the duplication and a small status read-out so the
// behaviour is observable/testable.

(function () {
  const status = document.getElementById('status')
  const marquees = Array.from(document.querySelectorAll('.marquee'))

  marquees.forEach((marquee) => {
    const track = marquee.querySelector('.marquee-track')
    const original = track.querySelector('[data-marquee-content]')
    if (!original) return
    const clone = original.cloneNode(true)
    clone.setAttribute('aria-hidden', 'true')
    clone.removeAttribute('data-marquee-content')
    track.appendChild(clone)
  })

  function report() {
    // Report whether each row is currently running or paused (observable state).
    const states = marquees.map((m) => {
      const t = m.querySelector('.marquee-track')
      return getComputedStyle(t).animationPlayState
    })
    status.textContent = 'status: rows=' + marquees.length +
      ' | groups/row=2 (original+clone) | play-state=[' + states.join(', ') + ']'
  }
  report()
  // Update the read-out on hover in/out so pause is observable.
  marquees.forEach((m) => {
    m.addEventListener('pointerenter', report)
    m.addEventListener('pointerleave', () => setTimeout(report, 0))
  })
})()
