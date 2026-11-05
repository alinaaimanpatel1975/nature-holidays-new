import { useEffect, useRef, useState } from "react";
import BounceCards from "./BounceCards";
import "./PopularTours.css";
import { useNavigate } from "react-router-dom";

const tours = [
  {
    name: "Mysore",
    state: "Karnataka",
    image: import.meta.env.BASE_URL + "images/tour-mysore.jpg",
    highlight: "Palaces & heritage",
  },
  {
    name: "Ooty",
    state: "Tamil Nadu",
    image: import.meta.env.BASE_URL + "images/tour-ooty.jpg",
    highlight: "Hills & scenic journeys",
  },
  {
    name: "Munnar",
    state: "Kerala",
    image: import.meta.env.BASE_URL + "images/tour-munnar.jpg",
    highlight: "Tea estates & mountain views",
  },
  {
    name: "Alleppey",
    state: "Kerala",
    image: import.meta.env.BASE_URL + "images/tour-alleppey.jpg",
    highlight: "Backwaters & houseboats",
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    image: import.meta.env.BASE_URL + "images/tour-jaipur.jpg",
    highlight: "Forts & royal architecture",
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    image: import.meta.env.BASE_URL + "images/tour-agra.jpg",
    highlight: "Monuments & history",
  },
  {
    name: "Goa",
    state: "Goa",
    image: import.meta.env.BASE_URL + "images/tour-goa.jpg",
    highlight: "Beaches & coastal escapes",
  },
  {
    name: "Dandeli",
    state: "Karnataka",
    image: import.meta.env.BASE_URL + "images/things-to-do.jpg",
    highlight: "Forest & river adventures",
  },
  {
    name: "Hampi",
    state: "Karnataka",
    image: import.meta.env.BASE_URL + "images/tour-hampi.jpg",
    highlight: "Ruins & heritage trails",
  },
  {
    name: "Kodaikanal",
    state: "Tamil Nadu",
    image: import.meta.env.BASE_URL + "images/tour-kodaikanal.jpg",
    highlight: "Lakes & hill escapes",
  },
];

function TourRow({ items, onSelect, rowNumber }) {
  const rowRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = rowRef.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          intersectionObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    resizeObserver.observe(element);
    intersectionObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  // Leave space for rotation and the cards moving on hover.
  const spread = Math.min(150, width * 0.145);
  const cardSize = Math.min(210, width * 0.27);
  const pushDistance = Math.min(70, width * 0.055);
  const height = Math.max(190, cardSize + 100);

  return (
    <div className="popular-tour-row" ref={rowRef}>
      <div
        className="popular-tour-stage"
        style={{ minHeight: height }}
      >
        {visible && width > 0 && (
          <BounceCards
            images={items.map((tour) => ({
              src: tour.image,
              alt: `${tour.name}, ${tour.state}`,
            }))}
            containerWidth={width}
            containerHeight={height}
            cardSize={cardSize}
            spread={spread}
            rotation={7}
            arc={12}
            pushDistance={pushDistance}
            hoverScale={1.04}
            bounciness={0.45}
            animationDelay={0.1}
            animationStagger={0.08}
            borderWidth={4}
            borderColor="#F7F5EF"
            radius={20}
            shadow
            enableHover
            onCardClick={(index) => onSelect(items[index])}
          />
        )}
      </div>

      <div
        className="popular-tour-names"
        aria-label={`Tours in collection ${rowNumber}`}
      >
        {items.map((tour) => (
          <button
            type="button"
            key={tour.name}
            onClick={() => onSelect(tour)}
          >
            {tour.name}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PopularTours() {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [selectedTour, setSelectedTour] = useState(null);

  function openTour(tour) {
  const destinationSlugs = {
    Mysore: "mysore",
    Ooty: "ooty",
    Munnar: "munnar",
    Alleppey: "alleppey",
    Jaipur: "jaipur",
    Agra: "agra",
    Goa: "goa",
    Dandeli: "dandeli",
    Hampi: "hampi",
    Kodaikanal: "kodaikanal",
  };

  const slug = destinationSlugs[tour.name];

  if (slug) {
    navigate(`/destinations/${slug}`);
  }
}
  function closeTour() {
    dialogRef.current?.close();
  }

  return (
    <section
      className="popular-tours"
      aria-labelledby="popular-tours-title"
    >
      <div className="popular-tours-inner">
        <div className="popular-tours-heading">
          <span className="popular-tours-eyebrow">
            TEN PLACES. PLENTY OF POSSIBILITIES.
          </span>

          <h2 id="popular-tours-title">Tours to explore.</h2>

          <p>
            Pick a photograph. Find your next change of scene.
          </p>
        </div>

        <TourRow
          items={tours.slice(0, 5)}
          onSelect={openTour}
          rowNumber={1}
        />

        <TourRow
          items={tours.slice(5, 10)}
          onSelect={openTour}
          rowNumber={2}
        />
      </div>

      <dialog
        className="popular-tour-dialog"
        ref={dialogRef}
        aria-labelledby="popular-tour-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeTour();
          }
        }}
      >
        <div className="popular-tour-dialog-content">
          <div className="popular-tour-dialog-top">
            <span className="popular-tours-eyebrow">
              EXPLORE THE DESTINATION
            </span>

            <button
              type="button"
              className="popular-tour-close"
              onClick={closeTour}
              aria-label="Close tour information"
              autoFocus
            >
              ×
            </button>
          </div>

          <h2 id="popular-tour-dialog-title">
            {selectedTour?.name}
          </h2>

          <span className="popular-tour-state">
            {selectedTour?.state}
          </span>

          <p className="popular-tour-highlight">
            {selectedTour?.highlight}
          </p>

          <p className="popular-tour-description">
            Contact Nature Holidays for the current itinerary,
            available dates, inclusions and package price.
          </p>

          <p className="popular-tour-development-note">
            We’ll connect this tour to its package section
            when the Packages page is ready.
          </p>
        </div>
      </dialog>
    </section>
  );
}