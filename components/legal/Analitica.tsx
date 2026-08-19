"use client";

import Script from "next/script";
import { usarConsentimiento } from "@/lib/consentimiento";

/* ============================================================
   ANALÍTICA Y PÍXELES

   Google Analytics 4 y Meta Pixel. Cada uno se monta SOLO si su
   categoría tiene consentimiento; mientras no lo tenga, no existe
   en el DOM y no se descarga ni un byte. No hay "cargarlo y
   desactivarlo después": eso sería instalar la cookie antes del
   consentimiento, que es justo lo prohibido.

   El montaje condicional es lo que hace el trabajo. Consent Mode se
   declara además porque Google lo exige para tráfico del EEE y
   porque, si algún día se decide precargar gtag, la señal ya está
   puesta y no se rompe nada.

   CONFIGURACIÓN — dos variables, las dos opcionales:
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
     NEXT_PUBLIC_META_PIXEL_ID=1234567890123456

   Sin definir, no se carga nada aunque el visitante acepte todo.
   Eso es deliberado: permite tener el banner en producción antes de
   tener las cuentas creadas, y que un despliegue de preproducción
   no ensucie las métricas.

   NOTA SOBRE VISTAS DE PÁGINA: el sitio es App Router y las
   navegaciones entre páginas no recargan el documento. GA4 registra
   esas vistas por su cuenta gracias a "Enhanced measurement"
   (activado por defecto en propiedades nuevas). Si algún día se
   desactiva ahí, hay que mandar `page_view` a mano en cada cambio
   de ruta.
   ============================================================ */

const ID_GA = process.env.NEXT_PUBLIC_GA_ID;
const ID_META = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function Analitica() {
  const { consentimiento } = usarConsentimiento();

  const analitica = consentimiento?.analitica === true;
  const marketing = consentimiento?.marketing === true;

  const cargarGa = analitica && !!ID_GA;
  const cargarMeta = marketing && !!ID_META;

  if (!cargarGa && !cargarMeta) return null;

  return (
    <>
      {cargarGa && (
        <>
          <Script
            id="ga-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ID_GA}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Consent Mode v2. Este bloque solo se ejecuta cuando ya
              // hay consentimiento de analitica, de ahi el 'granted'.
              // Las senales de publicidad dependen de su propia
              // categoria, que puede estar rechazada aunque la
              // analitica no lo este.
              gtag('consent', 'default', {
                'analytics_storage': 'granted',
                'ad_storage': '${marketing ? "granted" : "denied"}',
                'ad_user_data': '${marketing ? "granted" : "denied"}',
                'ad_personalization': '${marketing ? "granted" : "denied"}',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
              });

              gtag('config', '${ID_GA}', {
                // La IP se trunca antes de almacenarse. En GA4 es el
                // comportamiento por defecto, pero dejarlo explicito
                // evita depender de que no cambie.
                'anonymize_ip': true
              });
            `}
          </Script>
        </>
      )}

      {cargarMeta && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${ID_META}');
              fbq('track', 'PageView');
            `}
          </Script>

          {/* El <noscript> del pixel es un GIF de seguimiento que se
              dispara sin JavaScript. Aqui NO se pone: sin JS no se ha
              podido leer el consentimiento, asi que dispararlo seria
              seguir a alguien que nunca dijo que si. Se pierde una
              porcion minima de medicion y se gana estar en regla. */}
        </>
      )}
    </>
  );
}
