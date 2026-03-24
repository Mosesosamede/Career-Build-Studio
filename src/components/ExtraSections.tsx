import { motion, AnimatePresence } from "motion/react";
import { Check, X, Star, Quote, Cat } from "lucide-react";
import { useEffect, useState } from "react";
import { GrowthQuizPopup } from "./GrowthQuizPopup";

export function FloatingCatButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            onClick={() => setIsQuizOpen(true)}
            className="fixed left-6 bottom-24 z-50 flex items-center gap-4 group cursor-pointer"
          >
            {/* Speech Bubble */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="relative bg-gold text-black px-4 py-2 rounded-2xl font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] whitespace-nowrap"
            >
              Fix My Visibility
              {/* Triangle for bubble */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gold" />
            </motion.div>

            {/* Cat Button */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-zinc-900 border-2 border-gold rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all"
            >
              <Cat className="w-8 h-8 text-gold" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GrowthQuizPopup isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}

export function Pricing() {
  const plans = [
    {
      name: "Starter — Launch (Pay-As-You-Go)",
      price: "₦25,000",
      subPrice: "5 payments of ₦5,000",
      features: [
        "3 product videos to attract attention",
        "Make your product look premium",
        "Get discovered on Google",
        "Simple checkout for fast purchases",
        "Guided content plan for posting",
        "Generate your first 20 potential customers",
        "Tailored Strategy"
      ],
      promise: "Turn your product into something people notice and buy",
      buttonText: "Start Pay-As-You-Go — ₦5,000 today",
      highlighted: false
    },
    {
      name: "Growth — Customer Flow ⭐",
      price: "₦120,000",
      features: [
        "Everything in Starter",
        "10 videos/daily showcasing your product",
        "Turn visitors into paying customers",
        "Up to 1,000 targeted daily reach",
        "Optimized checkout for instant purchases",
        "Product repositioning that attracts buyers",
        "Offer structured to convert attention",
        "Get discovered on Google",
        "Tailored Strategy"
      ],
      promise: "Get consistent traffic and convert it into paying customers",
      buttonText: "Start Getting Customers",
      highlighted: true
    },
    {
      name: "Full Scale — Revenue Engine",
      price: "₦350,000",
      features: [
        "Everything in Growth",
        "AI-powered creators showcasing daily",
        "We handle content + posting for you",
        "Continuous traffic flow (scaled reach)",
        "Full funnel optimization (click → payment)",
        "Tailored growth strategy",
        "Ongoing performance improvement",
        "Full brand and offer overhaul",
        "Tailored Strategy"
      ],
      promise: "Turn your business into a daily sales machine",
      buttonText: "Build My Revenue Engine",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Pricing</h2>
          <p className="text-white/50">Choose the plan that fits your business goals.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -12, scale: 1.01 }}
              className={`p-10 rounded-3xl border transition-all flex flex-col group ${
                plan.highlighted 
                ? "bg-zinc-900 border-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)]" 
                : "bg-black border-white/5 hover:border-white/20 hover:bg-zinc-900/40 hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)]"
              }`}
            >
              <div className="mb-8">
                <h3 className={`text-sm font-bold tracking-widest mb-4 ${plan.highlighted ? "text-gold" : "text-white/40"}`}>
                  {plan.name}
                </h3>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold">{plan.price}</div>
                  {plan.subPrice && <div className="text-xs text-white/40 mt-1">{plan.subPrice}</div>}
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Our Promise</div>
                <div className="text-sm italic text-white/80">"{plan.promise}"</div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className={`w-full py-4 px-4 rounded-full font-bold text-sm transition-all ${
                plan.highlighted 
                ? "bg-gold text-black hover:bg-gold-light shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                : "bg-black text-white border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_0_12px_rgba(255,255,255,0.1)] hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4),inset_0_0_15px_rgba(255,255,255,0.25)]"
              }`}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SocialProof() {
  const stats = [
    { label: "System design", value: "+12" },
    { label: "Revenue Spike", value: "70%+" },
    { label: "Growth Rate", value: "3x" }
  ];

  return (
    <section id="social-proof" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              If customers don't see your value, <span className="text-gold">they won't buy from you.</span>
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{stat.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 bg-gold/5 blur-2xl rounded-full" />
             <div className="relative bg-black border border-white/5 p-10 rounded-3xl">
                <Quote className="w-12 h-12 text-gold/20 mb-6" />
                <p className="text-xl text-white/80 italic leading-relaxed mb-8">
                  "They position your product and convert attention into real sales. Career Build Studio transformed my brand presence in just weeks."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center font-bold text-gold">A</div>
                  <div>
                    <div className="font-bold">Alex Johnson</div>
                    <div className="text-sm text-white/40">Senior Product Designer</div>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Popup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-zinc-900 border border-gold/30 p-10 rounded-[2.5rem] max-w-lg w-full shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
            <button 
              onClick={() => setShow(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                STEP 1: INITIALIZE GROWTH
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                WAIT, BEFORE YOU LEAVE...
              </h2>
              <p className="text-white/60 mb-10 leading-relaxed">
                Unlock your product's potential with our exclusive growth system. Join 300+ brands that scaled their revenue this year.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-gold hover:bg-gold-light text-black py-5 rounded-full font-bold text-lg transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                  Get My Free Growth Audit
                </button>
                <button 
                  onClick={() => setShow(false)}
                  className="w-full text-white/40 hover:text-white text-sm font-medium transition-colors"
                >
                  No thanks, I'll figure it out myself
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { LogoWithText } from "./Logo";

export function Footer({ onNavigate }: { onNavigate: (page: "home" | "about" | "contact" | "how-it-works") => void }) {
  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div onClick={() => onNavigate("home")} className="cursor-pointer">
          <LogoWithText />
        </div>
        <div className="flex gap-8 text-sm text-white/40">
          <button onClick={() => onNavigate("home")} className="hover:text-gold transition-colors">Home</button>
          <button onClick={() => onNavigate("about")} className="hover:text-gold transition-colors">About</button>
          <button onClick={() => onNavigate("how-it-works")} className="hover:text-gold transition-colors">How it works</button>
          <button onClick={() => onNavigate("contact")} className="hover:text-gold transition-colors">Contact</button>
          <a href="#pricing" className="hover:text-gold transition-colors">Pricing</a>
        </div>
        <div className="text-sm text-white">
          © 2026 Career Build Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
