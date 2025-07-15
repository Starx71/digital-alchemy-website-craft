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
      number: 500, 
      suffix: '%', 
      label: 'Average Social Media Growth',
      description: 'Follower increase in 6 months'
    },
    { 
      number: 150, 
      suffix: '+', 
      label: 'Websites Delivered',
      description: 'High-performance sites launched'
    },
    { 
      number: 98, 
      suffix: '%', 
      label: 'Client Satisfaction Rate',
      description: 'Happy clients recommend us'
    },
    { 
      number: 24, 
      suffix: '/7', 
      label: 'Dedicated Support',
      description: 'Always here when you need us'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg text-white mb-4">
            The Results Speak for Themselves
          </h2>
          <p className="body-lg text-white/80 max-w-3xl mx-auto">
            Real numbers from real client success stories
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
  };
  index: number;
  inView: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, inView }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      let start = 0;
      const end = stat.number;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, stat.number, hasAnimated]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 card-hover"
        whileHover={{ y: -5 }}
      >
        {/* Animated Progress Circle */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white/20"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: index * 0.1 }}
              style={{
                pathLength: count / stat.number,
              }}
            />
          </svg>
          
          {/* Particle burst effect */}
          {hasAnimated && count === stat.number && (
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * 45) * Math.PI / 180) * 30,
                    y: Math.sin((i * 45) * Math.PI / 180) * 30,
                  }}
                  transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Number */}
        <motion.div
          className="text-4xl md:text-5xl font-bold text-white mb-2"
          key={count} // Force re-render for smooth number animation
        >
          {count}{stat.suffix}
        </motion.div>

        {/* Label */}
        <h3 className="text-lg font-semibold text-white mb-2">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm">
          {stat.description}
        </p>
      </motion.div>
    </motion.div>
  );
};