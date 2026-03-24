import { motion } from "motion/react";
import { Search, MapPin, Zap, DollarSign, ArrowRight, Sparkles } from "lucide-react";

export function HowItWorksPage({ onNavigate }: { onNavigate: (page: "contact") => void }) {
  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Understand your product",
      description: "→ what you sell, who it’s for"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Position to the right audience",
      description: "→ where your buyers actually are"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Build demand",
      description: "→ make people want it"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Convert to customers",
      description: "→ turn attention into sales"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <section className="text-center mb-32 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-bold tracking-widest uppercase"
          >
            <Sparkles className="w-4 h-4" />
            The Growth Blueprint
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto"
          >
            How we turn <span className="text-gold">visibility</span> into customers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            A simple system designed to position your product, attract the right audience, and convert attention into sales.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={() => onNavigate("contact")}
              className="bg-gold hover:bg-gold-light text-black px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Start My Growth
            </button>
          </motion.div>
        </section>

        {/* CORE FLOW */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-[1px] bg-gradient-to-r from-gold/40 to-transparent z-0 -translate-x-8" />
                )}
                <div className="relative z-10 bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] hover:border-gold/30 transition-all duration-500 h-full">
                  <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-white">{step.title}</h3>
                    <p className="text-white/40 text-sm font-medium">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SYSTEM EXPLANATION */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto bg-zinc-900/30 border border-white/5 p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Not marketing. <br /><span className="text-gold">A system.</span></h2>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-white/80 font-medium italic">We don’t guess.</p>
                <p className="text-white/60 leading-relaxed">
                  We build structured growth systems that move your product from <span className="text-white font-bold">unseen</span> → <span className="text-white font-bold">in-demand</span> → <span className="text-white font-bold">purchased</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Ready to grow your brand?</h2>
            <button 
              onClick={() => onNavigate("contact")}
              className="bg-gold hover:bg-gold-light text-black px-12 py-6 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.3)] flex items-center gap-3 mx-auto"
            >
              See My Growth Path
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
