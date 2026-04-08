import { motion } from "framer-motion";
import { FiUploadCloud, FiCpu, FiAlertTriangle, FiFileText } from "react-icons/fi";

const steps = [
  {
    icon: FiUploadCloud,
    title: "Upload Procurement Data",
    desc: "Government departments upload tenders, bids, and contract data securely into the system."
  },
  {
    icon: FiCpu,
    title: "AI Pattern Analysis",
    desc: "Machine learning models analyze pricing, vendor behavior, and bidding patterns."
  },
  {
    icon: FiAlertTriangle,
    title: "Anomaly Detection",
    desc: "System flags suspicious activities like bid rigging, abnormal pricing, and vendor dominance."
  },
  {
    icon: FiFileText,
    title: "Audit & Reporting",
    desc: "Detailed reports are generated for auditors and decision-makers with risk insights."
  }
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

const HowItWorks = () => {
  return (
    <section className="px-6 md:px-12 py-20 bg-cleanBlue">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            How the System Works
          </h2>
          <p className="text-textSecondary max-w-2xl mx-auto">
            A complete intelligent workflow designed to ensure transparency, detect fraud,
            and improve decision-making in public procurement.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                id="howitworks"
                className="relative bg-white p-6 rounded-2xl shadow-md border border-borderSlate hover:shadow-lg transition"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded-full shadow">
                  Step {index + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-softBlue text-primary mb-4">
                  <Icon size={22} />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-textSecondary">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;