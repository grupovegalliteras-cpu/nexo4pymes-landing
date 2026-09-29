"use client";

import { MotionConfig } from "motion/react";
import { Fragment, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { claveDemo, startSync, useDemo } from "@/store/demo";
import { useUi } from "@/store/ui";
import { createSeed, DATA_VERSION } from "@/data/seed";
import { isSectorId } from "@/data/sectors";
import { isoDay } from "@/lib/utils";
import { activarIdioma } from "@/lib/t";
import type { Idioma } from "@/lib/i18n";

export function Providers({ children }: { children: ReactNode }) {
  // El HTML del servidor y la hidratación van en español; justo después (antes de pintar)
  // se activa el idioma de la página y, si no es español, se vuelve a montar todo ya traducido.
  const [lang, setLang] = useState<Idioma>("es");
  useLayoutEffect(() => {
    const l = activarIdioma();
    if (l !== "es") {
      useDemo.setState(createSeed(useDemo.getState().sector));
      setLang(l);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("estado") === "1") useUi.setState({ showEstado: true });
    useDemo.persist.setOptions({ name: claveDemo() });
    Promise.resolve(useDemo.persist.rehydrate()).finally(() => {
      const s = useDemo.getState();
      const sec = params.get("sector");
      const today = isoDay(new Date());
      if (s.version !== DATA_VERSION || s.hoy !== today || !s.techs?.length) {
        useDemo.setState(createSeed(isSectorId(sec) ? sec : isSectorId(s.sector) ? s.sector : "mantenimiento"));
      } else if (isSectorId(sec) && sec !== s.sector) {
        s.setSector(sec);
      }
      useDemo.getState().setHydrated();
      startSync();
    });
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Fragment key={lang}>{children}</Fragment>
    </MotionConfig>
  );
}

export function useHydrated() {
  return useDemo((s) => s.hydrated);
}
