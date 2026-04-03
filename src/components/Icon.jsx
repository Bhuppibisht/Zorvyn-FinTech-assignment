import React from "react";

const Icon = ({ name, size = 18, color = "currentColor", style = {} }) => {
  const baseProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
  };

  const icons = {
    sun: (
      <svg {...baseProps}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    moon: (
      <svg {...baseProps}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    grid: (
      <svg {...baseProps}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    list: (
      <svg {...baseProps}>
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <circle cx="3.5" cy="6" r="1" fill={color} stroke="none" />
        <circle cx="3.5" cy="12" r="1" fill={color} stroke="none" />
        <circle cx="3.5" cy="18" r="1" fill={color} stroke="none" />
      </svg>
    ),
    pulse: (
      <svg {...baseProps}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    wallet: (
      <svg {...baseProps}>
        <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        <path
          d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
          fill={color}
          stroke="none"
        />
      </svg>
    ),
    arrowUp: (
      <svg {...baseProps}>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    ),
    arrowDown: (
      <svg {...baseProps}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    ),
    calendar: (
      <svg {...baseProps}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    trendUp: (
      <svg {...baseProps}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    trendDown: (
      <svg {...baseProps}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    plus: (
      <svg {...baseProps}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    edit: (
      <svg {...baseProps}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    trash: (
      <svg {...baseProps}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4h6v2" />
      </svg>
    ),
    search: (
      <svg {...baseProps}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    filter: (
      <svg {...baseProps}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    close: (
      <svg {...baseProps}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    chevronLeft: (
      <svg {...baseProps}>
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    logo: (
      <svg {...baseProps}>
        <polyline points="4 15 9 10 13 13 20 6" />
        <circle cx="4" cy="15" r="1.5" fill={color} stroke="none" />
        <circle cx="9" cy="10" r="1.5" fill={color} stroke="none" />
        <circle cx="13" cy="13" r="1.5" fill={color} stroke="none" />
        <circle cx="20" cy="6" r="1.5" fill={color} stroke="none" />
      </svg>
    ),
    rupee: (
      <svg {...baseProps}>
        <line x1="6" y1="3" x2="18" y2="3" />
        <line x1="6" y1="8" x2="18" y2="8" />
        <line x1="15" y1="21" x2="6" y2="8" />
        <path d="M6 8a6 6 0 0 1 0-5h12" />
      </svg>
    ),
    bell: (
      <svg {...baseProps}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    shield: (
      <svg {...baseProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    user: (
      <svg {...baseProps}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    check: (
      <svg {...baseProps} strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    piggy: (
      <svg {...baseProps}>
        <path d="M19 9c0-1.1-.9-2-2-2h-1a7 7 0 1 0 0 14h1a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-1z" />
        <path d="M5 13H2" />
        <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default Icon;
