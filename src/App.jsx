import React, { useState } from "react";

const currencies = [
  "NPR",
  "GBP",
  "USD",
  "AUD",
  "EUR",
  "INR",
  "AED",
  "QAR",
  "SAR",
  "MYR",
  "JPY",
  "KRW",
];

const peopleSeed = [
  {
    id: 1,
    name: "Ram",
    subtitle: "He owes you",
    amount: 8000,
    currency: "NPR",
    due: "20 May",
    status: "Due soon",
  },
  {
    id: 2,
    name: "Sita",
    subtitle: "You lent",
    amount: 200,
    currency: "GBP",
    due: "12 May",
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Hari",
    subtitle: "He owes you",
    amount: 3000,
    currency: "NPR",
    due: "5 May",
    status: "Overdue",
  },
  {
    id: 4,
    name: "Kamal Store",
    subtitle: "You owe",
    amount: 12000,
    currency: "NPR",
    due: "1 Jun",
    status: "Upcoming",
  },
  {
    id: 5,
    name: "Uncle Binod",
    subtitle: "You lent",
    amount: 100,
    currency: "USD",
    due: "No deadline",
    status: "Active",
  },
];

const ledgerRows = [
  {
    date: "4 May 2026",
    label: "Diyeko",
    note: "School fee",
    amount: "+ NPR 10,000",
  },
  {
    date: "20 May 2026",
    label: "Received partial",
    note: "Cash",
    amount: "- NPR 3,000",
  },
];

function money(currency, amount) {
  return `${currency} ${Number(amount || 0).toLocaleString()}`;
}

const iconStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 22,
  height: 22,
  fontSize: 18,
};

function I({ children }) {
  return <span style={iconStyle}>{children}</span>;
}

function Button({
  children,
  onClick,
  variant = "dark",
  style = {},
  type = "button",
}) {
  const base = {
    border: variant === "dark" ? "1px solid #111" : "1px solid #ddd",
    background: variant === "dark" ? "#111" : "#fff",
    color: variant === "dark" ? "#fff" : "#111",
    borderRadius: 16,
    padding: "12px 16px",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
  };
  return (
    <button type={type} onClick={onClick} style={{ ...base, ...style }}>
      {children}
    </button>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 1px 6px rgba(0,0,0,.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Phone({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 390,
        minHeight: 760,
        background: "#fff",
        borderRadius: 32,
        border: "1px solid #ddd",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 22px 60px rgba(0,0,0,.18)",
        position: "relative",
      }}
    >
      <div
        style={{
          height: 28,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#444",
        }}
      >
        <span>9:41</span>
        <span>▰ ▰ ◔</span>
      </div>
      {children}
    </div>
  );
}

function TopBar({ title, back, onBack, right }) {
  return (
    <div
      style={{
        height: 50,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {back ? (
          <button onClick={onBack} style={plainBtn}>
            ‹
          </button>
        ) : (
          <I>☰</I>
        )}
        <strong>{title}</strong>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {right}
      </div>
    </div>
  );
}

const plainBtn = {
  background: "none",
  border: 0,
  fontSize: 28,
  cursor: "pointer",
  lineHeight: 1,
};

function BottomNav({ screen, go }) {
  const items = [
    ["home", "⌂", "Home"],
    ["people", "👤", "Byakti"],
    ["reminders", "🔔", "Reminders"],
    ["settings", "⚙", "Settings"],
  ];
  return (
    <div
      style={{
        height: 66,
        display: "flex",
        borderTop: "1px solid #eee",
        background: "#fff",
      }}
    >
      {items.map(([key, icon, label]) => (
        <button
          key={key}
          onClick={() => go(key)}
          style={{
            flex: 1,
            border: 0,
            background: "#fff",
            cursor: "pointer",
            color: screen === key ? "#111" : "#777",
            fontSize: 11,
          }}
        >
          <div style={{ fontSize: 20 }}>{icon}</div>
          {label}
        </button>
      ))}
    </div>
  );
}

function Avatar({ name }) {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: "#e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
      }}
    >
      {name?.[0]}
    </div>
  );
}

function StepHeader({ step, title, hint }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "#999" }}>{step}</div>
      <h1 style={{ margin: "4px 0", fontSize: 26 }}>{title}</h1>
      <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{hint}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: 12,
          color: "#666",
          marginBottom: 5,
        }}
      >
        {label}
      </span>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 16,
          padding: "12px 14px",
          background: "#fff",
          fontSize: 14,
        }}
      >
        {children}
      </div>
    </label>
  );
}

const inputStyle = {
  width: "100%",
  border: 0,
  outline: 0,
  fontSize: 14,
  background: "transparent",
};

