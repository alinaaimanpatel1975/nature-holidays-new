
const STORAGE_KEY = "nature-holidays-enquiries";
const UPDATE_EVENT = "nature-holidays-enquiries-updated";

function notifyUpdate() {
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

function normalizeEnquiry(enquiry) {
  if (!enquiry || typeof enquiry !== "object") {
    return enquiry;
  }

  // Older records were labelled as drafts even though
  // they were successfully submitted to the backend.
  const status =
    !enquiry.status ||
    enquiry.status === "Draft — not sent" ||
    enquiry.status === "Draft - not sent"
      ? "new"
      : enquiry.status;

  return {
    ...enquiry,
    status,
  };
}

export function getAllEnquiries() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.map(normalizeEnquiry);
  } catch (error) {
    console.error("Could not read saved enquiries:", error);
    return [];
  }
}

export function getEnquiryById(id) {
  return getAllEnquiries().find((item) => item.id === id) || null;
}

export function saveEnquiry(enquiry) {
  const enquiries = getAllEnquiries();

  const submittedEnquiry = normalizeEnquiry({
    ...enquiry,
    status: "new",
  });

  const updatedEnquiries = [
    submittedEnquiry,
    ...enquiries.filter((item) => item.id !== submittedEnquiry.id),
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedEnquiries)
  );

  notifyUpdate();

  return submittedEnquiry.id;
}

export function deleteEnquiry(id) {
  const enquiries = getAllEnquiries();

  const updatedEnquiries = enquiries.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedEnquiries)
  );

  notifyUpdate();
}

export function subscribeToEnquiryUpdates(callback) {
  window.addEventListener(UPDATE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function createEnquiryReference() {
  const randomPart = window.crypto?.randomUUID
    ? window.crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);

  return `NH-${Date.now().toString(36).toUpperCase()}-${randomPart.toUpperCase()}`;
}
