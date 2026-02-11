# Aknoon Backoffice Dashboard

Modern, RTL-friendly admin dashboard built with Next.js, React Query, and Tailwind, designed for managing orders, products, categories, and admins.

## Features

- Next.js App Router with clean segment layouts
- RTL UI with professional styling and dark mode
- Data tables with actions, filters, and pagination
- Order details modal with receipt viewer
- Dashboard with order statistics and charts
- Auth with login form

## Tech Stack

- Next.js 16 (App Router)
- React 19
- @tanstack/react-query and react-table
- Tailwind CSS 4
- Zustand for lightweight state
- Lucide icons

## Requirements

- Node.js 20+
- pnpm 9+ (Corepack enabled)
- API base URL configured via environment

## Environment

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
```

## Scripts

```
pnpm dev       # start dev server
pnpm build     # production build
pnpm start     # run production server
pnpm lint      # lint with Next
```

## Run Locally

```
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Docker

Build and run:

```
docker build -t aknoon-dashboard .
docker run -e NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com -p 3000:3000 aknoon-dashboard
## Docker Compose
Using docker-compose for easy deployment:
```

# 1) Create .env with your API base URL

echo "NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com" > .env

# 2) Build and start in background

docker compose up -d --build

# 3) View logs

docker compose logs -f

# 4) Stop

docker compose down

```

```

## Project Structure

```
    orders/          # orders list and modal
    products/        # products list + filters
    categories/      # categories list + filters
    admins/          # admins list + filters
  (auth)/
    login/           # login page
components/ui/       # reusable UI components (table, breadcrumb, buttons)
api/                 # API client hooks and types
public/              # assets (favicon, etc.)
```

## Icons and Branding

- Favicon: `public/favicon.svg`
- Icons are wired via layout metadata to ensure consistent branding.

## Notes

- Ensure the API issues tokens via cookies for server routes reading `auth_token`.
- Adjust page size defaults and chart components as needed.

## License

Proprietary
