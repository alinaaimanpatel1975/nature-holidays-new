
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  deleteEnquiry,
  getAllEnquiries,
  subscribeToEnquiryUpdates,
} from "../utils/enquiryStorage";

import "./MyTripsPage.css";

function formatDate(value) {
  if (!value) return "Date flexible";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatSavedDate(value) {
  if (!value) return "";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusLabel(status) {
  const statuses = {
    new: "Enquiry submitted",
    contacted: "Contacted",
    quoted: "Quote received",
    confirmed: "Trip confirmed",
    cancelled: "Cancelled",
  };

  return statuses[status] || "Enquiry submitted";
}

export default function MyTripsPage() {
  const [enquiries, setEnquiries] = useState(() => getAllEnquiries());

  useEffect(() => {
    function refreshEnquiries() {
      setEnquiries(getAllEnquiries());
    }

    refreshEnquiries();

    return subscribeToEnquiryUpdates(refreshEnquiries);
  }, []);

  function removeEnquiry(id) {
    const confirmed = window.confirm(
      "Remove this enquiry from My Trips on this browser? This will not delete the enquiry from Nature Holidays' records."
    );

    if (!confirmed) return;

    deleteEnquiry(id);
    setEnquiries(getAllEnquiries());
  }

  return (
    <>
      <Navbar />

      <main className="my-trips-page">
        <nav className="my-trips-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span aria-current="page">My Trips</span>
        </nav>

        <section className="my-trips-heading">
          <span className="my-trips-eyebrow">YOUR TRAVEL SPACE</span>
          <h1>Your trips, all in one place.</h1>
          <p>
            Keep track of the travel enquiries you've submitted and revisit
            their details whenever you need.
          </p>
        </section>

        <div className="my-trips-summary">
          <div>
            <span>SUBMITTED ENQUIRIES</span>
            <strong>{enquiries.length}</strong>
          </div>
          <p>
            An enquiry is not a confirmed booking. Your trip is confirmed
            only after Nature Holidays verifies its availability and details.
          </p>
        </div>

        {enquiries.length > 0 ? (
          <section className="my-trips-list" aria-label="Submitted enquiries">
            {enquiries.map((enquiry) => (
              <article className="my-trip-card" key={enquiry.id}>
                <div className="my-trip-card-top">
                  <div>
                    <span className="my-trip-card-eyebrow">
                      {enquiry.trip?.tripType || "TRAVEL ENQUIRY"}
                    </span>

                    <h2>
                      {enquiry.trip?.packageName ||
                        enquiry.trip?.destination ||
                        "Custom trip"}
                    </h2>
                  </div>

                  <span className="my-trip-status">
                    {getStatusLabel(enquiry.status)}
                  </span>
                </div>

                <div className="my-trip-card-details">
                  <div>
                    <span>Destination</span>
                    <strong>
                      {enquiry.trip?.destination || "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <span>Travel date</span>
                    <strong>{formatDate(enquiry.trip?.travelDate)}</strong>
                  </div>

                  <div>
                    <span>Travellers</span>
                    <strong>
                      {enquiry.trip?.travellers || "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <span>Submitted on</span>
                    <strong>{formatSavedDate(enquiry.createdAt)}</strong>
                  </div>
                </div>

                <div className="my-trip-card-footer">
                  <span className="my-trip-reference">
                    REF · {enquiry.id}
                  </span>

                  <div className="my-trip-actions">
                    <Link
                      to={`/enquiry-confirmation/${encodeURIComponent(
                        enquiry.id
                      )}`}
                    >
                      View details ↗
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeEnquiry(enquiry.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="my-trips-empty">
            <div className="my-trips-empty-icon" aria-hidden="true">
              ↗
            </div>

            <span className="my-trips-eyebrow">A FRESH PAGE</span>
            <h2>No trips just yet.</h2>

            <p>
              Once you submit a travel enquiry, it will appear here
              so you can revisit its details.
            </p>

            <div className="my-trips-empty-actions">
              <Link to="/packages">Explore packages</Link>
              <Link to="/contact">Plan a custom trip</Link>
            </div>
          </section>
        )}

        <p className="my-trips-storage-note">
          My Trips currently saves a copy in this browser on this device.
          Your submitted enquiry is also recorded in Nature Holidays'
          database. The two are not yet synchronised for account-based access.
        </p>
      </main>

      <Footer />
    </>
  );
}
