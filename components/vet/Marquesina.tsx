/* Banda de garantías.

   Antes era una cinta de texto en bucle (38 s) marcada aria-hidden.
   Contenía las tres objeciones mejor resueltas del sitio —sin
   permanencia, el informe es vuestro, sin cambiar de programa— y por
   estar en movimiento no se leían al pasar ni existían para un lector
   de pantalla. Justo el material que más ayuda a decidir.

   Ahora es una banda estática de píldoras: se lee, es accesible y no
   compite con el CTA del hero, que está inmediatamente encima. */

export function Marquesina({ items }: { items: string[] }) {
  return (
    <div className="border-y border-white/7 bg-gradient-to-r from-azul/7 to-violeta/7 px-5 py-2.5 sm:px-8 sm:py-3.5">
      <ul className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-1.5 sm:gap-x-4 sm:gap-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[.04]
                       px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-white/72
                       sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[11.5px] sm:tracking-[0.08em]"
          >
            <span aria-hidden="true" className="text-mint">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
