
import { useEffect, useState } from "react";
import "./App.css";
import useHeroTransition from "./useHeroTransition";
import PackageCategories from "./components/PackageCategories";
import FeaturedPackages from "./components/FeaturedPackages";
import ExploreServices from "./components/ExploreServices";
import PopularTours from "./components/PopularTours";
import WhyUs from "./components/WhyUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Karnataka",
    image: import.meta.env.BASE_URL + "images/karnataka.jpg",
    caption: "Coffee trails, ancient cities and greener weekends.",
  },
  {
    name: "Kerala",
    image: import.meta.env.BASE_URL + "images/kerala.jpg",
    caption: "Slow mornings, backwaters and a little coastal calm.",
  },
  {
    name: "Rajasthan",
    image: import.meta.env.BASE_URL + "images/rajasthan.jpg",
    caption: "Royal cities, desert skies and stories around every corner.",
  },
  {
    name: "Goa",
    image: import.meta.env.BASE_URL + "images/goa.jpg",
    caption: "Salty air, sunshine and days without a rush.",
  },
  {
    name: "Tamil Nadu",
    image: import.meta.env.BASE_URL + "images/tamil-nadu.jpg",
    caption: "Temple towns, hill escapes and beautiful coastlines.",
  },
  {
    name: "Uttarakhand",
    image: import.meta.env.BASE_URL + "images/uttarakhand.jpg",
    caption: "Mountain mornings and trails worth waking up for.",
  },
  {
    name: "Uttar Pradesh",
    image: import.meta.env.BASE_URL + "images/uttar-pradesh.jpg",
    caption: "Timeless monuments and journeys through living history.",
  },
  {
    name: "Maharashtra",
    image: import.meta.env.BASE_URL + "images/maharashtra.jpg",
    caption: "Fort trails, city breaks and monsoon-green hills.",
  },
];

const TRANSITION_DURATION = 1100;
const DISPLAY_DURATION = 4000;

function getLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function App() {
  const navigate = useNavigate();
  const [homeCity, setHomeCity] = useState("Bengaluru");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useHeroTransition(incomingIndex, reducedMotion);

  const activeDestination = destinations[activeIndex];
  const isTransitioning = incomingIndex !== null;
  const today = getLocalDate(new Date());

  const queue = Array.from(
    { length: destinations.length - 1 },
    (_, position) => {
      const index = (activeIndex + position + 1) % destinations.length;

      return {
        ...destinations[index],
        index,
      };
    }
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updatePreference() {
      setReducedMotion(media.matches);
    }

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    destinations.forEach((item) => {
      const image = new Image();
      image.src = item.image;
    });
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || incomingIndex !== null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIncomingIndex((activeIndex + 1) % destinations.length);
    }, DISPLAY_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, incomingIndex, paused, reducedMotion]);

  useEffect(() => {
    if (incomingIndex === null) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        setActiveIndex(incomingIndex);
        setIncomingIndex(null);
      },
      reducedMotion ? 0 : TRANSITION_DURATION
    );

    return () => window.clearTimeout(timer);
  }, [incomingIndex, reducedMotion]);

  function showNextDestination() {
    if (isTransitioning) return;
    setIncomingIndex((activeIndex + 1) % destinations.length);
  }

  function selectNextWeekend() {
    const nextSaturday = new Date();
    const daysUntilSaturday = (6 - nextSaturday.getDay() + 7) % 7;

    nextSaturday.setDate(
      nextSaturday.getDate() + (daysUntilSaturday || 7)
    );

    setTravelDate(getLocalDate(nextSaturday));
    setSearchMessage("");
  }

  function handleSearch(event) {
    event.preventDefault();

    const selectedDestination = destination.trim();

    if (!selectedDestination) {
      setSearchMessage("Enter a destination to get started.");
      return;
    }

    const params = new URLSearchParams({ q: selectedDestination });

    if (travelDate) {
      params.set("date", travelDate);
    }

    navigate(`/packages?${params.toString()}`);
  }

  return (
    <>
      <Navbar
        showCityPicker
        homeCity={homeCity}
        onHomeCityChange={setHomeCity}
      />

      <main>
        <section
          className="hero"
          aria-labelledby="hero-title"
          aria-roledescription="carousel"
          aria-label="Discover Indian destinations"
        >
          <img
            className="hero-background"
            src={activeDestination.image}
            alt=""
            fetchPriority="high"
          />

          {isTransitioning && (
            <div className="hero-incoming" aria-hidden="true">
              <img src={destinations[incomingIndex].image} alt="" />
            </div>
          )}

          <div className="hero-shade" aria-hidden="true" />

          <div className="hero-content">
            <span className="hero-label">INDIA. ONE EXPERIENCE AT A TIME.</span>

            <h1 id="hero-title">
              Your next escape.
              <br />
              Closer than you think.
            </h1>

            <p>
              Discover day trips, weekend stays and unforgettable
              experiences across India.
            </p>

            <a className="hero-link" href="#explore">
              Find your experience
              <span aria-hidden="true">?</span>
            </a>

          
          </div>

          <div className="hero-bottom">
            <div className="destination-caption" id="destination-preview">
              <span className="destination-eyebrow">IN THE SPOTLIGHT</span>
              <h2>{activeDestination.name}</h2>
              <p>{activeDestination.caption}</p>

              <div className="slider-controls">
                <span className="slide-number">
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span> / {String(destinations.length).padStart(2, "0")}</span>
                </span>

                <button
                  type="button"
                  className="slider-control"
                  onClick={() => setPaused((current) => !current)}
                  disabled={reducedMotion}
                  aria-label={
                    reducedMotion
                      ? "Automatic rotation disabled by reduced motion preference"
                      : paused
                        ? "Resume automatic destination rotation"
                        : "Pause automatic destination rotation"
                  }
                >
                  {paused || reducedMotion ? "Play" : "Pause"}
                </button>

                <button
                  type="button"
                  className="slider-control next-control"
                  onClick={showNextDestination}
                  disabled={isTransitioning}
                  aria-label="Show next destination"
                >
                  <span aria-hidden="true">?</span>
                </button>
              </div>
            </div>

            <div className="destination-queue" aria-label="Upcoming destinations">
              {queue.map((item, position) => (
                <div
                  className={`destination-card ${
                    position === 0 && isTransitioning
                      ? "destination-card--departing"
                      : ""
                  }`}
                  key={item.name}
                  style={{
                    "--position": position,
                    zIndex: queue.length - position,
                  }}
                >
                  <img src={item.image} alt="" />
                  <div className="destination-card-shade" />
                  <div className="destination-card-text">
                    <span>{String(item.index + 1).padStart(2, "0")}</span>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="discovery" id="explore" aria-label="Find an experience">
          <form className="search-panel" onSubmit={handleSearch}>
            <label className="search-field">
              <span>Where to?</span>
              <input
                type="text"
                list="destination-options"
                placeholder={`Try places near ${homeCity}`}
                value={destination}
                onChange={(event) => {
                  setDestination(event.target.value);
                  setSearchMessage("");
                }}
                required
              />

              <datalist id="destination-options">
                {destinations.map((item) => (
                  <option key={item.name} value={item.name} />
                ))}
                <option value="Bengaluru" />
                <option value="Coorg" />
                <option value="Mysuru" />
                <option value="Nandi Hills" />
                <option value="Lonavala" />
                <option value="Munnar" />
              </datalist>
            </label>

            <label className="search-field date-field">
              <span>When?</span>
              <input
                type="date"
                aria-label="Travel date"
                min={today}
                value={travelDate}
                onChange={(event) => {
                  setTravelDate(event.target.value);
                  setSearchMessage("");
                }}
              />
            </label>

            <button
              type="button"
              className="weekend-button"
              onClick={selectNextWeekend}
            >
              Next weekend
              <span>Choose Saturday ?</span>
            </button>

            <button type="submit" className="search-button">
              Search experiences
              <span aria-hidden="true">?</span>
            </button>
          </form>

          <p className="search-feedback" role="status">
            {searchMessage}
          </p>
        </section>

        <PackageCategories />
        <FeaturedPackages />
        <ExploreServices />
        <PopularTours />
        <WhyUs />
      </main>

      <Footer />
    </>
  );
}



