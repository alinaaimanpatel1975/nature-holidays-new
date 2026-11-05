import "./Footer.css";
import { Link } from "react-router-dom";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Nature Holidays, Arekere, Bannerghatta Road, Bengaluru 560076"
  );

export default function Footer() {
  return (
    <footer className="nature-footer" id="contact">
      <div className="nature-footer-inner">
        <div className="nature-footer-top">
          <a
            className="nature-footer-brand"
            href="/"
            aria-label="Nature Holidays home"
          >
            <img
  src={`${import.meta.env.BASE_URL}images/logo.png`}
  alt="Nature Holidays"
/>
            <span>Nature Holidays</span>
          </a>

          <p>Turning Dreams Into Destinations.</p>
        </div>

        <div className="nature-footer-grid">
          <div className="nature-footer-about">
            <h2>Good journeys start with a conversation.</h2>

            <p>
              From a day out together to a longer journey across
              India, talk to us about your next travel plan.
            </p>

            <Link className="nature-footer-email-link" to="/contact">
  Let’s plan your trip
  <span aria-hidden="true">↗</span>
</Link>
          </div>

          <nav
  className="nature-footer-column"
  aria-label="Footer navigation"
>
  <h3>Explore</h3>
  <Link to="/packages">Our packages</Link>
  <Link to="/destinations">Destinations</Link>
  <Link to="/explore/things-to-do">Things to do</Link>
  <Link to="/explore/accommodation">Accommodation</Link>
  <Link to="/explore/transport">Transport options</Link>
  <Link to="/contact">Plan your trip</Link>
  <a href="/image-credits.html">Photography credits</a>
</nav>

          <div className="nature-footer-column">
            <h3>Let’s talk</h3>

            <a href="tel:+919738234786">
              +91 97382 34786
            </a>

            <a href="tel:+919243404797">
              +91 92434 04797
            </a>

            <a href="tel:+918041121473">
              080 4112 1473
            </a>

            <a href="mailto:info@natureholidays.co">
              info@natureholidays.co
            </a>
          </div>

          <div className="nature-footer-column">
            <h3>Find us</h3>

            <address>
              #420/b, 2nd Floor, 2nd Cross,
              <br />
              Lakshmi Layout, Arekere,
              <br />
              Bannerghatta Road,
              <br />
              Bengaluru, Karnataka – 560076
            </address>

            <a
              className="nature-footer-map"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open map
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="nature-footer-bottom">
          <p>
            © {new Date().getFullYear()} Nature Holidays.
            All rights reserved.
          </p>

          <Link to="/">
  Back to home
  <span aria-hidden="true">↑</span>
</Link>
        </div>
      </div>
    </footer>
  );
}