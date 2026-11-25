# MAMA Restaurant

A responsive React restaurant website in the cream, maroon, and gold style of the supplied poster. Dahi Jalebi is presented as the iconic dish that defines Mama Restaurant.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Menu and prices

The seven menu items, Hindi labels, prices, delivery areas, and phone numbers are defined near the top of `src/App.jsx`.

- Dahi Jalebi: ₹50 per plate
- Chola Samosa: ₹50 per plate
- Plain Samosa: ₹15 per piece
- Sweet Lassi: ₹50 per serve
- Rajma, Kadhi, and Chole Chawal: ₹50 half plate / ₹100 full plate

## Photography

The rendered website deliberately uses no photos. Food is represented by editable inline SVG illustrations, keeping the page polished until original restaurant photography is ready. To add photos later, replace the `FoodArtwork` component where it appears in the hero, signature feature, menu cards, and order dialog, or add an image path to each menu item.

The older poster crops remain in `public/images/` as unused source material. Nothing in the rendered page loads them.

## Copy into another React project

Copy `src/App.jsx` and `src/App.css`, install `lucide-react`, and render `<App />` from the project entry point. The page uses functional components and hooks for navigation, serving selection, quantity totals, delivery-area selection, keyboard-safe dialogs, and click-to-call ordering.
