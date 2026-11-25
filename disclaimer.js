/* ULEP | Disclaimer pop-up.
   Shown every time the tools open (body has data-disclaimer="auto"), unless the
   person ticked "Don't remind me again". Any "Disclaimer" link in a footer
   ([data-open-disclaimer]) opens it again on any page, and lets people change
   their mind about the tick box. */
(function () {
    'use strict';

    var KEY = 'ulep-disclaimer-hidden';

    function stored() {
        try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
    }
    function save(on) {
        try {
            if (on) localStorage.setItem(KEY, '1');
            else localStorage.removeItem(KEY);
        } catch (e) { /* storage blocked: the pop-up simply shows each time */ }
    }

    var dlg = document.createElement('dialog');
    dlg.className = 'ud-dialog';
    dlg.setAttribute('aria-labelledby', 'udTitle');
    dlg.innerHTML =
        '<div class="ud-head">' +
            '<h2 id="udTitle">Before you use ULEP</h2>' +
            '<p>A quick read. It only takes a moment.</p>' +
        '</div>' +
        '<ul class="ud-list">' +
            '<li><strong>A student project</strong><span>ULEP is an educational website. It gives you a simple way to explore basic digital image editing and learn how images are processed.</span></li>' +
            '<li><strong>Results may vary</strong><span>Results depend on the original image and the settings you choose. Resizing and compression may affect image quality.</span></li>' +
            '<li><strong>Your images</strong><span>Make sure you have permission to use any image you upload. Avoid uploading private or sensitive images.</span></li>' +
            '<li><strong>Not professional software</strong><span>ULEP is meant for learning. It is not a substitute for professional image-editing software.</span></li>' +
        '</ul>' +
        '<div class="ud-foot">' +
            '<label class="ud-check"><input type="checkbox" id="udHide"><span>Don\u2019t remind me again</span></label>' +
            '<button type="button" class="ud-ok" id="udOk">I understand</button>' +
        '</div>';
    document.body.appendChild(dlg);

    var hide = dlg.querySelector('#udHide');
    var ok = dlg.querySelector('#udOk');
    var opener = null;

    function open() {
        if (dlg.open) return;
        opener = document.activeElement;
        hide.checked = stored();
        if (dlg.showModal) dlg.showModal();
        else dlg.setAttribute('open', '');
        ok.focus();
    }

    function finish() {
        save(hide.checked);
        if (dlg.close) dlg.close();
        else dlg.removeAttribute('open');
        if (opener && opener.focus) { try { opener.focus(); } catch (e) {} }
    }

    ok.addEventListener('click', finish);
    /* Escape closes it too, and counts as having read it */
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); finish(); });

    Array.prototype.forEach.call(document.querySelectorAll('[data-open-disclaimer]'), function (b) {
        b.addEventListener('click', open);
    });

    window.ulepDisclaimer = { open: open };

    if (document.body.getAttribute('data-disclaimer') === 'auto' && !stored()) open();
})();
