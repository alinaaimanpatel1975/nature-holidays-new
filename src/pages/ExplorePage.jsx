
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ExplorePage.css";

const exploreCategories = {
  "things-to-do": {
    title: "Things to do",
    subtitle: "Find a good reason to get out.",
    description:
      "Explore day outings, sightseeing and attractions from the Nature Holidays brochure.",
    image: import.meta.env.BASE_URL + "images/things-to-do.jpg",
    groups: ["All options", "Theme Parks", "Resort Outings", "Sightseeing"],
    items: [
      { name: "Wonderla Parks & Resort", group: "Theme Parks", description: "Enquire about a park outing and available arrangements." },
      { name: "GRS Fantasy Park", group: "Theme Parks", description: "Ask about entry arrangements and group outing options." },
      { name: "Snow City", group: "Theme Parks", description: "Check current visit options for your preferred date." },
      { name: "Fun World", group: "Theme Parks", description: "Explore an amusement-park outing with your group." },
      { name: "Jollywood Studios", group: "Theme Parks", description: "Request current outing options and entry information." },
      { name: "Elim Resort", group: "Resort Outings", description: "Ask about available day-out packages and inclusions." },
      { name: "Guhantara Resort", group: "Resort Outings", description: "Enquire about a resort outing for your group." },
      { name: "Dharamshi Resort", group: "Resort Outings", description: "Request the current day-out arrangements and quote." },
      { name: "Greenwood Resort", group: "Resort Outings", description: "Check availability and outing options with the team." },
      { name: "Dreamland Resort", group: "Resort Outings", description: "Ask about group sizes, dates and package inclusions." },
      { name: "Avaniya Adventures Resort", group: "Resort Outings", description: "Enquire about available outings and activities." },
      { name: "Namma Bengaluru Rounds", group: "Sightseeing", description: "Plan a city route around gardens, museums and landmarks." },
      { name: "Nandi Hills and Isha Temple", group: "Sightseeing", description: "Explore this outing listed in the brochure." },
      { name: "Mysore, KRS Garden", group: "Sightseeing", description: "Request the sightseeing route and travel arrangements." },
      { name: "Hampi & Pattadakal", group: "Sightseeing", description: "Ask about a heritage journey through these destinations." },
    ],
  },
  accommodation: {
    title: "Accommodation",
    subtitle: "Find your place to pause.",
    description:
      "Talk to Nature Holidays about hotel reservations, resort bookings and accommodation for your trip.",
    image: import.meta.env.BASE_URL + "images/accommodation.jpg",
    groups: ["All options", "Hotels", "Resorts", "Group Stays"],
    items: [
      { name: "Hotel reservation assistance", group: "Hotels", description: "Share your destination, dates, room count and preferred hotel category." },
      { name: "Resort booking enquiries", group: "Resorts", description: "Ask about available resorts and whether you need a day outing or an overnight stay." },
      { name: "School & college group stays", group: "Group Stays", description: "Discuss group size, room arrangements, meal requirements and your itinerary." },
      { name: "Corporate & group accommodation", group: "Group Stays", description: "Share your team’s stay requirements and ask about suitable arrangements." },
    ],
  },
  transport: {
    title: "Transport options",
    subtitle: "Let’s get you there.",
    description:
      "Enquire about ticket-booking assistance and transport arrangements for your Nature Holidays trip.",
    image: import.meta.env.BASE_URL + "images/transport.jpg",
    groups: ["All options", "Flights", "Trains", "Buses", "Tour Transport"],
    items: [
      { name: "Flight ticket-booking assistance", group: "Flights", description: "Share your departure city, destination, dates and passenger count." },
      { name: "Train ticket-booking assistance", group: "Trains", description: "Tell the team your route, travel date and preferred travel class." },
      { name: "Bus ticket-booking assistance", group: "Buses", description: "Ask about available options for your route and travel date." },
      { name: "Transport for your tour", group: "Tour Transport", description: "Discuss pickup points, group size and transport requirements for your package." },
    ],
  },
};

const categoryLinks = [
  { id: "things-to-do", name: "Things to do" },
  { id: "accommodation", name: "Accommodation" },
  { id: "transport", name: "Transport options" },
];

function ExploreContent({ category, data }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All options");

  const visibleItems = data.items.filter((item) => {
    const matchesGroup = group === "All options" || item.group === group;
    const text =
      `${item.name} ${item.group} ${item.description}`.toLowerCase();

    return matchesGroup && text.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <section className="explore-page-banner">
        <img src={data.image} alt="" />
        <div className="explore-page-banner-shade" />
        <div className="explore-page-banner-content">
          <span>EXPLORE NATURE HOLIDAYS</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
      </section>

      <main className="explore-page-content">
        <nav className="explore-page-tabs" aria-label="Explore categories">
          {categoryLinks.map((item) => (
            <Link
              key={item.id}
              to={`/explore/${item.id}`}
              aria-current={category === item.id ? "page" : undefined}
              className={
                category === item.id
                  ? "explore-page-tab explore-page-tab--active"
                  : "explore-page-tab"
              }
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="explore-page-introduction">
          <h2>Explore your options.</h2>
          <p>{data.description}</p>
        </div>

        <label className="explore-page-search">
          <span>Search {data.title.toLowerCase()}</span>
          <input
            type="search"
            value={query}
            placeholder="Search by name or type"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="explore-page-filters" aria-label="Filter options">
          {data.groups.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={group === item}
              className={group === item ? "explore-filter-active" : ""}
              onClick={() => setGroup(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="explore-page-count" role="status">
          {visibleItems.length}{" "}
          {visibleItems.length === 1 ? "option" : "options"}
        </p>

        <div className="explore-options-grid">
          {visibleItems.map((item) => (
            <article className="explore-option-card" key={item.name}>
              <span className="explore-option-category">{item.group}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <Link to={`/contact?package=${encodeURIComponent(item.name)}`}>
                Enquire now
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>

        {visibleItems.length === 0 && (
          <div className="explore-empty">
            <h3>No matching options.</h3>
            <p>Try another search or clear your filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setGroup("All options");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="explore-availability-note">
          All options are enquiry-based. Availability, entry arrangements,
          inclusions and prices require confirmation from Nature Holidays.
          Submitting an enquiry does not reserve a ticket, room or journey.
        </p>

        <section className="explore-help-banner">
          <div>
            <h2>Not sure where to start?</h2>
            <p>Tell us what you need. We’ll help you explore the options.</p>
          </div>
          <Link to="/contact">
            Talk to our team <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    </>
  );
}

export default function ExplorePage() {
  const { category } = useParams();
  const data = exploreCategories[category];

  return (
    <>
      <Navbar />

      {data ? (
        <ExploreContent key={category} category={category} data={data} />
      ) : (
        <main className="explore-page-content explore-empty">
          <h1>Let’s find what you’re looking for.</h1>
          <Link to="/explore/things-to-do">Explore things to do ↗</Link>
        </main>
      )}

      <Footer />
    </>
  );
}
