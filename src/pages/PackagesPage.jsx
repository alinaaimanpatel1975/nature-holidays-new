
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PackagesPage.css";
import BrochureTours from "../components/BrochureTours";

const categories = [
  { id: "all", name: "All packages" },
  { id: "school-college", name: "School & College" },
  { id: "honeymoon", name: "Honeymoon" },
  { id: "corporate-group", name: "Corporate & Group" },
  { id: "family", name: "Family" },
  { id: "weekend", name: "Weekend & Day Outings" },
];

const budgets = [
  { id: "all", name: "Any budget", min: 0, max: Infinity },
  { id: "under-15", name: "Under ₹15,000", min: 0, max: 14999 },
  { id: "15-20", name: "₹15,000 – ₹20,000", min: 15000, max: 20000 },
  { id: "20-25", name: "₹20,000 – ₹25,000", min: 20000, max: 25000 },
  { id: "above-25", name: "₹25,000+", min: 25000, max: Infinity },
];

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "price-low", name: "Price: Low to high" },
  { id: "price-high", name: "Price: High to low" },
];

const PRICE_NOTE =
  "Indicative estimate only. Final pricing depends on travel dates, accommodation, group size and confirmed inclusions.";

const packages = [
  {
    id: "mysore-ooty",
    name: "Mysore & Ooty",
    location: "Karnataka & Tamil Nadu",
    image: "/images/tour-mysore.jpg",
    route: "Mysore → Ooty",
    type: "Cities & hill stations",
    categories: ["family", "school-college"],
    primaryTripType: "Family Holiday",
    startingPrice: 12999,
    priceBasis: "per person · twin-sharing",
    overview:
      "Combine Mysore sightseeing with an Ooty hill-station visit. Contact the team for the current route and sightseeing schedule.",
    priceNote: PRICE_NOTE,
  },
  {
    id: "munnar-alleppey-kochi",
    name: "Munnar, Alleppey & Kochi",
    location: "Kerala",
    image: "/images/tour-alleppey.jpg",
    route: "Munnar → Alleppey → Kochi",
    type: "Kerala getaway",
    categories: ["family", "honeymoon"],
    primaryTripType: "Honeymoon",
    startingPrice: 17999,
    priceBasis: "per person · twin-sharing",
    overview:
      "Explore a journey through Munnar, Alleppey and Kochi. Ask the team about accommodation choices, transport and the available itinerary.",
    priceNote: PRICE_NOTE,
  },
  {
    id: "raj-se-taj-tak",
    name: "Raj se Taj Tak",
    location: "North India",
    image: "/images/tour-jaipur.jpg",
    route: "Final route available on request",
    type: "Heritage tour",
    categories: ["family", "school-college"],
    primaryTripType: "Family Holiday",
    startingPrice: 11999,
    priceBasis: "per person · twin-sharing",
    overview:
      "A heritage tour listed in the Nature Holidays brochure. Request the current itinerary to confirm destinations, monuments and departure options.",
    priceNote: PRICE_NOTE,
  },
  {
    id: "goa-dandeli",
    name: "Goa & Dandeli",
    location: "Goa & Karnataka",
    image: "/images/tour-goa.jpg",
    route: "Goa → Dandeli",
    type: "Coast & nature",
    categories: ["family", "corporate-group"],
    primaryTripType: "Corporate & Group",
    startingPrice: 22999,
    priceBasis: "per person · twin-sharing",
    overview:
      "Explore a combined Goa and Dandeli trip. Activities, accommodation, transport and the final travel schedule require confirmation.",
    priceNote: PRICE_NOTE,
  },
  {
    id: "nandi-hills-isha-temple",
    name: "Nandi Hills & Isha Temple",
    location: "Karnataka",
    image: "/images/package-nandi-hills.jpg",
    route: "Route and schedule to be confirmed",
    type: "Day outing",
    categories: ["weekend", "school-college", "corporate-group"],
    primaryTripType: "Weekend & Day Outing",
    startingPrice: null,
    priceBasis: "",
    overview:
      "A local outing listed in the brochure. Confirm the route, pickup arrangements, timings, sightseeing stops and group requirements with the team.",
    priceNote:
      "Price on request. The route and travel schedule need confirmation before a reliable estimate can be shown.",
  },
  {
    id: "hampi-pattadakal",
    name: "Hampi & Pattadakal",
    location: "Karnataka",
    image: "/images/tour-hampi.jpg",
    route: "Hampi → Pattadakal",
    type: "Heritage tour",
    categories: ["family", "school-college"],
    primaryTripType: "Family Holiday",
    startingPrice: 10999,
    priceBasis: "per person · twin-sharing",
    overview:
      "Discover a heritage itinerary featuring Hampi and Pattadakal. Request the detailed sightseeing plan and available travel arrangements.",
    priceNote: PRICE_NOTE,
  },
];

