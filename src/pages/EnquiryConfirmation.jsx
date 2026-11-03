
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getEnquiryById,
  subscribeToEnquiryUpdates,
} from "../utils/enquiryStorage";

import "./EnquiryConfirmation.css";

function formatDate(value) {
  if (!value) return "Flexible / not decided";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCreatedAt(value) {
  if (!value) return "";

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function EnquiryConfirmation() {
  const { id } = useParams();

  const [enquiry, setEnquiry] = useState(() => getEnquiryById(id));

  useEffect(() => {
    function refreshEnquiry() {
      setEnquiry(getEnquiryById(id));
    }

    refreshEnquiry();

    return subscribeToEnquiryUpdates(refreshEnquiry);
  }, [id]);

  if (!enquiry) {
    return (
      <>
        <Navbar />

        <main className="enquiry-missing">
          <span className="enquiry-eyebrow">ENQUIRY NOT FOUND</span>
          <h1>This enquiry isn't available here.</h1>
          <p>
            It may have been removed, or it may have been created
            in a different browser.
          </p>

          <Link to="/contact" className="enquiry-primary-link">
            Start a new enquiry
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const { customer, trip, price } = enquiry;

  return (
    <>
      <Navbar />

      <main className="enquiry-confirmation-page">
        <nav className="enquiry-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/contact">Contact</Link>
          <span>/</span>
          <span aria-current="page">Enquiry details</span>
        </nav>

        <section className="enquiry-success-panel">
          <div className="enquiry-success-icon" aria-hidden="true">
            ✓
          </div>

          <span className="enquiry-eyebrow">
            YOUR ENQUIRY HAS BEEN RECEIVED
          </span>

          <h1>Your next chapter starts here.</h1>

          <p>
            Your travel enquiry has been successfully submitted
            and saved. The Nature Holidays team can now review
            your requirements and follow up with suitable options.
          </p>

          <div className="enquiry-reference">
            <span>YOUR ENQUIRY REFERENCE</span>
            <strong>{enquiry.id}</strong>
          </div>

          <div className="enquiry-status-note" role="status">
            <strong>Enquiry submitted · Awaiting response</strong>
            <span>
              Your enquiry is recorded, but your trip is not yet
              confirmed. Final pricing and availability must be
              verified by Nature Holidays.
            </span>
          </div>
        </section>

        <section className="enquiry-details-panel">
          <div className="enquiry-details-heading">
            <div>
              <span className="enquiry-eyebrow">A LITTLE RECAP</span>
              <h2>Your trip details.</h2>
            </div>

            <span className="enquiry-created">
              Submitted {formatCreatedAt(enquiry.createdAt)}
            </span>
          </div>

          <div className="enquiry-detail-grid">
            <div className="enquiry-detail-item">
              <span>Package</span>
              <strong>{trip.packageName || "Custom trip"}</strong>
            </div>

            <div className="enquiry-detail-item">
              <span>Destination</span>
              <strong>{trip.destination || "Not specified"}</strong>
            </div>

            <div className="enquiry-detail-item">
              <span>Travel date</span>
              <strong>{formatDate(trip.travelDate)}</strong>
            </div>

            <div className="enquiry-detail-item">
              <span>Travellers</span>
              <strong>{trip.travellers}</strong>
            </div>

            <div className="enquiry-detail-item">
              <span>Trip type</span>
              <strong>{trip.tripType || "Not specified"}</strong>
            </div>

            <div className="enquiry-detail-item">
              <span>Departure city</span>
              <strong>{trip.departureCity || "Not specified"}</strong>
            </div>

            <div className="enquiry-detail-item">
              <span>Displayed estimate</span>
              <strong>{price?.label || "Price on request"}</strong>
            </div>

            <div className="enquiry-detail-item">
              <span>Contact name</span>
              <strong>{customer.name}</strong>
            </div>
          </div>

          {trip.requests && (
            <div className="enquiry-special-requests">
              <span>Additional requirements</span>
              <p>{trip.requests}</p>
            </div>
          )}
        </section>

        <div className="enquiry-bottom-links">
          <Link to="/my-trips">View My Trips ↗</Link>
          <Link to="/packages">Explore more packages</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
