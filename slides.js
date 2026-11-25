/* ULEP | Menu pictures.
   Each tool card shows its pictures one after another with a soft fade. There are
   no buttons: they change on their own. The same picture also fades in behind the
   text, so both layers always show the same slide. A tool with one picture stays still. */
(function () {
    var HOLD_MS = 4500;

    var cards = document.querySelectorAll('.tool');
    Array.prototype.forEach.call(cards, function (card, n) {
        var front = Array.prototype.slice.call(card.querySelectorAll('.shot img'));
        var bgBox = card.querySelector('.tool-bg');
        if (!front.length || !bgBox) return;

        /* copy the pictures behind the text */
        var back = front.map(function (img, i) {
            var b = document.createElement('img');
            b.src = img.getAttribute('src');
            b.alt = '';
            if (i === 0) b.className = 'is-on';
            bgBox.appendChild(b);
            return b;
        });

        if (front.length < 2) return;

        var current = 0;
        function show(i) {
            front[current].classList.remove('is-on');
            back[current].classList.remove('is-on');
            current = i;
            front[current].classList.add('is-on');
            back[current].classList.add('is-on');
        }

        /* start each card a little apart so they do not all change together */
        setTimeout(function () {
            setInterval(function () {
                if (!document.hidden) show((current + 1) % front.length);
            }, HOLD_MS);
        }, n * 1400);
    });
})();