function Splash({ go }) {
  return (
    <Phone>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 95,
            height: 95,
            borderRadius: 28,
            background: "#eee",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 24,
          }}
        >
          LN
        </div>
        <h1 style={{ margin: 0, fontSize: 26 }}>LenDen Notes</h1>
        <p style={{ color: "#666" }}>Tapaiko sajilo len-den record</p>
        <Button onClick={() => go("home")} style={{ marginTop: 32 }}>
          Open prototype
        </Button>
      </div>
    </Phone>
  );
}

function HomeScreen({ go }) {
  return (
    <Phone>
      <TopBar
        title="LenDen Notes"
        right={
          <>
            <I>⌕</I>
            <I>🔔</I>
          </>
        }
      />
      <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <Card style={{ padding: 16 }}>
            <p style={small}>
              You’ll Receive
              <br />
              <span>Diyeko</span>
            </p>
            <h3>NPR 45,600</h3>
            <strong>GBP 200</strong>
          </Card>
          <Card style={{ padding: 16 }}>
            <p style={small}>
              You Owe
              <br />
              <span>Liyeko</span>
            </p>
            <h3>NPR 18,200</h3>
          </Card>
        </div>
        <Card style={{ padding: 20, textAlign: "center", marginTop: 12 }}>
          <p style={small}>Net Balance</p>
          <h1 style={{ margin: "4px 0" }}>NPR 27,400</h1>
          <p style={small}>Grouped by currency. No auto conversion.</p>
        </Card>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <strong>Urgent</strong>
          <button onClick={() => go("reminders")} style={linkBtn}>
            View all
          </button>
        </div>
        <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
          {peopleSeed.slice(0, 3).map((p) => (
            <PersonRow key={p.id} p={p} onClick={() => go("ledger")} />
          ))}
        </div>
      </div>
      <FAB onClick={() => go("addPerson")} />
      <BottomNav screen="home" go={go} />
    </Phone>
  );
}

const small = { margin: 0, fontSize: 12, color: "#666" };
const linkBtn = {
  border: 0,
  background: "none",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: 12,
};

function PersonRow({ p, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "1px solid #eee",
        background: "#fafafa",
        borderRadius: 16,
        padding: 12,
        display: "flex",
        alignItems: "center",
        gap: 12,
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <Avatar name={p.name} />
      <div style={{ flex: 1 }}>
        <strong>{p.name}</strong>
        <p style={small}>{p.subtitle}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <strong style={{ fontSize: 13 }}>{money(p.currency, p.amount)}</strong>
        <p style={small}>{p.due}</p>
      </div>
    </button>
  );
}

function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        right: 20,
        bottom: 86,
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: 0,
        background: "#111",
        color: "#fff",
        fontSize: 32,
        cursor: "pointer",
        boxShadow: "0 8px 22px rgba(0,0,0,.25)",
      }}
    >
      +
    </button>
  );
}

function PeopleScreen({ go }) {
  return (
    <Phone>
      <TopBar
        title="Byakti"
        back
        onBack={() => go("home")}
        right={
          <>
            <I>⌕</I>
            <I>⋮</I>
          </>
        }
      />
      <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 16,
            padding: 12,
            color: "#999",
            marginBottom: 14,
          }}
        >
          ⌕ Search by name
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {peopleSeed.map((p) => (
            <PersonRow key={p.id} p={p} onClick={() => go("ledger")} />
          ))}
        </div>
      </div>
      <FAB onClick={() => go("addPerson")} />
      <BottomNav screen="people" go={go} />
    </Phone>
  );
}

function AddPersonStep({ go, form, setForm }) {
  const filtered = peopleSeed.filter(
    (p) =>
      !form.person || p.name.toLowerCase().includes(form.person.toLowerCase()),
  );
  return (
    <Phone>
      <TopBar title="Naya LenDen" back onBack={() => go("home")} />
      <div style={{ flex: 1, padding: 16 }}>
        <StepHeader
          step="1 of 4"
          title="Byakti"
          hint="Search existing or add new"
        />
        <div
          style={{
            marginTop: 20,
            border: "1px solid #ddd",
            borderRadius: 16,
            padding: 12,
          }}
        >
          <input
            style={inputStyle}
            value={form.person}
            onChange={(e) => setForm({ ...form, person: e.target.value })}
            placeholder="Name search or type new"
          />
        </div>
        <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setForm({ ...form, person: p.name });
                go("addDetails");
              }}
              style={rowBtn}
            >
              <Avatar name={p.name} /> {p.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => go("addDetails")}
          style={{ ...rowBtn, marginTop: 10, justifyContent: "center" }}
        >
          + Add New Byakti
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <Button onClick={() => go("addDetails")}>Next</Button>
      </div>
    </Phone>
  );
}

