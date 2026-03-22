import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Target, TrendingUp, Users, X } from "lucide-react";
import { LogoWithText } from "./Logo";

export function Navbar({ onNavigate, currentPage }: { onNavigate: (page: "home" | "about") => void, currentPage: "home" | "about" }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div onClick={() => onNavigate("home")} className="cursor-pointer">
          <LogoWithText />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <button 
            onClick={() => onNavigate("home")} 
            className={`hover:text-gold transition-colors ${currentPage === "home" ? "text-gold" : ""}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate("about")} 
            className={`hover:text-gold transition-colors ${currentPage === "about" ? "text-gold" : ""}`}
          >
            About
          </button>
          <a href="#how-it-works" className="hover:text-gold transition-colors" onClick={(e) => { if(currentPage !== "home") { e.preventDefault(); onNavigate("home"); setTimeout(() => document.getElementById("how-it-works")?.scrollIntoView({behavior: "smooth"}), 100); } }}>How it works</a>
          <a href="#pricing" className="hover:text-gold transition-colors" onClick={(e) => { if(currentPage !== "home") { e.preventDefault(); onNavigate("home"); setTimeout(() => document.getElementById("pricing")?.scrollIntoView({behavior: "smooth"}), 100); } }}>Pricing</a>
        </div>
        <button className="bg-gold hover:bg-gold-light text-black px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          GET CUSTOMERS NOW
        </button>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Get your product <span className="text-gold">seen.</span> Get your product <span className="text-gold">sold.</span>
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
            We help brands and agencies turn visibility into demand and demand into paying customers.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gold hover:bg-gold-light text-black px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 group shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              Get Customers Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-black text-white border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_0_12px_rgba(255,255,255,0.1)] hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4),inset_0_0_15px_rgba(255,255,255,0.25)] px-8 py-4 rounded-full font-bold transition-all">
              See How It Works
            </button>
          </div>
          
          <div className="mt-12 h-8 overflow-hidden">
            <motion.div
              animate={{ y: [0, -32, -64, 0] }}
              transition={{ 
                duration: 9, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.33, 0.66, 1]
              }}
              className="flex flex-col"
            >
              {[
                "Backed by real results, not promises",
                "Growth systems, not guesswork",
                "Where strategy meets execution"
              ].map((text, i) => (
                <div key={i} className="h-8 flex items-center gap-3 text-white/50 font-bold tracking-tight hover:text-white transition-colors cursor-default shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full" />
          <div className="relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs text-white/30 font-mono">ANALYTICS_DASHBOARD</div>
            </div>
            
            <div className="space-y-6">
              <div className="h-40 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl border border-gold/20 flex items-center justify-center">
                 <TrendingUp className="w-16 h-16 text-gold animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-xs text-white/40 mb-1">Growth</div>
                  <div className="text-xl font-bold text-gold">+124%</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-xs text-white/40 mb-1">Opportunities</div>
                  <div className="text-xl font-bold text-gold">42</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-gold p-4 rounded-2xl shadow-2xl text-black"
          >
            <Users className="w-6 h-6" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-6 -left-6 bg-zinc-800 p-4 rounded-2xl border border-white/10 shadow-2xl"
          >
            <Target className="w-6 h-6 text-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const problems = [
    "Your product isn’t reaching the right people",
    "Attention isn’t converting into sales",
    "You’re posting, but nothing is happening"
  ];

  const solutions = [
    "We position your product in front of buyers",
    "We build demand before the sale",
    "We create systems that turn attention into revenue"
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Problem */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-black border border-white/5 rounded-[2.5rem]"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              Why most brands <br />
              <span className="text-white/40 font-medium italic">stay invisible</span>
            </h2>
            <div className="space-y-6">
              {problems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0 mt-1">
                    <X className="w-4 h-4" />
                  </div>
                  <p className="text-lg text-white/60">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 bg-zinc-900 border border-gold/20 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold mb-10 relative z-10">
              What we do <br />
              <span className="text-gold italic">differently</span>
            </h2>
            <div className="space-y-6 relative z-10">
              {solutions.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-lg text-white/80 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
