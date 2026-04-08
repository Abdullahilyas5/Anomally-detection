import { motion } from "framer-motion";
import Button from "../../components/button"; // adjust path
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const Navigate = useNavigate();

  return (
    <section className="px-6 md:px-12 py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">

      <div className="absolute top-0 right-0 w-72 h-72 bg-lightBlue opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-elegant text-white mb-6">
            Intelligent Oversight for Public Procurement
          </h2>

          <p className="text-white font-mono opacity-90 mb-8">
            Leverage AI to identify irregular bidding patterns, suspicious vendors, and compliance risks in real time
          </p>

          {/* ✅ Use your existing Button */}
          <Button
            text="Start Monitoring"
            variant="accent"  
            onClick={() => {
              Navigate("/signup");
            }}
          />

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-xl border"
        >
          <h3 className="text-primary font-semibold mb-4">
            ⚠️ Procurement Alerts
          </h3>

          <div className="space-y-3 text-sm">
            <div className="bg-softBlue p-3 rounded-lg flex justify-between">
              <span>Vendor Dominance</span>
              <span className="text-red-500">High</span>
            </div>

            {/* Optional extra alert for better UI */}
            <div className="bg-softBlue p-3 rounded-lg flex justify-between">
              <span>Bid Pattern Anomaly</span>
              <span className="text-yellow-500">Medium</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;