const rowBtn = {
  width: "100%",
  border: "1px solid #eee",
  background: "#fff",
  borderRadius: 16,
  padding: 12,
  display: "flex",
  alignItems: "center",
  gap: 12,
  cursor: "pointer",
};

function AddDetailsStep({ go, form, setForm }) {
  return (
    <Phone>
      <TopBar title="Naya LenDen" back onBack={() => go("addPerson")} />
      <div style={{ flex: 1, padding: 16, display: "grid", gap: 14 }}>
        <StepHeader
          step="2 of 4"
          title="Rakam"
          hint="Record in under 15 seconds"
        />
        <Field label="Byakti">
          <input
            style={inputStyle}
            value={form.person}
            onChange={(e) => setForm({ ...form, person: e.target.value })}
          />
        </Field>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 95px", gap: 8 }}
        >
          <Field label="Rakam">
            <input
              style={inputStyle}
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </Field>
          <Field label="Currency">
            <select
              style={inputStyle}
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            >
              {currencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <div>
          <span style={{ fontSize: 12, color: "#666" }}>Diyeko / Liyeko</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginTop: 8,
            }}
          >
            <Button
              variant={form.type === "Diyeko" ? "dark" : "light"}
              onClick={() => setForm({ ...form, type: "Diyeko" })}
            >
              Diyeko
            </Button>
            <Button
              variant={form.type === "Liyeko" ? "dark" : "light"}
              onClick={() => setForm({ ...form, type: "Liyeko" })}
            >
              Liyeko
            </Button>
          </div>
        </div>
        <Field label="Karan (optional)">
          <input
            style={inputStyle}
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            placeholder="School fee, emergency, shop credit..."
          />
        </Field>
      </div>
      <div style={{ padding: 16 }}>
        <Button onClick={() => go("addMore")}>Next</Button>
      </div>
    </Phone>
  );
}

