import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  adminRequest,
  clearAdminSession,
  getAdminSession,
  saveAdminSession,
} from "./adminApi";
import "./Admin.css";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const date = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not scheduled";

function Status({ value }) {
  return (
    <span className={`admin-status status-${String(value || "new").toLowerCase()}`}>
      {value || "New"}
    </span>
  );
}

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (getAdminSession()?.token) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await result.json();

      if (!result.ok || !data.success) {
        throw new Error(data.message || "Unable to sign in.");
      }

      saveAdminSession({
        token: data.token,
        admin: data.admin,
      });

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-brand-mark">NH</div>
        <p className="admin-eyebrow">NATURE HOLIDAYS · MANAGEMENT</p>
        <h1>Welcome back.</h1>
        <p className="admin-login-copy">
          Sign in to manage enquiries, bookings and your travel business.
        </p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your admin email"
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <p className="admin-error">{error}</p>}

          <button className="admin-primary-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in to dashboard"}
          </button>
        </form>

        <p className="admin-login-foot">Private workspace · Authorized access only</p>
      </section>
    </main>
  );
}

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getAdminSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!session?.token) {
    return <Navigate to="/admin/login" replace />;
  }

  function logout() {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  }

  const links = [
    { to: "/admin", label: "Overview", icon: "◫", end: true },
    { to: "/admin/enquiries", label: "Enquiries", icon: "✉" },
    { to: "/admin/bookings", label: "Bookings", icon: "▤" },
  ];

  return (
    <div className="admin-app">
      {mobileOpen && (
        <button
          className="admin-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <Link to="/admin" className="admin-sidebar-brand" onClick={() => setMobileOpen(false)}>
          <span className="admin-brand-mark">NH</span>
          <span>
            <strong>Nature Holidays</strong>
            <small>ADMINISTRATION</small>
          </span>
        </Link>

        <p className="admin-nav-heading">WORKSPACE</p>
        <nav className="admin-nav">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={`admin-nav-link ${
                location.pathname === link.to ? "active" : ""
              }`}
            >
              <span className="admin-nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-user">
            <div className="admin-avatar">
              {(session.admin?.name || "A").charAt(0).toUpperCase()}
            </div>
            <span>
              <strong>{session.admin?.name || "Administrator"}</strong>
              <small>Administrator</small>
            </span>
          </div>
          <button className="admin-logout" onClick={logout}>
            ↗ <span>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <span className="admin-topbar-label">Business workspace</span>
          <span className="admin-topbar-date">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function AdminOverview() {
  const [data, setData] = useState({ enquiries: [], bookings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      adminRequest("/admin/enquiries"),
      adminRequest("/bookings"),
    ])
      .then(([enquiries, bookings]) => {
        setData({
          enquiries: enquiries.enquiries || [],
          bookings: bookings.bookings || [],
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const { enquiries, bookings } = data;
  const newEnquiries = enquiries.filter((item) => item.status === "new").length;
  const confirmedBookings = bookings.filter(
    (item) => item.bookingStatus === "confirmed"
  ).length;
  const paidRevenue = bookings
    .filter((item) => item.paymentStatus === "paid")
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">YOUR BUSINESS AT A GLANCE</p>
          <h1>Overview</h1>
          <p>Here's what's happening at Nature Holidays.</p>
        </div>
        <span className="admin-live-indicator"><i /> Live database</span>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      <section className="admin-stat-grid">
        <article className="admin-stat-card">
          <span>Total enquiries</span>
          <strong>{loading ? "—" : enquiries.length}</strong>
          <small>All customer enquiries</small>
        </article>
        <article className="admin-stat-card">
          <span>Needs attention</span>
          <strong>{loading ? "—" : newEnquiries}</strong>
          <small>New enquiries to follow up</small>
        </article>
        <article className="admin-stat-card">
          <span>Total bookings</span>
          <strong>{loading ? "—" : bookings.length}</strong>
          <small>{confirmedBookings} confirmed bookings</small>
        </article>
        <article className="admin-stat-card">
          <span>Payments received</span>
          <strong className="admin-revenue">{loading ? "—" : money(paidRevenue)}</strong>
          <small>Based on paid bookings</small>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Recent enquiries</h2>
            <p>Your latest customer requests</p>
          </div>
          <Link to="/admin/enquiries" className="admin-text-link">View all →</Link>
        </div>

        {loading ? (
          <p className="admin-empty">Loading live records...</p>
        ) : enquiries.length === 0 ? (
          <p className="admin-empty">No enquiries have been received yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Destination</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 6).map((item) => (
                  <tr key={item._id}>
                    <td className="admin-reference">{item.reference}</td>
                    <td>{item.customer?.name}</td>
                    <td>{item.trip?.destination || item.trip?.packageName || "—"}</td>
                    <td>{date(item.createdAt)}</td>
                    <td><Status value={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState("");
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    adminRequest("/admin/enquiries")
      .then((result) => setEnquiries(result.enquiries || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id, status) {
    setUpdating(id);
    setError("");

    try {
      const result = await adminRequest(`/admin/enquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setEnquiries((current) =>
        current.map((item) => item._id === id ? result.enquiry : item)
      );
      setSelected((current) =>
        current?._id === id ? result.enquiry : current
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating("");
    }
  }

  async function saveNote() {
    if (!selected || !note.trim()) return;

    setSavingNote(true);
    setError("");

    try {
      const result = await adminRequest(
        `/admin/enquiries/${selected._id}/notes`,
        {
          method: "POST",
          body: JSON.stringify({ text: note.trim() }),
        }
      );

      setEnquiries((current) =>
        current.map((item) =>
          item._id === selected._id ? result.enquiry : item
        )
      );

      setSelected(result.enquiry);
      setNote("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingNote(false);
    }
  }

  const visible = enquiries.filter((item) => {
    const term = search.toLowerCase();
    const matchesSearch = [
      item.reference,
      item.customer?.name,
      item.customer?.email,
      item.trip?.destination,
      item.trip?.packageName,
    ].some((value) => String(value || "").toLowerCase().includes(term));

    return matchesSearch && (filter === "all" || item.status === filter);
  });

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CUSTOMER RELATIONSHIPS</p>
          <h1>Enquiries</h1>
          <p>Track incoming trip requests and manage their progress.</p>
        </div>
        <span className="admin-count">{enquiries.length} total</span>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      <section className="admin-panel">
        <div className="admin-toolbar">
          <input
            className="admin-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customer, reference or destination..."
          />

          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <p className="admin-empty">Loading enquiries...</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Reference / Customer</th>
                  <th>Trip details</th>
                  <th>Travel date</th>
                  <th>Travellers</th>
                  <th>Indicative price</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {visible.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong className="admin-reference">{item.reference}</strong>
                      <small className="admin-cell-sub">{item.customer?.name}</small>
                      <small className="admin-cell-sub">{item.customer?.email}</small>
                      <small className="admin-cell-sub">{item.customer?.phone}</small>
                    </td>

                    <td>
                      <strong>{item.trip?.destination || item.trip?.packageName || "Custom trip"}</strong>
                      <small className="admin-cell-sub">{item.trip?.departureCity || "Departure not specified"}</small>
                    </td>

                    <td>{date(item.trip?.travelDate)}</td>
                    <td>{item.trip?.travellers ?? "—"}</td>
                    <td>{item.price?.indicativeAmount ? money(item.price.indicativeAmount) : "Not quoted"}</td>

                    <td>
                      <select
                        className={`admin-status-select status-${item.status}`}
                        value={item.status}
                        disabled={updating === item._id}
                        onChange={(event) => updateStatus(item._id, event.target.value)}
                        aria-label={`Update status for ${item.reference}`}
                      >
                        {["new", "contacted", "quoted", "confirmed", "cancelled"].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <button
                        className="admin-detail-button"
                        onClick={() => {
                          setSelected(item);
                          setNote("");
                          setError("");
                        }}
                      >
                        Open →
                      </button>
                    </td>
                  </tr>
                ))}

                {!visible.length && (
                  <tr>
                    <td colSpan="7" className="admin-empty">
                      No matching enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selected && (
        <div className="admin-modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="admin-detail-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-detail-heading">
              <div>
                <p className="admin-eyebrow">ENQUIRY DETAILS</p>
                <h2>{selected.reference}</h2>
              </div>
              <button
                className="admin-close-button"
                onClick={() => setSelected(null)}
                aria-label="Close enquiry details"
              >
                ×
              </button>
            </div>

            <div className="admin-detail-grid">
              <div>
                <span>Customer</span>
                <strong>{selected.customer?.name || "—"}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{selected.customer?.email || "—"}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{selected.customer?.phone || "—"}</strong>
              </div>
              <div>
                <span>Destination</span>
                <strong>{selected.trip?.destination || "Not specified"}</strong>
              </div>
              <div>
                <span>Package</span>
                <strong>{selected.trip?.packageName || "Custom trip"}</strong>
              </div>
              <div>
                <span>Travel date</span>
                <strong>{date(selected.trip?.travelDate)}</strong>
              </div>
              <div>
                <span>Travellers</span>
                <strong>{selected.trip?.travellers ?? "—"}</strong>
              </div>
              <div>
                <span>Departure city</span>
                <strong>{selected.trip?.departureCity || "—"}</strong>
              </div>
            </div>

            <div className="admin-detail-section">
              <h3>Special requests</h3>
              <p>{selected.trip?.requests || "No special requests provided."}</p>
            </div>

            <div className="admin-detail-section">
              <h3>Private internal notes</h3>
              <p className="admin-private-label">Visible only inside the admin dashboard.</p>

              <div className="admin-notes-list">
                {(selected.internalNotes || []).length ? (
                  [...selected.internalNotes].reverse().map((item, index) => (
                    <article className="admin-note" key={item._id || index}>
                      <p>{item.text}</p>
                      <small>
                        {item.author || "Admin"} · {date(item.createdAt)}
                      </small>
                    </article>
                  ))
                ) : (
                  <p className="admin-empty">No internal notes yet.</p>
                )}
              </div>

              <textarea
                className="admin-note-input"
                rows="3"
                maxLength="2000"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add a follow-up reminder or conversation summary..."
              />

              <div className="admin-note-footer">
                <small>{note.length}/2000</small>
                <button
                  className="admin-primary-button admin-save-note"
                  onClick={saveNote}
                  disabled={savingNote || !note.trim()}
                >
                  {savingNote ? "Saving..." : "Save private note"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
export function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    adminRequest("/bookings")
      .then((result) => setBookings(result.bookings || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id, bookingStatus) {
    setUpdating(id);
    setError("");
    try {
      const result = await adminRequest(`/bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ bookingStatus }),
      });
      setBookings((current) =>
        current.map((item) => item._id === id ? result.booking : item)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating("");
    }
  }

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">TRIP OPERATIONS</p>
          <h1>Bookings</h1>
          <p>Review reservations, payment progress and booking status.</p>
        </div>
        <span className="admin-count">{bookings.length} total</span>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      <section className="admin-panel">
        {loading ? <p className="admin-empty">Loading bookings...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Package</th>
                  <th>Travel date</th>
                  <th>Travellers</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Booking status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong>{item.customerName}</strong>
                      <small className="admin-cell-sub">{item.email}</small>
                      <small className="admin-cell-sub">{item.phone}</small>
                    </td>
                    <td>{item.packageName}</td>
                    <td>{date(item.travelDate)}</td>
                    <td>{item.travellers}</td>
                    <td>{money(item.totalAmount)}</td>
                    <td><Status value={item.paymentStatus} /></td>
                    <td>
                      <select
                        className={`admin-status-select status-${item.bookingStatus}`}
                        value={item.bookingStatus}
                        disabled={updating === item._id}
                        onChange={(event) => updateStatus(item._id, event.target.value)}
                        aria-label={`Update booking for ${item.customerName}`}
                      >
                        {["pending", "confirmed", "cancelled"].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {!bookings.length && (
                  <tr><td colSpan="7" className="admin-empty">No bookings have been received yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

