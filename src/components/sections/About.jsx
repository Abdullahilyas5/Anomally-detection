import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../components/button";
import { FiEye, FiShield, FiZap } from "react-icons/fi";

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3 }
    },
    hover: {
      scale: 1.08,
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  const values = [
    {
      icon: FiEye,
      title: "Transparency",
      desc: "Track every step with complete visibility",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiShield,
      title: "Security",
      desc: "Enterprise-grade data protection",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FiZap,
      title: "Efficiency",
      desc: "Lightning-fast approvals and audits",
      color: "from-purple-500 to-pink-500"
    },
  ];

  return (
    <section id="about" className="relative px-6 md:px-12 py-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        </div>
      </div>

      <motion.div
        className="relative max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-10"
          variants={itemVariants}
        >
          <motion.span
            className="inline-block px-6 py-3 bg-primary/4 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-sm border border-primary/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ✨ About ProcureGuard
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl font-black text-slate-900 font-heading leading-normal mb-8 tracking-wide"
            variants={itemVariants}
          >
            Building Trust in
            <span className="text-primary block mt-2">Procurement</span>
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-textSecondary max-w-3xl mx-auto font-serif tracking-wide leading-tight"
            variants={itemVariants}
          >
            We help organizations eliminate fraud, improve transparency, and make smarter decisions using <br /> AI-powered insights.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="space-y-2 mx-auto"
          variants={containerVariants}
        >
          {/* Description Paragraphs */}
          <motion.div
            className="space-y-2 flex items-center justify-center flex-col"
            variants={itemVariants}
          >
            <p className="text-lg text-primary font-serif  max-w-7xl">
              ProcureGuard transforms traditional procurement systems into intelligent, transparent ecosystems. By leveraging advanced AI, we detect anomalies, enforce compliance, and streamline audits with unprecedented precision.
            </p>

            <p className="text-lg text-primary font-serif  max-w-7xl">
              Designed for governments and enterprises, our platform ensures every transaction is traceable, secure, and optimized for efficiency. We empower decision-makers with real-time insights.
            </p>
          </motion.div>

          {/* Values Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 pt-8"
            variants={containerVariants}
          >
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative p-8 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-8 transition-opacity duration-300`} />

                  <div className="relative z-10 space-y-2">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                      <Icon size={28} className="font-bold" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-textSecondary group-hover:text-slate-700 transition-colors duration-300 leading-normal text-sm font-medium">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="py-2"
            variants={itemVariants}
          >
            <Link to="/signup">
              <Button 
                text="Get Started Today" 
                variant="primary" 
                className="px-10 py-4 text-lg font-semibold"
              />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;