import { navLinks, site, socials } from "../data/portfolio";
import { SocialIcons } from "./ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  const base = import.meta.env.BASE_URL; // "/portfolio/" in production
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-x py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#hero"
              className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              {site.name}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {site.title}. {site.tagline}
            </p>
            <SocialIcons links={socials} className="mt-5" />
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Static, crawlable knowledge-base pages (SEO/AI discoverability) */}
          <nav aria-label="Knowledge base">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Knowledge base
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {[
                ["About", "about.html"],
                ["Experience", "experience.html"],
                ["Skills", "skills.html"],
                ["Projects", "projects/"],
                ["Technologies", "technologies/"],
                ["Articles", "articles/"],
                ["Services", "services.html"],
                ["Certifications", "certifications.html"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={`${base}${href}`}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row dark:border-slate-800/70 dark:text-slate-400">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
