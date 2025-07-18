import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { 
      number: 400, 
      suffix: '%', 
      label: 'Average Social Media Growth',
      description: 'Follower increase in 6 months',
      maxProgress: 100 // For circle animation (400% displayed as 100% circle)
    },
    { 
      number: 150, 
      suffix: '+', 
      label: 'Websites Delivered',
      description: 'High-performance sites launched',
      maxProgress: 100 // 150+ shown as full circle
    },
    { 
      number: 98, 
      suffix: '%', 
      label: 'Client Satisfaction Rate',
      description: 'Happy clients recommend us',
      maxProgress: 98 // Actual percentage for circle
    },
    { 
      number: 24, 
      suffix: '/7', 
      label: 'Dedicated Support',
      description: 'Always here when you need us',
      maxProgress: 100 // 24/7 shown as full circle
    }
  ];

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-pure-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg text-pure-white mb-4">
            The Results Speak for Themselves
          </h2>
          <p className="body-lg text-pure-white/80 max-w-3xl mx-auto">
            Real numbers from real client success stories
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              index={index} 
              inView={inView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: {
    number: number;
    suffix: string;
    label: string;
    description: string;
    maxProgress: number;
  };
  index: number;
  inView: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, inView }) => {
  const [count, setCount] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      
      // Animate the counter
      let currentCount = 0;
      const targetCount = stat.number;
      const duration = 2000; // 2 seconds
      const steps = 60; // Animation steps
      const increment = targetCount / steps;
      const stepDuration = duration / steps;

      const counterTimer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          setCount(targetCount);
          clearInterval(counterTimer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, stepDuration);

      // Animate the circle progress
      let currentProgress = 0;
      const targetProgress = stat.maxProgress;
      const progressIncrement = targetProgress / steps;

      const circleTimer = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= targetProgress) {
          setCircleProgress(targetProgress);
          clearInterval(circleTimer);
        } else {
          setCircleProgress(currentProgress);
        }
      }, stepDuration);

      return () => {
        clearInterval(counterTimer);
        clearInterval(circleTimer);
      };
    }
  }, [inView, stat.number, stat.maxProgress, hasAnimated]);

  // Calculate progress percentage for circle animation
  const progress = circleProgress / 100; // Convert to 0-1 range
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="bg-pure-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-pure-white/20 transition-all duration-300 card-hover"
        whileHover={{ y: -5 }}
      >
        {/* Animated Progress Circle */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-pure-white/20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              className="text-pure-white"
              animate={{ strokeDashoffset: strokeDashoffset }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />
          </svg>
          
          {/* Particle burst effect */}
          {hasAnimated && count === stat.number && (
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-pure-white rounded-full"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    x: Math.cos((i * 60) * Math.PI / 180) * 25,
                    y: Math.sin((i * 60) * Math.PI / 180) * 25,
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 1, delay: 2.1 + index * 0.1 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Number */}
        <motion.div
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-pure-white mb-1 sm:mb-2"
          initial={{ scale: 0.8 }}
          animate={inView ? { scale: 1 } : { scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {count}{stat.suffix}
        </motion.div>

        {/* Label */}
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-pure-white mb-1 sm:mb-2 leading-tight">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-pure-white/70 text-xs sm:text-sm leading-relaxed">
          {stat.description}
        </p>
      </motion.div>
    </motion.div>
  );
};