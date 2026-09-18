# University Admission Analytics Dashboard

A responsive university admin dashboard for monitoring admission
application performance.

## Features

-   Total, verified, and rejected applicants
-   Applications per program bar chart
-   Application trends line chart
-   From/To date filtering
-   Refresh data functionality
-   Loading, error, and no-data states
-   Responsive desktop, tablet, and mobile UI

## Tech Stack

-   React + TypeScript
-   Vite
-   Tailwind CSS
-   Recharts
-   Axios
-   Lucide React

## API

``` text
GET /api/v1/analytics/admissions
```

The project currently uses mock/demo admission analytics data.

## Project Structure

``` text
src/
├── api/
├── components/
│   ├── common/
│   └── dashboard/
├── hooks/
├── mock/
├── pages/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## Setup

``` bash
npm install
npm run dev
```

## Production Build

``` bash
npm run build
npm run preview
```

## Navigation

``` text
Dashboard
Admissions
Profile
```

## Architecture

Common admin components such as `AdminPageLayout`, `PageHeader`,
`StatCard`, and `NoDataComponent` are reusable across pages.
Admission-specific charts and sections are kept in the dashboard
components.
