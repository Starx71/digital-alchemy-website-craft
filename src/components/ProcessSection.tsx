import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Palette, Rocket, TrendingUp } from 'lucide-react';

export const ProcessSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We dive deep into your business goals, target audience, and competitive landscape to craft a winning strategy",
      icon: Search,
      color: "electric-blue"
    },
    {
      number: "02", 
      title: "Creative Development",
      description: "Our expert team designs and develops creative solutions that align with your brand and captivate your audience",
      icon: Palette,
      color: "vibrant-purple"
    },
    {
      number: "03",
      title: "Implementation & Launch",
      description: "We execute your project with precision, ensuring everything is optimized for maximum performance and impact",
      icon: Rocket,
      color: "sunset-orange"
    },
    {
      number: "04",
      title: "Growth & Optimization",
      description: "Continuous monitoring, analysis, and optimization to ensure your digital presence delivers sustained growth",
      icon: TrendingUp,
      color: "mint-green"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg text-dark-gray mb-4">
            How We Transform Your Business
          </h2>
          <p className="body-lg text-medium-gray max-w-3xl mx-auto">
            Our proven 4-step process that delivers exceptional results
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-1 bg-light-gray transform -translate-y-1/2 hidden lg:block"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
          
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-electric-blue via-vibrant-purple via-sunset-orange to-mint-green transform -translate-y-1/2 hidden lg:block"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 2, delay: 1 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Steps */}
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-${step.color} hidden lg:block z-10`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + (index * 0.2) }}
                  style={{ marginTop: '-12px' }}
                />

                {/* Card */}
                <motion.div
                  className={`bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-${step.color}/20 transition-all duration-300 mt-8 lg:mt-12 card-hover group`}
                  whileHover={{ y: -5 }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center mb-4 group-hover:bg-${step.color}/20 transition-colors duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <step.icon className={`w-8 h-8 text-${step.color}`} />
                  </motion.div>

                  {/* Number */}
                  <div className={`text-3xl font-bold text-${step.color} mb-2`}>
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-dark-gray mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-medium-gray leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${step.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-medium-gray mb-6">
            Ready to start your transformation journey?
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};