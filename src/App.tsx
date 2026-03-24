import { Navbar, Hero, HowItWorks } from "./components/MainSections";
import { Pricing, SocialProof, Footer, FloatingCatButton } from "./components/ExtraSections";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { HowItWorksPage } from "./components/HowItWorksPage";
import { motion, useScroll, useSpring } from "motion/react";
import { useState, useEffect } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "contact" | "how-it-works">("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            
            {/* Floating Proof */}
            <div className="py-12 border-y border-white/5 bg-zinc-950/50 overflow-hidden whitespace-nowrap">
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-12 items-center text-sm font-bold tracking-widest text-white/20 uppercase"
              >
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    A fashion brand just joined Growth Plan
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    Skincare store gained 120 customers
                  </span>
                ))}
              </motion.div>
            </div>

            <HowItWorks />
            <SocialProof />
            <Pricing />
            
            {/* Final CTA */}
            <section className="py-32 px-6">
              <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-zinc-900 to-black p-16 rounded-[3rem] border border-gold/20 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 blur-3xl rounded-full group-hover:bg-gold/10 transition-all duration-700" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    Ready to build your <span className="text-gold">dream business?</span>
                  </h2>
                  <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                    Stop leaving your growth to chance. Join Career Build Studio and start your journey to market domination today.
                  </p>
                  <button 
                    onClick={() => setCurrentPage("contact")}
                    className="bg-gold hover:bg-gold-light text-black px-12 py-6 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                  >
                    Get Customers Now
                  </button>
                </div>
              </div>
            </section>
          </>
        );
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "how-it-works":
        return <HowItWorksPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-gold selection:text-black">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main>
        {renderContent()}
      </main>

      <FloatingCatButton />
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
