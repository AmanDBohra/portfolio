import { useState, type FormEvent } from "react";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { site, socials } from "../data/portfolio";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { SocialIcons } from "../components/ui/SocialIcons";

/**
 * Contact form.
 *
 * By default this does NOT send anything — it only simulates a submit so you can
 * see the UI states. To make it actually deliver messages, use a no-backend
 * service. The two easiest options:
 *
 *  1) FORMSPREE (recommended, no code):
 *     - Create a form at https://formspree.io and copy your endpoint.
 *     - Set FORMSPREE_ENDPOINT below to e.g. "https://formspree.io/f/xxxxxx".
 *     - The submit handler will POST the form to Formspree automatically.
 *
 *  2) EMAILJS:
 *     - Sign up at https://www.emailjs.com, install "@emailjs/browser",
 *       and replace the handleSubmit body with emailjs.send(...).
 *
 *  3) Your own API:
 *     - Point FORMSPREE_ENDPOINT at your endpoint that accepts a POST.
 */
const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/YOUR_FORM_ID"

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus("submitting");

    // No endpoint configured yet → just simulate success so the UI is testable.
    if (!FORMSPREE_ENDPOINT) {
      await new Promise((r) => setTimeout(r, 800));
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
    <section id="contact" className="section bg-slate-50/70 dark:bg-slate-900/30">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          description="Have a project in mind or just want to say hi? Send a message and I'll get back to you."
        />

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                I'm currently open to freelance work, collaborations, and full-time roles.
                The fastest way to reach me is by email.
              </p>
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
                    : "Demo only: connect Formspree/EmailJS to actually deliver messages."}
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
