import React from 'react';
import { motion } from 'framer-motion';
import { ensoRotateVariant, useIsReducedMotion } from '../utils/motionVariants';

interface EnsoAccentProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export const EnsoAccent: React.FC<EnsoAccentProps> = ({
  className = "absolute right-[-5%] top-[10%] pointer-events-none z-10",
  size = 380,
  opacity = 0.45
}) => {
  const isReduced = useIsReducedMotion();

  return (
    <div className={className} style={{ opacity }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={isReduced ? undefined : ensoRotateVariant}
        animate={isReduced ? undefined : "animate"}
      >
        <circle
          cx="100"
          cy="100"
          r="82"
          stroke="url(#ensoGoldGradient)"
          strokeWidth="3.5"
          strokeDasharray="440 80"
          strokeLinecap="round"
        />
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="url(#ensoInnerGradient)"
          strokeWidth="1.2"
          strokeDasharray="380 90"
          opacity="0.75"
        />
        <defs>
          <linearGradient id="ensoGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D8B36A" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E6C885" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="ensoInnerGradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E6C885" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#120E0C" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export const JapaneseVerticalDivider: React.FC<{ height?: string; className?: string }> = ({
  height = "h-16",
  className = "my-6"
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`w-px ${height} bg-gradient-to-b from-transparent via-oyishi-gold/60 to-transparent`} />
      <div className="w-2 h-2 rotate-45 border border-oyishi-gold/80 my-1.5 bg-oyishi-bg shadow-[0_0_8px_rgba(216,179,106,0.4)]" />
      <div className={`w-px ${height} bg-gradient-to-b from-transparent via-oyishi-gold/60 to-transparent`} />
    </div>
  );
};

export const KanjiWatermark: React.FC<{ char?: string; className?: string }> = ({
  char = "和",
  className = "absolute right-8 bottom-8 text-8xl font-display text-white/[0.08] select-none pointer-events-none font-bold tracking-widest drop-shadow-md"
}) => {
  return (
    <span className={className} aria-hidden="true">
      {char}
    </span>
  );
};

export const WashiOverlay: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.035] z-10 mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
    />
  );
};
