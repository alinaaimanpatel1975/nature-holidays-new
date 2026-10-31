import { Link, useParams } from "react-router-dom";

import { destinations } from "../data/destinations";
import { destinationGuides } from "../data/destinationGuides";
import { DestinationNavigation } from "./DestinationsPage";
import Footer from "../components/Footer";

import "./DestinationDetails.css";

function getMapLink(attraction, destination) {
  const search = `${attraction}, ${destination}, India`;

  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(search)
  );
}



export default function DestinationDetails() {
  const { slug } = useParams();

  const destination = destinations.find(
    (place) => place.slug === slug
  );

  const guide = destinationGuides[slug];

  if (!destination || !guide) {
    return (
      <>
        <DestinationNavigation />

        <main className="destination-guide-missing">
          <h1>Destination not found.</h1>
          <p>Let’s find somewhere else to explore.</p>
          <Link to="/destinations">Browse destinations ↗</Link>
        </main>

        <Footer />
      </>
    );
  }

 

  return (
    <>
      <DestinationNavigation />

      <main className="destination-guide">
        <div className="destination-guide-top">
          <nav
            className="destination-breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/destinations">Destinations</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{destination.name}</span>
          </nav>
        </div>

        <section
          className="destination-guide-hero"
          aria-labelledby="destination-guide-title"
        >
          <img src={destination.image} alt="" />

          <div className="destination-guide-hero-shade" />

          <div className="destination-guide-hero-content">
            <span>{destination.state}</span>

            <h1 id="destination-guide-title">
              Explore {destination.name}.
            </h1>

            <p>{guide.subtitle}</p>

            <a href="#famous-places">
              Discover the highlights
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <a
            className="destination-hero-credit"
            href={destination.imageCredit}
          >
            Photo credit
          </a>
        </section>
        
        <section
          className="destination-snapshot"
          aria-label={`${destination.name} at a glance`}
        >
          <div className="destination-snapshot-inner">
            <div className="destination-snapshot-item">
              <span>STATE / REGION</span>
              <strong>{destination.state}</strong>
            </div>

            <div className="destination-snapshot-item">
              <span>FEATURED PLACES</span>
              <strong>{destination.attractions.length}</strong>
            </div>

            <div className="destination-snapshot-item">
              <span>EXPERIENCE IDEAS</span>
              <strong>{guide.activities.length}</strong>
            </div>
          </div>
        </section>


        <div className="destination-guide-body">
          <nav
            className="destination-guide-jump-links"
            aria-label="On this destination page"
          >
            <a href="#about-destination">Overview</a>
            <a href="#famous-places">Famous places</a>
            <a href="#things-to-do">Things to do</a>
            <a href="#plan-your-visit">Plan your visit</a>
          </nav>

          <section
            className="destination-guide-introduction"
            id="about-destination"
          >
            <span className="guide-section-eyebrow">
              GET TO KNOW THE DESTINATION
            </span>

            <h2>A little about {destination.name}.</h2>

            <p>{guide.about}</p>
          </section>

          <section
            className="destination-guide-section"
            id="famous-places"
            aria-labelledby="famous-places-title"
          >
            <div className="destination-guide-section-heading">
              <div>
                <span className="guide-section-eyebrow">
                  START WITH THE HIGHLIGHTS
                </span>

                <h2 id="famous-places-title">
                  Famous places & experiences.
                </h2>
              </div>

              <p>
                A first look at some of the destination’s
                familiar highlights.
              </p>
            </div>

            <div className="destination-attractions-grid">
              {destination.attractions.map((attraction) => (
                <article
                  className="destination-attraction"
                  key={attraction.id}
                >
                  <div className="destination-attraction-photo">
                    <img
                      src={attraction.image}
                      alt={attraction.alt}
                      loading="lazy"
                      decoding="async"
                    />

                    <a
                      className="destination-attraction-credit"
                      href={attraction.creditUrl}
                      aria-label={`Photo credit for ${attraction.name}`}
                    >
                      Photo credit
                    </a>
                  </div>

                  <div className="destination-attraction-content">
                    <h3>{attraction.name}</h3>

                    <p>{guide.attractions[attraction.id]}</p>

                    <a
                      className="destination-map-link"
                      href={getMapLink(
                        attraction.name,
                        destination.name
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Find on map
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="destination-guide-section"
            id="things-to-do"
            aria-labelledby="destination-activities-title"
          >
            <span className="guide-section-eyebrow">
              MAKE MORE OF YOUR VISIT
            </span>

            <h2 id="destination-activities-title">
              Things to do in {destination.name}.
            </h2>

            <div className="destination-activities-grid">
              {guide.activities.map(([title, description], index) => (
                <article
                  className="destination-activity"
                  key={title}
                >
                  <span className="destination-activity-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <p className="destination-guide-small-note">
              These are travel ideas, not confirmed bookable
              activities. Ask our team about available arrangements.
            </p>
          </section>

          <section
            className="destination-visit-planning"
            id="plan-your-visit"
            aria-labelledby="destination-planning-title"
          >
            <div>
              <span className="guide-section-eyebrow">
                BEFORE YOU GO
              </span>

              <h2 id="destination-planning-title">
                Plan your visit.
              </h2>

              <p>{guide.planning}</p>
            </div>

            <a
              href={guide.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official visitor information
              <span>{guide.sourceName} ↗</span>
            </a>
          </section>

          <section className="destination-package-banner">
            <div>
              <h2>
                Let’s plan your {destination.name} trip.
              </h2>

              <p>
                Tell Nature Holidays your dates, departure city
                and group size.
              </p>
            </div>

            <div className="destination-package-banner-actions">
              {destination.packageId && (
                <Link
                  className="destination-guide-primary-button"
                  to={`/packages#${destination.packageId}`}
                >
                  Explore a related package
                  <span aria-hidden="true">↗</span>
                </Link>
              )}

              <Link
  className="destination-guide-secondary-button"
  to={`/contact?package=${encodeURIComponent(
    `${destination.name} — Custom trip`
  )}`}
>
  Enquire about this destination
  <span aria-hidden="true">↗</span>
</Link>

            </div>
          </section>

          <div className="destination-guide-bottom">
            <Link to="/destinations">← All destinations</Link>
            <a href="/image-credits.html">Photography credits</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}