import React, { useMemo, useState } from "react";

const BRAND = "#0F766E";
const TEXT = "#111827";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const SURFACE = "#F8F9FA";
const RECEIVE = "#16A34A";
const OWE = "#F97316";
const DANGER = "#DC2626";
const WARNING = "#F97316";

const contacts = [
  {
    id: 1,
    name: "Ram Bahadur",
    initials: "R",
    status: "Owed to you",
    amount: "NPR 12,500",
    amountValue: 12500,
    currency: "NPR",
    due: "Overdue by 5 days",
    dueSmall: "Due date: May 25, 2026",
    reason: "Bike repair",
    kind: "receive",
    urgency: "overdue",
    lastUpdated: "Today",
  },
  {
    id: 2,
    name: "Sita Karki",
    initials: "S",
    status: "Owed to you",
    amount: "NPR 3,000",
    amountValue: 3000,
    currency: "NPR",
    due: "Due today",
    dueSmall: "Due date: May 30, 2026",
    reason: "Household help",
    kind: "receive",
    urgency: "today",
    lastUpdated: "Today",
  },
  {
    id: 3,
    name: "Bikash Thapa",
    initials: "B",
    status: "You owe",
    amount: "NPR 7,800",
    amountValue: 7800,
    currency: "NPR",
    due: "Due tomorrow",
    dueSmall: "Due date: May 31, 2026",
    reason: "Emergency cash",
    kind: "owe",
    urgency: "tomorrow",
    lastUpdated: "Yesterday",
  },
  {
    id: 4,
    name: "Anita Shrestha",
    initials: "A",
    status: "Owed to you",
    amount: "GBP 150",
    amountValue: 150,
    currency: "GBP",
    due: "Due in 2 days",
    dueSmall: "Due date: Jun 1, 2026",
    reason: "Lunch share",
    kind: "receive",
    urgency: "upcoming",
    lastUpdated: "May 28",
  },
  {
    id: 5,
    name: "Mangal Gurung",
    initials: "M",
    status: "You owe",
    amount: "USD 120",
    amountValue: 120,
    currency: "USD",
    due: "Due in 6 days",
    dueSmall: "Due date: Jun 5, 2026",
    reason: "Travel booking",
    kind: "owe",
    urgency: "upcoming",
    lastUpdated: "May 24",
  },
  {
    id: 6,
    name: "Kamal Store",
    initials: "K",
    status: "Owed to you",
    amount: "NPR 5,500",
    amountValue: 5500,
    currency: "NPR",
    due: "Due in 10 days",
    dueSmall: "Due date: Jun 9, 2026",
    reason: "Monthly grocery",
    kind: "receive",
    urgency: "upcoming",
    lastUpdated: "May 18",
  },
  {
    id: 7,
    name: "Prakash Rai",
    initials: "P",
    status: "Settled",
    amount: "No pending balance",
    amountValue: 0,
    currency: "NPR",
    due: "Last updated yesterday",
    dueSmall: "No active reminder",
    reason: "Returned",
    kind: "settled",
    urgency: "none",
    lastUpdated: "Yesterday",
  },
];

const transactions = [
  {
    id: 1,
    title: "You lent money",
    amount: "+ NPR 10,000",
    date: "May 10, 2026",
    note: "Bike repair",
    kind: "receive",
    meta: "Due: May 25, 2026 • 5% monthly",
  },
  {
    id: 2,
    title: "You lent money",
    amount: "+ NPR 5,000",
    date: "May 20, 2026",
    note: "Extra cash",
    kind: "receive",
    meta: "Due: Jun 20, 2026 • No interest",
  },
  {
    id: 3,
    title: "Payment received",
    amount: "- NPR 2,500",
    date: "Jun 1, 2026",
    note: "Partial payment",
    kind: "neutral",
    meta: "Cash payment",
  },
  {
    id: 4,
    title: "Interest added",
    amount: "+ NPR 620",
    date: "Today",
    note: "Interest till today",
    kind: "receive",
    meta: "Calculated from active interest record",
  },
];

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

