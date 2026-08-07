/* Iconos de Instagram y Facebook dibujados a mano.
   lucide-react 1.x ya no incluye iconos de marca, así que se copian
   los mismos trazos que usaba la web anterior. Son dos SVG de
   trescientos bytes: no compensa añadir otra dependencia. */

export function IconoInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 8.5h2V5.2c-.4-.05-1.5-.2-2.7-.2-2.7 0-4.3 1.6-4.3 4.5v2.3H7.3V15H10v9h3v-9h2.7l.4-3.2H13V9.9c0-.9.3-1.4 1.5-1.4z" />
    </svg>
  );
}
