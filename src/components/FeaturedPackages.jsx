import { useRef, useState } from "react";
import "./FeaturedPackages.css";
import { Link } from "react-router-dom";
const packages = [
  {
    id: "mysore-ooty",
    name: "Mysore & Ooty",
    image: import.meta.env.BASE_URL + "images/karnataka.jpg",
    location: "Karnataka & Tamil Nadu",
    category: "Sightseeing package",
    places: "Mysore · Ooty",
    duration: "To be confirmed",
    price: "Request a quote",
    description:
      "A tour listed in the Nature Holidays brochure. Request the current itinerary, departure dates and package inclusions.",
  },
  {
    id: "munnar-alleppey-kochi",
    name: "Munnar, Alleppey & Kochi",
    image: import.meta.env.BASE_URL + "images/kerala.jpg",
    location: "Kerala",
    category: "Multi-destination tour",
    places: "Munnar · Alleppey · Kochi",
    duration: "To be confirmed",
    price: "Request a quote",
    description:
      "Explore this Kerala tour from the Nature Holidays brochure. Accommodation, transport, meals and availability will be confirmed with your quote.",
  },
  {
    id: "raj-se-taj-tak",
    name: "Rajasthan",
    image: import.meta.env.BASE_URL + "images/rajasthan.jpg",
    location: "Rajasthan & Agra",
    category: "Heritage tour",
    places: "Final route on request",
    duration: "To be confirmed",
    price: "Request a quote",
    description:
      "A heritage tour listed in the Nature Holidays brochure. Contact the team for the confirmed route, sightseeing stops and current package options.",
  },
  {
    id: "goa-dandeli",
    name: "Goa & Dandeli",
    image: import.meta.env.BASE_URL + "images/goa.jpg",
    location: "Goa & Karnataka",
    category: "Beach & nature getaway",
    places: "Goa · Dandeli",
    duration: "To be confirmed",
    price: "Request a quote",
    description:
      "Discover this Goa and Dandeli tour from the Nature Holidays brochure. Ask for the latest itinerary, activities, transport options and pricing.",
  },
];

export default function FeaturedPackages() {
  const [activeId, setActiveId] = useState(packages[0].id);
  const dialogRef = useRef(null);

  const activePackage = packages.find(
    (trip) => trip.id === activeId
  );

  function openPackage() {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }

  function closePackage() {
    dialogRef.current?.close();
  }

  return (
    <section
      className="featured-packages"
      aria-labelledby="featured-heading"
    >
      <div className="featured-layout">
        <div className="featured-visual-column">
          <div
            className="featured-photo-grid"
            role="group"
            aria-label="Choose a featured package"
          >
            {packages.map((trip, index) => (
              <button
                key={trip.id}
                type="button"
                className={`featured-petal featured-petal--${index + 1} ${
                  activeId === trip.id ? "featured-petal--active" : ""
                }`}
                aria-pressed={activeId === trip.id}
                aria-controls="featured-package-information"
                aria-label={`Show ${trip.name} package`}
                onClick={() => setActiveId(trip.id)}
              >
                <img
                  src={trip.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

                <span className="featured-petal-shade" />

                <span className="featured-petal-label">
                  {trip.name}
                </span>
              </button>
            ))}
          </div>

          <p className="featured-image-note">
            Select a destination to explore its package.
            Images are illustrative.
          </p>
        </div>

        <div className="featured-information">
  <span className="featured-section-label">
    FEATURED PACKAGES
  </span>

  <h2 id="featured-heading">Find your next getaway.</h2>

  <div className="featured-package-links">
    {packages.map((trip) => (
      <Link
  key={trip.id}
  to={`/packages#${trip.id}`}
  className={`featured-package-link ${
    activeId === trip.id ? "featured-package-link--active" : ""
  }`}
  onMouseEnter={() => setActiveId(trip.id)}
  onFocus={() => setActiveId(trip.id)}
>
  <span>{trip.name}</span>
  <span aria-hidden="true">↗</span>
</Link>
    ))}
  </div>

  <Link className="featured-view-button" to="/packages">
  View all packages
  <span aria-hidden="true">↗</span>
</Link>
</div>
      </div>

      <dialog
        className="featured-dialog"
        ref={dialogRef}
        aria-labelledby="featured-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closePackage();
          }
        }}
      >
        <div className="featured-dialog-content">
          <div className="featured-dialog-top">
            <span className="featured-section-label">
              PACKAGE OVERVIEW
            </span>

            <button
              type="button"
              className="featured-dialog-close"
              onClick={closePackage}
              aria-label="Close package overview"
              autoFocus
            >
              ×
            </button>
          </div>

          <h2 id="featured-dialog-title">
            {activePackage.name}
          </h2>

          <p>{activePackage.description}</p>

          <dl className="featured-package-facts">
            <div>
              <dt>Location</dt>
              <dd>{activePackage.location}</dd>
            </div>

            <div>
              <dt>Package type</dt>
              <dd>{activePackage.category}</dd>
            </div>
          </dl>

          <p className="featured-dialog-note">
            This overview will connect to the full package
            details page when we add routing.
          </p>
        </div>
      </dialog>
    </section>
  );
}