import { motion } from "framer-motion";
import Button from "../../components/button"; // adjust path
import { useNavigate } from "react-router-dom";
import CrisisAlertOutlinedIcon from '@mui/icons-material/CrisisAlertOutlined';
import ScaleIcon from '@mui/icons-material/Scale';
import CachedIcon from '@mui/icons-material/Cached';
import { MdOutlineGrain } from "react-icons/md";

const Hero = () => {
  const Navigate = useNavigate();

  return (
    <section className="px-6  md:px-12 py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">

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
            // Ficon={<CachedIcon/>}
            Ficon={<MdOutlineGrain />}
            variant="accent"  
            className="font-script"
            onClick={() => {
              Navigate("/signup");
            }}
          />

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 mt-30 rounded-2xl shadow-xl border"
        >
          <h3 className="text-primary font-semibold font-body mb-4">
            <CrisisAlertOutlinedIcon className="mr-2" /> Procurement Alerts
          </h3>

          <div className="space-y-3 text-sm">
            <div className="bg-softBlue p-3 rounded-lg flex font-serif justify-between">
              <span>Vendor Dominance</span>
              <span className="text-red-500">High</span>
            </div>

            {/* Optional extra alert for better UI */}
            <div className="bg-softBlue p-3 rounded-lg flex font-serif justify-between">
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