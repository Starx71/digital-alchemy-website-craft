import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { StatsSection } from '@/components/StatsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Refs for scroll-to functionality
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to section function
  const scrollToSection = (sectionName: string) => {
    const refs = {
      'home': heroRef,
      'about': heroRef, // Will open modal instead
      'services': servicesRef, // Will open modal instead
      'testimonials': testimonialsRef,
      'contact': contactRef
    };

    if (sectionName === 'about' || sectionName === 'services') {
      setActiveModal(sectionName);
      return;
    }

    const targetRef = refs[sectionName as keyof typeof refs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle contact button clicks
  const handleContactClick = () => {
    scrollToSection('contact');
  };

  const handleWorkClick = () => {
    setActiveModal('services');
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation onSectionClick={scrollToSection} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div ref={heroRef}>
          <HeroSection 
            onContactClick={handleContactClick}
            onWorkClick={handleWorkClick}
          />
        </div>

        {/* Services Section */}
        <div ref={servicesRef}>
          <ServicesSection />
        </div>

        {/* Process Section */}
        <div ref={processRef}>
          <ProcessSection />
        </div>

        {/* Stats Section */}
        <div ref={statsRef}>
          <StatsSection />
        </div>

        {/* Testimonials Section */}
        <div ref={testimonialsRef}>
          <TestimonialsSection />
        </div>

        {/* Contact Section */}
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <ModalOverlay 
            type={activeModal} 
            onClose={() => setActiveModal(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Component
interface ModalOverlayProps {
  type: string;
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ type, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-y-auto mx-4 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content Based on Type */}
        {type === 'about' && <AboutModal />}
        {type === 'services' && <ServicesModal />}
      </motion.div>
    </motion.div>
  );
};

// About Modal Content
const AboutModal = () => (
  <div className="p-8 md:p-12">
    <div className="text-center mb-8">
      <h2 className="heading-lg text-dark-gray mb-4">About DigitalCraft</h2>
      <p className="body-lg text-medium-gray max-w-3xl mx-auto">
        We're a passionate team of digital experts dedicated to transforming businesses through innovative solutions.
      </p>
    </div>

    {/* Our Story */}
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-dark-gray mb-4">Our Story</h3>
      <p className="text-medium-gray leading-relaxed mb-6">
        Founded in 2020, DigitalCraft emerged from a simple belief: every business deserves a powerful digital presence. 
        We started as a small team of designers and developers who were frustrated by the gap between beautiful design and 
        effective business results.
      </p>
      <p className="text-medium-gray leading-relaxed">
        Today, we've helped over 150 businesses transform their digital presence, generating millions in additional revenue 
        for our clients through strategic design and development.
      </p>
    </div>

    {/* Values */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        { title: "Innovation", description: "We stay ahead of digital trends to give our clients a competitive edge." },
        { title: "Results", description: "Every project is measured by real business outcomes, not just aesthetics." },
        { title: "Partnership", description: "We work as an extension of your team, invested in your long-term success." }
      ].map((value) => (
        <div key={value.title} className="text-center p-6 bg-light-gray rounded-2xl">
          <h4 className="text-xl font-semibold text-dark-gray mb-3">{value.title}</h4>
          <p className="text-medium-gray">{value.description}</p>
        </div>
      ))}
    </div>

    {/* Team */}
    <div>
      <h3 className="text-2xl font-semibold text-dark-gray mb-6 text-center">Meet Our Team</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: "Alex Thompson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
          { name: "Sarah Chen", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
          { name: "Marcus Johnson", role: "Lead Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" }
        ].map((member) => (
          <div key={member.name} className="text-center">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h4 className="text-lg font-semibold text-dark-gray">{member.name}</h4>
            <p className="text-medium-gray">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Services Modal Content
const ServicesModal = () => (
  <div className="p-8 md:p-12">
    <div className="text-center mb-8">
      <h2 className="heading-lg text-dark-gray mb-4">Our Services</h2>
      <p className="body-lg text-medium-gray max-w-3xl mx-auto">
        Comprehensive digital solutions designed to accelerate your business growth.
      </p>
    </div>

    {/* Service Details */}
    <div className="space-y-12">
      {/* Social Media Management */}
      <div className="border border-gray-200 rounded-3xl p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-r from-sunset-orange to-coral-pink rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-dark-gray mb-4">Social Media Management</h3>
            <p className="text-medium-gray mb-6">
              Transform your social presence into a powerful customer acquisition engine with our comprehensive social media management services.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-dark-gray mb-2">What's Included:</h4>
                <ul className="text-medium-gray space-y-1">
                  <li>• Custom content strategy</li>
                  <li>• Daily posting & scheduling</li>
                  <li>• Community management</li>
                  <li>• Paid advertising campaigns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-dark-gray mb-2">Pricing:</h4>
                <div className="text-medium-gray space-y-1">
                  <div>Starter: $1,500/month</div>
                  <div>Growth: $2,500/month</div>
                  <div>Enterprise: Custom pricing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Development */}
      <div className="border border-gray-200 rounded-3xl p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-vibrant-purple rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-dark-gray mb-4">Website Development</h3>
            <p className="text-medium-gray mb-6">
              Create stunning, high-performance websites that convert visitors into customers and establish your digital authority.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-dark-gray mb-2">What's Included:</h4>
                <ul className="text-medium-gray space-y-1">
                  <li>• Custom design & development</li>
                  <li>• Mobile-responsive design</li>
                  <li>• SEO optimization</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-dark-gray mb-2">Pricing:</h4>
                <div className="text-medium-gray space-y-1">
                  <div>Landing Page: $2,500</div>
                  <div>Business Site: $5,000</div>
                  <div>E-commerce: $8,500+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Portfolio Preview */}
    <div className="mt-12">
      <h3 className="text-2xl font-semibold text-dark-gray mb-6 text-center">Recent Work</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "TechStart Solutions", category: "Website Development", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop" },
          { title: "Fashion Forward", category: "Social Media", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" },
          { title: "EcoGreen Solutions", category: "Full Package", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop" }
        ].map((project) => (
          <div key={project.title} className="group cursor-pointer">
            <div className="bg-gray-200 rounded-2xl overflow-hidden mb-3 aspect-video">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="font-semibold text-dark-gray">{project.title}</h4>
            <p className="text-medium-gray text-sm">{project.category}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Index;
