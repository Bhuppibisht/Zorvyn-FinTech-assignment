import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Icon from "./Icon";
import MetricCard from "./MetricCard";
import ChartTooltip from "./ChartTooltip";
import Sidebar from "./Sidebar";
import TransactionModal from "./TransactionModal";
import T from "../theme";
import {
  INITIAL_TX,
  MONTHS,
  CATEGORIES,
  CAT_COLORS,
  PIE_PALETTE,
  fmt,
} from "../data";

export default function FinanceDashboard() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("overview");
  const [role, setRole] = useState("admin");
  const [txs, setTxs] = useState(INITIAL_TX);
  const [search, setSearch] = useState("");
  const [fType, setFType] = useState("all");
  const [fCat, setFCat] = useState("All");
  const [sort, setSort] = useState("date_desc");
  const [modal, setModal] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [form, setForm] = useState({
    date: "",
    name: "",
    category: "Salary",
    type: "income",
    amount: "",
  });

  const c = dark ? T.dark : T.light;

  const income = useMemo(
    () =>
      txs.filter((x) => x.type === "income").reduce((s, x) => s + x.amount, 0),
    [txs],
  );
  const expense = useMemo(
    () =>
      txs.filter((x) => x.type === "expense").reduce((s, x) => s + x.amount, 0),
    [txs],
  );
  const balance = income - expense;
  const savRate = income > 0 ? +((balance / income) * 100).toFixed(1) : 0;

  const monthly = useMemo(() => {
    const m = {};
    txs.forEach((x) => {
      const d = new Date(x.date);
      const k = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
      if (!m[k]) m[k] = { label: MONTHS[d.getMonth()], income: 0, expense: 0 };
      m[k][x.type] += x.amount;
    });
    return Object.entries(m)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([, v]) => ({ ...v, balance: v.income - v.expense }));
  }, [txs]);

  const catSpend = useMemo(() => {
    const m = {};
    txs
      .filter((x) => x.type === "expense")
      .forEach((x) => {
        m[x.category] = (m[x.category] || 0) + x.amount;
      });
    return Object.entries(m)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [txs]);

  const topCat = catSpend[0];
  const avgMonthExp = monthly.length
    ? Math.round(monthly.reduce((s, m) => s + m.expense, 0) / monthly.length)
    : 0;
  const lastTwo = monthly.slice(-2);
  const expDiff =
    lastTwo.length === 2 ? lastTwo[1].expense - lastTwo[0].expense : 0;
  const expDiffPct =
    lastTwo.length === 2 && lastTwo[0].expense > 0
      ? +((expDiff / lastTwo[0].expense) * 100).toFixed(1)
      : 0;

  const filtered = useMemo(() => {
    let list = [...txs];
    if (search)
      list = list.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.category.toLowerCase().includes(search.toLowerCase()),
      );
    if (fType !== "all") list = list.filter((x) => x.type === fType);
    if (fCat !== "All") list = list.filter((x) => x.category === fCat);
    return list.sort((a, b) => {
      if (sort === "date_desc") return new Date(b.date) - new Date(a.date);
      if (sort === "date_asc") return new Date(a.date) - new Date(b.date);
      if (sort === "amount_desc") return b.amount - a.amount;
      return a.amount - b.amount;
    });
  }, [txs, search, fType, fCat, sort]);

  const openAdd = () => {
    setForm({
      date: "",
      name: "",
      category: "Salary",
      type: "income",
      amount: "",
    });
    setEditTx(null);
    setModal(true);
  };
  const openEdit = (tx) => {
    setForm({
      date: tx.date,
      name: tx.name,
      category: tx.category,
      type: tx.type,
      amount: String(tx.amount),
    });
    setEditTx(tx);
    setModal(true);
  };
  const save = () => {
    if (!form.date || !form.name || !form.amount) return;
    if (editTx)
      setTxs((p) =>
        p.map((x) =>
          x.id === editTx.id ? { ...x, ...form, amount: +form.amount } : x,
        ),
      );
    else
      setTxs((p) => [...p, { ...form, id: Date.now(), amount: +form.amount }]);
    setModal(false);
  };
  const del = (id) => setTxs((p) => p.filter((x) => x.id !== id));

  const iSel = {
    fontSize: 13,
    padding: "8px 12px",
    borderRadius: 10,
    border: `1px solid ${c.border}`,
    background: c.input,
    color: c.text,
    outline: "none",
    cursor: "pointer",
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: "grid" },
    { id: "transactions", label: "Transactions", icon: "list" },
    { id: "insights", label: "Insights", icon: "pulse" },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: c.bg,
        fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
        color: c.text,
        transition: "background .25s, color .25s",
      }}
    >
      <Sidebar
        tab={tab}
        setTab={setTab}
        role={role}
        setRole={setRole}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        c={c}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <header
          style={{
            padding: "0 1.5rem",
            height: 68,
            background: c.sidebar,
            borderBottom: `1px solid ${c.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            position: "sticky",
            top: 0,
            zIndex: 10,
            boxShadow: c.shadow,
            flexShrink: 0,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: c.text,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {navItems.find((n) => n.id === tab)?.label}
            </h1>
            <p style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>
              {tab === "overview" && "Your financial snapshot"}
              {tab === "transactions" && `${filtered.length} records found`}
              {tab === "insights" && "Spending patterns & monthly analysis"}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                border: `1px solid ${c.border}`,
                background: c.input,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Icon name="bell" size={17} color={c.textSub} />
              <span
                style={{
                  position: "absolute",
                  top: 9,
                  right: 9,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: c.red,
                  border: `2px solid ${c.sidebar}`,
                }}
              />
            </button>
            <button
              onClick={() => setDark((p) => !p)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 11,
                border: `1px solid ${c.border}`,
                background: dark
                  ? "rgba(251,191,36,0.1)"
                  : "rgba(99,102,241,0.08)",
                color: dark ? c.amber : c.accent,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                transition: "all .2s",
                flexShrink: 0,
              }}
            >
              <Icon
                name={dark ? "sun" : "moon"}
                size={16}
                color={dark ? c.amber : c.accent}
              />
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            {role === "admin" && (
              <button
                onClick={openAdd}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 18px",
                  borderRadius: 11,
                  border: "none",
                  background: "linear-gradient(135deg,#6366f1,#a855f7)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                  flexShrink: 0,
                  transition: "box-shadow .2s",
                }}
              >
                <Icon name="plus" size={16} color="#fff" />
                Add Transaction
              </button>
            )}
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {tab === "overview" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                  gap: 14,
                  marginBottom: "1.4rem",
                }}
              >
                <MetricCard
                  label="Total Balance"
                  value={fmt(balance)}
                  sub={`Savings Rate: ${savRate}%`}
                  iconName="wallet"
                  iconColor={c.accent}
                  iconBg={c.accentSoft}
                  badge={savRate > 0 ? `${savRate}%` : null}
                  badgeColor={savRate >= 20 ? c.green : c.red}
                  badgeBg={savRate >= 20 ? c.greenSoft : c.redSoft}
                  c={c}
                />
                <MetricCard
                  label="Total Income"
                  value={fmt(income)}
                  sub={`${txs.filter((x) => x.type === "income").length} transactions`}
                  iconName="arrowUp"
                  iconColor={c.green}
                  iconBg={c.greenSoft}
                  c={c}
                />
                <MetricCard
                  label="Total Expenses"
                  value={fmt(expense)}
                  sub={`${txs.filter((x) => x.type === "expense").length} transactions`}
                  iconName="arrowDown"
                  iconColor={c.red}
                  iconBg={c.redSoft}
                  c={c}
                />
                <MetricCard
                  label="Avg Monthly Spend"
                  value={fmt(avgMonthExp)}
                  sub="Based on all months"
                  iconName="calendar"
                  iconColor={c.amber}
                  iconBg={c.amberSoft}
                  c={c}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "3fr 2fr",
                  gap: 14,
                  marginBottom: "1.4rem",
                }}
              >
                <div
                  style={{
                    background: c.card,
                    borderRadius: 16,
                    padding: "1.3rem",
                    border: `1px solid ${c.border}`,
                    boxShadow: c.shadow,
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: c.textSub,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Monthly Balance Trend
                  </p>
                  <ResponsiveContainer width="100%" height={230}>
                    <LineChart data={monthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: c.textSub }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: c.textSub }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<ChartTooltip c={c} />} />
                      <Legend
                        wrapperStyle={{ fontSize: 12, color: c.textSub }}
                      />
                      <Line
                        type="monotone"
                        dataKey="income"
                        name="Income"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="expense"
                        name="Expense"
                        stroke="#ef4444"
                        strokeWidth={2.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        name="Balance"
                        stroke={c.accent}
                        strokeWidth={2}
                        strokeDasharray="5 3"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div
                  style={{
                    background: c.card,
                    borderRadius: 16,
                    padding: "1.3rem",
                    border: `1px solid ${c.border}`,
                    boxShadow: c.shadow,
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: c.textSub,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Spending Breakdown
                  </p>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={catSpend.slice(0, 7)}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={82}
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {catSpend.slice(0, 7).map((_, i) => (
                          <Cell
                            key={i}
                            fill={PIE_PALETTE[i % PIE_PALETTE.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltip c={c} />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px 12px",
                      marginTop: 10,
                    }}
                  >
                    {catSpend.slice(0, 7).map((entry, i) => (
                      <span
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 11,
                          color: c.textSub,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: PIE_PALETTE[i],
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                        {entry.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: c.card,
                  borderRadius: 16,
                  padding: "1.3rem",
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: c.textSub,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Income vs Expenses by Month
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthly} barCategoryGap="28%" barGap={4}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={c.grid}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: c.textSub }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: c.textSub }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<ChartTooltip c={c} />} />
                    <Legend wrapperStyle={{ fontSize: 12, color: c.textSub }} />
                    <Bar
                      dataKey="income"
                      name="Income"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="expense"
                      name="Expense"
                      fill="#ef4444"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {tab === "transactions" && (
            <div
              style={{
                background: c.card,
                borderRadius: 16,
                border: `1px solid ${c.border}`,
                boxShadow: c.shadow,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.2rem",
                  borderBottom: `1px solid ${c.border}`,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <div style={{ position: "relative", flex: "1 1 200px" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <Icon name="search" size={15} color={c.textMuted} />
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or category..."
                    style={{ ...iSel, paddingLeft: 34, width: "100%" }}
                  />
                </div>

                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <Icon name="filter" size={13} color={c.textMuted} />
                  </span>
                  <select
                    value={fType}
                    onChange={(e) => setFType(e.target.value)}
                    style={{ ...iSel, paddingLeft: 30 }}
                  >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <select
                  value={fCat}
                  onChange={(e) => setFCat(e.target.value)}
                  style={iSel}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={iSel}
                >
                  <option value="date_desc">Newest First</option>
                  <option value="date_asc">Oldest First</option>
                  <option value="amount_desc">High Amount</option>
                  <option value="amount_asc">Low Amount</option>
                </select>

                <span
                  style={{
                    fontSize: 12,
                    color: c.textMuted,
                    marginLeft: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {filtered.length} of {txs.length} records
                </span>
              </div>

              {filtered.length === 0 ? (
                <div style={{ padding: "4rem", textAlign: "center" }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: c.accentSoft,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}
                  >
                    <Icon name="search" size={26} color={c.accent} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: c.text }}>
                    No transactions found
                  </p>
                  <p style={{ fontSize: 13, color: c.textMuted, marginTop: 6 }}>
                    Try adjusting your filters or search term
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 13,
                    }}
                  >
                    <thead>
                      <tr style={{ background: c.bg }}>
                        {[
                          "Date",
                          "Name / Description",
                          "Category",
                          "Type",
                          "Amount",
                          ...(role === "admin" ? ["Actions"] : []),
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              padding: "10px 16px",
                              fontSize: 11,
                              fontWeight: 700,
                              color: c.textMuted,
                              textTransform: "uppercase",
                              letterSpacing: "0.07em",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((tx) => (
                        <tr
                          key={tx.id}
                          style={{ borderTop: `1px solid ${c.border}` }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = c.cardHover)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <td
                            style={{
                              padding: "11px 16px",
                              color: c.textSub,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 7,
                              }}
                            >
                              <Icon
                                name="calendar"
                                size={13}
                                color={c.textMuted}
                              />
                              {new Date(tx.date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "11px 16px",
                              fontWeight: 600,
                              color: c.text,
                            }}
                          >
                            {tx.name}
                          </td>
                          <td style={{ padding: "11px 16px" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                padding: "4px 11px",
                                borderRadius: 20,
                                background:
                                  (CAT_COLORS[tx.category] || "#888") + "20",
                                color: CAT_COLORS[tx.category] || c.textSub,
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: CAT_COLORS[tx.category] || "#888",
                                  display: "inline-block",
                                }}
                              />
                              {tx.category}
                            </span>
                          </td>
                          <td style={{ padding: "11px 16px" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 12,
                                fontWeight: 700,
                                padding: "4px 11px",
                                borderRadius: 20,
                                background:
                                  tx.type === "income"
                                    ? c.greenSoft
                                    : c.redSoft,
                                color: tx.type === "income" ? c.green : c.red,
                              }}
                            >
                              <Icon
                                name={
                                  tx.type === "income" ? "arrowUp" : "arrowDown"
                                }
                                size={11}
                                color={tx.type === "income" ? c.green : c.red}
                              />
                              {tx.type.charAt(0).toUpperCase() +
                                tx.type.slice(1)}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "11px 16px",
                              fontWeight: 800,
                              fontSize: 14,
                              color: tx.type === "income" ? c.green : c.red,
                            }}
                          >
                            {tx.type === "income" ? "+" : "−"}
                            {fmt(tx.amount)}
                          </td>
                          {role === "admin" && (
                            <td style={{ padding: "11px 16px" }}>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button
                                  onClick={() => openEdit(tx)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    border: `1px solid ${c.border}`,
                                    background: c.accentSoft,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Icon
                                    name="edit"
                                    size={14}
                                    color={c.accent}
                                  />
                                </button>
                                <button
                                  onClick={() => del(tx.id)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    border: `1px solid ${c.redSoft}`,
                                    background: c.redSoft,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Icon name="trash" size={14} color={c.red} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === "insights" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                  gap: 14,
                  marginBottom: "1.4rem",
                }}
              >
                <MetricCard
                  label="Highest Spending"
                  value={topCat?.name || "—"}
                  sub={topCat ? fmt(topCat.value) : "No data"}
                  iconName="arrowDown"
                  iconColor={c.red}
                  iconBg={c.redSoft}
                  c={c}
                />
                <MetricCard
                  label="Savings Rate"
                  value={`${savRate}%`}
                  sub={
                    savRate >= 20
                      ? "Excellent! Above 20% target"
                      : "Below 20% recommended"
                  }
                  iconName="piggy"
                  iconColor={c.green}
                  iconBg={c.greenSoft}
                  badge={savRate >= 20 ? "Healthy" : "Low"}
                  badgeColor={savRate >= 20 ? c.green : c.red}
                  badgeBg={savRate >= 20 ? c.greenSoft : c.redSoft}
                  c={c}
                />
                <MetricCard
                  label="Month-on-Month"
                  value={`${expDiff >= 0 ? "+" : "−"}${fmt(Math.abs(expDiff))}`}
                  sub={`Expenses ${expDiff >= 0 ? "up" : "down"} ${Math.abs(expDiffPct)}% vs last month`}
                  iconName={expDiff >= 0 ? "trendUp" : "trendDown"}
                  iconColor={expDiff >= 0 ? c.red : c.green}
                  iconBg={expDiff >= 0 ? c.redSoft : c.greenSoft}
                  c={c}
                />
                <MetricCard
                  label="Total Records"
                  value={String(txs.length)}
                  sub={`Across ${monthly.length} months`}
                  iconName="list"
                  iconColor={c.accent}
                  iconBg={c.accentSoft}
                  c={c}
                />
              </div>

              <div
                style={{
                  background: c.card,
                  borderRadius: 16,
                  padding: "1.3rem",
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                  marginBottom: "1.4rem",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: c.textSub,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Category-wise Spending
                </p>
                <ResponsiveContainer
                  width="100%"
                  height={Math.max(catSpend.length * 44, 220)}
                >
                  <BarChart
                    data={catSpend}
                    layout="vertical"
                    margin={{ left: 10, right: 24 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={c.grid}
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: c.textSub }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fontSize: 12, fill: c.text }}
                      width={115}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(v) => fmt(v)}
                      contentStyle={{
                        background: c.card,
                        border: `1px solid ${c.border}`,
                        borderRadius: 10,
                        fontSize: 12,
                        color: c.text,
                      }}
                    />
                    <Bar dataKey="value" name="Amount" radius={[0, 8, 8, 0]}>
                      {catSpend.map((_, i) => (
                        <Cell
                          key={i}
                          fill={PIE_PALETTE[i % PIE_PALETTE.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div
                style={{
                  background: c.card,
                  borderRadius: 16,
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "1rem 1.3rem",
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: c.textSub,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                    }}
                  >
                    Monthly Comparison
                  </p>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 13,
                    }}
                  >
                    <thead>
                      <tr style={{ background: c.bg }}>
                        {[
                          "Month",
                          "Income",
                          "Expense",
                          "Net Savings",
                          "Savings %",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "10px 16px",
                              textAlign: "left",
                              fontSize: 11,
                              fontWeight: 700,
                              color: c.textMuted,
                              textTransform: "uppercase",
                              letterSpacing: "0.07em",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {monthly.map((m, i) => {
                        const sav = m.income - m.expense;
                        const pct =
                          m.income > 0
                            ? +((sav / m.income) * 100).toFixed(1)
                            : 0;
                        const good = pct >= 20;
                        return (
                          <tr
                            key={i}
                            style={{ borderTop: `1px solid ${c.border}` }}
                          >
                            <td
                              style={{
                                padding: "12px 16px",
                                fontWeight: 700,
                                color: c.text,
                              }}
                            >
                              {m.label} 2024
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontWeight: 700,
                                color: c.green,
                              }}
                            >
                              {fmt(m.income)}
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontWeight: 700,
                                color: c.red,
                              }}
                            >
                              {fmt(m.expense)}
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontWeight: 800,
                                color: sav >= 0 ? c.green : c.red,
                              }}
                            >
                              {fmt(sav)}
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                }}
                              >
                                <div
                                  style={{
                                    flex: 1,
                                    height: 6,
                                    borderRadius: 3,
                                    background: c.bg,
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: `${Math.min(Math.max(pct, 0), 100)}%`,
                                      height: "100%",
                                      background: good ? c.green : c.red,
                                      borderRadius: 3,
                                      transition: "width .4s",
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: good ? c.green : c.red,
                                    minWidth: 38,
                                  }}
                                >
                                  {pct}%
                                </span>
                              </div>
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 5,
                                  fontSize: 12,
                                  fontWeight: 700,
                                  padding: "4px 11px",
                                  borderRadius: 20,
                                  background: good ? c.greenSoft : c.redSoft,
                                  color: good ? c.green : c.red,
                                }}
                              >
                                <Icon
                                  name={good ? "check" : "close"}
                                  size={12}
                                  color={good ? c.green : c.red}
                                />
                                {good ? "Good" : "Low"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <TransactionModal
        modal={modal}
        setModal={setModal}
        form={form}
        setForm={setForm}
        editTx={editTx}
        save={save}
        c={c}
      />
    </div>
  );
}
