import Icon from "./Icon";

const MetricCard = ({
  label,
  value,
  sub,
  iconName,
  iconColor,
  iconBg,
  badge,
  badgeColor,
  badgeBg,
  c,
}) => (
  <div
    style={{
      background: c.card,
      borderRadius: 16,
      padding: "1.25rem",
      border: `1px solid ${c.border}`,
      boxShadow: c.shadow,
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={iconName} size={22} color={iconColor} />
      </div>
      {badge && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
            background: badgeBg,
            color: badgeColor,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Icon
            name={badgeColor === c.green ? "trendUp" : "trendDown"}
            size={11}
            color={badgeColor}
          />
          {badge}
        </span>
      )}
    </div>
    <div>
      <p
        style={{
          fontSize: 12,
          color: c.textSub,
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          marginBottom: 5,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: c.text,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: 12, color: c.textMuted, marginTop: 6 }}>{sub}</p>
      )}
    </div>
  </div>
);

export default MetricCard;
