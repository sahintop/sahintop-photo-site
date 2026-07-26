/* Reads albums.json and renders the two pages. Edit albums.json only. */
var DATA_URL = 'albums.json';

function loadAlbums() {
  return fetch(DATA_URL, { cache: 'no-store' }).then(function (r) {
    if (!r.ok) throw new Error('albums.json ' + r.status);
    return r.json();
  });
}
function photoPath(album, file) {
  return 'images/' + album.folder + '/' + file;
}
function coverPath(album) {
  return photoPath(album, album.cover || (album.photos || [])[0]);
}
function albumHref(album) {
  return 'album.html?a=' + encodeURIComponent(album.slug);
}

function renderHome() {
  loadAlbums().then(function (albums) {
    var menu = document.getElementById('menu');
    var rows = document.getElementById('rows');
    var preview = document.getElementById('preview');

    albums.forEach(function (al) {
      var a = document.createElement('a');
      a.href = albumHref(al);
      a.textContent = al.title;
      a.addEventListener('mouseenter', function () { showPreview(al); });
      a.addEventListener('focus', function () { showPreview(al); });
      menu.appendChild(a);

      var row = document.createElement('a');
      row.href = albumHref(al);
      row.innerHTML = '<span class="row-title"></span><span class="row-thumb"></span>';
      row.querySelector('.row-title').textContent = al.title;
      row.querySelector('.row-thumb').style.backgroundImage = 'url("' + coverPath(al) + '")';
      rows.appendChild(row);

      var pre = new Image();
      pre.src = coverPath(al);
    });

    function showPreview(al) {
      preview.style.backgroundImage = 'url("' + coverPath(al) + '")';
      preview.href = albumHref(al);
      preview.setAttribute('aria-label', 'Open album: ' + al.title);
      preview.classList.add('is-on');
    }
  }).catch(function (e) {
    document.getElementById('menu').textContent = 'Could not load albums.json — ' + e.message;
  });
}

function renderAlbum() {
  var slug = new URLSearchParams(location.search).get('a');
  loadAlbums().then(function (albums) {
    var al = albums.filter(function (x) { return x.slug === slug; })[0] || albums[0];
    if (!al) return;
    document.title = al.title + ' — Sahin Top';
    document.getElementById('album-title').textContent = al.title;
    var desc = document.getElementById('album-desc');
    desc.textContent = al.description || '';
    if (!al.description) desc.style.display = 'none';

    var wrap = document.getElementById('waterfall');
    (al.photos || []).forEach(function (file, i) {
      var img = document.createElement('img');
      img.src = photoPath(al, file);
      img.alt = '';
      img.loading = i < 2 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.style.animationDelay = (i * 0.07).toFixed(2) + 's';
      wrap.appendChild(img);
    });
  }).catch(function (e) {
    document.getElementById('album-title').textContent = 'Could not load albums.json';
    document.getElementById('album-desc').textContent = e.message;
  });
}
