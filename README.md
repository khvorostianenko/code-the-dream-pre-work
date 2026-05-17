# van-gogh-gallery

A small React gallery that loads artwork data from the Art Institute of Chicago public API.

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)
- npm (bundled with Node.js)

## Setup

1. Clone this repository and open the project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables. Copy the example file and edit `.env`:

   ```bash
   cp .env.example .env
   ```

   Vite only exposes variables whose names start with `VITE_` to the app.

## Environment variables

| Variable | Required                             | Description |
|----------|--------------------------------------|-------------|
| `VITE_AIC_USER_AGENT` | Optional (for courtesy / API policy) | Identify your app and a contact, e.g. `project-name (you@example.com)`. Replace the placeholder in `.env`. |

## Run locally

Start the development server:

```bash
npm run dev
```

Then open **http://localhost:5173** in your browser (default Vite port).

## Other commands

| Command | Description |
|---------|-------------|
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
