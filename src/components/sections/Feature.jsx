import { motion } from "framer-motion";
import { features } from "../../data/feature";

const Features = () => {
  return (
    <section id="features" className="relative px-6 md:px-12 py-20 bg-white overflow-hidden">
      {/* Top fade overlay */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      <motion.h2
        className="text-3xl text-primary font-bold text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Built for Government Transparency
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 p-6 bg-card border rounded-xl shadow-sm"
            >
              <Icon className="text-primary" size={22} />
              <div>
                <h3 className="font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-textSecondary mt-1">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;