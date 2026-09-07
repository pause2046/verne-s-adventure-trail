# Verne's Adventure Trail

Create a one-page marketing/landing site in Czech language for a digital product called "Po stopách Julese Verna" (Jules Verne adventure trail).

CONTEXT: This is a real-world outdoor adventure trail for families with kids near the village of Olomučany (South Moravia, Czech Republic). It runs 5.5 km from the local library ("Knihovna Olomučany") to a recreational spot called "Výletiště Bahňák", with 14 stops along the way. At each stop kids solve tasks/games and collect a printable sticker of a "book" (Jules Verne themed) to paste into a "bookshelf" collector leaflet. The digital product sold on this page is a downloadable PDF package containing: the printable route map, all 14 stations with tasks and games, and the bookshelf/sticker collector leaflet with instructions. It was created by Zuzana Pospíšilová, a local mom of two, creative maker, who loves spending time outdoors and is active in community work (she made it for the local "Klub maminek Olomučany" / mothers' club).

PRICE: 290 CZK. No online payment integration — instead there is an order/contact form (name, email, optional field for number/age of children) that submits and shows a confirmation message: "Díky! Ozveme se ti s platebními údaji a po zaplacení ti pošleme PDF na e-mail do 24 hodin." (store submissions, e.g. via a simple backend table — no real payment gateway needed).

DESIGN — must closely match an existing printed leaflet/poster the client already has:
- Primary orange: #ff751c (warm, saturated orange — used for large background blocks, headlines, CTA buttons)
- Primary dark teal/petrol: #074550 (used for secondary background blocks, text, wave-shaped section dividers)
- Cream/off-white (#f5f0e6 approx) for light sections and card backgrounds
- Style: whimsical, vintage-adventure/Jules-Verne aesthetic — hand-drawn line-art style icons (hot air balloon, submarine, compass rose, moon/stars, anchor, palm tree, sailboat, volcano, elephant, comet), a sketched portrait-style illustration of Jules Verne, script/handwritten-style display font for headings (evoking old travel-journal typography), clean sans-serif for body text
- Sections should be divided with organic wave shapes (like the poster: orange sky panel → teal wave → dark starry panel), not hard rectangular dividers
- Warm, playful, storybook feel — not corporate

PAGE SECTIONS (in order):
1. Hero — big headline "Po stopách Julese Verna", subheadline "Dobrodružná stezka pro malé i velké cestovatele", short intro sentence, price badge "290 Kč", primary CTA button scrolling to the order form. Include hot air balloon illustration.
2. Pro koho to je — short section: pro rodiny s dětmi, výlet do přírody, aktivita bez obrazovek.
3. Co všechno dostanete — bullet list: mapa trasy (5,5 km, start Knihovna Olomučany, cíl Výletiště Bahňák), 14 zastavení s úkoly a hrami, sběratelský leaflet "knihovna" na nálepky knih, tiskové instrukce — PDF ke stažení.
4. Jak to funguje — 4 steps: 1) Objednáš a zaplatíš 2) Dostaneš PDF e-mailem 3) Vytiskneš si mapu a leaflet 4) Vyrazíte na trasu a sbíráte knihy.
5. O autorce — Zuzana Pospíšilová, maminka dvou dětí, tvořivá, ráda tráví čas v přírodě a zapojuje se do komunitních akcí v obci (Klub maminek Olomučany). Placeholder for her photo (client will upload it).
6. Objednávkový formulář — name, email, optional number/age of kids, submit button "Objednat za 290 Kč", confirmation message as described above.
7. Footer — small note "Klub maminek Olomučany", contact email placeholder.

Keep it a true single page (no routing), mobile-friendly, fast-loading. Use placeholder image blocks with clear labels (e.g. "[fotka Zuzany]", "[ukázka leafletu]", "[ukázka karty se zastaveními]") where the client will later upload her own photos of the printed leaflet, poster and her portrait — make these easy to swap.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/27ae0bd8-c812-4b60-b469-2377376cadb9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
