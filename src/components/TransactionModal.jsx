import Icon from "./Icon";
import { CATEGORIES } from "../data";

const TransactionModal = ({
  modal,
  setModal,
  form,
  setForm,
  editTx,
  save,
  c,
}) => {
  if (!modal) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setModal(false);
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: c.card,
          borderRadius: 20,
          padding: "1.8rem",
          width: "100%",
          maxWidth: 460,
          border: `1px solid ${c.border}`,
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.4rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: c.accentSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name={editTx ? "edit" : "plus"}
                size={18}
                color={c.accent}
              />
            </div>
            <div>
              <h2
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: c.text,
                  lineHeight: 1,
                }}
              >
                {editTx ? "Edit Transaction" : "New Transaction"}
              </h2>
              <p style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>
                {editTx
                  ? "Update the transaction details"
                  : "Add a new income or expense"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setModal(false)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              border: `1px solid ${c.border}`,
              background: c.input,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="close" size={15} color={c.textSub} />
          </button>
        </div>

        {[
          { label: "Date", key: "date", type: "date" },
          {
            label: "Name / Description",
            key: "name",
            type: "text",
            placeholder: "e.g. Swiggy Order, Salary Credit",
          },
          {
            label: "Amount (₹)",
            key: "amount",
            type: "number",
            placeholder: "e.g. 5000",
          },
        ].map((f) => (
          <div key={f.key} style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontSize: 11,
                color: c.textSub,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              {f.label}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={(e) =>
                setForm((p) => ({ ...p, [f.key]: e.target.value }))
              }
              style={{
                width: "100%",
                fontSize: 14,
                padding: "10px 13px",
                borderRadius: 10,
                border: `1px solid ${c.border}`,
                background: c.input,
                color: c.text,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: "1.4rem",
          }}
        >
          <div>
            <label
              style={{
                fontSize: 11,
                color: c.textSub,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              style={{
                width: "100%",
                fontSize: 14,
                padding: "10px 13px",
                borderRadius: 10,
                border: `1px solid ${c.border}`,
                background: c.input,
                color: c.text,
                outline: "none",
              }}
            >
              {CATEGORIES.filter((x) => x !== "All").map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              style={{
                fontSize: 11,
                color: c.textSub,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              Type
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {["income", "expense"].map((tp) => (
                <button
                  key={tp}
                  onClick={() => setForm((p) => ({ ...p, type: tp }))}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    transition: "all .15s",
                    border: `1.5px solid ${form.type === tp ? (tp === "income" ? c.green : c.red) : c.border}`,
                    background:
                      form.type === tp
                        ? tp === "income"
                          ? c.greenSoft
                          : c.redSoft
                        : "transparent",
                    color:
                      form.type === tp
                        ? tp === "income"
                          ? c.green
                          : c.red
                        : c.textSub,
                  }}
                >
                  <Icon
                    name={tp === "income" ? "arrowUp" : "arrowDown"}
                    size={14}
                    color={
                      form.type === tp
                        ? tp === "income"
                          ? c.green
                          : c.red
                        : c.textSub
                    }
                  />
                  {tp.charAt(0).toUpperCase() + tp.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setModal(false)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 11,
              border: `1px solid ${c.border}`,
              background: "transparent",
              color: c.textSub,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            onClick={save}
            style={{
              flex: 2,
              padding: "12px",
              borderRadius: 11,
              border: "none",
              background: "linear-gradient(135deg,#6366f1,#a855f7)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 14,
              boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
            }}
          >
            {editTx ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
