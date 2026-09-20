import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./sections/Hero";
import { Snapshot } from "./sections/Snapshot";
import { Impact } from "./sections/Impact";
import { About } from "./sections/About";
import { CareerJourney } from "./sections/CareerJourney";
import { CurrentEngagement } from "./sections/CurrentEngagement";
import { Experience } from "./sections/Experience";
import { Education } from "./sections/Education";
import { Capabilities } from "./sections/Capabilities";
import { Skills } from "./sections/Skills";
import { DataScience } from "./sections/DataScience";
import { Philosophy } from "./sections/Philosophy";
import { ExplainedSimply } from "./sections/ExplainedSimply";
import { IndustryKPIs } from "./sections/IndustryKPIs";
import { Projects } from "./sections/Projects";
import { Testimonials } from "./sections/Testimonials";
import { Writing } from "./sections/Writing";
import { Article } from "./sections/Article";
import { lazy, Suspense } from "react";

// Lazy-loaded so the (large, growing) study material only downloads on demand.
const StudyHub = lazy(() =>
  import("./sections/StudyHub").then((m) => ({ default: m.StudyHub }))
);
import { Honors } from "./sections/Honors";
import { Certifications } from "./sections/Certifications";
import { FAQ } from "./sections/FAQ";
import { Resume } from "./sections/Resume";
import { Contact } from "./sections/Contact";
import { useTheme } from "./hooks/useTheme";
import { useEffect, useState } from "react";
import { getPost } from "./lib/posts";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const m = /^#\/read\/(.+)$/.exec(hash);
  const study = /^#\/study(?:\/(.+))?$/.exec(hash);
  return {
    readSlug: m ? m[1] : null,
    isStudy: !!study,
    studySlug: study && study[1] ? study[1] : null,
  };
}

export default function App() {
  const { theme, toggle } = useTheme();
  const { readSlug, isStudy, studySlug } = useHashRoute();
  const post = readSlug ? getPost(readSlug) : undefined;

  if (isStudy) {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            Loading study material…
          </div>
        }
      >
        <StudyHub slug={studySlug} theme={theme} onToggleTheme={toggle} />
      </Suspense>
    );
  }

  if (post) {
    return <Article post={post} theme={theme} onToggleTheme={toggle} />;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <Snapshot />
        <Impact />
        <About />
        <CareerJourney />
        <CurrentEngagement />
        <Experience />
        <Education />
        <Capabilities />
        <Philosophy />
        <Skills />
        <DataScience />
        <ExplainedSimply />
        <IndustryKPIs />
        <Projects />
        <Testimonials />
        <Writing />
        <Honors />
        <Certifications />
        <FAQ />
        <Resume />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
