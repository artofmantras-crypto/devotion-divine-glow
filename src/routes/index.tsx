import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroImg from "@/assets/hero-mahakal.jpg";
import rudraImg from "@/assets/rudra-abhishek.jpg";
import panditsImg from "@/assets/pandits-havan.jpg";
import devoteesImg from "@/assets/devotees.jpg";
import bhasmaImg from "@/assets/bhasma-aarti.jpg";
import diyasImg from "@/assets/diyas.jpg";
import trishulImg from "@/assets/trishul.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as unknown as { rel: string; href: string },
    ],
  }),
});

const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(80, { message: "Name is too long" }),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,15}$/, { message: "Enter a valid phone number" }),
  date: z.string().min(1, { message: "Please choose a preferred date" }),
  seva: z.string().min(1),
});

const galleryItems = [
  { src: heroImg, alt: "Mahakaleshwar Temple, Ujjain at golden hour", label: "Mahakaal Temple, Ujjain" },
  { src: bhasmaImg, alt: "Bhasma Aarti with adorned Shiva Lingam", label: "Bhasma Aarti" },
  { src: rudraImg, alt: "Rudra Abhishek being performed on a Shiva Lingam", label: "Rudra Abhishek" },
  { src: panditsImg, alt: "Vedic pandits performing havan yagna", label: "Havan Yagna" },
  { src: devoteesImg, alt: "Devotee family praying before a shrine", label: "Devotee Sankalp" },
  { src: diyasImg, alt: "Rows of oil diyas glowing in a temple", label: "Diya Aradhana" },
];

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--gold)]" />
      <span className="text-[var(--gold)] text-lg">✦</span>
      <span className="text-[var(--saffron)] text-2xl">🕉</span>
      <span className="text-[var(--gold)] text-lg">✦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--gold)]" />
    </div>
  );
}

