import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      service: "Website Development",
      rating: 5,
      quote: "DigitalCraft transformed our online presence completely. Our new website not only looks stunning but has increased our conversion rate by 300%. The team's attention to detail and commitment to excellence is unmatched.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen", 
      company: "GrowthVentures",
      role: "Marketing Director",
      service: "Social Media Management",
      rating: 5,
      quote: "In just 6 months, our social media following grew by 500% and our engagement rates skyrocketed. The strategic approach and creative content that DigitalCraft provides is simply outstanding.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Fashion Forward",
      role: "Founder",
      service: "Full Digital Package",
      rating: 5,
      quote: "Working with DigitalCraft was a game-changer for our brand. They didn't just build us a website and manage our socials - they became true partners in our growth journey. Absolutely recommend!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      company: "EcoGreen Solutions",
      role: "Co-Founder", 
      service: "Website Development",
      rating: 5,
      quote: "The professionalism and expertise of the DigitalCraft team exceeded all our expectations. Our new website perfectly captures our brand vision and has significantly boosted our online credibility.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(timer);
  }, [isPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section 
      ref={ref} 
      className="py-20 bg-light-gray relative overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-vibrant-purple" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg text-dark-gray mb-4">
            What Our Clients Say
          </h2>
          <p className="body-lg text-medium-gray max-w-3xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped transform
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Client Photo */}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-electric-blue to-vibrant-purple p-1">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-mint-green rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      <Star className="w-4 h-4 text-white fill-current" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Quote */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-6xl text-electric-blue/20 font-serif leading-none mb-4">"</div>
                    <TypewriterText 
                      text={testimonials[currentIndex].quote}
                      className="text-lg text-dark-gray leading-relaxed"
                    />
                  </motion.div>

                  {/* Client Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-xl font-semibold text-dark-gray">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-medium-gray mb-2">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center lg:justify-start gap-1 mb-3">
                      {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.6 + (i * 0.1), type: "spring" }}
                        >
                          <Star className="w-5 h-5 text-sunset-orange fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Service Badge */}
                    <span className="inline-block bg-electric-blue/10 text-electric-blue px-3 py-1 rounded-full text-sm font-medium">
                      {testimonials[currentIndex].service}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-dark-gray hover:text-electric-blue transition-colors duration-200 hover:shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-dark-gray hover:text-electric-blue transition-colors duration-200 hover:shadow-xl"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-electric-blue w-8' 
                  : 'bg-medium-gray/30 hover:bg-medium-gray/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TypewriterTextProps {
  text: string;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    // Reset when text changes
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <p className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </p>
  );
};