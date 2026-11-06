/* eslint-disable @next/next/no-img-element -- piezas pequeñas y ya optimizadas en public/brand */
import { cn } from "@/lib/utils";

/**
 * Logo de Nexo4Pymes (noviembre de 2026): la N en su cuadrado azul con el
 * punto «en línea», y el nombre con la letra del titular (Anton). Los
 * originales en SVG están en public/brand (simbolo.svg, logo-oscuro.svg,
 * logo-claro.svg); los PNG de aquí salen de ellos.
 * `light`: sobre fondo oscuro. Sin él, se adapta al tema claro u oscuro.
 * La altura la marca `className` (h-7…). El nombre mide lo mismo que la N
 * (47 % del cuadrado) y el hueco es el del logo en SVG.
 */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  const pieza = (base: string, cls?: string) =>
    light ? (
      <img src={`/brand/${base}-oscuro.png`} alt="" className={cls} />
    ) : (
      <>
        <img src={`/brand/${base}-claro.png`} alt="" className={cn(cls, "dark:hidden")} />
        <img src={`/brand/${base}-oscuro.png`} alt="" className={cn(cls, "hidden dark:block")} />
      </>
    );
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} role="img" aria-label="Nexo4Pymes">
      {pieza("marca", "h-full w-auto")}
      <span className="flex h-[47%] items-center">{pieza("nombre", "h-full w-auto")}</span>
    </span>
  );
}