const urgencyOrder = {
  overdue: 1,
  today: 2,
  tomorrow: 3,
  upcoming: 4,
  none: 9,
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [recordsFilter, setRecordsFilter] = useState("all");
  const [dueFilter, setDueFilter] = useState("all");
  const [recordType, setRecordType] = useState("lent");
  const [interestOn, setInterestOn] = useState(false);
  const [remindOn, setRemindOn] = useState(true);
  const [reminderChoice, setReminderChoice] = useState("On due date");

  const openLedger = (person) => {
    setSelectedContact(person);
    setScreen("ledger");
  };

  const openRecords = (filter = "all") => {
    setRecordsFilter(filter);
    setScreen("records");
  };

  const goHome = () => setScreen("home");

  return (
    <div style={styles.page}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { min-height: 100%; margin: 0; }
        button, input, select, textarea { font: inherit; }
        button { color: inherit; -webkit-appearance: none; appearance: none; }
        input, select, textarea { color: #111827; }
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
            onOpenRecords={openRecords}
            onLedger={openLedger}
            onAdd={() => setScreen("add")}
            onDue={() => setScreen("due")}
            onSettings={() => setScreen("settings")}
          />
        )}

        {screen === "records" && (
          <AllRecordsScreen
            filter={recordsFilter}
            setFilter={setRecordsFilter}
            onBack={goHome}
            onLedger={openLedger}
            onAdd={() => setScreen("add")}
            onNav={setScreen}
          />
        )}

        {screen === "due" && (
          <WhosDueScreen
            dueFilter={dueFilter}
            setDueFilter={setDueFilter}
            onBack={goHome}
            onLedger={openLedger}
            onNav={setScreen}
          />
        )}

        {screen === "ledger" && (
          <PersonLedgerScreen
            person={selectedContact}
            onBack={goHome}
            onAdd={() => setScreen("add")}
            onShare={() => setScreen("share")}
            onEdit={() => setScreen("edit")}
          />
        )}

        {screen === "add" && (
          <AddTransactionScreen
            onBack={goHome}
            recordType={recordType}
            setRecordType={setRecordType}
            interestOn={interestOn}
            setInterestOn={setInterestOn}
            remindOn={remindOn}
            setRemindOn={setRemindOn}
            reminderChoice={reminderChoice}
            setReminderChoice={setReminderChoice}
            onSave={() => setScreen("success")}
          />
        )}

        {screen === "edit" && (
          <EditTransactionScreen
            onBack={() => setScreen("ledger")}
            recordType={recordType}
            setRecordType={setRecordType}
            interestOn={interestOn}
            setInterestOn={setInterestOn}
            remindOn={remindOn}
            setRemindOn={setRemindOn}
            onSave={() => setScreen("ledger")}
          />
        )}

        {screen === "share" && (
          <ShareSummaryScreen
            person={selectedContact}
            onBack={() => setScreen("ledger")}
          />
        )}

        {screen === "settings" && (
          <SettingsScreen onBack={goHome} onNav={setScreen} />
        )}

        {screen === "success" && (
          <SuccessScreen onDone={goHome} onLedger={() => setScreen("ledger")} />
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
      <div style={styles.headerLeft}>
        {back && (
          <button style={styles.backButton} onClick={onBack} aria-label="Back">
            ←
          </button>
        )}
        <div>
          <h1 style={styles.headerTitle}>{title}</h1>
          {subtitle && <p style={styles.headerSubtitle}>{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

function BottomNav({ active, onNav }) {
  const items = [
    ["home", "⌂", "Home"],
    ["due", "◴", "Who's Due"],
    ["settings", "⚙", "Settings"],
  ];
  return (
    <div style={styles.bottomNav}>
      {items.map(([key, icon, label]) => (
        <button key={key} style={styles.navItem} onClick={() => onNav(key)}>
          <span
            style={{ ...styles.navIcon, color: active === key ? BRAND : MUTED }}
          >
            {icon}
          </span>
          <span
            style={{
              ...styles.navLabel,
              color: active === key ? BRAND : MUTED,
            }}
          >
            {label}
          </span>
          {key === "due" && <span style={styles.navBadge}>2</span>}
        </button>
      ))}
    </div>
  );
}

function HomeScreen({ onOpenRecords, onLedger, onAdd, onDue, onSettings }) {
  const latest = contacts.slice(0, 3);
  return (
    <div style={styles.screen}>
      <Header
        title="LenDen Notes"
        subtitle="So you don’t have to remember"
        right={
          <button style={styles.roundIcon} onClick={onSettings}>
            ⚙
          </button>
        }
      />

      <div style={styles.contentWithNav}>
        <SearchBox placeholder="Search people or records" />

        <div style={styles.summaryGrid}>
          <button
            style={{ ...styles.summaryCard, borderColor: "#D1FAE5" }}
            onClick={() => onOpenRecords("owed")}
          >
            <span style={{ ...styles.miniLabel, color: RECEIVE }}>
              You’ll Receive
            </span>
            <strong style={styles.summaryAmount}>NPR 23,000</strong>
            <span style={styles.summarySub}>GBP 150 • 3 people</span>
          </button>
          <button
            style={{ ...styles.summaryCard, borderColor: "#FFEDD5" }}
            onClick={() => onOpenRecords("owe")}
          >
            <span style={{ ...styles.miniLabel, color: OWE }}>You Owe</span>
            <strong style={styles.summaryAmount}>NPR 7,800</strong>
            <span style={styles.summarySub}>USD 120 • 2 people</span>
          </button>
        </div>

        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Recent Records</h2>
          <button style={styles.linkButton} onClick={onDue}>
            <span>🔔</span> Who’s Due <span style={styles.inlineBadge}>2</span>
          </button>
        </div>

        <div style={styles.list}>
          {latest.map((person) => (
            <ContactRow
              key={person.id}
              person={person}
              onClick={() => onLedger(person)}
            />
          ))}
        </div>

        <button
          style={styles.viewAllButton}
          onClick={() => onOpenRecords("all")}
        >
          View All Records <span>›</span>
        </button>
      </div>

      <button style={styles.fab} onClick={onAdd}>
        <span style={{ fontSize: 24, lineHeight: 1 }}>+</span>
        <span>Add Transaction</span>
      </button>

      <BottomNav
        active="home"
        onNav={
          onSettings
            ? (key) =>
                key === "settings"
                  ? onSettings()
                  : key === "due"
                    ? onDue()
                    : null
            : () => {}
        }
      />
    </div>
  );
}

function AllRecordsScreen({
  filter,
  setFilter,
  onBack,
  onLedger,
  onAdd,
  onNav,
}) {
  const filtered = contacts.filter((p) => {
    if (filter === "owed") return p.kind === "receive";
    if (filter === "owe") return p.kind === "owe";
    return true;
  });

  return (
    <div style={styles.screen}>
      <Header
        title="All Records"
        back
        onBack={onBack}
        right={<button style={styles.roundIcon}>☰</button>}
      />
      <div style={styles.contentWithNav}>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            ["all", "All"],
            ["owed", "Owed to You"],
            ["owe", "You Owe"],
          ]}
        />
        <div style={styles.sectionTitleRowCompact}>
          <h2 style={styles.sectionTitle}>Latest</h2>
          <span style={styles.sortText}>Newest first</span>
        </div>
        <div style={styles.list}>
          {filtered.map((person) => (
            <ContactRow
              key={person.id}
              person={person}
              onClick={() => onLedger(person)}
              showReason
            />
          ))}
        </div>
      </div>
      <button style={styles.fabSmall} onClick={onAdd}>
        +
      </button>
      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

function WhosDueScreen({ dueFilter, setDueFilter, onBack, onLedger, onNav }) {
  const dueContacts = contacts
    .filter((p) => p.urgency !== "none")
    .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
  const filtered = dueContacts.filter((p) => {
    if (dueFilter === "owed") return p.kind === "receive";
    if (dueFilter === "owe") return p.kind === "owe";
    return true;
  });

  return (
    <div style={styles.screen}>
      <Header
        title="Who’s Due"
        subtitle="Sorted by urgency"
        back
        onBack={onBack}
        right={<button style={styles.roundIcon}>ⓘ</button>}
      />
      <div style={styles.contentWithNav}>
        <Segmented
          value={dueFilter}
          onChange={setDueFilter}
          options={[
            ["all", "All"],
            ["owed", "Owed to You"],
            ["owe", "You Owe"],
          ]}
        />

        <div style={styles.listSpaced}>
          {filtered.map((person) => (
            <DueRow
              key={person.id}
              person={person}
              onClick={() => onLedger(person)}
            />
          ))}
        </div>
      </div>
      <BottomNav active="due" onNav={onNav} />
    </div>
  );
}

function PersonLedgerScreen({ person, onBack, onAdd, onShare, onEdit }) {
  const activeColor = colorForKind(person.kind);
  const isSettled = person.kind === "settled";
  return (
    <div style={styles.screen}>
      <Header
        title={person.name}
        back
        onBack={onBack}
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.roundIcon} onClick={onEdit}>
              ✎
            </button>
            <button style={styles.roundIcon}>⋯</button>
          </div>
        }
      />
      <div style={styles.contentNoNav}>
        <div style={styles.ledgerHero}>
          <span style={{ ...styles.miniLabel, color: activeColor }}>
            {person.status}
          </span>
          <h2
            style={{
              ...styles.ledgerAmount,
              color: isSettled ? MUTED : activeColor,
            }}
          >
            {isSettled ? "Settled" : "NPR 12,500"}
          </h2>
          <p style={styles.dueText}>
            {isSettled ? "No active balance" : person.due}
          </p>
        </div>

        {!isSettled && (
          <div style={styles.softCard}>
            <div style={styles.rowBetween}>
              <h3 style={styles.cardTitle}>Interest Summary</h3>
              <span style={styles.pill}>Active</span>
            </div>
            <InfoRow label="Amount Lent" value="NPR 10,000" />
            <InfoRow label="Interest Rate" value="5% monthly" />
            <InfoRow label="Interest Till Today" value="NPR 2,500" />
            <InfoRow strong label="Total Due Today" value="NPR 12,500" />
          </div>
        )}

        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Transaction History</h2>
        </div>
        <div style={styles.list}>
          {transactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} onClick={onEdit} />
          ))}
        </div>
      </div>

      <div style={styles.bottomActions}>
        <button style={styles.secondaryButton} onClick={onShare}>
          Share
        </button>
        <button style={styles.primaryButton} onClick={onAdd}>
          Add Transaction
        </button>
      </div>
    </div>
  );
}

