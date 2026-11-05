import "./WhatsAppButton.css";

const WHATSAPP_NUMBER = "919738234786";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi! I found Nature Holidays through your website and would like to enquire about a trip."
  );

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nature Holidays on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 .8A15.1 15.1 0 0 0 3.2 23.9L1 31l7.3-2.1A15.2 15.2 0 1 0 16 .8Zm0 27.5c-2.4 0-4.7-.6-6.7-1.9l-.5-.3-4.3 1.2 1.2-4.2-.3-.5A12.3 12.3 0 1 1 16 28.3Zm6.8-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.3.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 3s1.3 3.4 1.5 3.6c.2.2 2.5 3.8 6.1 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.1-.4-.2-.8-.4Z"
        />
      </svg>
    </a>
  );
}