function localDate() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN").format(amount);
}

function getEnquiryUrl(trip, travelDate, travellers) {
  const params = new URLSearchParams();

  params.set("package", trip.name);
  params.set("packageId", trip.id);
  params.set("tripType", trip.primaryTripType);
  params.set("travellers", String(travellers));

  if (travelDate) params.set("date", travelDate);

  if (trip.startingPrice) {
    params.set("price", String(trip.startingPrice));
    params.set("priceBasis", trip.priceBasis);
  }

  return `/contact?${params.toString()}`;
}

export default function PackagesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hash } = useLocation();

  const [openPackage, setOpenPackage] = useState(null);
  const [travelDate, setTravelDate] = useState(
    searchParams.get("date") || ""
  );
  const [travellers, setTravellers] = useState("2");

  const query = searchParams.get("q") || "";
  const requestedCategory = searchParams.get("category") || "all";
  const requestedBudget = searchParams.get("budget") || "all";
  const requestedSort = searchParams.get("sort") || "featured";

  const activeCategory = categories.some(
    (category) => category.id === requestedCategory
  )
    ? requestedCategory
    : "all";

  const activeBudget = budgets.some(
    (budget) => budget.id === requestedBudget
  )
    ? requestedBudget
    : "all";

  const activeSort = sortOptions.some(
    (option) => option.id === requestedSort
  )
    ? requestedSort
    : "featured";

  const targetId = hash.slice(1);
  const linkedPackage = packages.find((trip) => trip.id === targetId);

  const filteredPackages = useMemo(() => {
    const selectedBudget = budgets.find(
      (budget) => budget.id === activeBudget
    );

    const matching = packages.filter((trip) => {
      const matchesCategory =
        activeCategory === "all" ||
        trip.categories.includes(activeCategory);

      const searchableText =
        `${trip.name} ${trip.location} ${trip.route} ${trip.type}`.toLowerCase();

      const matchesSearch = searchableText.includes(
        query.trim().toLowerCase()
      );

      const matchesBudget =
        activeBudget === "all" ||
        (trip.startingPrice !== null &&
          trip.startingPrice >= selectedBudget.min &&
          trip.startingPrice <= selectedBudget.max);

      return matchesCategory && matchesSearch && matchesBudget;
    });

    if (activeSort === "price-low") {
      matching.sort((a, b) => {
        if (a.startingPrice === null) return 1;
        if (b.startingPrice === null) return -1;
        return a.startingPrice - b.startingPrice;
      });
    }

    if (activeSort === "price-high") {
      matching.sort((a, b) => {
        if (a.startingPrice === null) return 1;
        if (b.startingPrice === null) return -1;
        return b.startingPrice - a.startingPrice;
      });
    }

    return matching;
  }, [activeCategory, activeBudget, activeSort, query]);

  const visiblePackages =
    linkedPackage &&
    !filteredPackages.some((trip) => trip.id === linkedPackage.id)
      ? [linkedPackage, ...filteredPackages]
      : filteredPackages;

  const hasActiveFilters =
    Boolean(query.trim()) ||
    activeCategory !== "all" ||
    activeBudget !== "all" ||
    activeSort !== "featured";

  useEffect(() => {
    if (!linkedPackage) return;

    setOpenPackage(linkedPackage.id);

    const frame = requestAnimationFrame(() => {
      document.getElementById(linkedPackage.id)?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [linkedPackage]);

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (!value || value === "all" || value === "featured") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams, { replace: true });
  }

  function clearAllFilters() {
    setSearchParams({}, { replace: true });
    setOpenPackage(null);
  }

  return (
    <>
      <Navbar />

      <main className="package-page">
        <nav className="package-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Packages</span>
        </nav>

        <div className="package-page-heading">
          <span className="package-page-eyebrow">
            EXPLORE NATURE HOLIDAYS
          </span>
          <h1>Find a trip that fits your plans.</h1>
          <p>Pick a place. Find your dates. We'll help with the details.</p>
        </div>

        <section
          className="package-discovery-tools"
          aria-label="Find your package"
        >
          <label className="package-search">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>

            <input
              type="search"
              aria-label="Search packages by destination or name"
              placeholder="Search destinations or packages"
              value={query}
              onChange={(event) => updateFilter("q", event.target.value)}
            />
            <span>Search packages</span>
          </label>

          <div className="package-filter-heading">
            <span>TRAVEL STYLE</span>
          </div>

          <div className="package-filters" aria-label="Package categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                aria-pressed={activeCategory === category.id}
                className={
                  activeCategory === category.id
                    ? "package-filter package-filter--active"
                    : "package-filter"
                }
                onClick={() => {
                  updateFilter("category", category.id);
                  setOpenPackage(null);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div
            className="package-advanced-filters"
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <label
              className="package-sort"
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <span>YOUR BUDGET</span>
              <select
                aria-label="Filter packages by budget"
                value={activeBudget}
                onChange={(event) => {
                  updateFilter("budget", event.target.value);
                  setOpenPackage(null);
                }}
              >
                {budgets.map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
              </select>
            </label>

            <label
              className="package-sort"
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <span>SORT BY</span>
              <select
                aria-label="Sort packages"
                value={activeSort}
                onChange={(event) =>
                  updateFilter("sort", event.target.value)
                }
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                style={{
                  minHeight: "40px",
                  padding: "9px 14px",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--forest)",
                  background: "transparent",
                  font: "inherit",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Clear all filters ↺
              </button>
            )}
          </div>
        </section>

        <div className="package-results-section">
          <div className="package-results-heading">
            <div>
              <h2>Explore our packages</h2>
              <p role="status" aria-live="polite">
                {visiblePackages.length}{" "}
                {visiblePackages.length === 1 ? "package" : "packages"} found
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <div
              className="package-active-filters"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  color: "var(--muted)",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                FILTERING BY:
              </span>

              {query.trim() && (
                <span className="package-filter">
                  Search: "{query.trim()}"
                </span>
              )}

              {activeCategory !== "all" && (
                <span className="package-filter">
                  {categories.find((item) => item.id === activeCategory)?.name}
                </span>
              )}

              {activeBudget !== "all" && (
                <span className="package-filter">
                  {budgets.find((item) => item.id === activeBudget)?.name}
                </span>
              )}

              {activeSort !== "featured" && (
                <span className="package-filter">
                  {sortOptions.find((item) => item.id === activeSort)?.name}
                </span>
              )}
            </div>
          )}

          {linkedPackage && (
            <p className="package-link-notice">
              Showing your linked package: {linkedPackage.name}.
            </p>
          )}

          {activeBudget !== "all" && (
            <p
              style={{
                marginBottom: "18px",
                color: "var(--muted)",
                fontSize: "11px",
                lineHeight: 1.7,
              }}
            >
              Packages without a confirmed starting estimate are not included
              in budget-filtered results.
            </p>
          )}

          {visiblePackages.length > 0 ? (
            <div className="package-catalogue-grid">
              {visiblePackages.map((trip) => {
                const isOpen = openPackage === trip.id;

                return (
                  <article
                    className={
                      isOpen
                        ? "catalogue-card catalogue-card--expanded"
                        : "catalogue-card"
                    }
                    key={trip.id}
                    id={trip.id}
                  >
                    <div className="catalogue-card-image">
                      <img
                        src={trip.image}
                        alt={`Travel scenery for ${trip.name}`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span>{trip.type}</span>
                    </div>

                    <div className="catalogue-card-content">
                      <p className="catalogue-location">{trip.location}</p>
                      <h3>{trip.name}</h3>
                      <p className="catalogue-route">{trip.route}</p>

                      <div className="catalogue-card-actions">
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "3px",
                          }}
                        >
                          {trip.startingPrice ? (
                            <>
                              <strong
                                style={{
                                  color: "var(--forest)",
                                  fontSize: "15px",
                                }}
                              >
                                From ₹{formatPrice(trip.startingPrice)}
                              </strong>
                              <small
                                style={{
                                  color: "var(--muted)",
                                  fontSize: "10px",
                                }}
                              >
                                / person · indicative estimate
                              </small>
                            </>
                          ) : (
                            <strong
                              style={{
                                color: "var(--forest)",
                                fontSize: "13px",
                              }}
                            >
                              Price on request
                            </strong>
                          )}
                        </span>

                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`information-${trip.id}`}
                          onClick={() =>
                            setOpenPackage(isOpen ? null : trip.id)
                          }
                        >
                          {isOpen ? "Close details" : "View package"}
                          <span aria-hidden="true">
                            {isOpen ? "−" : "↗"}
                          </span>
                        </button>
                      </div>

                      <div
                        className="catalogue-package-details"
                        id={`information-${trip.id}`}
                        hidden={!isOpen}
                      >
                        <h4>Package overview</h4>
                        <p>{trip.overview}</p>

                        <dl>
                          <div>
                            <dt>Starting price</dt>
                            <dd>
                              {trip.startingPrice
                                ? `₹${formatPrice(trip.startingPrice)} / person`
                                : "Quote on request"}
                            </dd>
                          </div>
                          <div>
                            <dt>Price basis</dt>
                            <dd>{trip.priceBasis || "To be confirmed"}</dd>
                          </div>
                          <div>
                            <dt>Itinerary & inclusions</dt>
                            <dd>
                              Confirm the latest details with our team
                            </dd>
                          </div>
                        </dl>

                        <p
                          style={{
                            marginTop: "14px",
                            color: "var(--muted)",
                            fontSize: "11px",
                            lineHeight: 1.7,
                          }}
                        >
                          {trip.priceNote}
                        </p>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: "14px",
                            marginTop: "22px",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "7px",
                              color: "var(--forest)",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            Preferred travel date
                            <input
                              type="date"
                              min={localDate()}
                              value={travelDate}
                              onChange={(event) =>
                                setTravelDate(event.target.value)
                              }
                              style={{
                                width: "100%",
                                minHeight: "44px",
                                padding: "10px",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                color: "var(--text)",
                                background: "var(--ivory)",
                                font: "inherit",
                              }}
                            />
                          </label>

                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "7px",
                              color: "var(--forest)",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            Number of travellers
                            <input
                              type="number"
                              min="1"
                              max="5000"
                              step="1"
                              value={travellers}
                              onChange={(event) =>
                                setTravellers(event.target.value)
                              }
                              style={{
                                width: "100%",
                                minHeight: "44px",
                                padding: "10px",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                color: "var(--text)",
                                background: "var(--ivory)",
                                font: "inherit",
                              }}
                            />
                          </label>
                        </div>

                        <Link
                          className="catalogue-enquire"
                          to={getEnquiryUrl(
                            trip,
                            travelDate,
                            Math.min(
                              5000,
                              Math.max(1, Number(travellers) || 1)
                            )
                          )}
                        >
                          Continue to enquiry
                          <span aria-hidden="true">↗</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="package-empty">
              <h3>No matching packages yet.</h3>
              <p>
                Try another destination, adjust your budget or ask us about a
                custom trip.
              </p>
              <button type="button" onClick={clearAllFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <BrochureTours />

        <section className="package-custom-trip" id="package-contact">
          <div>
            <h2>Have somewhere else in mind?</h2>
            <p>
              Share your destination, dates and group size.
              We'll help shape the journey.
            </p>
          </div>

          <Link to="/contact">
            Plan a custom trip
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
