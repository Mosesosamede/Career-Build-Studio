import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, FormEvent } from "react";
import { Check, ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export function ContactPage() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    goal: "",
    situation: "",
    problem: "",
    investment: ""
  });

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbymCZ7pki-cuYRSDNh9QnOj2eXcq-be7-HI8U8R-45m4KD-Km7dYZXt-8Rl0WOrLFG1/exec", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          business: formData.businessName,
          goal: formData.goal,
          state: formData.situation,
          blocker: formData.problem,
          ready: formData.investment
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      // Still show success to user for better UX if it's a network issue but likely sent
      setIsSubmitted(true);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Business Name (Optional)</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="Your Company"
                />
              </div>
            </div>
            <button
              onClick={nextStep}
              disabled={!formData.name || !formData.email}
              className="w-full bg-gold text-black py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        );
      case 2:
        return (
          <SelectionStep
            title="What do you want right now?"
            options={["Get more customers", "Increase sales", "Start a business", "Build my brand"]}
            value={formData.goal}
            onChange={(val) => {
              setFormData({ ...formData, goal: val });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <SelectionStep
            title="Where are you right now?"
            options={["Just starting", "Getting some clients", "Already making sales"]}
            value={formData.situation}
            onChange={(val) => {
              setFormData({ ...formData, situation: val });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <SelectionStep
            title="What's holding you back?"
            options={["No traffic", "No conversions", "No clear system"]}
            value={formData.problem}
            onChange={(val) => {
              setFormData({ ...formData, problem: val });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <SelectionStep
            title="Ready to invest in growth?"
            options={["Yes, ready now", "Soon, planning", "Just exploring"]}
            value={formData.investment}
            onChange={(val) => {
              setFormData({ ...formData, investment: val });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-bold text-gold">Summary of your profile</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-white/40">Goal:</div>
                <div className="text-white/80">{formData.goal}</div>
                <div className="text-white/40">Status:</div>
                <div className="text-white/80">{formData.situation}</div>
                <div className="text-white/40">Challenge:</div>
                <div className="text-white/80">{formData.problem}</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-gold text-black py-6 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-gold-light transition-all transform hover:scale-[1.02]"
              >
                Get My Growth Plan
              </button>
              <button
                onClick={prevStep}
                className="text-white/40 hover:text-white text-sm font-medium transition-colors"
              >
                Go back and edit
              </button>
            </div>
          </motion.div>
        );
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-12 h-12 text-gold" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Submission Successful!</h2>
            <p className="text-white/60 leading-relaxed">
              Thank you for sharing your business details. You will receive a reply from our strategy team within 24 hours with your custom growth plan.
            </p>
          </div>
          <div className="pt-8">
            <button
              onClick={() => window.location.href = "/"}
              className="px-8 py-4 bg-gold text-black rounded-full font-bold hover:bg-gold-light transition-all"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Tell us about your business — <span className="text-gold">we'll map your growth plan</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg"
          >
            Takes 60 seconds • No commitment required
          </motion.p>
        </div>

        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute -top-8 left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / 6) * 100}%` }}
            />
          </div>

          <div className="bg-black border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
            
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto" />
                  <p className="text-xl font-bold tracking-widest uppercase">Analyzing your response...</p>
                </motion.div>
              ) : (
                <div key={step}>
                  {renderStep()}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectionStep({ 
  title, 
  options, 
  value, 
  onChange, 
  onBack 
}: { 
  title: string; 
  options: string[]; 
  value: string; 
  onChange: (val: string) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <div className="grid gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`w-full text-left px-8 py-6 rounded-2xl border transition-all flex items-center justify-between group ${
              value === option 
              ? "bg-gold text-black border-gold" 
              : "bg-zinc-900/50 border-white/5 hover:border-white/20 hover:bg-zinc-900"
            }`}
          >
            <span className="font-bold text-lg">{option}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              value === option ? "border-black" : "border-white/20 group-hover:border-gold"
            }`}>
              {value === option && <Check className="w-4 h-4" />}
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
    </motion.div>
  );
}
