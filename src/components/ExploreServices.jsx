import { useRef, useState } from "react";
import "./ExploreServices.css";
import { useNavigate } from "react-router-dom";
const services = [
  {
    id: "things-to-do",
    number: "01",
    title: "Things to do",
    subtitle: "Make a day of it.",
    description: "Sightseeing, theme parks, treks and day outings.",
    image: import.meta.env.BASE_URL + "images/things-to-do.jpg",
imageAlt: "Travel activities and experiences",
    options: [
      "Bengaluru sightseeing",
      "Theme parks & day outings",
      "Heritage tours",
      "Treks & outdoor experiences",
    ],
    note:
      "Ask Nature Holidays about available activities, dates and current prices.",
  },
  {
    id: "accommodation",
    number: "02",
    title: "Accommodation",
    subtitle: "Find your place to pause.",
    description: "Hotel reservations, resorts and staycation enquiries.",
    image: import.meta.env.BASE_URL + "images/accomodation.jpg",
imageAlt: "Holiday accommodation",
    options: [
      "Hotel reservation assistance",
      "Resort bookings",
      "Weekend stays",
      "Accommodation for groups",
    ],
    note:
      "Room availability, facilities, meal plans and prices will be confirmed by the team.",
  },
  {
    id: "transport",
    number: "03",
    title: "Transport options",
    subtitle: "Let’s get you there.",
    description: "Travel connections and ticket-booking assistance.",
    image: import.meta.env.BASE_URL + "images/transportation.jpg",
imageAlt: "Transport for your journey",
    options: [
      "Flight ticket-booking assistance",
      "Train ticket-booking assistance",
      "Bus ticket-booking assistance",
      "Transport enquiries for your trip",
    ],
    note:
      "Routes, fares and availability require confirmation. Live transport booking is not connected yet.",
  },
];

export default function ExploreServices() {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  function openService(service) {
  navigate(`/explore/${service.id}`);
}

  function closeService() {
    dialogRef.current?.close();
  }

  return (
    <section
      className="explore-services"
      id="explore-services"
      aria-labelledby="explore-services-title"
    >
      <div className="explore-services-heading">
        <div>
          <span className="explore-services-eyebrow">
            MORE WAYS TO EXPLORE
          </span>

          <h2 id="explore-services-title">
            Explore Nature Holidays.
          </h2>
        </div>

        <p>
          A day out, a place to stay or a way to get there.
          Start with what you need.
        </p>
      </div>

      <div className="explore-services-grid">
        {services.map((service) => (
          <button
            className="explore-service-card"
            type="button"
            key={service.id}
            onClick={() => openService(service)}
            aria-label={`Explore ${service.title.toLowerCase()}`}
          >
            <div className="explore-service-image">
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                decoding="async"
              />

              <span className="explore-service-shade" />

              <span className="explore-service-number">
                {service.number}
              </span>

              <span className="explore-service-subtitle">
                {service.subtitle}
              </span>
            </div>

            <div className="explore-service-content">
              <div className="explore-service-title-row">
                <h3>{service.title}</h3>

                <span
                  className="explore-service-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              <p>{service.description}</p>
            </div>
          </button>
        ))}
      </div>

      <dialog
        className="explore-service-dialog"
        ref={dialogRef}
        aria-labelledby="explore-service-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeService();
          }
        }}
      >
        <div className="explore-service-dialog-content">
          <div className="explore-service-dialog-top">
            <span className="explore-services-eyebrow">
              EXPLORE NATURE HOLIDAYS
            </span>

            <button
              className="explore-service-close"
              type="button"
              onClick={closeService}
              aria-label="Close service information"
              autoFocus
            >
              ×
            </button>
          </div>

          <h2 id="explore-service-dialog-title">
            {selectedService?.title}
          </h2>

          <ul className="explore-service-options">
            {selectedService?.options.map((option) => (
              <li key={option}>
                <span aria-hidden="true">↗</span>
                {option}
              </li>
            ))}
          </ul>

          <p className="explore-service-note">
            {selectedService?.note}
          </p>
        </div>
      </dialog>
    </section>
  );
}