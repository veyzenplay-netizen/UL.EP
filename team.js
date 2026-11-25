/* ULEP | Team carousel (About page).
   One member at a time. Moves on by itself every few seconds and holds still
   while the pointer or keyboard focus is inside. Arrows, dots,
   swipe and the left / right keys all work. Autoplay stays off for people who
   prefer reduced motion. */
(function () {
    var root = document.getElementById('team');
    if (!root) return;

    var SLIDE_MS = 6000;

    var slides = Array.prototype.slice.call(root.querySelectorAll('.member'));
    var prevBtn = document.getElementById('teamPrev');
    var nextBtn = document.getElementById('teamNext');
    var dotsBox = document.getElementById('teamDots');
    var live = document.getElementById('teamSlides');

    var current = 0;
    var timer = 0;
    var userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hovering = false;

    var dots = slides.map(function (slide, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.setAttribute('aria-label', 'Show ' + slide.querySelector('h3').textContent);
        d.addEventListener('click', function () { go(i); });
        dotsBox.appendChild(d);
        return d;
    });

    function paint() {
        slides.forEach(function (s, i) {
            s.classList.toggle('is-active', i === current);
            s.setAttribute('aria-hidden', i === current ? 'false' : 'true');
        });
        dots.forEach(function (d, i) {
            if (i === current) d.setAttribute('aria-current', 'true');
            else d.removeAttribute('aria-current');
        });
    }

    function stop() { clearInterval(timer); timer = 0; }

    function start() {
        stop();
        if (userPaused || hovering || document.hidden) return;
        timer = setInterval(function () { go(current + 1, true); }, SLIDE_MS);
    }

    function go(i, auto) {
        current = (i + slides.length) % slides.length;
        paint();
        if (!auto) start();      // restart the countdown after a manual move
    }

    prevBtn.addEventListener('click', function () { go(current - 1); });
    nextBtn.addEventListener('click', function () { go(current + 1); });

    root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') go(current - 1);
        else if (e.key === 'ArrowRight') go(current + 1);
    });

    root.addEventListener('mouseenter', function () { hovering = true; stop(); });
    root.addEventListener('mouseleave', function () { hovering = false; start(); });
    root.addEventListener('focusin', function () { hovering = true; stop(); });
    root.addEventListener('focusout', function () { hovering = false; start(); });
    document.addEventListener('visibilitychange', start);

    /* swipe on phones */
    var startX = null, startY = null;
    root.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    root.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        startX = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) go(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    live.setAttribute('aria-live', 'off');
    paint();
    start();
})();
