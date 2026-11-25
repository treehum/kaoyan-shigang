(function () {
  var html = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('sg-theme'); } catch (e) {}
  if (saved === 'dark' || saved === 'light') html.setAttribute('data-theme', saved);

  var btn = document.getElementById('themeBtn');
  if (btn) {
    var sync = function () {
      btn.textContent = html.getAttribute('data-theme') === 'dark' ? '浅色' : '深色';
    };
    sync();
    btn.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('sg-theme', next); } catch (e) {}
      sync();
    });
  }

  var menu = document.getElementById('menuBtn');
  var backdrop = document.getElementById('backdrop');
  function closeNav() { document.body.classList.remove('nav-open'); }
  if (menu) menu.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
  if (backdrop) backdrop.addEventListener('click', closeNav);
  document.querySelectorAll('.sidebar a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  var bar = document.getElementById('progress');
  var top = document.getElementById('toTop');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct.toFixed(2) + '%';
    if (top) top.classList.toggle('show', h.scrollTop > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (top) top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 给表格加横向滚动容器
  document.querySelectorAll('.content table').forEach(function (t) {
    if (t.parentElement && t.parentElement.classList.contains('table-wrap')) return;
    var w = document.createElement('div');
    w.className = 'table-wrap';
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });

  // 目录高亮
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (links.length) {
    var targets = links.map(function (a) {
      var id = decodeURIComponent(a.getAttribute('href').slice(1));
      return document.getElementById(id);
    });
    var spy = function () {
      var pos = window.scrollY + 120;
      var current = 0;
      targets.forEach(function (el, i) { if (el && el.offsetTop <= pos) current = i; });
      links.forEach(function (a, i) { a.style.color = i === current ? 'var(--accent)' : ''; });
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }
})();
