
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./Navbar.css";

const experienceLinks = [
  { label: "Things to do", path: "/explore/things-to-do" },
  { label: "Accommodation", path: "/explore/accommodation" },
  { label: "Transport options", path: "/explore/transport" },
];

function navClass({ isActive }) {
  return isActive ? "nh-nav-link nh-nav-link--active" : "nh-nav-link";
}

export default function Navbar({
  showCityPicker = false,
  homeCity = "Bengaluru",
  onHomeCityChange,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  const isExperienceActive = location.pathname.startsWith("/explore");

  return (
    <header className="nh-header">
      <nav className="nh-navbar" aria-label="Main navigation">
        <Link
          className="nh-brand"
          to="/"
          aria-label="Nature Holidays home"
        >
          <img
  src={`${import.meta.env.BASE_URL}images/logo.png`}
  alt="Nature Holidays"
/>
          <span>
            Nature <strong>Holidays</strong>
            <small>TRAVEL. YOUR WAY.</small>
          </span>
        </Link>

        <button
          className="nh-mobile-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="nh-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`nh-navigation ${menuOpen ? "nh-navigation--open" : ""}`}
          id="nh-navigation"
        >
          <div className="nh-nav-links">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/packages" className={navClass}>
              Packages
            </NavLink>

            <NavLink to="/destinations" className={navClass}>
              Destinations
            </NavLink>

            <details
              className={`nh-experiences ${isExperienceActive ? "nh-experiences--active" : ""}`}
            >
              <summary
                className={
                  isExperienceActive
                    ? "nh-nav-link nh-nav-link--active"
                    : "nh-nav-link"
                }
              >
                Experiences
                <span className="nh-dropdown-arrow" aria-hidden="true">⌄</span>
              </summary>

              <div className="nh-experiences-menu">
                <span className="nh-menu-eyebrow">EXPLORE MORE</span>
                {experienceLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={navClass}
                  >
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </NavLink>
                ))}
              </div>
            </details>

            <NavLink to="/my-trips" className={navClass}>
              My Trips
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
          </div>

          <div className="nh-nav-actions">
            {showCityPicker && (
              <label className="nh-city-picker">
                <span>Your city</span>
                <select
                  aria-label="Home city"
                  value={homeCity}
                  onChange={(event) =>
                    onHomeCityChange?.(event.target.value)
                  }
                >
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Chennai</option>
                  <option>Hyderabad</option>
                  <option>Pune</option>
                </select>
              </label>
            )}

            {showCityPicker && (
              <span className="nh-currency">₹ INR</span>
            )}

            <Link className="nh-plan-button" to="/contact">
              Plan a trip <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
