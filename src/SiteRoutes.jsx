import { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import App from "./App";
import Footer from "./components/Footer";
import PackageCatalogue from "./pages/PackagesPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetails from "./pages/DestinationDetails";
import ContactPage from "./pages/ContactPage";
import ExplorePage from "./pages/ExplorePage";
function ScrollToPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PackagesPage() {
  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <Link className="brand" to="/">
            <img src="/images/logo.png" alt="" />

            <span>
              Nature <strong>Holidays</strong>
            </span>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/packages" aria-current="page">
              Packages
            </Link>
          </div>
        </nav>
      </header>

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px",
          minHeight: "60vh",
        }}
      >
        <p
          style={{
            color: "var(--muted)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          EXPLORE NATURE HOLIDAYS
        </p>

        <h1
          style={{
            marginTop: 16,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 38,
            fontWeight: 600,
            lineHeight: 1.2,
            color: "var(--forest)",
          }}
        >
          Find your next getaway.
        </h1>

        <p
          style={{
            marginTop: 20,
            maxWidth: 500,
            color: "var(--muted)",
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          Our package catalogue goes here next: school and college
          trips, honeymoon escapes, group journeys and more.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: 28,
            color: "var(--forest)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ← Back to home
        </Link>
      </main>

      <Footer />
    </>
  );
}

function NotFoundPage() {
  return (
    <main style={{ padding: "80px 24px", textAlign: "center" }}>
      <h1>Page not found</h1>
      <p style={{ margin: "20px 0" }}>
        Let’s get you back to exploring.
      </p>
      <Link to="/">Back to Nature Holidays</Link>
    </main>
  );
}

export default function SiteRoutes() {
  return (
    <BrowserRouter>
      <ScrollToPage />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/packages" element={<PackageCatalogue />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route
  path="/destinations/:slug"
  element={<DestinationDetails />}
/>
<Route path="/contact" element={<ContactPage />} />
<Route path="/explore/:category" element={<ExplorePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}