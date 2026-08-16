/* ============================================================
   FONDO AMBIENTAL
   Capa fija detrás de toda la página: tres manchas de color que
   derivan muy despacio, una rejilla técnica que se desvanece hacia
   los bordes y una viñeta que oscurece las esquinas de vuelta al
   fondo. Se monta una sola vez por página (en el layout de cada
   página, no por sección) para que no se repita el coste al hacer
   scroll.
   ============================================================ */
export function FondoAmbiente() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="anim-deriva-a absolute -left-[10vw] -top-[22vh] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,125,255,.30),rgba(76,125,255,0)_62%)] blur-[40px]" />
      <div className="anim-deriva-b absolute -right-[18vw] top-[18vh] h-[62vw] w-[62vw] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(176,107,245,.26),rgba(176,107,245,0)_62%)] blur-[50px]" />
      <div className="anim-deriva-a-inversa absolute -bottom-[30vh] left-[20vw] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(46,214,196,.13),rgba(46,214,196,0)_60%)] blur-[60px]" />
      <div className="malla absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,transparent_40%,rgba(5,6,12,.85)_100%)]" />
    </div>
  );
}
