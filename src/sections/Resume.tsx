import { Download, FileText } from "lucide-react";
import { site } from "../data/portfolio";
import { Reveal } from "../components/ui/Reveal";

export function Resume() {
  return (
    <section id="resume" className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 to-brand-500 px-8 py-14 text-center shadow-xl dark:border-slate-800">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:24px_24px]"
            />
            <div className="relative">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <FileText className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-3xl font-bold text-white">Want the full details?</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">
                Download my resume for a complete overview of my experience, skills, and education.
              </p>
              <a
                href={site.resumeUrl}
                download
                className="btn mt-8 bg-white text-brand-700 shadow-lg hover:-translate-y-0.5 hover:bg-brand-50"
              >
                <Download className="h-4 w-4" /> Download Resume (PDF)
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
