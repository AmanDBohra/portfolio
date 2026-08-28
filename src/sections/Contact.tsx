import { useState, type FormEvent } from "react";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle, CalendarClock, FileDown } from "lucide-react";
import { site, socials } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { SocialIcons } from "../components/ui/SocialIcons";

/**
 * Contact form — delivered via FormSubmit.co (no signup / no account needed).
 *
 * How it works:
 *  - The form POSTs to https://formsubmit.co/ajax/<your-email>.
 *  - The FIRST time a message is submitted, FormSubmit emails you a one-time
 *    confirmation link. Click it once to activate; after that, every submission
 *    forwards straight to your inbox. No dashboard, no login.
 *  - To switch providers later (Formspree/EmailJS/your own API), just change
 *    FORM_ENDPOINT to any URL that accepts a POST and returns 2xx.
 *  - If FORM_ENDPOINT is left empty, the form falls back to opening the
 *    visitor's email app (mailto).
 */
const FORM_ENDPOINT = "https://formsubmit.co/ajax/bohraaman@gmail.com";
const FORMSPREE_ENDPOINT = FORM_ENDPOINT; // kept name for existing references

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus("submitting");

    // No backend configured → deliver via the visitor's email client (mailto).
    // This actually reaches your inbox. To send silently in the background instead,
    // set FORMSPREE_ENDPOINT above to your Formspree/EmailJS/API endpoint.
    if (!FORMSPREE_ENDPOINT) {
      const data = new FormData(form);
      const name = String(data.get("name") ?? "");
      const email = String(data.get("email") ?? "");
      const message = String(data.get("message") ?? "");
      const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a visitor"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section bg-slate-50/70 dark:bg-white/[0.02]">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title="Let's turn data into decisions"
          description="Open to conversations about analytics leadership, BI delivery, insurance analytics, and data & analytics roles."
        />

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-6">
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  Available for new opportunities
                </p>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{site.openTo}</p>
              </div>

              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                The fastest way to reach me is the form, or directly by email. I read every message.
              </p>

              <div className="flex flex-wrap gap-3">
                {site.calendlyUrl && (
                  <a
                    href={site.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <CalendarClock className="h-4 w-4" /> Book a 15-min call
                  </a>
                )}
                <a href={site.onePagerUrl} download className="btn-secondary">
                  <FileDown className="h-4 w-4" /> Recruiter one-pager
                </a>
              </div>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-400 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400">Email</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{site.email}</span>
                </span>
              </a>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Find me online
                </p>
                <SocialIcons links={socials} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="card space-y-5" noValidate>
              {/* FormSubmit.co config (no signup) */}
              <input type="hidden" name="_subject" value="New enquiry from your portfolio" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_autoresponse"
                value="Thanks for reaching out — I've received your message and will get back to you shortly. In the meantime, feel free to explore my work at https://amandbohra.github.io/portfolio/ — Aman Bohra"
              />
              {/* honeypot — bots fill this, humans don't */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {FORMSPREE_ENDPOINT
                    ? "Thanks! Your message has been sent."
                    : "Opening your email app to send — just hit send there and it reaches my inbox."}
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" /> Something went wrong. Please email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
