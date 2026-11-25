/* Tutorial video on the About page.
   Plays by itself, muted, and loops. There is no pause or controls: the only
   button is the sound toggle. */
(function () {
    'use strict';

    var video = document.getElementById('tutorialVideo');
    var btn = document.getElementById('videoMute');
    var label = document.getElementById('videoMuteText');
    if (!video || !btn) return;

    function paint() {
        var muted = video.muted;
        btn.setAttribute('aria-pressed', muted ? 'true' : 'false');
        btn.setAttribute('aria-label', muted ? 'Turn the video sound on' : 'Turn the video sound off');
        label.textContent = muted ? 'Sound off' : 'Sound on';
    }

    function play() {
        var p = video.play();
        if (p && p.catch) p.catch(function () { /* autoplay refused: the next tap starts it */ });
    }

    btn.addEventListener('click', function () {
        video.muted = !video.muted;
        if (video.paused) play();
        paint();
    });

    /* if a browser still holds the video back, start it on the first touch or click */
    document.addEventListener('pointerdown', function () { if (video.paused) play(); }, { once: true });

    paint();
    play();
})();
