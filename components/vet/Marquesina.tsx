/* Cinta de texto que se desplaza en bucle, pura CSS (sin JS): el
   contenido va duplicado dos veces para que el bucle no se note al
   reiniciar. Separadores en los tres acentos de marca, alternados. */

const ACENTOS = ["#4C7DFF", "#B06BF5", "#4CE0B3"];

function Tanda({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center gap-11 pr-11">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-11 whitespace-nowrap">
          <span className="font-mono text-[12.5px] tracking-[0.06em] text-white/55">{item}</span>
          <span aria-hidden="true" style={{ color: ACENTOS[i % ACENTOS.length] }}>
            ◆
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquesina({ items }: { items: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/7 bg-gradient-to-r from-azul/7 to-violeta/7 py-4"
    >
      <div className="anim-marquesina flex w-max">
        <Tanda items={items} />
        <Tanda items={items} />
      </div>
    </div>
  );
}
