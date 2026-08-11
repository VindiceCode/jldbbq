# Business card — print files

Trim **3.5 × 2 in**. Files are built at **3.75 × 2.25 in** (0.125 in bleed on all
four sides). Cut line is 0.125 in inside each edge; keep text 0.25 in from the
file edge.

| File | Use |
|---|---|
| `jld-business-card.pdf` | Send this. 2 pages — p1 front, p2 back. |
| `jld-card-front.pdf` / `jld-card-back.pdf` | If the printer wants one file per side. |
| `jld-card-front-300dpi.png` / `jld-card-back-300dpi.png` | 1125 × 675 proofs for approval or web upload forms. |
| `qr-card-print.png` | The QR on its own, if it's ever needed separately. |
| `card-print.html` | Source. Regenerate with the commands below. |

## What the printer needs to know

- **All text is converted to vector outlines.** No fonts are embedded because
  none are referenced — `pdffonts` returns nothing. Nothing to substitute.
- **Colour is RGB.** A press doing offset work will want CMYK; ask them to
  convert, or say the word and it can be converted here. Digital printing
  handles RGB fine.
- **Matte stock.** Gloss throws glare across the QR and causes scan failures
  that never show up on screen.

## QR

Encodes `https://jldbbq.com/?s=card`, error correction level H (30%), 4-module
quiet zone. The `?s=card` lands in the **Source** column of the bookings sheet,
so scans from the card are distinguishable from other traffic.

Verified by decoding it back out of the rendered PDF, not just from the source
image. Before a full run, scan the printed proof on three phones under indoor
light.

## Regenerating

```bash
# QR (only if the URL changes)
npx qrcode -e H -w 720 -m 4 -d 191512ff -l EDE7DCff -o qr-card-print.png "https://jldbbq.com/?s=card"

# render, then outline all text
chromium --headless --no-pdf-header-footer --print-to-pdf=raw.pdf "file://$PWD/card-print.html"
gs -o jld-business-card.pdf -sDEVICE=pdfwrite -dNoOutputFonts -dPDFSETTINGS=/prepress -dAutoRotatePages=/None raw.pdf
pdffonts jld-business-card.pdf   # must list nothing
```

`card-print.html` has the fonts embedded as base64, so it renders identically
on any machine with no font install.
