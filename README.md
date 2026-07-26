# Sahin Top — photography site

Static site. No build step. Push this folder to GitHub Pages as-is (set Pages source to
this folder / branch root).

## Files

- `index.html` — homepage (album name menu + hover preview)
- `album.html` — album page, opened as `album.html?a=<slug>`
- `albums.json` — **the only file you edit to change content**
- `script.js` / `style.css` — rendering and styling
- `images/<folder>/…` — the photos

## Add or change an album

1. Put the photos in a new folder, e.g. `images/iceland/`.
2. Add an entry to `albums.json`:

```json
{
  "slug": "iceland",
  "title": "Iceland",
  "description": "Ten days, mostly rain.",
  "folder": "iceland",
  "cover": "photo-1.jpg",
  "photos": ["photo-1.jpg", "photo-2.jpg", "photo-3.jpg"]
}
```

- `title` — shown on the homepage menu and at the top of the album page.
- `description` — the small line under the title. Leave `""` to hide it.
- `cover` — the homepage hover preview image.
- `photos` — the album page, top to bottom, in this order.
- `slug` — the URL. Lowercase, no spaces. Changing it breaks old links.

Album order on the homepage = order in this file.

## Notes

- Opening `index.html` by double-clicking will not load `albums.json` (browsers block
  `fetch` on `file://`). Test with a local server: `python3 -m http.server` then
  open `http://localhost:8000`.
- Resize photos before adding them — around 2000px on the long edge, JPEG ~80%.
- Light and dark mode follow the visitor's system setting automatically.
