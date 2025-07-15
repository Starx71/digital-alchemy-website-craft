import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Share2, CheckCircle, Star, Zap, Target } from 'lucide-react';

export const ServicesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const services = [
    {
      icon: Share2,
      title: "Social Media Management",
      description: "Build your brand presence, engage your audience, and drive qualified leads through strategic social media marketing",
      features: [
        "Content Strategy & Creation",
        "Community Management",
        "Paid Social Advertising",
        "Analytics & Reporting",
        "Brand Voice Development"
      ],
      gradient: "from-sunset-orange to-coral-pink"
    },
    {
      icon: Globe,
      title: "Website Development",
      description: "Create stunning, high-performance websites that convert visitors into customers and establish your digital authority",
      features: [
        "Custom Design & Development",
        "E-commerce Solutions",
        "SEO Optimization",
        "Mobile Responsive Design",
        "Performance Analytics"
      ],
      gradient: "from-electric-blue to-vibrant-purple"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="heading-lg text-dark-gray mb-4"
          >
            Our Core Services
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="body-lg text-medium-gray max-w-3xl mx-auto"
          >
            We specialize in two powerful services that drive real business results
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, x: index === 0 ? -50 : 50 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 h-full card-hover">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="heading-md text-dark-gray mb-4">{service.title}</h3>
                <p className="text-medium-gray mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 + (index * 0.2) + (featureIndex * 0.1) }}
                    >
                      <CheckCircle className="w-5 h-5 text-mint-green flex-shrink-0" />
                      <span className="text-dark-gray">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg hover:-translate-y-1`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore {service.title.split(' ')[0]} Services
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1 }}
        >
          <p className="text-medium-gray mb-6">
            Ready to elevate your digital presence?
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};