function Index() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", date: "", seva: "Rudra Abhishek — ₹101" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate submission — replace with backend call.
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Sankalp request received", {
        description: `Har Har Mahadev, ${result.data.name}. Our team will contact you shortly on ${result.data.phone}.`,
      });
      setForm({ name: "", phone: "", date: "", seva: form.seva });
    }, 700);
  };

  const lightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <main className="min-h-screen text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[oklch(0.18_0.08_25/0.75)] border-b border-[var(--gold)]/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <img src={trishulImg} alt="" width={36} height={36} className="drop-shadow-[0_0_10px_rgba(255,180,80,0.5)]" />
            <div className="leading-tight">
              <div className="font-display text-base tracking-widest text-[var(--gold-soft)]">ART OF MANTRAS</div>
              <div className="font-devanagari text-[11px] text-[var(--gold)]">आर्ट ऑफ मंत्र</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-[var(--gold-soft)]">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#pooja" className="hover:text-white transition">Upcoming Pooja</a>
            <a href="#offers" className="hover:text-white transition">Offerings</a>
            <a href="#gallery" className="hover:text-white transition">Gallery</a>
            <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
            <a href="#book" className="hover:text-white transition">Book</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
          <a href="#offers" className="rounded-full bg-[var(--saffron)] px-5 py-2 text-sm font-medium text-[oklch(0.22_0.08_40)] shadow-[var(--shadow-gold)] hover:bg-[var(--saffron-bright)] transition">
            Book Sankalp
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Mahakaleshwar Temple, Ujjain at sunset"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.08_25/0.55)] via-transparent to-[oklch(0.15_0.08_25/0.9)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 text-center text-[var(--ivory)]">
          <div className="font-devanagari text-xl md:text-2xl text-[var(--gold-soft)] tracking-wide">
            ॥ ॐ त्र्यम्बकं यजामहे ॥
          </div>
          <Ornament className="my-6" />
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-white drop-shadow-2xl">
            Where the Chants of<br />
            <span className="italic text-[var(--gold-soft)]">Mahakaal</span> Never Cease
          </h1>
          <p className="mt-8 mx-auto max-w-2xl text-lg md:text-xl text-[var(--gold-soft)]/95 font-light leading-relaxed">
            A trusted platform for authentic Vedic poojas — performed by learned Pandits
            in the sacred city of Ujjain, with your personalized Sankalp.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#offers" className="rounded-full bg-[var(--saffron)] px-8 py-3.5 font-medium text-[oklch(0.2_0.08_35)] shadow-[var(--shadow-gold)] hover:bg-[var(--saffron-bright)] transition text-base">
              Book Your Sankalp
            </a>
            <a href="#pooja" className="rounded-full border border-[var(--gold-soft)]/50 px-8 py-3.5 font-medium text-[var(--gold-soft)] hover:bg-white/10 transition text-base backdrop-blur-sm">
              View Shravan Seva
            </a>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-[var(--gold-soft)]">
            <div>
              <div className="font-display text-3xl md:text-4xl text-white">1.25<span className="text-[var(--saffron)]">L+</span></div>
              <div className="text-xs uppercase tracking-widest mt-1 opacity-80">Maha Mrityunjaya Jaap</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-white">30<span className="text-[var(--saffron)]">+</span></div>
              <div className="text-xs uppercase tracking-widest mt-1 opacity-80">Days of Shravan Seva</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-white">100<span className="text-[var(--saffron)]">%</span></div>
              <div className="text-xs uppercase tracking-widest mt-1 opacity-80">Shastrokta Rituals</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center text-[var(--gold-soft)]/70 text-xs tracking-[0.3em] uppercase">
          Har Har Mahadev
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-lg bg-[var(--gradient-gold)] opacity-30 blur-2xl" />
            <img
              src={panditsImg}
              alt="Vedic pandits performing havan yagna"
              width={1280}
              height={1280}
              loading="lazy"
              className="relative rounded-lg shadow-[var(--shadow-warm)] ornate-border"
            />
          </div>
          <div>
            <div className="font-devanagari text-[var(--primary)] text-lg mb-3">आस्था • परंपरा • प्रामाणिकता</div>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--primary)] leading-tight">
              Experience the Divine Through Authentic Vedic Rituals
            </h2>
            <Ornament className="my-6 justify-start [&>*:first-child]:hidden [&>*:last-child]:hidden" />
            <p className="text-lg leading-relaxed text-[var(--muted-foreground)]">
              <span className="font-semibold text-[var(--primary)]">Art of Mantras</span> is a trusted platform
              dedicated to preserving the purity of Sanatan traditions through authentic Vedic poojas performed
              by experienced and learned Pandits.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Every ritual is conducted with proper Vedic mantras, personalized Sankalp, and complete
              devotion — bringing divine blessings, peace, prosperity, and spiritual well-being to you and your family.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Authentic Vedic Rituals",
                "Experienced Pandits",
                "Personalized Sankalp",
                "Transparent Process",
              ].map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <span className="mt-1 text-[var(--saffron)]">✦</span>
                  <span className="text-[var(--foreground)]">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING POOJA BANNER */}
      <section id="pooja" className="relative py-24 md:py-32 overflow-hidden">
        <img src={bhasmaImg} alt="" width={1280} height={1600} loading="lazy"
             className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.08_25/0.95)] via-[oklch(0.18_0.08_25/0.8)] to-[oklch(0.18_0.08_25/0.4)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-[var(--ivory)]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-black/30 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--saffron)] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold-soft)]">Upcoming Pooja</span>
            </div>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05] text-white">
              1.25 Lakh<br />
              <span className="italic text-[var(--gold-soft)]">Maha Mrityunjaya</span> Jaap
            </h2>
            <div className="font-devanagari text-2xl text-[var(--saffron)] mt-4">
              श्री महाकाल की नगरी उज्जैन
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-[var(--gold-soft)]">
              <div className="flex items-center gap-2"><span className="text-[var(--saffron)]">🗓</span> 30 July – 30 August</div>
              <div className="flex items-center gap-2"><span className="text-[var(--saffron)]">📍</span> Ujjain, Mahakaal Nagari</div>
              <div className="flex items-center gap-2"><span className="text-[var(--saffron)]">🔱</span> Shravan Maas</div>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-[var(--gold-soft)]/95 font-light">
              During the sacred month of <span className="italic">Shravan</span>, dedicated to Lord Shiva, join this powerful
              month-long Maha Mrityunjaya Jaap performed by a team of experienced Vedic Pandits
              in the holy city of Ujjain.
            </p>
            <a href="#offers" className="mt-8 inline-flex rounded-full bg-[var(--saffron)] px-8 py-3.5 font-medium text-[oklch(0.2_0.08_35)] shadow-[var(--shadow-gold)] hover:bg-[var(--saffron-bright)] transition">
              Choose Your Seva
            </a>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="py-24 md:py-32 bg-[var(--gradient-parchment)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="font-devanagari text-[var(--primary)] text-lg">सेवा एवं संकल्प</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-[var(--primary)]">
              Choose Your Sacred Offering
            </h2>
            <Ornament className="mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Offer 1 */}
            <article className="group relative overflow-hidden rounded-2xl bg-card ornate-border shadow-[var(--shadow-warm)]">
              <div className="relative h-64 overflow-hidden">
                <img src={rudraImg} alt="Rudra Abhishek pooja" width={1280} height={1280} loading="lazy"
                     className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.1_30/0.7)] to-transparent" />
                <div className="absolute top-4 left-4 rounded-full bg-[var(--saffron)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[oklch(0.22_0.08_40)]">
                  Offer 01
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl text-[var(--primary)]">Rudra Abhishek</h3>
                  <div className="text-right">
                    <div className="font-display text-4xl text-[var(--primary)]">₹101</div>
                    <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Every Monday</div>
                  </div>
                </div>
                <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
                  Performed in your name with a personalized Sankalp during the sacred Shravan Mondays.
                </p>
                <div className="mt-6 pt-6 border-t border-[var(--border)]">
                  <div className="text-xs uppercase tracking-widest text-[var(--primary)] mb-3">Benefits</div>
                  <ul className="space-y-2 text-[var(--foreground)]">
                    <li className="flex gap-2"><span className="text-[var(--saffron)]">✦</span> Lord Shiva's Blessings</li>
                    <li className="flex gap-2"><span className="text-[var(--saffron)]">✦</span> Peace & Protection</li>
                    <li className="flex gap-2"><span className="text-[var(--saffron)]">✦</span> Health & Positivity</li>
                  </ul>
                </div>
                <button className="mt-8 w-full rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-[var(--primary-foreground)] hover:opacity-90 transition">
                  Book Sankalp — ₹101
                </button>
              </div>
            </article>

            {/* Offer 2 - Featured */}
            <article className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-warm)] text-[var(--ivory)]"
                     style={{ background: "var(--gradient-saffron)" }}>
              <div className="absolute top-4 right-4 rounded-full bg-[var(--gold)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[oklch(0.22_0.08_40)]">
                Most Sacred
              </div>
              <div className="relative h-64 overflow-hidden">
                <img src={devoteesImg} alt="Devotee family praying" width={1280} height={1280} loading="lazy"
                     className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.32_0.14_28/0.9)] to-transparent" />
                <div className="absolute top-4 left-4 rounded-full bg-[var(--ivory)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">
                  Offer 02
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl">Complete Shravan Seva</h3>
                  <div className="text-right">
                    <div className="font-display text-4xl text-[var(--gold-soft)]">₹11,000</div>
                    <div className="text-xs uppercase tracking-widest opacity-80">Full Month</div>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-[var(--gold-soft)]/95">
                  Full participation in the <span className="italic">1.25 Lakh Maha Mrityunjaya Jaap</span>,
                  daily Sankalp, Rudra Abhishek, and Purnahuti.
                </p>
                <div className="mt-6 pt-6 border-t border-[var(--gold)]/30">
                  <div className="text-xs uppercase tracking-widest text-[var(--gold-soft)] mb-3">Benefits</div>
                  <ul className="space-y-2">
                    {[
                      "Health & Longevity",
                      "Protection from Negativity",
                      "Success & Prosperity",
                      "Spiritual Growth",
                      "Divine Grace of Mahakaal",
                    ].map((b) => (
                      <li key={b} className="flex gap-2"><span className="text-[var(--gold-soft)]">🔱</span> {b}</li>
                    ))}
                  </ul>
                </div>
                <button className="mt-8 w-full rounded-full bg-[var(--ivory)] px-6 py-3 font-semibold text-[var(--primary)] hover:bg-[var(--gold-soft)] transition">
                  Book Complete Seva — ₹11,000
                </button>
              </div>
            </article>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-[var(--primary)]">
              <span className="h-px w-8 bg-[var(--primary)]/40" />
              <span className="text-sm uppercase tracking-[0.3em]">Limited Registrations</span>
              <span className="h-px w-8 bg-[var(--primary)]/40" />
            </div>
            <div className="mt-2 font-devanagari text-[var(--muted-foreground)]">सीमित स्थान उपलब्ध • आज ही अपना संकल्प बुक करें</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 md:py-32 bg-[oklch(0.96_0.03_78)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="font-devanagari text-[var(--primary)] text-lg">श्रद्धालुओं के अनुभव</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-[var(--primary)]">
              Blessings Received by Devotees
            </h2>
            <Ornament className="mt-6" />
            <p className="mt-6 mx-auto max-w-2xl text-[var(--muted-foreground)] text-lg">
              Voices of families whose Sankalp was carried to the feet of Mahakaal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The Sankalp taken in our name at Mahakaal brought a deep peace to our family. The Pandits perform every ritual with true devotion.",
                name: "Ramesh & Sunita Sharma",
                loc: "Bengaluru",
                seva: "Complete Shravan Seva",
                initials: "RS",
              },
              {
                quote:
                  "I received the Sankalp video and prasad by post. It felt as though we were sitting right there in Ujjain. Har Har Mahadev!",
                name: "Anjali Verma",
                loc: "Mumbai",
                seva: "Rudra Abhishek",
                initials: "AV",
              },
              {
                quote:
                  "Since booking the Maha Mrityunjaya Jaap, my father's health has improved remarkably. Truly Mahakaal's grace through Art of Mantras.",
                name: "Vikas Agarwal",
                loc: "Delhi",
                seva: "Complete Shravan Seva",
                initials: "VA",
              },
              {
                quote:
                  "Transparent, sincere and shastrokta. The Pandits explained every step. Our first authentic pooja experience online.",
                name: "Deepa Iyer",
                loc: "Chennai",
                seva: "Rudra Abhishek",
                initials: "DI",
              },
              {
                quote:
                  "A calm and prosperity has entered our home this Shravan. My family and I are forever grateful for this seva.",
                name: "Karan & Priya Malhotra",
                loc: "Pune",
                seva: "Complete Shravan Seva",
                initials: "KM",
              },
              {
                quote:
                  "Living abroad, we could never dream of a pooja at Mahakaal. Art of Mantras made it possible with complete devotion.",
                name: "Rohit Nair",
                loc: "Dubai, UAE",
                seva: "Rudra Abhishek",
                initials: "RN",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="relative flex flex-col rounded-2xl bg-card p-8 shadow-[var(--shadow-warm)] ornate-border"
              >
                <div className="absolute -top-4 left-6 font-display text-6xl text-[var(--saffron)] leading-none select-none">
                  &ldquo;
                </div>
                <div className="flex gap-1 text-[var(--saffron)] text-sm mb-4">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <blockquote className="text-[var(--foreground)] leading-relaxed italic flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-[var(--border)] flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full font-display text-[var(--primary-foreground)] shrink-0"
                       style={{ background: "var(--gradient-saffron)" }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display text-[var(--primary)]">{t.name}</div>
                    <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] mt-0.5">
                      {t.loc} · {t.seva}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[var(--primary)]">
            <div className="text-center">
              <div className="font-display text-3xl">2,500<span className="text-[var(--saffron)]">+</span></div>
              <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Sankalps Performed</div>
            </div>
            <div className="h-10 w-px bg-[var(--border)] hidden sm:block" />
            <div className="text-center">
              <div className="font-display text-3xl">4.9<span className="text-[var(--saffron)]">/5</span></div>
              <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Devotee Rating</div>
            </div>
            <div className="h-10 w-px bg-[var(--border)] hidden sm:block" />
            <div className="text-center">
              <div className="font-display text-3xl">18<span className="text-[var(--saffron)]">+</span></div>
              <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 md:py-32 bg-[var(--gradient-parchment)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <div className="font-devanagari text-[var(--primary)] text-lg">दिव्य दर्शन</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-[var(--primary)]">
              Devotional Gallery
            </h2>
            <Ornament className="mt-6" />
            <p className="mt-6 mx-auto max-w-2xl text-[var(--muted-foreground)] text-lg">
              Glimpses from Ujjain — the temple, the rituals, and the devotees whose Sankalp we carry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
            {galleryItems.map((item, i) => {
              const spans = [
                "col-span-2 row-span-2",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
                "col-span-1 row-span-2",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
              ];
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`group relative overflow-hidden rounded-xl ornate-border shadow-[var(--shadow-warm)] focus:outline-none focus:ring-2 focus:ring-[var(--saffron)] ${spans[i] ?? "col-span-1 row-span-1"}`}
                  aria-label={`View ${item.label}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.1_30/0.85)] via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <div className="font-display text-white text-sm md:text-base tracking-wide">
                      {item.label}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[var(--gold-soft)] text-xs opacity-0 group-hover:opacity-100 transition">
                      <span>View</span> <span aria-hidden>→</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Dialog open={lightboxIndex !== null} onOpenChange={(o) => !o && setLightboxIndex(null)}>
          <DialogContent className="max-w-5xl bg-[oklch(0.15_0.06_25)] border-[var(--gold)]/30 p-0 overflow-hidden">
            {lightboxItem && (
              <div className="relative">
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="font-display text-white text-2xl">{lightboxItem.label}</div>
                  <div className="text-[var(--gold-soft)]/80 text-sm mt-1">{lightboxItem.alt}</div>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((i) => (i === null ? 0 : (i - 1 + galleryItems.length) % galleryItems.length))
                    }
                    className="pointer-events-auto rounded-full bg-black/50 hover:bg-black/70 text-white h-10 w-10 flex items-center justify-center backdrop-blur"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryItems.length))
                    }
                    className="pointer-events-auto rounded-full bg-black/50 hover:bg-black/70 text-white h-10 w-10 flex items-center justify-center backdrop-blur"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* BOOKING CTA */}
      <section id="book" className="relative py-24 md:py-32 overflow-hidden">
        <img src={diyasImg} alt="" width={1280} height={1280} loading="lazy"
             className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.08_25/0.96)] via-[oklch(0.2_0.1_25/0.9)] to-[oklch(0.32_0.14_28/0.85)]" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center text-[var(--ivory)]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-black/30 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--saffron)] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold-soft)]">Book Your Sankalp</span>
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.1] text-white">
              Let Your Name Reach<br />
              <span className="italic text-[var(--gold-soft)]">Mahakaal</span> in Ujjain
            </h2>
            <div className="font-devanagari text-xl text-[var(--saffron)] mt-4">
              आज ही अपना संकल्प बुक करें
            </div>
            <p className="mt-6 text-lg text-[var(--gold-soft)]/95 leading-relaxed font-light">
              Share your details and we will reserve your Sankalp with a learned Pandit.
              You'll receive the pooja schedule, live darshan link, and prasad delivery details on WhatsApp.
            </p>
            <ul className="mt-6 space-y-2 text-[var(--gold-soft)]">
              <li className="flex gap-2"><span className="text-[var(--saffron)]">✦</span> Personalized Vedic Sankalp</li>
              <li className="flex gap-2"><span className="text-[var(--saffron)]">✦</span> Live darshan of your pooja</li>
              <li className="flex gap-2"><span className="text-[var(--saffron)]">✦</span> Prasad couriered to your home</li>
            </ul>
          </div>

          <form
            onSubmit={handleBooking}
            noValidate
            className="rounded-2xl bg-[oklch(0.98_0.02_82)] p-8 md:p-10 text-[var(--foreground)] shadow-[var(--shadow-warm)] ornate-border"
          >
            <div className="text-center mb-6">
              <div className="font-devanagari text-[var(--primary)]">पूजा बुकिंग</div>
              <div className="font-display text-2xl text-[var(--primary)]">Reserve Your Pooja</div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="bk-name" className="block text-xs uppercase tracking-widest text-[var(--primary)] mb-1.5">
                  Full Name
                </label>
                <input
                  id="bk-name"
                  name="name"
                  type="text"
                  maxLength={80}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--saffron)]"
                  placeholder="e.g. Ramesh Sharma"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "bk-name-err" : undefined}
                />
                {errors.name && (
                  <p id="bk-name-err" className="mt-1 text-sm text-[var(--destructive)]">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="bk-phone" className="block text-xs uppercase tracking-widest text-[var(--primary)] mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  id="bk-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  maxLength={16}
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--saffron)]"
                  placeholder="+91 98XXXXXXXX"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "bk-phone-err" : undefined}
                />
                {errors.phone && (
                  <p id="bk-phone-err" className="mt-1 text-sm text-[var(--destructive)]">{errors.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bk-date" className="block text-xs uppercase tracking-widest text-[var(--primary)] mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    id="bk-date"
                    name="date"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--saffron)]"
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "bk-date-err" : undefined}
                  />
                  {errors.date && (
                    <p id="bk-date-err" className="mt-1 text-sm text-[var(--destructive)]">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="bk-seva" className="block text-xs uppercase tracking-widest text-[var(--primary)] mb-1.5">
                    Seva
                  </label>
                  <select
                    id="bk-seva"
                    name="seva"
                    value={form.seva}
                    onChange={(e) => setForm({ ...form, seva: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--saffron)]"
                  >
                    <option>Rudra Abhishek — ₹101</option>
                    <option>Complete Shravan Seva — ₹11,000</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full px-6 py-3.5 font-medium text-[oklch(0.22_0.08_40)] shadow-[var(--shadow-gold)] hover:opacity-95 transition disabled:opacity-60"
                style={{ background: "var(--gradient-saffron)", color: "oklch(0.98 0.02 85)" }}
              >
                {submitting ? "Reserving your Sankalp…" : "🔱 Book My Sankalp"}
              </button>
              <p className="text-xs text-center text-[var(--muted-foreground)]">
                By booking, you agree to be contacted on WhatsApp regarding your pooja.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="relative bg-[oklch(0.18_0.08_25)] text-[var(--gold-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">
              <img src={trishulImg} alt="" width={48} height={48} />
              <div>
                <div className="font-display text-xl tracking-widest text-white">ART OF MANTRAS</div>
                <div className="font-devanagari text-sm text-[var(--saffron)]">आर्ट ऑफ मंत्र</div>
              </div>
            </div>
            <p className="mt-6 italic text-[var(--gold-soft)]/80 leading-relaxed">
              "Connecting Devotees with Authentic Vedic Traditions."
            </p>
            <div className="mt-6 font-devanagari text-sm text-[var(--gold-soft)]/70">
              सनातन परंपरा • प्रामाणिक वैदिक पूजा • दिव्य अनुभव
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--saffron)]">Office</div>
            <div className="mt-4 text-lg text-white leading-relaxed">
              AKR Tech Park<br />
              HSR Layout,<br />
              Bengaluru, India
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--saffron)]">Quick Links</div>
            <ul className="mt-4 space-y-2">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#pooja" className="hover:text-white transition">Upcoming Pooja</a></li>
              <li><a href="#offers" className="hover:text-white transition">Offerings</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--gold)]/20">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-[var(--gold-soft)]/60">© {new Date().getFullYear()} Art of Mantras. All rights reserved.</div>
            <div className="font-display text-[var(--saffron)] tracking-[0.4em]">॥ हर हर महादेव ॥ 🔱</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
