import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Experience } from "./sections/Experience";
import { Education } from "./sections/Education";
import { Certifications } from "./sections/Certifications";
import { Services } from "./sections/Services";
import { Creative } from "./sections/Creative";
import { Resume } from "./sections/Resume";
import { Testimonials } from "./sections/Testimonials";
import { Contact } from "./sections/Contact";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Navbar theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Services />
        <Creative />
        <Resume />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
