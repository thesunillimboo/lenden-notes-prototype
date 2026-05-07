import React, { useMemo, useState } from "react";

const BRAND = "#0F766E";
const TEXT = "#111827";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const SURFACE = "#F8F9FA";
const RECEIVE = "#16A34A";
const OWE = "#F97316";

const contacts = [
  {
    id: 1,
    name: "Ram",
    status: "Owes you",
    amount: "NPR 11,000",
    due: "Due in 2 days",
    dueSmall: "20 May 2026",
    kind: "receive",
  },
  {
    id: 2,
    name: "Hari",
    status: "You owe",
    amount: "GBP 250",
    due: "Overdue by 3 days",
    dueSmall: "3 May 2026",
    kind: "owe",
  },
  {
    id: 3,
    name: "Sita",
    status: "Settled",
    amount: "No pending balance",
    due: "Last updated yesterday",
    dueSmall: "No reminder",
    kind: "settled",
  },
  {
    id: 4,
    name: "Kamal Store",
    status: "Owes you",
    amount: "NPR 12,000",
    due: "Due in 10 days",
    dueSmall: "28 May 2026",
    kind: "receive",
  },
];

const transactions = [
  {
    type: "You lent money",
    amount: "+ NPR 10,000",
    date: "4 May 2026",
    note: "School fee",
    kind: "receive",
  },
  {
    type: "Received payment",
    amount: "- NPR 3,000",
    date: "20 May 2026",
    note: "Cash payment",
    kind: "neutral",
  },
  {
    type: "Interest added",
    amount: "+ NPR 1,000",
    date: "20 May 2026",
    note: "5% monthly interest",
    kind: "receive",
  },
];

const reminderRows = [
  {
    name: "Hari",
    amount: "GBP 250",
    label: "Overdue by 3 days",
    date: "3 May 2026",
    kind: "owe",
  },
  {
    name: "Ram",
    amount: "NPR 11,000",
    label: "Due in 2 days",
    date: "20 May 2026",
    kind: "receive",
  },
  {
    name: "Kamal Store",
    amount: "NPR 12,000",
    label: "Due in 10 days",
    date: "28 May 2026",
    kind: "receive",
  },
];

