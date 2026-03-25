import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Sparkles, Check, Loader2, CreditCard, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import PaymentButton from "./PaymentButton";

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

const PLANS = [
  {
    id: "starter",
    name: "Starter — Launch (Pay-As-You-Go)",
    price: 25000,
    priceDisplay: "₦25,000",
    subPrice: "5 payments of ₦5,000",
    description: "Turn your product into something people notice and buy",
    features: [
      "3 product videos to attract attention",
      "Make your product look premium",
      "Get discovered on Google",
      "Simple checkout for fast purchases",
      "Guided content plan for posting",
      "Generate your first 20 potential customers",
      "Tailored Strategy"
    ],
    icon: Zap,
    color: "text-blue-400"
  },
  {
    id: "growth",
    name: "Growth — Customer Flow ⭐",
    price: 120000,
    priceDisplay: "₦120,000",
    description: "Get consistent traffic and convert it into paying customers",
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
    icon: Sparkles,
    color: "text-gold",
    popular: true
  },
  {
    id: "full-scale",
    name: "Full Scale — Revenue Engine",
    price: 350000,
    priceDisplay: "₦350,000",
    description: "Turn your business into a daily sales machine",
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
    icon: ShieldCheck,
    color: "text-purple-400"
  }
];

export function GrowthQuizPopup({ 
  isOpen, 
  onClose,
  title = "Growth Audit",
  description = "Section",
  resultTitle = "Your Custom Growth Plan",
  resultDescription = "Based on your audit, we recommend these solutions."
}: { 
  isOpen: boolean; 
  onClose: () => void;
  title?: string;
  description?: string;
  resultTitle?: string;
  resultDescription?: string;
}) {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isShowingPricing, setIsShowingPricing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [starterOption, setStarterOption] = useState<"pay-as-you-go" | "full" | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
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

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.brandName.trim() !== "" && data.industry !== "";
      case 2:
        return data.recentCustomers !== "";
      case 3:
        return data.efforts.trim() !== "";
      case 4:
        return data.conversionReality !== "";
      case 5:
        return data.desiredCustomers !== "" && data.mainGoal !== "";
      case 6:
        return data.stoppingFactor.trim() !== "";
      case 7:
        return data.urgency !== "";
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (isStepValid()) {
      setStep((s) => Math.min(s + 1, totalSteps + 1));
    }
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submitData = async () => {
    try {
      await fetch("/api/visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: data.brandName,
          niche: data.industry,
          score: data.visibility,
          recent_customers: data.recentCustomers,
          current_efforts: data.efforts,
          clarity: data.conversionReality,
          target_customers: data.desiredCustomers,
          primary_goal: data.mainGoal,
          bottleneck: data.stoppingFactor,
          priority: data.urgency
        })
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleFinish = () => {
    if (isStepValid()) {
      setIsAnalyzing(true);
    }
  };

  useEffect(() => {
    if (isAnalyzing) {
      const timer1 = setTimeout(() => setAnalysisStep(1), 1500);
      const timer2 = setTimeout(() => setAnalysisStep(2), 3000);
      const timer3 = setTimeout(() => setAnalysisStep(3), 4500);
      const timer4 = setTimeout(() => {
        setIsAnalyzing(false);
        submitData();
        setIsShowingPricing(true);
      }, 6000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isAnalyzing]);

  const getFinalPrice = () => {
    if (selectedPlan?.id === "starter") {
      return starterOption === "pay-as-you-go" ? 5000 : 25000;
    }
    return selectedPlan?.price || 0;
  };

  const getFinalPriceDisplay = () => {
    if (selectedPlan?.id === "starter") {
      return starterOption === "pay-as-you-go" ? "₦5,000" : "₦25,000";
    }
    return selectedPlan?.priceDisplay || "";
  };

  const handlePaymentSuccess = async (transactionId: number, txRef: string) => {
    setPaymentStatus("verifying");
    
    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transactionId,
          expectedAmount: getFinalPrice(),
          expectedCurrency: "NGN"
        }),
      });

      const result = await res.json();

      if (result.verified) {
        setPaymentStatus("success");
        setTimeout(() => {
          onClose();
          // Reset state
          setIsShowingPricing(false);
          setIsCheckingOut(false);
          setSelectedPlan(null);
          setStep(1);
          setPaymentStatus("idle");
        }, 3000);
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setPaymentStatus("error");
    }
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
                  {title}
                </div>
                <div className="text-white/40 text-[10px] uppercase tracking-tighter">
                  {description} {step} of {totalSteps}
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
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center"
                  >
                    <div className="relative space-y-12">
                      {/* Vertical Line */}
                      <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10">
                        <motion.div 
                          className="w-full bg-gold origin-top"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: analysisStep / 3 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {/* Steps */}
                      {[
                        "Analyzing visibility gaps",
                        "Mapping growth opportunities",
                        "Generating custom strategy"
                      ].map((text, index) => (
                        <div key={index} className="flex items-center gap-6 relative z-10">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                            analysisStep > index 
                            ? "bg-gold border-gold" 
                            : analysisStep === index 
                              ? "border-gold animate-pulse" 
                              : "bg-zinc-950 border-white/20"
                          }`}>
                            {analysisStep > index ? (
                              <Check className="w-3 h-3 text-black font-bold" />
                            ) : analysisStep === index ? (
                              <Loader2 className="w-3 h-3 text-gold animate-spin" />
                            ) : null}
                          </div>
                          <span className={`text-lg font-bold tracking-widest uppercase transition-all duration-500 ${
                            analysisStep >= index ? "text-white" : "text-white/20"
                          }`}>
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-16 text-gold text-xs font-bold tracking-[0.3em] uppercase animate-pulse"
                    >
                      Finalizing your growth strategy...
                    </motion.p>
                  </motion.div>
                ) : isShowingPricing ? (
                  <motion.div
                    key="pricing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {!isCheckingOut ? (
                      <>
                        <div className="text-center space-y-2">
                          <h3 className="text-3xl font-bold text-white">{resultTitle}</h3>
                          <p className="text-white/40">{resultDescription}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {PLANS.map((plan) => (
                            <motion.div
                              key={plan.id}
                              whileHover={{ y: -5 }}
                              className={`relative p-8 rounded-3xl border transition-all cursor-pointer flex flex-col ${
                                plan.popular 
                                ? "bg-gold/5 border-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]" 
                                : "bg-white/5 border-white/10 hover:border-white/20"
                              }`}
                              onClick={() => {
                                setSelectedPlan(plan);
                                if (plan.id === "starter") {
                                  setStarterOption(null);
                                }
                                setIsCheckingOut(true);
                              }}
                            >
                              {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                  Most Popular
                                </div>
                              )}
                              <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-2xl bg-white/5 ${plan.color}`}>
                                  <plan.icon className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-white">{plan.priceDisplay}</div>
                                  {plan.subPrice && <div className="text-[10px] text-white/40 mt-1">{plan.subPrice}</div>}
                                </div>
                              </div>
                              <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                              <p className="text-sm text-white/60 mb-6 flex-grow">{plan.description}</p>
                              <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center gap-3 text-xs text-white/80">
                                    <Check className="w-4 h-4 text-gold shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <button className={`w-full py-4 rounded-full font-bold transition-all ${
                                plan.popular 
                                ? "bg-gold text-black hover:bg-gold-light" 
                                : "bg-white text-black hover:bg-white/90"
                              }`}>
                                Select Plan
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : selectedPlan?.id === "starter" && !starterOption ? (
                      <div className="space-y-8">
                        <button 
                          onClick={() => setIsCheckingOut(false)}
                          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back to plans
                        </button>
                        <div className="text-center space-y-2">
                          <h3 className="text-3xl font-bold text-white">Select Starter Option</h3>
                          <p className="text-white/40">Choose how you want to pay for the Starter plan.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div 
                            onClick={() => setStarterOption("pay-as-you-go")}
                            className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-gold cursor-pointer transition-all group"
                          >
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Pay-As-You-Go</h4>
                            <div className="text-2xl font-bold text-gold mb-4">₦5,000</div>
                            <p className="text-sm text-white/60">Launch your first viral hit today. Low entry, high impact growth.</p>
                          </div>
                          <div 
                            onClick={() => setStarterOption("full")}
                            className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-gold cursor-pointer transition-all group"
                          >
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Full Payment</h4>
                            <div className="text-2xl font-bold text-gold mb-4">₦25,000</div>
                            <p className="text-sm text-white/60">Unlock the full engine. Get all 3 high-converting videos at once and save.</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <button 
                          onClick={() => {
                            if (selectedPlan?.id === "starter") {
                              setStarterOption(null);
                            } else {
                              setIsCheckingOut(false);
                            }
                          }}
                          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </button>

                        <div className="grid md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-bold text-white">Order Summary</h4>
                                <span className="text-gold font-bold">{getFinalPriceDisplay()}</span>
                              </div>
                              <div className="h-px bg-white/10 w-full" />
                              <div className="space-y-2">
                                <div className="text-sm text-white/60">{selectedPlan?.name} {selectedPlan?.id === 'starter' && `(${starterOption === 'pay-as-you-go' ? 'Pay-As-You-Go' : 'Full'})`}</div>
                                <div className="text-xs text-white/40">Beneficiary: Dev ninja Web</div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Your Email Address</label>
                                <input 
                                  type="email"
                                  value={customerEmail}
                                  onChange={(e) => setCustomerEmail(e.target.value)}
                                  placeholder="name@example.com"
                                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-all"
                                  required
                                />
                              </div>
                              <div className="flex items-center gap-3 text-white/60 text-sm">
                                <ShieldCheck className="w-5 h-5 text-gold" />
                                Secure Checkout via Flutterwave
                              </div>
                              <div className="flex items-center gap-3 text-white/60 text-sm">
                                <CheckCircle2 className="w-5 h-5 text-gold" />
                                Cancel anytime
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {paymentStatus === "idle" ? (
                              <>
                                <div className="space-y-4">
                                  <h4 className="text-xl font-bold text-white">Complete your order</h4>
                                  <p className="text-sm text-white/40">You're one step away from your growth strategy.</p>
                                </div>
                                <PaymentButton
                                  amount={getFinalPrice()}
                                  currency="NGN"
                                  txRef={`cb-${Date.now()}`}
                                  customer={{
                                    email: customerEmail,
                                    name: data.brandName,
                                    phone_number: "08000000000"
                                  }}
                                  onSuccess={handlePaymentSuccess}
                                  onClose={() => console.log("Payment closed")}
                                  className={`w-full py-5 rounded-full font-bold text-lg transition-all transform flex items-center justify-center gap-3 ${
                                    !customerEmail || !customerEmail.includes('@')
                                    ? "bg-white/10 text-white/20 cursor-not-allowed"
                                    : "bg-gold text-black hover:bg-gold-light hover:scale-[1.02] shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                                  }`}
                                  disabled={!customerEmail || !customerEmail.includes('@')}
                                >
                                  <CreditCard className="w-5 h-5" />
                                  Pay Now
                                </PaymentButton>
                              </>
                            ) : paymentStatus === "verifying" ? (
                              <div className="py-12 flex flex-col items-center justify-center space-y-6">
                                <Loader2 className="w-12 h-12 text-gold animate-spin" />
                                <div className="text-center">
                                  <h4 className="text-xl font-bold text-white">Verifying Payment</h4>
                                  <p className="text-sm text-white/40">Please do not close this window.</p>
                                </div>
                              </div>
                            ) : paymentStatus === "success" ? (
                              <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
                                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center">
                                  <Check className="w-10 h-10 text-black" />
                                </div>
                                <div className="space-y-2">
                                  <h4 className="text-2xl font-bold text-white">Payment Successful!</h4>
                                  <p className="text-sm text-white/40">Welcome to Career Build Studio. Redirecting you to your dashboard...</p>
                                </div>
                              </div>
                            ) : (
                              <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
                                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                                  <X className="w-10 h-10 text-red-500" />
                                </div>
                                <div className="space-y-2">
                                  <h4 className="text-2xl font-bold text-white">Verification Failed</h4>
                                  <p className="text-sm text-white/40">We couldn't verify your payment. Please contact support with your transaction ID.</p>
                                  <button 
                                    onClick={() => setPaymentStatus("idle")}
                                    className="mt-4 text-gold hover:text-gold-light text-sm font-bold underline"
                                  >
                                    Try again
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
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
                          <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                            What's your brand name?
                            <span className="text-[10px] text-white/20">Required</span>
                          </label>
                          <input 
                            type="text" 
                            value={data.brandName}
                            onChange={(e) => setData({...data, brandName: e.target.value})}
                            placeholder="e.g. Career Build Studio"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-gold outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                            What industry are you in?
                            <span className="text-[10px] text-white/20">Required</span>
                          </label>
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
                          <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                            How many customers did you get in the last 7 days?
                            <span className="text-[10px] text-white/20">Required</span>
                          </label>
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
                        <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                          What are you currently doing to get customers?
                          <span className="text-[10px] text-white/20">Required</span>
                        </label>
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
                        <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                          If you explain your business to someone, can they immediately understand and buy?
                          <span className="text-[10px] text-white/20">Required</span>
                        </label>
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
                          <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                            How many customers do you want per week?
                            <span className="text-[10px] text-white/20">Required</span>
                          </label>
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
                          <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                            What is your current main goal right now?
                            <span className="text-[10px] text-white/20">Required</span>
                          </label>
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
                        <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                          What do you think is stopping your business from getting more customers?
                          <span className="text-[10px] text-white/20">Required</span>
                        </label>
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
                        <label className="text-sm font-bold text-gold uppercase tracking-widest flex justify-between">
                          How urgent is fixing this for you?
                          <span className="text-[10px] text-white/20">Required</span>
                        </label>
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
              )}
            </AnimatePresence>
            </div>

            {/* Footer */}
            {!isAnalyzing && !isShowingPricing && (
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
                    disabled={!isStepValid()}
                    className={`px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform ${
                      isStepValid() 
                      ? "bg-gold text-black hover:bg-gold-light hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                      : "bg-white/5 text-white/20 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    disabled={!isStepValid()}
                    className={`px-10 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform ${
                      isStepValid()
                      ? "bg-gold text-black hover:bg-gold-light hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                      : "bg-white/5 text-white/20 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    Show me my growth plan
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
