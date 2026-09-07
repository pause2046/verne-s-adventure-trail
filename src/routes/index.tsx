import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowDown,
  Baby,
  BookOpen,
  Compass,
  Footprints,
  Mail,
  Map,
  Mountain,
  Printer,
  ShoppingBag,
  Sparkles,
  Trees,
} from "lucide-react";

import balon from "@/assets/balon.png";
import verne from "@/assets/verne.png";
import ikony from "@/assets/ikony.png";
import zuzanaAsset from "@/assets/zuzana.jpeg.asset.json";
import leafletAsset from "@/assets/leaflet.jpeg.asset.json";
import { supabase } from "@/integrations/supabase/client";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Po stopách Julese Verna – dobrodružná stezka na míru" },
      {
        name: "description",
        content:
          "Tisknutelný balíček pro dobrodružnou stezku, kterou si vytvoříte kdekoli – 14 zastavení s úkoly, hrami a sběratelskými nálepkami knih. PDF za 290 Kč.",
      },
      { property: "og:title", content: "Po stopách Julese Verna – dobrodružná stezka na míru" },
      {
        property: "og:description",
        content:
          "Stezka, kterou si vytvoříš kdekoli – v lese, ve městě i na zahradě. 14 zastavení, úkoly, hry a sběratelský leaflet ke stažení a vytištění.",
      },

      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- wave dividers ---------- */

function WaveTop({ className }: { className?: string }) {
  // organic wave that sits on top of the following section
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-[54px] w-full md:h-[90px] ${className ?? ""}`}
    >
      <path
        d="M0,60 C120,20 260,10 420,32 C580,54 700,78 880,64 C1060,50 1180,14 1330,24 C1390,28 1420,40 1440,48 L1440,90 L0,90 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ---------- small building blocks ---------- */

function SectionTitle({
  eyebrow,
  title,
  light,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 text-center">
      <p
        className={`mb-2 text-xs font-bold uppercase tracking-[0.3em] ${
          light ? "text-primary" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`font-display text-5xl md:text-6xl ${light ? "text-paper" : "text-foreground"}`}>
        {title}
      </h2>
    </div>
  );
}

const orderSchema = z.object({
  name: z.string().trim().min(1, "Napiš nám prosím své jméno.").max(100),
  email: z.string().trim().email("Zkontroluj prosím e-mailovou adresu.").max(255),
  kids: z
    .string()
    .trim()
    .max(300, "Stačí krátká poznámka (max. 300 znaků).")
    .optional()
    .or(z.literal("")),
});

function OrderForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [kids, setKids] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = orderSchema.safeParse({ name, email, kids });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Zkontroluj prosím vyplněné údaje.");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("orders").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      kids: parsed.data.kids || null,
    });
    setSubmitting(false);
    if (dbError) {
      setError("Odeslání se nepovedlo. Zkus to prosím znovu za chvíli.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="paper-card mx-auto max-w-xl p-10 text-center">
        <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" aria-hidden="true" />
        <h3 className="font-display text-4xl text-foreground">Díky za objednávku!</h3>
        <p className="mt-4 text-lg text-muted-foreground">
          Díky! Ozveme se ti s platebními údaji a po zaplacení ti pošleme PDF na e-mail do 24 hodin.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border-2 border-secondary/30 bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

  return (
    <form
      onSubmit={onSubmit}
      className="paper-card mx-auto max-w-xl p-6 md:p-10"
      noValidate
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="jmeno" className="mb-1 block text-sm font-bold">
            Jméno a příjmení
          </label>
          <input
            id="jmeno"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
            placeholder="Marie Dvořáková"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-bold">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            required
            placeholder="marie@email.cz"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="deti" className="mb-1 block text-sm font-bold">
            Počet a věk dětí <span className="font-normal text-muted-foreground">(nepovinné)</span>
          </label>
          <input
            id="deti"
            type="text"
            value={kids}
            onChange={(e) => setKids(e.target.value)}
            maxLength={300}
            placeholder="např. 2 děti, 5 a 8 let"
            className={inputClass}
          />
        </div>
        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-extrabold text-primary-foreground shadow-[4px_4px_0_0_var(--color-secondary)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          {submitting ? "Odesílám…" : "Objednat za 290 Kč"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Odesláním objednávky souhlasíš se zpracováním údajů pro její vyřízení.
        </p>
      </div>
    </form>
  );
}

/* ---------- page ---------- */

function Index() {
  return (
    <main className="overflow-x-clip">
      {/* 1. HERO — orange sky */}
      <section className="relative bg-primary pb-0 pt-14 md:pt-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="text-center md:text-left">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-secondary-foreground">
                <Compass className="h-4 w-4" aria-hidden="true" /> stezka pro malé i velké cestovatele
              </p>
              <h1 className="font-display text-6xl leading-[0.95] text-primary-foreground md:text-8xl">
                Po stopách
                <br />
                Julese Verna
              </h1>
              <p className="font-display mt-4 text-3xl text-primary-foreground/90 md:text-4xl">
                Dobrodružná stezka, kterou si vytvoříš kdekoli
              </p>
              <p className="mx-auto mt-5 max-w-lg text-lg font-semibold text-primary-foreground/85 md:mx-0">
                V lese, ve městě i na vlastní zahradě. Pro rodiny s dětmi, milovníky knih Julese
                Verna i všechny dobrodruhy: 14 zastavení s úkoly, hrami a sbíráním nálepek knih.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <a
                  href="#objednavka"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-lg font-extrabold text-secondary-foreground shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5"
                >
                  Chci PDF balíček <ArrowDown className="h-5 w-5" aria-hidden="true" />
                </a>
                <span className="rounded-full border-2 border-dashed border-secondary/50 px-5 py-2 font-display text-3xl font-bold text-primary-foreground">
                  290 Kč
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-4/5 max-w-sm pb-6">
              <img
                src={balon}
                alt="Ručně kreslený horkovzdušný balon"
                className="animate-balloon w-full drop-shadow-[0_20px_30px_rgba(7,69,80,0.35)]"
                width={1024}
                height={1024}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <div className="text-paper">
          <WaveTop />
        </div>
      </section>

      {/* 2. PRO KOHO */}
      <section className="bg-paper pb-20 pt-6 md:pt-10">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <SectionTitle eyebrow="Pro koho" title="Pro všechny, kdo rádi objevují" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Baby,
                title: "Pro rodiny s dětmi",
                text: "Pro ty, kdo chtějí vyrazit ven a zažít dobrodružství. Úkoly baví školáky, předškoláky i rodiče.",
              },
              {
                icon: BookOpen,
                title: "Pro milovníky Verna",
                text: "Pro fanoušky knih Julese Verna a jeho příběhů – ponorka, balon, sopka i cesta kolem světa.",
              },
              {
                icon: Trees,
                title: "Pro objevitele a výletníky",
                text: "Pro každého, kdo má rád objevování a výlety do přírody. Bez mobilu – jen papír, tužka a chuť jít.",
              },
            ].map((c) => (

              <div key={c.title} className="paper-card p-7 text-center">
                <c.icon className="mx-auto mb-4 h-10 w-10 text-primary" aria-hidden="true" />
                <h3 className="font-display text-3xl">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* divider into dark teal */}
      <div className="bg-paper text-secondary">
        <WaveTop className="rotate-180" />
      </div>

      {/* 3. CO DOSTANETE — dark starry panel */}
      <section className="relative bg-secondary py-20 text-secondary-foreground">
        {/* stars */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[
            { top: "8%", left: "6%", delay: "0s" },
            { top: "15%", left: "85%", delay: "0.7s" },
            { top: "40%", left: "12%", delay: "1.4s" },
            { top: "60%", left: "92%", delay: "0.3s" },
            { top: "78%", left: "8%", delay: "1.9s" },
            { top: "30%", left: "50%", delay: "1.1s" },
          ].map((s, i) => (
            <Sparkles
              key={i}
              className="animate-twinkle absolute h-4 w-4 text-primary/70"
              style={{ top: s.top, left: s.left, animationDelay: s.delay }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-5xl px-4 md:px-8">
          <SectionTitle eyebrow="PDF balíček" title="Co všechno dostanete" light />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
              {[
                {
                  icon: Map,
                  title: "Šablona na vlastní trasu",
                  text: "Vyber si 14 zastavení kdekoli chceš – ve svém okolí, v lese, ve městě i na zahradě.",
                },
                {
                  icon: BookOpen,
                  title: "14 zastavení s úkoly a hrami",
                  text: "Na každém stanovišti se plní úkol nebo hra a získává se další kniha do sbírky.",
                },
                {
                  icon: ShoppingBag,
                  title: "Sběratelský leaflet „knihovna“",
                  text: "Knihovnička, do které se lepí tištěné nálepky knih od Julese Verna.",
                },

                {
                  icon: Printer,
                  title: "Tiskové instrukce",
                  text: "Vše připravené k tisku doma – stáhneš, vytiskneš a můžeš vyrazit.",
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 rounded-2xl bg-paper/5 p-5">
                  <f.icon className="mt-1 h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-3xl text-paper">{f.title}</h3>
                    <p className="mt-1 text-secondary-foreground/80">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-5">
              <figure className="overflow-hidden rounded-2xl border-2 border-primary/50 bg-paper/5">
                <img
                  src={leafletAsset.url}
                  alt="Tištěný sběratelský leaflet Knihovna Julese Verna s knihovničkou a nálepkami knih"
                  loading="lazy"
                  className="w-full object-cover"
                />
                <figcaption className="px-4 py-3 text-sm text-secondary-foreground/80">
                  Sběratelský leaflet – knihovnička, kam děti lepí nasbírané knihy.
                </figcaption>
              </figure>
            </div>

          </div>
        </div>
      </section>

      {/* divider into cream */}
      <div className="bg-secondary text-paper">
        <WaveTop />
      </div>

      {/* 4. JAK TO FUNGUJE */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <SectionTitle eyebrow="Za pět minut připraveno" title="Jak to funguje" />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", title: "Objednáš a zaplatíš", text: "Vyplníš krátký formulář a my ti pošleme platební údaje." },
              { n: "2", title: "Dostaneš PDF e-mailem", text: "Do 24 hodin od zaplacení ti přistane balíček ve schránce." },
              { n: "3", title: "Vytiskneš a rozmístíš", text: "Vytiskneš doma a vybereš si 14 vlastních zastavení – v lese, ve městě i na zahradě." },
              { n: "4", title: "Vyrazíte na výpravu", text: "Plníte úkoly, hrajete hry, sbíráte knihy a užíváte si den venku." },

            ].map((s) => (
              <li key={s.n} className="paper-card relative p-6 pt-9 text-center">
                <span className="absolute -top-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-secondary bg-primary font-display text-2xl font-bold text-primary-foreground">
                  {s.n}
                </span>
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex justify-center">
            <img
              src={ikony}
              alt="Sada ručně kreslených ikon: ponorka, kompas, měsíc, kotva, palma, plachetnice, sopka a slon"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full max-w-2xl opacity-90"
            />
          </div>
        </div>
      </section>

      {/* divider into teal for author */}
      <div className="bg-paper text-secondary">
        <WaveTop className="rotate-180" />
      </div>

      {/* 5. O AUTORCE */}
      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-[1fr_1.2fr] md:px-8">
          <div className="relative mx-auto w-full max-w-xs">
            <img
              src={verne}
              alt="Kreslený portrét Julese Verna"
              loading="lazy"
              width={768}
              height={768}
              className="w-full rounded-2xl border-2 border-primary/60"
            />
            <p className="mt-3 text-center font-display text-xl text-paper/80">
              Jules Verne – průvodce naší stezky
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">O autorce</p>
            <h2 className="font-display text-5xl text-paper md:text-6xl">Zuzana Pospíšilová</h2>
            <p className="mt-4 text-lg text-secondary-foreground/85">
              Stezku vymyslela a nakreslila maminka dvou dětí. Je tvořivá, ráda tráví čas
              v přírodě a miluje knihy Julese Verna – balíček vytvořila pro
              <strong> Klub maminek Olomučany</strong>, aby si každá rodina mohla udělat
              vlastní dobrodružnou výpravu tam, kde bydlí.
            </p>
            <figure className="mt-6">
              <img
                src={zuzanaAsset.url}
                alt="Zuzana Pospíšilová, autorka stezky"
                loading="lazy"
                className="w-40 rounded-2xl border-2 border-primary/60 object-cover md:w-48"
              />
              <figcaption className="mt-2 text-sm text-secondary-foreground/70">
                Zuzana Pospíšilová
              </figcaption>
            </figure>

          </div>
        </div>
      </section>

      {/* divider into cream for form */}
      <div className="bg-secondary text-paper">
        <WaveTop />
      </div>

      {/* 6. OBJEDNÁVKA */}
      <section id="objednavka" className="scroll-mt-8 bg-paper py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <SectionTitle eyebrow="290 Kč · PDF ke stažení" title="Objednejte si stezku" />
          <p className="mx-auto -mt-4 mb-10 max-w-xl text-center text-muted-foreground">
            Vyplňte formulář a my vám do e-mailu pošleme platební údaje. Po zaplacení vám do
            24 hodin dorazí celý PDF balíček.
          </p>
          <OrderForm />
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-secondary py-10 text-center text-secondary-foreground/80">
        <Mountain className="mx-auto mb-3 h-6 w-6 text-primary" aria-hidden="true" />
        <p className="font-display text-2xl text-paper">Po stopách Julese Verna</p>
        <p className="mt-2 text-sm">Vytvořeno pro Klub maminek Olomučany</p>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-sm">
          <Mail className="h-4 w-4" aria-hidden="true" />
          <a href="mailto:vas@email.cz" className="underline underline-offset-2 hover:text-primary">
            vas@email.cz
          </a>
          <span className="opacity-60">(doplňte kontaktní e-mail)</span>
        </p>
      </footer>
    </main>
  );
}
