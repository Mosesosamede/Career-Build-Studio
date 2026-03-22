import { motion } from "motion/react";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`relative flex items-center justify-center ${className}`}
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Star at the top */}
        <path 
          d="M50 5L53 14H62L55 20L58 29L50 23L42 29L45 20L38 14H47L50 5Z" 
          fill="url(#gold-gradient)" 
        />
        
        {/* Phoenix / Eagle Wings and Body */}
        <path 
          d="M50 25C50 25 45 35 40 40C30 50 10 45 5 35C10 40 25 55 45 50C48 60 52 60 55 50C75 55 90 40 95 35C90 45 70 50 60 40C55 35 50 25 50 25Z" 
          fill="url(#gold-gradient)" 
        />
        <path 
          d="M50 52L45 65L50 70L55 65L50 52Z" 
          fill="url(#gold-gradient)" 
        />

        {/* Swooshes at the bottom */}
        <path 
          d="M20 90C40 85 60 85 80 90M25 95C45 92 55 92 75 95" 
          stroke="url(#gold-gradient)" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />

        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E29C" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* The "CB" text is often better as actual text for clarity if the SVG is small, 
          but I'll try to position it within the logo area or right next to it. 
          In the user's image, it's below the bird. */}
    </motion.div>
  );
}

export function LogoWithText() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative flex flex-col items-center">
        <Logo className="w-12 h-12" />
        <span className="text-gold font-serif font-bold text-xl -mt-3 tracking-tighter group-hover:scale-110 transition-transform">CB</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-none tracking-tight">Career Build</span>
        <span className="text-[10px] text-gold font-bold tracking-[0.2em] uppercase leading-none mt-1">Studio</span>
      </div>
    </div>
  );
}
