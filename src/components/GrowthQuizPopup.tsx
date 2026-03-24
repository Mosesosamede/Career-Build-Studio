import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { useState } from "react";

interface QuizData {
  brandName: string;
  industry: string;
  visibility: number;
  recentCustomers: string;
  efforts: string;
  conversionReality: string;
  desiredCustomers: string;
  mainGoal: string;
  stoppingFactor: string;
  urgency: string;
}

export function GrowthQuizPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>({
    brandName: "",
    industry: "",
    visibility: 5,
    recentCustomers: "",
    efforts: "",
    conversionReality: "",
    desiredCustomers: "",
    mainGoal: "",
    stoppingFactor: "",
    urgency: "",
  });

  const totalSteps = 7;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps + 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = () => {
    // In a real app, we'd send this data to a server
    console.log("Quiz Data:", data);
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-zinc-950 border border-gold/30 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
              <div>
                <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase mb-1">
                  <Sparkles className="w-3 h-3" />
                  Growth Audit
                </div>
                <div className="text-white/40 text-[10px] uppercase tracking-tighter">
                  Section {step} of {totalSteps}
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-white/5 w-full">
              <motion.div 
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">If people don't see your product, they can't buy it.</h3>
                        <p className="text-white/40">Let's start with the basics.</p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gold uppercase tracking-widest">What's your brand name?</label>
                          <input 
                            type="text" 
                            value={data.brandName}
                            onChange={(e) => setData({...data, brandName: e.target.value})}
                            placeholder="e.g. Career Build Studio"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-gold outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gold uppercase tracking-widest">What industry are you in?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Fashion", "Tech", "Real Estate", "E-commerce", "Services", "Other"].map((option) => (
                              <button
                                key={option}
                                onClick={() => setData({...data, industry: option})}
                                className={`text-left px-6 py-4 rounded-2xl border transition-all text-sm ${
                                  data.industry === option 
                                  ? "bg-gold text-black border-gold font-bold" 
                                  : "bg-white/5 border-white/10 text-white hover:border-gold/50"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Section 2 — Current State</h3>
                        <p className="text-white/40">Be honest with yourself.</p>
                      </div>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-gold uppercase tracking-widest block">On a scale of 1–10, how visible is your business online?</label>
                          <div className="flex justify-between text-xs text-white/40 mb-2">
                            <span>Invisible</span>
                            <span>Omnipresent</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={data.visibility}
                            onChange={(e) => setData({...data, visibility: parseInt(e.target.value)})}
                            className="w-full accent-gold"
                          />
                          <div className="text-center text-4xl font-bold text-gold">{data.visibility}</div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gold uppercase tracking-widest">How many customers did you get in the last 7 days?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["0", "1-5", "5-10", "10-20", "20+"].map((option) => (
                              <button
                                key={option}
                                onClick={() => setData({...data, recentCustomers: option})}
                                className={`text-left px-6 py-4 rounded-2xl border transition-all text-sm ${
                                  data.recentCustomers === option 
                                  ? "bg-gold text-black border-gold font-bold" 
                                  : "bg-white/5 border-white/10 text-white hover:border-gold/50"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Section 3 — Effort</h3>
                        <p className="text-white/40">What's the current strategy?</p>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-gold uppercase tracking-widest">What are you currently doing to get customers?</label>
                        <textarea 
                          value={data.efforts}
                          onChange={(e) => setData({...data, efforts: e.target.value})}
                          placeholder="e.g. posting on IG, running FB ads, referrals..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-gold outline-none transition-all min-h-[150px] resize-none"
                        />
                        <p className="text-xs text-white/20 italic">(e.g. posting, ads, referrals)</p>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Section 4 — Conversion Reality</h3>
                        <p className="text-white/40">The clarity test.</p>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-gold uppercase tracking-widest">If you explain your business to someone, can they immediately understand and buy?</label>
                        <div className="grid gap-3">
                          {["Yes", "No", "Not sure"].map((option) => (
                            <button
                              key={option}
                              onClick={() => setData({...data, conversionReality: option})}
                              className={`w-full text-left px-6 py-4 rounded-2xl border transition-all ${
                                data.conversionReality === option 
                                ? "bg-gold text-black border-gold font-bold" 
                                : "bg-white/5 border-white/10 text-white hover:border-gold/50"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Section 5 — Desired State</h3>
                        <p className="text-white/40">Where do you want to be?</p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gold uppercase tracking-widest">How many customers do you want per week?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["1-5", "5-20", "20-50", "50-100", "100+"].map((option) => (
                              <button
                                key={option}
                                onClick={() => setData({...data, desiredCustomers: option})}
                                className={`text-left px-6 py-4 rounded-2xl border transition-all text-sm ${
                                  data.desiredCustomers === option 
                                  ? "bg-gold text-black border-gold font-bold" 
                                  : "bg-white/5 border-white/10 text-white hover:border-gold/50"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gold uppercase tracking-widest">What is your current main goal right now?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Scale Revenue", "Increase Visibility", "Launch Product", "Improve Conversion", "Other"].map((option) => (
                              <button
                                key={option}
                                onClick={() => setData({...data, mainGoal: option})}
                                className={`text-left px-6 py-4 rounded-2xl border transition-all text-sm ${
                                  data.mainGoal === option 
                                  ? "bg-gold text-black border-gold font-bold" 
                                  : "bg-white/5 border-white/10 text-white hover:border-gold/50"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Section 6 — Gap Awareness</h3>
                        <p className="text-white/40">Identifying the bottleneck.</p>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-gold uppercase tracking-widest">What do you think is stopping your business from getting more customers?</label>
                        <textarea 
                          value={data.stoppingFactor}
                          onChange={(e) => setData({...data, stoppingFactor: e.target.value})}
                          placeholder="e.g. lack of traffic, poor website, high prices..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-gold outline-none transition-all min-h-[150px] resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {step === 7 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Section 7 — Urgency</h3>
                        <p className="text-white/40">How fast do we move?</p>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-gold uppercase tracking-widest">How urgent is fixing this for you?</label>
                        <div className="grid gap-3">
                          {["Just exploring", "Need results soon", "Need results immediately"].map((option) => (
                            <button
                              key={option}
                              onClick={() => setData({...data, urgency: option})}
                              className={`w-full text-left px-6 py-4 rounded-2xl border transition-all ${
                                data.urgency === option 
                                ? "bg-gold text-black border-gold font-bold" 
                                : "bg-white/5 border-white/10 text-white hover:border-gold/50"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-zinc-900/50 flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 text-sm font-bold transition-all ${
                  step === 1 ? "opacity-0 pointer-events-none" : "text-white/40 hover:text-white"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {step < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="bg-gold hover:bg-gold-light text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="bg-gold hover:bg-gold-light text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  Show me my growth plan
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
