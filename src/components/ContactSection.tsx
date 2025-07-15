import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export const ContactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@digitalcraft.agency',
      href: 'mailto:hello@digitalcraft.agency'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-electric-blue/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-vibrant-purple/5 to-transparent rounded-full blur-3xl" />
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
            Ready to Transform Your Business?
          </h2>
          <p className="body-lg text-medium-gray max-w-3xl mx-auto">
            Let's discuss how we can help you achieve your digital goals
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/20'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/20'
                    }`}
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* Company Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Company
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/20"
                    placeholder="Your company name"
                  />
                </motion.div>

                {/* Service Interest Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Service Interest *
                  </label>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                      errors.service 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/20'
                    }`}
                  >
                    <option value="">Select a service</option>
                    <option value="social-media">Social Media Management</option>
                    <option value="website">Website Development</option>
                    <option value="both">Both Services</option>
                    <option value="consultation">Free Consultation</option>
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 resize-none ${
                      errors.message 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-electric-blue focus:shadow-lg focus:shadow-electric-blue/20'
                    }`}
                    placeholder="Tell us about your project and goals..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full btn-primary relative overflow-hidden ${
                    isLoading ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </div>
                  ) : (
                    'Get Started Today'
                  )}
                </motion.button>
              </form>
            ) : (
              // Success Message
              <motion.div
                className="bg-mint-green/10 border border-mint-green/20 rounded-3xl p-8 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                >
                  <CheckCircle className="w-16 h-16 text-mint-green mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-dark-gray mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-medium-gray">
                  Thank you for reaching out. We'll get back to you within 24 hours to discuss your project.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pl-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-dark-gray mb-4">
                Get in Touch
              </h3>
              <p className="text-medium-gray leading-relaxed">
                Ready to start your digital transformation? We'd love to hear about your project and discuss how we can help you achieve your goals.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="flex items-center p-4 bg-light-gray rounded-2xl hover:bg-electric-blue/5 transition-all duration-300 group"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 group-hover:bg-electric-blue group-hover:text-white transition-all duration-300">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-medium-gray">{info.label}</div>
                    <div className="font-medium text-dark-gray">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              className="bg-gradient-primary rounded-3xl p-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.9 }}
            >
              <h4 className="text-xl font-semibold mb-3">Why Choose DigitalCraft?</h4>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-3 flex-shrink-0" />
                  Free initial consultation
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-3 flex-shrink-0" />
                  24/7 dedicated support
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-3 flex-shrink-0" />
                  Results-driven approach
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-3 flex-shrink-0" />
                  Transparent pricing
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};