import { NextResponse } from "next/server";

/* ============================================================
   CLAVE DEL FORMULARIO DE DEMO DE CONCESIA

   /concesia es una web estática generada en el repositorio de
   Concesia (ver public/concesia), así que no puede leer las
   variables de entorno de este proyecto. Le da la misma clave
   pública de Web3Forms que ya lleva el formulario de contacto en
   el JavaScript de la web: no es un secreto y Web3Forms exige
   enviar desde el navegador.
   ============================================================ */

export const dynamic = "force-dynamic";

export function GET() {
  const clave = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!clave) {
    return NextResponse.json({ error: "El formulario no está conectado." }, { status: 503 });
  }

  return NextResponse.json({ clave });
}
