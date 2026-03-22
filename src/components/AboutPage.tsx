import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            We don’t just market. <br />
            <span className="text-gold">We create demand.</span>
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </motion.div>

        {/* Story Section */}
        <section className="mb-32">
          <h2 className="text-sm font-bold tracking-[0.3em] text-gold uppercase mb-8">The Story</h2>
          <div className="space-y-8 text-xl text-white/70 leading-relaxed">
            <p>
              The market is flooded with noise. Everywhere you look, people are shouting for attention, but very few are actually getting results. 
            </p>
            <p>
              We saw a fundamental problem: talented professionals and great products were being buried because they lacked a cohesive system to turn that attention into actual growth. Most agencies focus on vanity metrics—likes, follows, and "brand awareness."
            </p>
            <p className="text-white font-medium">
              We saw the gap between "being seen" and "being bought."
            </p>
            <p>
              That’s why we built <span className="text-gold">Career Build Studio</span>. We wanted to create a studio that focuses on the only metric that matters: conversion. We don't just want you to be famous; we want you to be the market leader.
            </p>
          </div>
        </section>

        {/* Core Belief Section */}
        <section className="mb-32 py-20 border-y border-white/5 relative overflow-hidden">
          <div className="absolute -left-20 top-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
          <div className="relative z-10 text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] text-gold uppercase mb-12">Our Core Belief</h2>
            <blockquote className="text-4xl md:text-6xl font-bold italic leading-tight">
              “If people don’t see it, <br />
              <span className="text-gold">they won’t buy it.”</span>
            </blockquote>
          </div>
        </section>

        {/* Differentiation Section */}
        <section className="mb-32">
          <h2 className="text-sm font-bold tracking-[0.3em] text-gold uppercase mb-12 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl">
              <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-6">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Not an Ads Agency</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                We don't just burn your budget on clicks. We focus on the infrastructure that makes those clicks valuable.
              </p>
            </div>
            <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Not a Content Agency</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Content without strategy is just noise. We don't just make things look pretty; we make them work.
              </p>
            </div>
            <div className="p-8 bg-gold/10 border border-gold/30 rounded-3xl">
              <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">We Build Systems</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                We build end-to-end systems that capture attention, build trust, and convert visitors into loyal clients.
              </p>
            </div>
          </div>
        </section>

        {/* End CTA */}
        <section className="text-center bg-gold p-16 rounded-[3rem] text-black">
          <h2 className="text-4xl font-bold mb-8">Ready to be in demand?</h2>
          <button className="bg-black text-gold px-12 py-6 rounded-full font-bold text-xl transition-all transform hover:scale-105 flex items-center gap-3 mx-auto">
            Get Customers Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </section>
      </div>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
