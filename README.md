# PaisaTrack - Finance Dashboard

A clean, interactive finance dashboard built with React + Recharts. This submission is designed to satisfy the Finance Dashboard UI assignment requirements with clear UI structure, simulated role-based behavior, and responsive layouts.

## How This Meets The Requirements

1. Dashboard Overview
- Summary cards: Total Balance, Total Income, Total Expenses, Avg Monthly Spend
- Time-based visualization: Monthly Balance Trend line chart (income/expense/balance)
- Categorical visualization: Spending Breakdown donut chart

2. Transactions Section
- List includes date, amount, category, and type
- Basic features: search, filter by type/category, sort by date/amount

3. Basic Role Based UI
- Role switcher (Admin / Viewer)
- Admin can add/edit/delete transactions; Viewer only sees data

4. Insights Section
- Highest spending category
- Monthly comparison table with savings rate
- Category-wise spending bar chart

5. State Management
- Local component state for transactions, filters, role, UI toggles
- Simple, predictable updates with React hooks

6. UI and UX Expectations
- Clean layout and spacing
- Responsive grids using auto-fit/minmax
- Empty state handling for zero transactions

Optional Enhancements Included
- Dark/Light mode toggle
- Collapsible sidebar
- Transitions on key elements

## Project Structure

```
paisatrack/
|-- index.html            # Entry HTML
|-- package.json          # Dependencies & scripts
|-- vite.config.js        # Vite configuration
`-- src/
    |-- main.jsx          # React app entry point
    |-- data.js           # Mock transactions & constants
    |-- theme.js          # Light / dark theme tokens
    `-- components/
        |-- FinanceDashboard.jsx   # Main dashboard (root component)
        |-- Sidebar.jsx            # Collapsible sidebar + nav
        |-- MetricCard.jsx         # KPI summary cards
        |-- ChartTooltip.jsx       # Custom Recharts tooltip
        |-- TransactionModal.jsx   # Add / Edit transaction modal
        `-- Icon.jsx               # SVG icon library
```

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

3. Build for production
```bash
npm run build
npm run preview
```

## Tech Stack

- React 18
- Recharts 2
- Vite 5

## Notes / Assumptions

- This project uses mock data (no backend).
- Role-based behavior is simulated in the UI for demo purposes.
- Data is stored in component state and resets on refresh.

## Links

- Repository: (add your repo link here)
- Live Demo: (add deployment link here)