function AddTransactionScreen({
  onBack,
  recordType,
  setRecordType,
  interestOn,
  setInterestOn,
  remindOn,
  setRemindOn,
  reminderChoice,
  setReminderChoice,
  onSave,
}) {
  return (
    <div style={styles.screen}>
      <Header title="Add Transaction" back onBack={onBack} />
      <div style={styles.contentNoNav}>
        <Field label="Person">
          <input
            style={styles.input}
            defaultValue="Ram Bahadur"
            placeholder="Search or add person"
          />
        </Field>
        <div style={styles.twoColumn}>
          <Field label="Amount">
            <input style={styles.input} defaultValue="10000" placeholder="0" />
          </Field>
          <Field label="Currency">
            <select style={styles.input} defaultValue="NPR">
              {currencies.map((c) => (
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
            defaultValue="Bike repair"
            placeholder="Gift, help, loan, etc."
          />
        </Field>

        <div style={styles.twoColumnEven}>
          <Field label="Record Date">
            <input style={styles.input} type="date" defaultValue="2026-05-10" />
          </Field>
          <Field label="Due Date">
            <input style={styles.input} type="date" defaultValue="2026-05-25" />
          </Field>
        </div>

        <ToggleCard
          icon="?"
          title="Is this on interest?"
          subtitle="Simple interest only"
          checked={interestOn}
          onToggle={() => setInterestOn(!interestOn)}
        />

        {interestOn && (
          <div style={styles.softCardNoMargin}>
            <div style={styles.twoColumnEven}>
              <Field label="Interest Rate">
                <input style={styles.input} defaultValue="5" />
              </Field>
              <Field label="Period">
                <select style={styles.input} defaultValue="Monthly">
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </Field>
            </div>
          </div>
        )}

        <ToggleCard
          icon="🔔"
          title="Remind me?"
          subtitle="Only if you want a reminder"
          checked={remindOn}
          onToggle={() => setRemindOn(!remindOn)}
        />

        {remindOn && (
          <div style={styles.notifyGrid}>
            {[
              "On due date",
              "1 day before",
              "1 week before",
              "1 month before",
            ].map((item) => (
              <button
                key={item}
                style={
                  reminderChoice === item
                    ? styles.notifyActive
                    : styles.notifyButton
                }
                onClick={() => setReminderChoice(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={styles.bottomActionsSingle}>
        <button style={styles.primaryButton} onClick={onSave}>
          Save Transaction
        </button>
      </div>
    </div>
  );
}

function EditTransactionScreen({
  onBack,
  recordType,
  setRecordType,
  interestOn,
  setInterestOn,
  remindOn,
  setRemindOn,
  onSave,
}) {
  return (
    <div style={styles.screen}>
      <Header
        title="Edit Transaction"
        back
        onBack={onBack}
        right={
          <button style={{ ...styles.roundIcon, color: DANGER }}>⌫</button>
        }
      />
      <div style={styles.contentNoNav}>
        <Field label="Person">
          <input style={styles.input} defaultValue="Ram Bahadur" />
        </Field>
        <div style={styles.twoColumn}>
          <Field label="Amount">
            <input style={styles.input} defaultValue="10000" />
          </Field>
          <Field label="Currency">
            <select style={styles.input} defaultValue="NPR">
              {currencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <div>
          <label style={styles.label}>Transaction type</label>
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
          <input style={styles.input} defaultValue="Bike repair" />
        </Field>
        <div style={styles.twoColumnEven}>
          <Field label="Record Date">
            <input style={styles.input} type="date" defaultValue="2026-05-10" />
          </Field>
          <Field label="Due Date">
            <input style={styles.input} type="date" defaultValue="2026-05-25" />
          </Field>
        </div>
        <ToggleCard
          icon="?"
          title="Is this on interest?"
          subtitle="Edit interest settings"
          checked={interestOn}
          onToggle={() => setInterestOn(!interestOn)}
        />
        <ToggleCard
          icon="🔔"
          title="Remind me?"
          subtitle="Edit reminder settings"
          checked={remindOn}
          onToggle={() => setRemindOn(!remindOn)}
        />
      </div>
      <div style={styles.bottomActionsSingle}>
        <button style={styles.primaryButton} onClick={onSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

function ShareSummaryScreen({ person, onBack }) {
  return (
    <div style={styles.screen}>
      <Header
        title="Share Summary"
        back
        onBack={onBack}
        right={<button style={styles.roundIcon}>↗</button>}
      />
      <div style={styles.contentCentered}>
        <div style={styles.shareCard}>
          <div style={styles.shareLogo}>L</div>
          <h2 style={styles.shareName}>{person.name}</h2>
          <p style={{ ...styles.statusText, color: colorForKind(person.kind) }}>
            {person.status}
          </p>
          <h1 style={styles.shareAmount}>NPR 12,500</h1>
          <p style={{ ...styles.dueText, color: DANGER }}>Overdue by 5 days</p>
          <InfoRow label="Amount Lent" value="NPR 10,000" />
          <InfoRow label="Interest Rate" value="5% monthly" />
          <InfoRow label="Interest Till Today" value="NPR 2,500" />
          <InfoRow label="Due Date" value="May 25, 2026" />
          <p style={styles.generatedText}>
            Generated on May 30, 2026 at 9:41 AM
          </p>
        </div>
        <button
          style={{ ...styles.primaryButton, width: "100%", marginTop: 18 }}
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

function SettingsScreen({ onBack, onNav }) {
  const rows = [
    ["Default Currency", "NPR"],
    ["Language", "English"],
    ["Notifications", "On"],
    ["Backup & Export", "Local first"],
    ["App Lock", "Off"],
    ["Privacy", "Data stays on your device"],
    ["About LenDen Notes", "Version 1.0"],
  ];
  return (
    <div style={styles.screen}>
      <Header title="Settings" back onBack={onBack} />
      <div style={styles.contentWithNav}>
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
      <BottomNav active="settings" onNav={onNav} />
    </div>
  );
}

function SuccessScreen({ onDone, onLedger }) {
  return (
    <div style={styles.screenCenter}>
      <div style={styles.successIcon}>✓</div>
      <h1 style={styles.successTitle}>Transaction saved</h1>
      <p style={styles.successText}>Ram Bahadur • NPR 10,000 • Due today</p>
      <button
        style={{ ...styles.primaryButton, width: "100%", marginTop: 30 }}
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

function SearchBox({ placeholder }) {
  return (
    <div style={styles.searchBox}>
      <span style={{ color: MUTED }}>⌕</span>
      <input style={styles.searchInput} placeholder={placeholder} />
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div style={styles.segmentedOuter}>
      {options.map(([key, label]) => (
        <button
          key={key}
          style={value === key ? styles.segmentedActive : styles.segmented}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function ContactRow({ person, onClick, showReason = false }) {
  const color = colorForKind(person.kind);
  return (
    <button style={styles.contactRow} onClick={onClick}>
      <div style={{ ...styles.avatar, background: avatarBg(person.kind) }}>
        {person.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={styles.rowBetween}>
          <strong style={styles.personName}>{person.name}</strong>
          <strong style={{ ...styles.amountText, color }}>
            {person.amount}
          </strong>
        </div>
        <p style={{ ...styles.statusText, color }}>{person.status}</p>
        <p style={styles.dueText}>{showReason ? person.reason : person.due}</p>
      </div>
      <span style={{ color: MUTED }}>›</span>
    </button>
  );
}

function DueRow({ person, onClick }) {
  const urgencyColor =
    person.urgency === "overdue" || person.urgency === "today"
      ? DANGER
      : person.urgency === "tomorrow"
        ? WARNING
        : MUTED;
  return (
    <button style={styles.contactRow} onClick={onClick}>
      <div style={{ ...styles.avatar, background: avatarBg(person.kind) }}>
        {person.initials}
      </div>
      <div style={{ flex: 1 }}>
        <div style={styles.rowBetween}>
          <strong>{person.name}</strong>
          <strong style={{ color: colorForKind(person.kind) }}>
            {person.amount}
          </strong>
        </div>
        <p style={styles.statusText}>{person.reason}</p>
        <p style={{ ...styles.dueText, color: urgencyColor, fontWeight: 800 }}>
          {person.due}
        </p>
      </div>
      <span style={styles.reminderIcon}>◴</span>
    </button>
  );
}

function TransactionRow({ tx, onClick }) {
  const color =
    tx.kind === "receive" ? RECEIVE : tx.kind === "owe" ? OWE : TEXT;
  return (
    <button style={styles.transactionRow} onClick={onClick}>
      <div>
        <strong>{tx.title}</strong>
        <p style={styles.dueText}>
          {tx.date} • {tx.note}
        </p>
        <p style={styles.metaText}>{tx.meta}</p>
      </div>
      <strong style={{ color }}>{tx.amount}</strong>
    </button>
  );
}

function ToggleCard({ icon, title, subtitle, checked, onToggle }) {
  return (
    <div style={styles.toggleCard}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={styles.toggleIcon}>{icon}</span>
        <div>
          <h3 style={styles.cardTitle}>{title}</h3>
          <p style={styles.dueText}>{subtitle}</p>
        </div>
      </div>
      <button
        style={{ ...styles.toggle, background: checked ? BRAND : BORDER }}
        onClick={onToggle}
      >
        <span
          style={{
            ...styles.toggleDot,
            transform: checked ? "translateX(20px)" : "translateX(0)",
          }}
        />
      </button>
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

function InfoRow({ label, value, strong }) {
  return (
    <div style={strong ? styles.infoRowStrong : styles.infoRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function colorForKind(kind) {
  if (kind === "receive") return RECEIVE;
  if (kind === "owe") return OWE;
  return MUTED;
}

function avatarBg(kind) {
  if (kind === "receive") return "#ECFDF5";
  if (kind === "owe") return "#FFF7ED";
  return "#F3F4F6";
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F3F4F6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    border: `1px solid ${BORDER}`,
    boxShadow: "0 24px 70px rgba(17,24,39,0.18)",
  },
  statusBar: {
    height: 32,
    padding: "0 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    background: "#FFFFFF",
  },
  header: {
    minHeight: 78,
    padding: "12px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${BORDER}`,
    background: "#FFFFFF",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 10 },
  headerTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: "-0.03em",
  },
  headerSubtitle: { margin: "3px 0 0", fontSize: 13, color: MUTED },
  backButton: {
    border: "none",
    background: "transparent",
    fontSize: 28,
    cursor: "pointer",
    width: 34,
    height: 34,
    lineHeight: 1,
  },
  roundIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    border: `1px solid ${BORDER}`,
    background: SURFACE,
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentWithNav: {
    height: "calc(100% - 78px - 72px)",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: 16,
    paddingBottom: 100,
  },
  contentNoNav: {
    height: "calc(100% - 78px)",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: 16,
    paddingBottom: 110,
  },
  contentCentered: {
    height: "calc(100% - 78px)",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchBox: {
    height: 46,
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    flex: 1,
    fontSize: 14,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 14,
  },
  summaryCard: {
    minHeight: 112,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    cursor: "pointer",
  },
  miniLabel: {
    display: "block",
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 7,
  },
  summaryAmount: { fontSize: 21, letterSpacing: "-0.02em", marginBottom: 6 },
  summarySub: { fontSize: 12, color: MUTED },
  sectionTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 10,
  },
  sectionTitleRowCompact: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: { margin: 0, fontSize: 18, fontWeight: 900 },
  linkButton: {
    border: "none",
    background: "transparent",
    color: BRAND,
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    gap: 5,
    alignItems: "center",
  },
  inlineBadge: {
    background: DANGER,
    color: "#FFFFFF",
    borderRadius: 999,
    fontSize: 11,
    padding: "2px 6px",
  },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  listSpaced: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },
  contactRow: {
    width: "100%",
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    background: "#FFFFFF",
    minHeight: 76,
    padding: 13,
    display: "flex",
    alignItems: "center",
    gap: 12,
    textAlign: "left",
    cursor: "pointer",
    color: TEXT,
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: `1px solid ${BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },
  rowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  personName: { fontSize: 16 },
  amountText: { fontSize: 14, whiteSpace: "nowrap" },
  statusText: { margin: "3px 0 0", fontSize: 13, fontWeight: 700 },
  dueText: { margin: "4px 0 0", fontSize: 12, color: MUTED },
  metaText: { margin: "4px 0 0", fontSize: 11, color: MUTED },
  viewAllButton: {
    width: "100%",
    height: 50,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 16,
    marginTop: 12,
    color: BRAND,
    fontWeight: 900,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  fab: {
    position: "absolute",
    right: 18,
    bottom: 88,
    height: 54,
    border: "none",
    borderRadius: 999,
    background: BRAND,
    color: "#FFFFFF",
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 900,
    boxShadow: "0 12px 30px rgba(15,118,110,0.25)",
    cursor: "pointer",
  },
  fabSmall: {
    position: "absolute",
    right: 24,
    bottom: 86,
    width: 54,
    height: 54,
    border: "none",
    borderRadius: "50%",
    background: BRAND,
    color: "#FFFFFF",
    fontSize: 28,
    boxShadow: "0 12px 30px rgba(15,118,110,0.25)",
    cursor: "pointer",
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    background: "#FFFFFF",
    borderTop: `1px solid ${BORDER}`,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  navItem: {
    border: "none",
    background: "transparent",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    cursor: "pointer",
  },
  navIcon: { fontSize: 23, lineHeight: 1 },
  navLabel: { fontSize: 11, fontWeight: 800 },
  navBadge: {
    position: "absolute",
    top: 12,
    right: 42,
    background: DANGER,
    color: "#FFFFFF",
    fontSize: 10,
    borderRadius: 999,
    padding: "1px 5px",
  },
  segmentedOuter: {
    height: 44,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    overflow: "hidden",
    background: "#FFFFFF",
  },
  segmented: {
    border: "none",
    background: "#FFFFFF",
    color: MUTED,
    fontWeight: 800,
    cursor: "pointer",
  },
  segmentedActive: {
    border: "none",
    background: BRAND,
    color: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
  sortText: { color: MUTED, fontSize: 12 },
  reminderIcon: { color: MUTED, fontSize: 22 },
  ledgerHero: {
    border: `1px solid ${BORDER}`,
    borderRadius: 22,
    padding: 18,
    background: "#FFFFFF",
  },
  ledgerAmount: {
    margin: "3px 0",
    fontSize: 34,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
  },
  softCard: {
    marginTop: 14,
    border: `1px solid ${BORDER}`,
    background: SURFACE,
    borderRadius: 20,
    padding: 15,
  },
  softCardNoMargin: {
    border: `1px solid ${BORDER}`,
    background: SURFACE,
    borderRadius: 20,
    padding: 15,
  },
  cardTitle: { margin: 0, fontSize: 16, fontWeight: 900 },
  pill: {
    color: BRAND,
    background: "#FFFFFF",
    border: `1px solid ${BORDER}`,
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    fontWeight: 800,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px 0",
    color: MUTED,
    fontSize: 14,
  },
  infoRowStrong: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "9px 0 2px",
    color: TEXT,
    fontSize: 14,
    borderTop: `1px solid ${BORDER}`,
    marginTop: 4,
  },
  transactionRow: {
    width: "100%",
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    textAlign: "left",
    cursor: "pointer",
    color: TEXT,
    textDecoration: "none",
  },
  bottomActions: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    borderTop: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    padding: 14,
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
    height: 52,
    border: "none",
    borderRadius: 16,
    background: BRAND,
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: 15,
    cursor: "pointer",
  },
  secondaryButton: {
    height: 52,
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    background: "#FFFFFF",
    color: TEXT,
    fontWeight: 900,
    fontSize: 15,
    cursor: "pointer",
  },
  fieldWrap: { display: "block", marginBottom: 14 },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 800,
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
    fontSize: 14,
    fontFamily: "inherit",
  },
  twoColumn: { display: "grid", gridTemplateColumns: "1fr 120px", gap: 10 },
  twoColumnEven: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  segmentGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginBottom: 14,
  },
  segment: {
    height: 46,
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 16,
    fontWeight: 900,
    cursor: "pointer",
  },
  segmentActive: {
    height: 46,
    border: `1px solid ${BRAND}`,
    background: BRAND,
    color: "#FFFFFF",
    borderRadius: 16,
    fontWeight: 900,
    cursor: "pointer",
  },
  toggleCard: {
    border: `1px solid ${BORDER}`,
    background: SURFACE,
    borderRadius: 20,
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  toggleIcon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: BRAND,
    fontWeight: 900,
    fontSize: 13,
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
  notifyGrid: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  notifyButton: {
    border: `1px solid ${BORDER}`,
    background: "#FFFFFF",
    borderRadius: 999,
    padding: "8px 10px",
    fontSize: 12,
    cursor: "pointer",
  },
  notifyActive: {
    border: `1px solid ${BRAND}`,
    background: "#ECFDF5",
    color: BRAND,
    borderRadius: 999,
    padding: "8px 10px",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 900,
  },
  settingsRow: {
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    background: "#FFFFFF",
    padding: 14,
    minHeight: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  shareCard: {
    width: 270,
    border: `1px solid ${BORDER}`,
    borderRadius: 26,
    padding: 22,
    background: "#FFFFFF",
    boxShadow: "0 10px 35px rgba(17,24,39,0.08)",
  },
  shareLogo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    background: BRAND,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    fontWeight: 900,
  },
  shareName: { margin: "16px 0 0", fontSize: 24 },
  shareAmount: {
    color: RECEIVE,
    margin: "10px 0 0",
    fontSize: 30,
    letterSpacing: "-0.04em",
  },
  generatedText: {
    marginTop: 22,
    color: MUTED,
    fontSize: 10,
    textAlign: "center",
  },
  successIcon: {
    width: 94,
    height: 94,
    borderRadius: "50%",
    background: "#ECFDF5",
    color: BRAND,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 56,
    fontWeight: 900,
  },
  successTitle: {
    margin: "24px 0 6px",
    fontSize: 28,
    letterSpacing: "-0.03em",
  },
  successText: { color: MUTED, margin: 0, fontSize: 14 },
};
