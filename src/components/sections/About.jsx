import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../components/button";

const AboutSection = () => {
  return (
    <section id="about" className="px-6 md:px-12 py-24 bg-gradient-to-b from-white to-gray-50">
      
      {/* Heading */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-sm font-semibold text-secondary bg-secondary/10 px-4 py-1 rounded-full">
          About ProcureGuard
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold text-primary mt-4">
          Building Trust in Procurement
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          We help organizations eliminate fraud, improve transparency, and make smarter decisions using AI-powered insights.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-700 text-lg leading-relaxed">
            ProcureGuard transforms traditional procurement systems into intelligent, transparent ecosystems. By leveraging AI, we detect anomalies, enforce compliance, and streamline audits.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Designed for governments and enterprises, our platform ensures every transaction is traceable, secure, and optimized for efficiency.
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { title: "Transparency", desc: "Track every step clearly" },
              { title: "Security", desc: "Protect critical data" },
              { title: "Efficiency", desc: "Faster approvals & audits" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Link to="/signup">
              <Button text="Get Started" variant="primary" />
            </Link>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <video
              src="/assets/about-video.mp4"
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </div>

          {/* Optional overlay glow */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;