const currencyOptions = [
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

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [recordType, setRecordType] = useState("lent");
  const [interestOn, setInterestOn] = useState(false);
  const [notify, setNotify] = useState("1 day before");

  const activeColor = selectedContact.kind === "owe" ? OWE : RECEIVE;

  const openLedger = (person) => {
    setSelectedContact(person);
    setScreen("ledger");
  };

  return (
    <div style={styles.page}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { min-height: 100%; margin: 0; }
        button, input, select { font: inherit; }
        button { color: inherit; -webkit-appearance: none; appearance: none; }
        input, select { color: #111827; }
        @media (max-width: 480px) {
          .prototype-phone {
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      <div className="prototype-phone" style={styles.phone}>
        <StatusBar />

        {screen === "home" && (
          <HomeScreen
            onAdd={() => setScreen("add")}
            onLedger={openLedger}
            onReminders={() => setScreen("reminders")}
            onSettings={() => setScreen("settings")}
          />
        )}

        {screen === "ledger" && (
          <LedgerScreen
            person={selectedContact}
            activeColor={activeColor}
            onBack={() => setScreen("home")}
            onAdd={() => setScreen("add")}
            onShare={() => setScreen("share")}
          />
        )}

        {screen === "add" && (
          <AddRecordScreen
            onBack={() => setScreen("home")}
            recordType={recordType}
            setRecordType={setRecordType}
            interestOn={interestOn}
            setInterestOn={setInterestOn}
            notify={notify}
            setNotify={setNotify}
            onSave={() => setScreen("success")}
          />
        )}

        {screen === "success" && (
          <SuccessScreen
            onDone={() => setScreen("home")}
            onLedger={() => setScreen("ledger")}
          />
        )}

        {screen === "reminders" && (
          <RemindersScreen
            onBack={() => setScreen("home")}
            onLedger={openLedger}
          />
        )}

        {screen === "share" && (
          <ShareScreen
            person={selectedContact}
            onBack={() => setScreen("ledger")}
          />
        )}

        {screen === "settings" && (
          <SettingsScreen onBack={() => setScreen("home")} />
        )}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={styles.statusBar}>
      <span>9:41</span>
      <span>▰ ▰ ◔</span>
    </div>
  );
}

function Header({ title, subtitle, back, onBack, right }) {
  return (
    <div style={styles.header}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {back && (
          <button style={styles.iconButton} onClick={onBack}>
            ←
          </button>
        )}
        <div>
          <h1 style={styles.headerTitle}>{title}</h1>
          {subtitle && <p style={styles.headerSubtitle}>{subtitle}</p>}
        </div>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

function HomeScreen({ onAdd, onLedger, onReminders, onSettings }) {
  return (
    <div style={styles.screen}>
      <Header
        title="LenDen Notes"
        subtitle="So you don’t have to remember"
        right={
          <button style={styles.smallIconButton} onClick={onSettings}>
            ⚙
          </button>
        }
      />

      <div style={styles.content}>
        <div style={styles.searchBox}>
          <span style={{ color: MUTED }}>⌕</span>
          <input style={styles.searchInput} placeholder="Search people" />
        </div>

        <div style={styles.summaryRow}>
          <div style={styles.summaryMini}>
            <span style={styles.miniLabel}>You’ll Receive</span>
            <strong>NPR 23,000</strong>
          </div>
          <div style={styles.summaryMini}>
            <span style={styles.miniLabel}>You Owe</span>
            <strong>GBP 250</strong>
          </div>
        </div>

        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>People</h2>
          <button style={styles.linkButton} onClick={onReminders}>
            Reminders
          </button>
        </div>

        <div style={styles.list}>
          {contacts.map((person) => (
            <ContactRow
              key={person.id}
              person={person}
              onClick={() => onLedger(person)}
            />
          ))}
        </div>
      </div>

      <button style={styles.fab} onClick={onAdd}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
        <span>Add Record</span>
      </button>
    </div>
  );
}

function ContactRow({ person, onClick }) {
  const color =
    person.kind === "receive" ? RECEIVE : person.kind === "owe" ? OWE : MUTED;

  return (
    <button style={styles.contactRow} onClick={onClick}>
      <div style={styles.avatar}>{person.name[0]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={styles.rowTop}>
          <strong style={styles.personName}>{person.name}</strong>
          <strong style={{ ...styles.amountText, color }}>
            {person.amount}
          </strong>
        </div>
        <p style={{ ...styles.statusText, color }}>{person.status}</p>
        <p style={styles.dueText}>{person.due}</p>
      </div>
    </button>
  );
}

function LedgerScreen({ person, activeColor, onBack, onAdd, onShare }) {
  const isSettled = person.kind === "settled";

  return (
    <div style={styles.screen}>
      <Header
        title={person.name}
        back
        onBack={onBack}
        right={<button style={styles.smallIconButton}>⋯</button>}
      />

      <div style={styles.content}>
        <div style={styles.ledgerHero}>
          <p style={styles.miniLabel}>
            {isSettled ? "Current status" : "Total due"}
          </p>
          <h2
            style={{
              ...styles.ledgerAmount,
              color: isSettled ? MUTED : activeColor,
            }}
          >
            {person.amount}
          </h2>
          <p style={styles.dueText}>
            {isSettled ? "No active balance" : person.due}
          </p>
        </div>

        {!isSettled && (
          <div style={styles.softCard}>
            <div style={styles.rowTop}>
              <h3 style={styles.cardTitle}>Interest Summary</h3>
              <span style={styles.pill}>Optional</span>
            </div>
            <InfoRow label="Principal" value="NPR 10,000" />
            <InfoRow label="Interest" value="NPR 1,000" />
            <InfoRow label="Rate" value="5% monthly" />
          </div>
        )}

        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>History</h2>
        </div>

        <div style={styles.list}>
          {transactions.map((tx, index) => (
            <TransactionRow key={index} tx={tx} />
          ))}
        </div>
      </div>

      <div style={styles.bottomActions}>
        <button style={styles.secondaryButton} onClick={onShare}>
          Share
        </button>
        <button style={styles.primaryButton} onClick={onAdd}>
          Add Record
        </button>
      </div>
    </div>
  );
}

function TransactionRow({ tx }) {
  const color =
    tx.kind === "receive" ? RECEIVE : tx.kind === "owe" ? OWE : TEXT;

  return (
    <div style={styles.transactionRow}>
      <div>
        <strong>{tx.type}</strong>
        <p style={styles.dueText}>
          {tx.date} • {tx.note}
        </p>
      </div>
      <strong style={{ color }}>{tx.amount}</strong>
    </div>
  );
}

function AddRecordScreen({
  onBack,
  recordType,
  setRecordType,
  interestOn,
  setInterestOn,
  notify,
  setNotify,
  onSave,
}) {
  return (
    <div style={styles.screen}>
      <Header
        title="Add Record"
        subtitle="Keep it quick and simple"
        back
        onBack={onBack}
      />

      <div style={styles.content}>
        <Field label="Person">
          <input
            style={styles.input}
            placeholder="Search or add name"
            defaultValue="Ram"
          />
        </Field>

        <div style={styles.twoColumn}>
          <Field label="Amount">
            <input style={styles.input} placeholder="0" defaultValue="10000" />
          </Field>
          <Field label="Currency">
            <select style={styles.input} defaultValue="NPR">
              {currencyOptions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>

        <div>
          <label style={styles.label}>What happened?</label>
          <div style={styles.segmentGroup}>
            <button
              style={
                recordType === "lent" ? styles.segmentActive : styles.segment
              }
              onClick={() => setRecordType("lent")}
            >
              You lent
            </button>
            <button
              style={
                recordType === "borrowed"
                  ? styles.segmentActive
                  : styles.segment
              }
              onClick={() => setRecordType("borrowed")}
            >
              You borrowed
            </button>
          </div>
        </div>

        <Field label="Reason">
          <input
            style={styles.input}
            placeholder="School fee, emergency, shop credit..."
            defaultValue="School fee"
          />
        </Field>

        <div style={styles.twoColumn}>
          <Field label="Record Date">
            <input style={styles.input} type="date" defaultValue="2026-05-04" />
          </Field>
          <Field label="Due Date">
            <input style={styles.input} type="date" defaultValue="2026-05-20" />
          </Field>
        </div>

        <div style={styles.softCard}>
          <div style={styles.rowTop}>
            <div>
              <h3 style={styles.cardTitle}>Interest</h3>
              <p style={styles.dueText}>Simple interest only</p>
            </div>
            <button
              style={{
                ...styles.toggle,
                background: interestOn ? BRAND : BORDER,
              }}
              onClick={() => setInterestOn(!interestOn)}
            >
              <span
                style={{
                  ...styles.toggleDot,
                  transform: interestOn ? "translateX(20px)" : "translateX(0)",
                }}
              />
            </button>
          </div>

          {interestOn && (
            <div style={{ ...styles.twoColumn, marginTop: 12 }}>
              <Field label="Rate">
                <input style={styles.input} defaultValue="5" />
              </Field>
              <Field label="Period">
                <select style={styles.input} defaultValue="Monthly">
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </Field>
            </div>
          )}
        </div>

        <div style={styles.softCard}>
          <h3 style={styles.cardTitle}>Notify me?</h3>
          <div style={styles.notifyGrid}>
            {[
              "Skip",
              "1 day before",
              "1 week before",
              "1 month before",
              "On due date",
            ].map((item) => (
              <button
                key={item}
                style={
                  notify === item ? styles.notifyActive : styles.notifyButton
                }
                onClick={() => setNotify(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.bottomActionsSingle}>
        <button style={styles.primaryButton} onClick={onSave}>
          Save Record
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ onDone, onLedger }) {
  return (
    <div style={styles.screenCenter}>
      <div style={styles.successIcon}>✓</div>
      <h1 style={styles.successTitle}>Record saved</h1>
      <p style={styles.successText}>Ram • NPR 10,000 • Due in 2 days</p>
      <button
        style={{ ...styles.primaryButton, width: "100%", marginTop: 28 }}
        onClick={onLedger}
      >
        View Details
      </button>
      <button
        style={{ ...styles.secondaryButton, width: "100%", marginTop: 10 }}
        onClick={onDone}
      >
        Done
      </button>
    </div>
  );
}

function RemindersScreen({ onBack, onLedger }) {
  return (
    <div style={styles.screen}>
      <Header
        title="Reminders"
        subtitle="Sorted by urgency"
        back
        onBack={onBack}
      />
      <div style={styles.content}>
        {reminderRows.map((row, index) => {
          const color = row.kind === "owe" ? OWE : RECEIVE;
          const person =
            contacts.find((c) => c.name === row.name) || contacts[0];
          return (
            <button
              key={index}
              style={styles.contactRow}
              onClick={() => onLedger(person)}
            >
              <div style={styles.avatar}>{row.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.rowTop}>
                  <strong>{row.name}</strong>
                  <strong style={{ color }}>{row.label}</strong>
                </div>
                <p style={styles.statusText}>{row.amount}</p>
                <p style={styles.dueText}>{row.date}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ShareScreen({ person, onBack }) {
  return (
    <div style={styles.screen}>
      <Header title="Share Summary" back onBack={onBack} />
      <div style={styles.contentCentered}>
        <div style={styles.shareCard}>
          <p style={styles.shareBrand}>LenDen Notes</p>
          <h2 style={styles.shareName}>{person.name}</h2>
          <p style={styles.statusText}>{person.status}</p>
          <InfoRow label="Total Due" value="NPR 11,000" />
          <InfoRow label="Principal" value="NPR 10,000" />
          <InfoRow label="Interest" value="NPR 1,000" />
          <InfoRow label="Paid" value="NPR 3,000" />
          <InfoRow label="Due Date" value="20 May 2026" />
          <p style={styles.generatedText}>Generated on: 4 May 2026, 12:30 PM</p>
        </div>

        <button
          style={{ ...styles.primaryButton, width: "100%", marginTop: 20 }}
        >
          Share Image
        </button>
        <button
          style={{ ...styles.secondaryButton, width: "100%", marginTop: 10 }}
        >
          Save Image
        </button>
      </div>
    </div>
  );
}

function SettingsScreen({ onBack }) {
  const rows = [
    ["Default Currency", "NPR"],
    ["Language", "English"],
    ["Notifications", "On"],
    ["Backup", "Local first"],
    ["Privacy", "Data stays on your device"],
  ];

  return (
    <div style={styles.screen}>
      <Header title="Settings" back onBack={onBack} />
      <div style={styles.content}>
        {rows.map(([label, value]) => (
          <div key={label} style={styles.settingsRow}>
            <div>
              <strong>{label}</strong>
              <p style={styles.dueText}>{value}</p>
            </div>
            <span style={{ color: MUTED }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={styles.fieldWrap}>
      <span style={styles.label}>{label}</span>
      <div style={styles.inputShell}>{children}</div>
    </label>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    color: TEXT,
  },
  phone: {
    width: 390,
    height: 844,
    background: "#FFFFFF",
    borderRadius: 34,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 24px 70px rgba(17, 24, 39, 0.18)",
    border: "1px solid #E5E7EB",
  },
  statusBar: {
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 22px",
    fontSize: 12,
    color: TEXT,
    background: "#FFFFFF",
  },
  screen: {
    height: "calc(100% - 32px)",
    position: "relative",
    overflow: "hidden",
    background: "#FFFFFF",
  },
  screenCenter: {
    height: "calc(100% - 32px)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  header: {
    height: 78,
    padding: "12px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${BORDER}`,
    background: "#FFFFFF",
  },
  headerTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  headerSubtitle: {
    margin: "3px 0 0",
    fontSize: 13,
    color: MUTED,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    border: "none",
    background: "transparent",
    fontSize: 24,
    cursor: "pointer",
    color: TEXT,
  },
  smallIconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    border: "none",
    background: SURFACE,
    fontSize: 18,
    cursor: "pointer",
    color: TEXT,
  },
  content: {
    height: "calc(100% - 78px)",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "contain",
    padding: 16,
    paddingBottom: 130,
  },
  contentCentered: {
    height: "calc(100% - 78px)",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "contain",
    padding: 20,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchBox: {
    height: 46,
    background: SURFACE,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 14px",
    border: `1px solid ${BORDER}`,
  },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    flex: 1,
    fontSize: 14,
    color: TEXT,
  },
  summaryRow: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  summaryMini: {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 14,
  },
  miniLabel: {
    display: "block",
    color: MUTED,
    fontSize: 12,
    marginBottom: 5,
  },
  sectionTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
  },
  linkButton: {
    border: "none",
    background: "transparent",
    color: BRAND,
    fontWeight: 700,
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  contactRow: {
    width: "100%",
    color: TEXT,
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    minHeight: 76,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 13,
    display: "flex",
    alignItems: "center",
    gap: 12,
    textAlign: "left",
    cursor: "pointer",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    color: TEXT,
  },
  rowTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  personName: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  statusText: {
    margin: "4px 0 0",
    fontSize: 13,
  },
  dueText: {
    margin: "4px 0 0",
    fontSize: 12,
    color: MUTED,
  },
  fab: {
    position: "absolute",
    right: 18,
    bottom: 22,
    border: "none",
    background: BRAND,
    color: "#FFFFFF",
    borderRadius: 999,
    height: 54,
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 800,
    boxShadow: "0 12px 30px rgba(15, 118, 110, 0.25)",
    cursor: "pointer",
  },
  ledgerHero: {
    border: `1px solid ${BORDER}`,
    borderRadius: 22,
    padding: 18,
    background: "#FFFFFF",
  },
  ledgerAmount: {
    margin: "2px 0",
    fontSize: 34,
    lineHeight: 1.1,
    letterSpacing: "-0.04em",
  },
  softCard: {
    marginTop: 14,
    border: `1px solid ${BORDER}`,
    background: SURFACE,
    borderRadius: 20,
    padding: 15,
  },
  cardTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 800,
  },
  pill: {
    color: MUTED,
    background: "#FFFFFF",
    border: `1px solid ${BORDER}`,
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "7px 0",
    fontSize: 14,
    color: MUTED,
  },
  transactionRow: {
    color: TEXT,
    textDecoration: "none",
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  bottomActions: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    borderTop: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    padding: 14,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  bottomActionsSingle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    borderTop: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    padding: 14,
  },
  primaryButton: {
    border: "none",
    background: BRAND,
    color: "#FFFFFF",
    borderRadius: 16,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    height: 52,
  },
  secondaryButton: {
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    color: TEXT,
    borderRadius: 16,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    height: 52,
  },
  fieldWrap: {
    display: "block",
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: MUTED,
    marginBottom: 6,
  },
  inputShell: {
    minHeight: 46,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    padding: "0 13px",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: TEXT,
    fontSize: 14,
    fontFamily: "inherit",
  },
  twoColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 120px",
    gap: 10,
  },
  segmentGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  segment: {
    height: 46,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 16,
    color: TEXT,
    fontWeight: 800,
    cursor: "pointer",
  },
  segmentActive: {
    height: 46,
    border: `1px solid ${BRAND}`,
    background: BRAND,
    borderRadius: 16,
    color: "#FFFFFF",
    fontWeight: 800,
    cursor: "pointer",
  },
  toggle: {
    width: 48,
    height: 28,
    border: "none",
    borderRadius: 999,
    padding: 4,
    cursor: "pointer",
  },
  toggleDot: {
    display: "block",
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#FFFFFF",
    transition: "transform 0.2s ease",
  },
  notifyGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  notifyButton: {
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 999,
    padding: "8px 10px",
    fontSize: 12,
    cursor: "pointer",
    color: TEXT,
  },
  notifyActive: {
    border: `1px solid ${BRAND}`,
    background: "#ECFDF5",
    color: BRAND,
    borderRadius: 999,
    padding: "8px 10px",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 800,
  },
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: "50%",
    background: "#ECFDF5",
    color: BRAND,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 52,
    fontWeight: 900,
  },
  successTitle: {
    margin: "24px 0 4px",
    fontSize: 28,
    letterSpacing: "-0.03em",
  },
  successText: {
    margin: 0,
    color: MUTED,
    fontSize: 14,
  },
  shareCard: {
    width: 260,
    border: `1px solid ${BORDER}`,
    borderRadius: 26,
    padding: 22,
    background: "#FFFFFF",
    boxShadow: "0 10px 35px rgba(17, 24, 39, 0.08)",
  },
  shareBrand: {
    textAlign: "center",
    color: BRAND,
    fontWeight: 900,
    margin: 0,
  },
  shareName: {
    margin: "24px 0 0",
    fontSize: 28,
  },
  generatedText: {
    marginTop: 30,
    color: MUTED,
    fontSize: 10,
  },
  settingsRow: {
    minHeight: 64,
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#FFFFFF",
  },
};
