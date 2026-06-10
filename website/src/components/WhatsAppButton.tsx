import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  phone = "233200000000",
  message = "Hello, I'd like support from Akoben Hub.",
  label = "Continue on WhatsApp",
  full = false,
}: {
  phone?: string;
  message?: string;
  label?: string;
  full?: boolean;
}) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-healing px-5 py-3 text-sm font-medium text-healing-foreground shadow-soft transition-transform hover:-translate-y-0.5 ${full ? "w-full" : ""}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
