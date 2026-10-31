
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  createEnquiryReference,
  saveEnquiry,
} from "../utils/enquiryStorage";

import "./ContactPage.css";

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

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";

  const parsed = new Date(`${value}T00:00:00`);

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value ||
    value < localDate()
  ) {
    return "";
  }

  return value;
}

function validTravellers(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) return "2";

  return String(Math.min(number, 5000));
}

const mapLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Nature Holidays, Arekere, Bannerghatta Road, Bengaluru 560076"
  );

const tripTypes = [
  "School & College",
  "Honeymoon",
  "Corporate & Group",
  "Family Holiday",
  "Weekend & Day Outing",
  "Other / Custom Trip",
];

function formatTravelDate(value) {
  if (!value) return "Flexible / not decided";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ContactPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedPackage = searchParams.get("package") || "";
  const selectedDate = validDate(searchParams.get("date") || "");

  const selectedTravellers = validTravellers(
    searchParams.get("travellers") || "2"
  );

  const requestedTripType = searchParams.get("tripType") || "";

  const selectedTripType = tripTypes.includes(requestedTripType)
    ? requestedTripType
    : selectedPackage.includes("— Custom trip")
      ? "Other / Custom Trip"
      : "";

  const selectedDestination =
    searchParams.get("destination") ||
    (selectedPackage.includes("— Custom trip")
      ? selectedPackage.replace("— Custom trip", "").trim()
      : "");

  const rawPrice = searchParams.get("price") || "";

  const selectedPrice =
    /^\d+$/.test(rawPrice) && Number(rawPrice) > 0
      ? Number(rawPrice)
      : null;

  const selectedPriceBasis =
    searchParams.get("priceBasis") || "per person · twin-sharing";

  const hasPackageSelection = Boolean(selectedPackage);

  const indicativePriceLabel = selectedPrice
    ? `₹${formatPrice(selectedPrice)} / person`
    : "Price on request";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    packageName: selectedPackage,
    tripType: selectedTripType,
    destination: selectedDestination,
    travelDate: selectedDate,
    travellers: selectedTravellers,
    departureCity: "",
    requests: "",
  });

  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    setForm((current) => ({
      ...current,
      packageName: selectedPackage,
      tripType: selectedTripType,
      destination: selectedDestination,
      travelDate: selectedDate,
      travellers: selectedTravellers,
    }));

    setStorageError("");
  }, [
    selectedPackage,
    selectedTripType,
    selectedDestination,
    selectedDate,
    selectedTravellers,
  ]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setStorageError("");
  }

  function prepareEnquiry(event) {
    event.preventDefault();
    setStorageError("");

    const reference = createEnquiryReference();
    const date = formatTravelDate(form.travelDate);

    const priceDetails = selectedPrice
      ? `₹${formatPrice(selectedPrice)} / person (${selectedPriceBasis}; indicative estimate only)`
      : hasPackageSelection
        ? "Price on request"
        : "Not applicable";

    const subject = form.packageName.trim()
      ? `Travel enquiry: ${form.packageName.trim()}`
      : `Travel enquiry: ${form.destination.trim() || form.tripType}`;

    const body = [
      "Hello Nature Holidays,",
      "",
      "I'd like help planning a trip.",
      "",
      `Enquiry reference: ${reference}`,
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Package: ${form.packageName.trim() || "Custom trip"}`,
      `Indicative package price: ${priceDetails}`,
      `Trip type: ${form.tripType || "Not specified"}`,
      `Destination: ${form.destination.trim() || "Please suggest options"}`,
      `Preferred travel date: ${date}`,
      `Number of travellers: ${form.travellers}`,
      `Departure city: ${form.departureCity.trim() || "Not specified"}`,
      "",
      "Additional requirements:",
      form.requests.trim() || "None specified",
      "",
      "Please share suitable options, the current itinerary,",
      "confirmed inclusions, exclusions, availability and a final quote.",
    ].join("\n");

    const emailLink =
      "mailto:info@natureholidays.co" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    const enquiryRecord = {
      id: reference,
      createdAt: new Date().toISOString(),
      status: "Draft — not sent",
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      trip: {
        packageName: form.packageName.trim(),
        tripType: form.tripType,
        destination: form.destination.trim(),
        travelDate: form.travelDate,
        travellers: Number(form.travellers),
        departureCity: form.departureCity.trim(),
        requests: form.requests.trim(),
      },
      price: {
        amount: selectedPrice,
        basis: selectedPriceBasis,
        label: indicativePriceLabel,
      },
      email: {
        subject,
        body,
        link: emailLink,
      },
    };

    try {
      saveEnquiry(enquiryRecord);

      navigate(
        `/enquiry-confirmation/${encodeURIComponent(reference)}`
      );
    } catch (error) {
      console.error("Could not save enquiry:", error);

      setStorageError(
        "Your enquiry could not be saved in this browser. Check your browser storage settings and try again."
      );
    }
  }

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <nav className="contact-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contact</span>
        </nav>

        <div className="contact-page-heading">
          <span className="contact-eyebrow">
            YOUR NEXT TRIP STARTS WITH A CONVERSATION
          </span>

          <h1>
            {hasPackageSelection
              ? "Let's plan this trip."
              : "Tell us what you have in mind."}
          </h1>

          <p>
            {hasPackageSelection
              ? "Your selected package is ready. Add your details and we'll take it from here."
              : "A college outing, a honeymoon or a holiday with your favourite people. Let's explore the possibilities."}
          </p>
        </div>

        <div className="contact-layout">
          <section
            className="trip-enquiry-panel"
            aria-labelledby="trip-enquiry-title"
          >
            <div className="trip-enquiry-heading">
              <h2 id="trip-enquiry-title">
                {hasPackageSelection ? "Your trip details." : "Plan your trip."}
              </h2>
              <p>Share your plans below. Fields marked * are required.</p>
            </div>

            <form className="trip-enquiry-form" onSubmit={prepareEnquiry}>
              <div className="trip-form-grid">
                <label className="trip-form-field">
                  <span>Full name *</span>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={updateField}
                    maxLength={100}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Email address *</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField}
                    maxLength={150}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Phone number *</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+91"
                    value={form.phone}
                    onChange={updateField}
                    pattern="[+0-9 ()\-]{7,20}"
                    title="Enter a phone number using 7–20 characters."
                    maxLength={20}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Trip type *</span>
                  <select
                    name="tripType"
                    value={form.tripType}
                    onChange={updateField}
                    required
                  >
                    <option value="" disabled>Choose your trip type</option>
                    {tripTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label className="trip-form-field trip-form-field--wide">
                  <span>Package you're interested in</span>
                  <input
                    name="packageName"
                    placeholder="Package name, if you have one in mind"
                    value={form.packageName}
                    onChange={updateField}
                    maxLength={160}
                  />
                </label>

                {hasPackageSelection && (
                  <label className="trip-form-field trip-form-field--wide">
                    <span>Displayed package estimate</span>
                    <input
                      value={indicativePriceLabel}
                      readOnly
                      aria-label="Displayed indicative package estimate"
                    />
                    <span
                      style={{
                        color: "var(--muted)",
                        fontSize: "10px",
                        lineHeight: 1.6,
                      }}
                    >
                      {selectedPrice
                        ? `Based on ${selectedPriceBasis}. This is an indicative estimate, not a confirmed quote.`
                        : "The team will provide a quote after confirming the route and requirements."}
                    </span>
                  </label>
                )}

                <label className="trip-form-field">
                  <span>Preferred destination</span>
                  <input
                    name="destination"
                    placeholder="Where would you like to go?"
                    value={form.destination}
                    onChange={updateField}
                    maxLength={120}
                  />
                </label>

                <label className="trip-form-field">
                  <span>Preferred travel date</span>
                  <input
                    type="date"
                    name="travelDate"
                    min={localDate()}
                    value={form.travelDate}
                    onChange={updateField}
                  />
                </label>

                <label className="trip-form-field">
                  <span>Number of travellers *</span>
                  <input
                    type="number"
                    name="travellers"
                    min="1"
                    max="5000"
                    step="1"
                    value={form.travellers}
                    onChange={updateField}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Departure city</span>
                  <input
                    name="departureCity"
                    placeholder="For example, Bengaluru"
                    value={form.departureCity}
                    onChange={updateField}
                    maxLength={100}
                  />
                </label>

                <label className="trip-form-field trip-form-field--wide">
                  <span>Anything else we should know?</span>
                  <textarea
                    name="requests"
                    rows={5}
                    placeholder="Trip duration, children's ages, transport, hotel preferences or accessibility requirements..."
                    value={form.requests}
                    onChange={updateField}
                    maxLength={1200}
                  />
                </label>
              </div>

              <p className="trip-form-note">
                Your enquiry will be saved in this browser and prepared
                as an email draft. Review it and send it through your
                email app. Any displayed starting price is an estimate,
                not a confirmed offer. No booking is made by this form.
              </p>

              {storageError && (
                <p
                  role="alert"
                  style={{
                    marginTop: 16,
                    color: "#a33b32",
                    fontSize: 12,
                    lineHeight: 1.7,
                  }}
                >
                  {storageError}
                </p>
              )}

              <button className="trip-prepare-button" type="submit">
                Prepare my enquiry
                <span aria-hidden="true">↗</span>
              </button>
            </form>
          </section>

          <aside className="contact-information">
            <div className="contact-direct-panel">
              <span className="contact-eyebrow">LET'S TALK</span>
              <h2>Prefer a conversation?</h2>
              <p>
                Contact the Nature Holidays team directly about your travel plans.
              </p>

              <div className="contact-direct-group">
                <h3>Call us</h3>
                <a href="tel:+919738234786">+91 97382 34786</a>
                <a href="tel:+919243404797">+91 92434 04797</a>
                <a href="tel:+918041121473">080 4112 1473</a>
              </div>

              <div className="contact-direct-group">
                <h3>Email us</h3>
                <a href="mailto:info@natureholidays.co">
                  info@natureholidays.co
                </a>
              </div>
            </div>

            <div className="contact-office-panel">
              <span className="contact-eyebrow">BASED IN BENGALURU</span>
              <h2>Find our office.</h2>

              <address>
                #420/b, 2nd Floor, 2nd Cross,
                <br />
                Lakshmi Layout, Arekere,
                <br />
                Bannerghatta Road,
                <br />
                Bengaluru, Karnataka – 560076
              </address>

              <a href={mapLink} target="_blank" rel="noopener noreferrer">
                Search on Google Maps
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="contact-help-panel">
              <h3>Still choosing a destination?</h3>
              <p>Explore ideas before putting your plans together.</p>
              <Link to="/destinations">Explore destinations ↗</Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
