import type { Metadata } from "next";
import { Landing } from "@/components/site/landing";
import { alternativas, idiomaOBase } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return { alternates: alternativas(idiomaOBase((await params).lang), "/") };
}

export default function Home() {
  return <Landing />;
}
