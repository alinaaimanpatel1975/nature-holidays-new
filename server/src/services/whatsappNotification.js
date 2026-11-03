
export async function notifyBusinessOwner(enquiry) {
  const {
    WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_RECIPIENT_NUMBER,
    WHATSAPP_TEMPLATE_NAME,
    WHATSAPP_TEMPLATE_LANGUAGE = "en",
    WHATSAPP_GRAPH_API_VERSION,
  } = process.env;

  console.log("WhatsApp notification function called.");

  const missing = [
    ["WHATSAPP_ACCESS_TOKEN", WHATSAPP_ACCESS_TOKEN],
    ["WHATSAPP_PHONE_NUMBER_ID", WHATSAPP_PHONE_NUMBER_ID],
    ["WHATSAPP_RECIPIENT_NUMBER", WHATSAPP_RECIPIENT_NUMBER],
    ["WHATSAPP_TEMPLATE_NAME", WHATSAPP_TEMPLATE_NAME],
    ["WHATSAPP_GRAPH_API_VERSION", WHATSAPP_GRAPH_API_VERSION],
  ].filter(([, value]) => !value);

  if (missing.length) {
    console.log(
      "WhatsApp configuration incomplete:",
      missing.map(([name]) => name).join(", ")
    );
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_GRAPH_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: WHATSAPP_RECIPIENT_NUMBER,
          type: "template",
          template: {
            name: WHATSAPP_TEMPLATE_NAME,
            language: { code: WHATSAPP_TEMPLATE_LANGUAGE },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: String(enquiry.reference) },
                  { type: "text", text: String(enquiry.customer.name) },
                  { type: "text", text: String(enquiry.trip.destination || "Not specified") },
                  { type: "text", text: String(enquiry.trip.travelDate || "Not specified") },
                  { type: "text", text: String(enquiry.trip.travellers) },
                ],
              },
            ],
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", result.error?.message || response.status);
      return false;
    }

    console.log("WhatsApp notification accepted:", result.messages?.[0]?.id);
    return true;
  } catch (error) {
    console.error("WhatsApp notification failed:", error.message);
    return false;
  }
}
