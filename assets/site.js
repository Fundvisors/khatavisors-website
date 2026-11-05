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
