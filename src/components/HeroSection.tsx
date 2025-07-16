import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onContactClick: () => void;
  onWorkClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick, onWorkClick }) => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Transform Your Business Through Digital Excellence';
  
  useEffect(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 100);

    // Cursor blink effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typeTimer);
      clearInterval(cursorTimer);
    };
  }, []);

  // Particle animation positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/e0440f88-650a-421d-a74c-b0dea09b6ed1.png')`
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Headline with Typing Effect */}
          <h1 className="heading-xl text-white mb-6">
            {typedText}
            <span className={`ml-1 border-r-2 border-white ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
              &nbsp;
            </span>
          </h1>
          
          {/* Subheadline */}
          <motion.p
            className="body-lg text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            We help entrepreneurs and businesses scale through strategic social media management and cutting-edge website development
          </motion.p>

          {/* Trust Indicators - Logo Carousel */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3 }}
          >
            <p className="text-white/70 text-sm mb-4">Trusted by innovative companies</p>
            <div className="relative overflow-hidden">
              <motion.div
                className="flex space-x-8 items-center"
                animate={{ x: [0, -100] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Placeholder client logos */}
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white/60 text-xs font-medium grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    Client {i + 1}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          >
            <motion.button
              onClick={onContactClick}
              className="btn-primary text-lg px-10 py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
            
            <motion.button
              onClick={onWorkClick}
              className="btn-secondary text-lg px-10 py-5 text-white border-white/30 hover:bg-white hover:text-deep-blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 4 }}
          >
            <motion.div
              className="flex flex-col items-center text-white/70 cursor-pointer hover:text-white transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};