import { motion } from 'framer-motion';
import { Play, Eye, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onContactClick: () => void;
  onWorkClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick, onWorkClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            We help{' '}
            <span className="text-muted-foreground">entrepreneurs</span>{' '}
            build profitable personal brands through{' '}
            <span className="text-muted-foreground underline decoration-2 underline-offset-8">
              short-form content
            </span>
          </h1>
          
          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Leverage your expertise into high-converting video content that builds trust, generates 
            qualified leads organically, and establishes you as the go-to authority in your space.
          </motion.p>

          {/* CTA Button with Arrow */}
          <motion.div
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={onContactClick}
              className="bg-orange-400 hover:bg-orange-500 text-white font-semibold text-lg px-12 py-4 rounded-lg transition-colors duration-200 mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Free Discovery Call
            </motion.button>
            
            {/* Handwritten Arrow and Text */}
            <div className="relative">
              <svg
                className="w-32 h-16 text-foreground/60"
                viewBox="0 0 128 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20 40 Q60 20 100 35 L95 30 M100 35 L95 40" />
              </svg>
              <span className="absolute -top-2 right-0 text-sm text-foreground/60 font-handwriting transform rotate-12">
                Your personal brand starts here
              </span>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-muted/50 px-6 py-3 rounded-full border">
              <Play className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">250M+ Views Generated</span>
            </div>
            
            <div className="flex items-center gap-2 bg-muted/50 px-6 py-3 rounded-full border">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">4+ Years of Building Personal Brands</span>
            </div>
            
            <div className="flex items-center gap-2 bg-muted/50 px-6 py-3 rounded-full border">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">5000+ Videos Created</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};