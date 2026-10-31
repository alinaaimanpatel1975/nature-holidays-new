
import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { destinations } from "../data/destinations";
import Footer from "../components/Footer";
import "./DestinationsPage.css";

export function DestinationNavigation() {
  return <Navbar />;
}

export default function DestinationsPage() {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All states");

  const states = [
    "All states",
    ...new Set(destinations.map((place) => place.state)),
  ];

  const visibleDestinations = destinations.filter((place) => {
    const matchesState =
      selectedState === "All states" || place.state === selectedState;

    const text =
      `${place.name} ${place.state} ${place.theme}`.toLowerCase();

    return matchesState && text.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <DestinationNavigation />

      <main className="destination-directory">
        <nav className="destination-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Destinations</span>
        </nav>

        <div className="destination-directory-heading">
          <span className="destination-eyebrow-label">
            YOUR NEXT STOP STARTS HERE
          </span>

          <h1>Where will you go next?</h1>

          <p>
            Discover famous sights, local highlights and ideas
            for your next trip across India.
          </p>
        </div>

        <div className="destination-directory-filters">
          <label className="destination-search-box">
            <span>Search destinations</span>
            <input
              type="search"
              placeholder="Try Mysore, Kerala or beaches"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <label className="destination-state-filter">
            <span>Filter by state</span>
            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
            >
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="destination-result-count" role="status">
          {visibleDestinations.length} destinations to explore
        </p>

        <div className="destination-directory-grid">
          {visibleDestinations.map((place) => (
            <article className="destination-directory-card" key={place.slug}>
              <Link
                className="destination-card-link"
                to={`/destinations/${place.slug}`}
              >
                <div className="destination-directory-photo">
                  <img
                    src={place.image}
                    alt={place.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="destination-state-badge">
                    {place.state}
                  </span>
                </div>

                <div className="destination-directory-card-body">
                  <div>
                    <h2>{place.name}</h2>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <p>{place.theme}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {visibleDestinations.length === 0 && (
          <div className="destination-no-results">
            <h2>No matching destinations.</h2>
            <p>Try another name or choose a different state.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedState("All states");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <a className="destination-credit-link" href="/image-credits.html">
          Photography credits
        </a>
      </main>

      <Footer />
    </>
  );
}