function AddMoreStep({ go, form, setForm }) {
  return (
    <Phone>
      <TopBar title="More Details" back onBack={() => go("addDetails")} />
      <div style={{ flex: 1, padding: 16, display: "grid", gap: 14 }}>
        <StepHeader
          step="3 of 4"
          title="Optional"
          hint="You can always edit later"
        />
        <Field label="Miti (transaction date)">
          <input
            style={inputStyle}
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </Field>
        <Field label="Myad (due date)">
          <input
            style={inputStyle}
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </Field>
        <div
          style={{ border: "1px solid #ddd", borderRadius: 18, padding: 15 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>Byaj</strong>
              <p style={small}>Simple interest only</p>
            </div>
            <button
              onClick={() =>
                setForm({ ...form, hasInterest: !form.hasInterest })
              }
              style={{
                width: 50,
                height: 28,
                borderRadius: 20,
                border: 0,
                background: form.hasInterest ? "#111" : "#ddd",
                padding: 3,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#fff",
                  transform: form.hasInterest
                    ? "translateX(22px)"
                    : "translateX(0)",
                }}
              />
            </button>
          </div>
          {form.hasInterest && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginTop: 12,
              }}
            >
              <Field label="Rate">
                <input
                  style={inputStyle}
                  value={form.rate}
                  onChange={(e) => setForm({ ...form, rate: e.target.value })}
                />
              </Field>
              <Field label="Period">
                <select
                  style={inputStyle}
                  value={form.ratePeriod}
                  onChange={(e) =>
                    setForm({ ...form, ratePeriod: e.target.value })
                  }
                >
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </Field>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <Button onClick={() => go("addReminder")}>Next</Button>
      </div>
    </Phone>
  );
}

function ReminderStep({ go, form, setForm }) {
  const options = [
    "Skip",
    "1 day before",
    "1 week before",
    "1 month before",
    "On due date",
    "After overdue",
  ];
  return (
    <Phone>
      <TopBar title="Notify?" back onBack={() => go("addMore")} />
      <div style={{ flex: 1, padding: 16 }}>
        <StepHeader
          step="4 of 4"
          title="Yaad dilaune?"
          hint="Choose when to remind you"
        />
        <div style={{ display: "grid", gap: 8, marginTop: 20 }}>
          {options.map((o) => (
            <button
              key={o}
              onClick={() => setForm({ ...form, reminder: o })}
              style={{
                border:
                  form.reminder === o ? "2px solid #111" : "1px solid #ddd",
                background: form.reminder === o ? "#fafafa" : "#fff",
                borderRadius: 16,
                padding: 14,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {form.reminder === o ? "●" : "○"} {o}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <Button onClick={() => go("success")}>Save Transaction</Button>
      </div>
    </Phone>
  );
}

function SuccessScreen({ go, form }) {
  return (
    <Phone>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 80 }}>✓</div>
        <h1>LenDen saved!</h1>
        <p style={{ color: "#666" }}>
          {form.person || "Ram"} · {money(form.currency, form.amount || 10000)}{" "}
          · {form.type}
        </p>
        <p style={small}>Reminder: {form.reminder}</p>
        <Button onClick={() => go("ledger")} style={{ marginTop: 30 }}>
          View Details
        </Button>
        <Button
          variant="light"
          onClick={() => go("home")}
          style={{ marginTop: 10 }}
        >
          Done
        </Button>
      </div>
    </Phone>
  );
}

function Mini({ label, value }) {
  return (
    <div style={{ background: "#fafafa", borderRadius: 12, padding: 9 }}>
      <p style={small}>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}
function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
      <span style={{ color: "#666" }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LedgerScreen({ go }) {
  return (
    <Phone>
      <TopBar
        title="Ram"
        back
        onBack={() => go("home")}
        right={
          <>
            <button onClick={() => go("editPerson")} style={plainSmall}>
              ✎
            </button>
            <I>⋮</I>
          </>
        }
      />
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
          display: "grid",
          gap: 14,
        }}
      >
        <Card style={{ padding: 16, textAlign: "center" }}>
          <p style={small}>Total Due as of 4 May 2026</p>
          <h1 style={{ margin: "4px 0" }}>NPR 11,000</h1>
          <p style={small}>Ram owes you</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
              marginTop: 14,
            }}
          >
            <Mini label="Principal" value="10,000" />
            <Mini label="Interest" value="1,000" />
            <Mini label="Paid" value="3,000" />
          </div>
        </Card>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 18,
            padding: 15,
            background: "#fafafa",
          }}
        >
          <strong>How interest affects</strong>
          <div style={{ display: "grid", gap: 5, marginTop: 10, fontSize: 14 }}>
            <Row label="Principal" value="NPR 10,000" />
            <Row label="Rate" value="5% monthly" />
            <Row label="Duration" value="2 months" />
            <Row label="Interest" value="NPR 1,000" />
            <Row label="Remaining" value="NPR 8,000" />
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <strong>Transactions</strong>
            <button style={linkBtn} onClick={() => go("addDetails")}>
              Add
            </button>
          </div>
          {ledgerRows.map((r, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #eee",
                borderRadius: 16,
                padding: 12,
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{r.label}</strong>
                <p style={small}>
                  {r.date} · {r.note}
                </p>
              </div>
              <strong>{r.amount}</strong>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          padding: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <Button variant="light" onClick={() => go("share")}>
          Share / Image
        </Button>
        <Button onClick={() => go("addDetails")}>Add Transaction</Button>
      </div>
    </Phone>
  );
}

const plainSmall = {
  border: 0,
  background: "none",
  fontSize: 20,
  cursor: "pointer",
};

function EditPerson({ go }) {
  return (
    <Phone>
      <TopBar title="Edit Byakti" back onBack={() => go("ledger")} />
      <div style={{ flex: 1, padding: 16, display: "grid", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 95,
              height: 95,
              borderRadius: "50%",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
            }}
          >
            👤
          </div>
        </div>
        <Field label="Name">
          <input style={inputStyle} defaultValue="Ram Bahadur" />
        </Field>
        <Field label="Nickname">
          <input style={inputStyle} defaultValue="Ram Dai" />
        </Field>
        <Field label="Phone">
          <input style={inputStyle} defaultValue="98XXXXXXX" />
        </Field>
        <Field label="Note">
          <input style={inputStyle} defaultValue="School friend" />
        </Field>
      </div>
      <div style={{ padding: 16 }}>
        <Button onClick={() => go("ledger")}>Save</Button>
      </div>
    </Phone>
  );
}

function RemindersScreen({ go }) {
  return (
    <Phone>
      <TopBar title="Reminders" back onBack={() => go("home")} />
      <div
        style={{
          padding: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <Button>Upcoming</Button>
        <Button variant="light">Overdue</Button>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
          display: "grid",
          gap: 8,
        }}
      >
        {peopleSeed.slice(0, 4).map((p) => (
          <PersonRow key={p.id} p={p} onClick={() => go("ledger")} />
        ))}
      </div>
      <BottomNav screen="reminders" go={go} />
    </Phone>
  );
}

function ShareScreen({ go }) {
  return (
    <Phone>
      <TopBar title="Share Image" back onBack={() => go("ledger")} />
      <div style={{ flex: 1, padding: 16 }}>
        <div
          style={{
            width: 260,
            margin: "0 auto",
            border: "1px solid #ddd",
            borderRadius: 28,
            padding: 22,
            boxShadow: "0 5px 20px rgba(0,0,0,.08)",
          }}
        >
          <p style={{ textAlign: "center", fontWeight: 800 }}>LenDen Notes</p>
          <h1>Ram</h1>
          <p style={small}>He owes you</p>
          <div style={{ display: "grid", gap: 8, marginTop: 20, fontSize: 14 }}>
            <Row label="Total Due" value="NPR 11,000" />
            <Row label="Principal" value="NPR 10,000" />
            <Row label="Interest" value="NPR 1,000" />
            <Row label="Paid" value="NPR 3,000" />
            <Row label="Due Date" value="20 May 2026" />
          </div>
          <p style={{ fontSize: 10, color: "#999", marginTop: 35 }}>
            Generated on: 4 May 2026, 12:30 PM
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 20,
          }}
        >
          <Button>Share</Button>
          <Button variant="light">Save Image</Button>
        </div>
      </div>
    </Phone>
  );
}

function SettingsScreen({ go }) {
  const items = [
    ["💳", "Currency", "NPR"],
    ["☁", "Backup & Restore", "Local first"],
    ["🔔", "Notifications", "On"],
    ["🌐", "Language", "Nepali (Roman)"],
    ["🔒", "Privacy", "Encrypted local data"],
  ];
  return (
    <Phone>
      <TopBar title="Settings" back onBack={() => go("home")} />
      <div style={{ flex: 1, padding: 16, display: "grid", gap: 8 }}>
        {items.map(([ic, label, value]) => (
          <div
            key={label}
            style={{
              border: "1px solid #eee",
              borderRadius: 16,
              padding: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>{ic}</span>
            <div style={{ flex: 1 }}>
              <strong>{label}</strong>
              <p style={small}>{value}</p>
            </div>
            <span>›</span>
          </div>
        ))}
      </div>
      <BottomNav screen="settings" go={go} />
    </Phone>
  );
}

function Guide() {
  return (
    <aside style={{ width: 320, display: "grid", gap: 14 }} className="guide">
      <Card style={{ padding: 22 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>LenDen Notes</h1>
        <p style={{ color: "#666" }}>Clickable MVP prototype</p>
      </Card>
      <Card style={{ padding: 22 }}>
        <h3>Locked principles</h3>
        <ul style={{ color: "#555", lineHeight: 1.9 }}>
          <li>Simple on surface</li>
          <li>Local-first</li>
          <li>Nepali/Roman terms</li>
          <li>Multi-currency grouped</li>
          <li>No forced signup</li>
          <li>Under 15 seconds to record</li>
        </ul>
      </Card>
      <Card style={{ padding: 22 }}>
        <h3>Test task</h3>
        <p style={{ color: "#555", lineHeight: 1.6 }}>
          Ask a user: “Record NPR 10,000 given to Ram, due on 20 May, with 5%
          monthly interest.” Watch where they hesitate.
        </p>
      </Card>
    </aside>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [form, setForm] = useState({
    person: "",
    amount: "10000",
    currency: "NPR",
    type: "Diyeko",
    reason: "School fee",
    date: "2026-05-04",
    dueDate: "2026-05-20",
    hasInterest: true,
    rate: "5",
    ratePeriod: "Monthly",
    reminder: "1 day before",
  });
  const go = setScreen;
  const screens = {
    splash: <Splash go={go} />,
    home: <HomeScreen go={go} />,
    people: <PeopleScreen go={go} />,
    addPerson: <AddPersonStep go={go} form={form} setForm={setForm} />,
    addDetails: <AddDetailsStep go={go} form={form} setForm={setForm} />,
    addMore: <AddMoreStep go={go} form={form} setForm={setForm} />,
    addReminder: <ReminderStep go={go} form={form} setForm={setForm} />,
    success: <SuccessScreen go={go} form={form} />,
    ledger: <LedgerScreen go={go} />,
    editPerson: <EditPerson go={go} />,
    reminders: <RemindersScreen go={go} />,
    share: <ShareScreen go={go} />,
    settings: <SettingsScreen go={go} />,
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f3f3",
        padding: 24,
        display: "flex",
        justifyContent: "center",
        gap: 32,
        fontFamily: "Inter, Arial, sans-serif",
        color: "#111",
      }}
    >
      <style>{`@media(max-width:900px){.guide{display:none!important}} input,select{font-family:inherit}`}</style>
      <Guide />
      {screens[screen]}
    </div>
  );
}
