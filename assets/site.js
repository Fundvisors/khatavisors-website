// KhataVisors website — shared behaviour for every page
(function () {
  // Phone menu
  var btn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Enterprise plan: monthly / yearly price
  var bills = [].slice.call(document.querySelectorAll('.bill button'));
  var amt = document.getElementById('pro-amt'), per = document.getElementById('pro-per'), note = document.getElementById('pro-note');
  var P = {
    month: ['₹599', '/month + GST', 'Or ₹6,499 a year, <span class="save">save ₹689</span>'],
    year: ['₹6,499', '/year + GST', 'About ₹542 a month, <span class="save">save ₹689</span>']
  };
  bills.forEach(function (b) {
    b.addEventListener('click', function () {
      bills.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var p = P[b.dataset.period];
      if (amt) { amt.textContent = p[0]; per.textContent = p[1]; note.innerHTML = p[2]; }
    });
  });
})();

// Scroll reveal, animated flow line and number count-up
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = [].slice.call(document.querySelectorAll('[data-reveal],[data-reveal-group],.flow,[data-count]'));
  function show(el) {
    el.classList.add('in');
    if (el.hasAttribute('data-count') && !el.dataset.done) {
      el.dataset.done = '1';
      var to = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '';
      if (reduce) { el.textContent = to + suffix; return; }
      var t0 = null, dur = 1200;
      (function step(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(to * e) + suffix;
        if (k < 1) requestAnimationFrame(step);
      })(performance.now());
    }
  }
  if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// Video: play button over the cover image
(function () {
  [].slice.call(document.querySelectorAll('.video-frame')).forEach(function (f) {
    var v = f.querySelector('video'), b = f.querySelector('.play');
    if (!v || !b) return;
    b.addEventListener('click', function () { v.setAttribute('controls', ''); b.remove(); v.play(); });
  });
})();
