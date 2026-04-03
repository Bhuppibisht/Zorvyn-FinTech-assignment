import { fmt } from "../data";

const ChartTooltip = ({ active, payload, label, c }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: c.shadowMd,
      }}
    >
      <p
        style={{
          fontSize: 11,
          color: c.textMuted,
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </p>
      {payload.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: p.color,
            margin: "3px 0",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: p.color,
              display: "inline-block",
            }}
          />
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

export default ChartTooltip;
