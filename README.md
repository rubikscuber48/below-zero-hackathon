# BELOW ZERO

Website for BELOW ZERO, a free 24-hour in-person hackathon for school students in Classes 8–12, organized by Lost in Stars.

Live at https://belowzero2027.xyz/

## Run it locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # production build in dist/
npm run lint    # type-check
```

## Update the content

Edit these files. Everything on the page, including the search and sharing tags, reads from them.

| File | What it holds |
| --- | --- |
| `src/data/event.ts` | Date, time, place, email, registration links, timeline phases, social links |
| `src/data/prizes.ts` | Prize amounts, winners, sponsors, and perks |
| `src/data/people.ts` | Team members and sponsor logos |
| `src/data/tracks.ts` | The five tracks |
| `src/data/faq.ts` | Questions and answers |
| `src/data/sections.ts` | Section order, numbers, and names |

Leave a prize or partner field empty until it is confirmed. Empty fields stay hidden or show "To be announced".

## Deployment

Every push to `master` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.

The opening animation and the page shown before the app starts are in `index.html`.
