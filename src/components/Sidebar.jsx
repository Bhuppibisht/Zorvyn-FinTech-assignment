import Icon from "./Icon";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "transactions", label: "Transactions", icon: "list" },
  { id: "insights", label: "Insights", icon: "pulse" },
];

const Sidebar = ({
  tab,
  setTab,
  role,
  setRole,
  collapsed,
  setCollapsed,
  c,
}) => {
  const brand = (
    <div
      style={{
        padding: collapsed ? "1.1rem 0.85rem" : "1.1rem 1.1rem",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: `1px solid ${c.border}`,
        minHeight: 68,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 13,
          flexShrink: 0,
          background: "linear-gradient(135deg, #4f46e5 0%, #22d3ee 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(34,211,238,0.35)",
        }}
      >
        <Icon name="logo" size={22} color="#fff" />
      </div>
      {!collapsed && (
        <div>
          <p
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: c.text,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            PaisaTrack
          </p>
          <p style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>
            Finance Dashboard
          </p>
        </div>
      )}
    </div>
  );

  const navigation = (
    <nav
      style={{
        flex: 1,
        padding: "1rem 0.7rem",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {!collapsed && (
        <p
          style={{
            fontSize: 10,
            color: c.textMuted,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0 0.5rem",
            marginBottom: 6,
          }}
        >
          Main Menu
        </p>
      )}
      {NAV_ITEMS.map((item) => {
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            title={collapsed ? item.label : ""}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "11px 0" : "11px 13px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              background: active ? c.accentSoft : "transparent",
              color: active ? c.accent : c.textSub,
              fontWeight: active ? 700 : 400,
              fontSize: 14,
              position: "relative",
              transition: "all .15s",
            }}
          >
            {active && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3,
                  height: 22,
                  borderRadius: "0 3px 3px 0",
                  background: c.accent,
                }}
              />
            )}
            <Icon
              name={item.icon}
              size={19}
              color={active ? c.accent : c.textSub}
            />
            {!collapsed && (
              <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );

  const roleSwitcher = !collapsed && (
    <div
      style={{
        margin: "0 0.7rem 0.7rem",
        background: c.accentSoft,
        borderRadius: 12,
        padding: "0.8rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 8,
        }}
      >
        <Icon
          name={role === "admin" ? "shield" : "user"}
          size={14}
          color={c.accent}
        />
        <span
          style={{
            fontSize: 11,
            color: c.textSub,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          Active Role
        </span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {["admin", "viewer"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            style={{
              flex: 1,
              fontSize: 12,
              padding: "6px 0",
              borderRadius: 8,
              border: `1.5px solid ${role === r ? c.accent : c.border}`,
              background: role === r ? c.accent : "transparent",
              color: role === r ? "#fff" : c.textSub,
              cursor: "pointer",
              fontWeight: 700,
              transition: "all .15s",
            }}
          >
            {r === "admin" ? "Admin" : "Viewer"}
          </button>
        ))}
      </div>
    </div>
  );

  const collapseToggle = (
    <button
      onClick={() => setCollapsed((p) => !p)}
      style={{
        margin: "0 0.7rem 0.9rem",
        padding: "9px",
        borderRadius: 10,
        border: `1px solid ${c.border}`,
        background: "transparent",
        color: c.textSub,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontSize: 12,
        fontWeight: 600,
        transition: "background .15s",
      }}
    >
      <span
        style={{
          transform: collapsed ? "rotate(180deg)" : "none",
          transition: "transform .22s",
          display: "flex",
        }}
      >
        <Icon name="chevronLeft" size={16} color={c.textSub} />
      </span>
      {!collapsed && "Collapse"}
    </button>
  );

  return (
    <aside
      style={{
        width: collapsed ? 72 : 248,
        minHeight: "100vh",
        background: c.sidebar,
        borderRight: `1px solid ${c.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width .22s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        boxShadow: c.shadow,
        zIndex: 20,
      }}
    >
      {brand}
      {navigation}
      {roleSwitcher}
      {collapseToggle}
    </aside>
  );
};

export default Sidebar;
