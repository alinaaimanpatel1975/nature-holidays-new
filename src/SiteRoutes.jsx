import { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import App from "./App";
import PackageCatalogue from "./pages/PackagesPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetails from "./pages/DestinationDetails";
import ContactPage from "./pages/ContactPage";
import ExplorePage from "./pages/ExplorePage";
import EnquiryConfirmation from "./pages/EnquiryConfirmation";
import MyTripsPage from "./pages/MyTripsPage";

function ScrollToPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <div>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 11,
            letterSpacing: 2,
            fontWeight: 600,
          }}
        >
          404 · PAGE NOT FOUND
        </p>

        <h1
          style={{
            marginTop: 16,
            color: "var(--forest)",
            fontSize: 36,
          }}
        >
          This path ends here.
        </h1>

        <p style={{ margin: "16px 0 24px", color: "var(--muted)" }}>
          Let's get you back to exploring.
        </p>

        <Link to="/">Back to Nature Holidays</Link>
      </div>
    </main>
  );
}

export default function SiteRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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

        <Route
          path="/enquiry-confirmation/:id"
          element={<EnquiryConfirmation />}
        />

        <Route path="/my-trips" element={<MyTripsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}